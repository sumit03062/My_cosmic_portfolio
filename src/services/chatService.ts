import {db} from '@/lib/firebase';
import { storage } from '@/lib/firebase'; // Ensure you have storage
import { 
  collection, addDoc, onSnapshot, query, orderBy, 
  serverTimestamp, where, updateDoc, doc, getDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface ChatAttachment {
  name: string;
  url: string;
  type: 'image' | 'pdf' | 'other';
  size: number;
}

export interface FirebaseMessage {
  id: string;
  content: string;
  sender: 'visitor' | 'admin';
  timestamp: any;
  email?: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: ChatAttachment[];
  metadata?: {
    userAgent?: string;
    ipRegion?: string;
  };
}

// Real-time message subscription with read receipts
export const subscribeToMessages = (
  callback: (messages: FirebaseMessage[]) => void,
  markAsRead: boolean = false
) => {
  const q = query(
    collection(db, 'messages'),
    orderBy('timestamp')
  );
  
  return onSnapshot(q, async (snapshot) => {
    const messages = await Promise.all(
      snapshot.docs.map(async (doc) => {
        if (markAsRead && doc.data().sender === 'visitor') {
          await updateDoc(doc.ref, { status: 'read' });
        }
        return {
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate()
        } as FirebaseMessage;
      })
    );
    callback(messages);
  });
};

// Upload attachment and return URL
export const uploadAttachment = async (file: File): Promise<ChatAttachment> => {
  const storageRef = ref(storage, `attachments/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  
  return {
    name: file.name,
    url,
    type: file.type.startsWith('image') ? 'image' : 
          file.type === 'application/pdf' ? 'pdf' : 'other',
    size: file.size
  };
};

// AI Auto-responder (basic implementation)
const generateAIResponse = async (message: string): Promise<string> => {
  // In a real implementation, connect to OpenAI API or similar
  const responses = [
    "Thanks for your message! I'll get back to you soon.",
    "I appreciate you reaching out. Let me check my schedule and get back to you.",
    "That's an interesting question! I'll need some time to prepare a proper response.",
    "I'm currently away, but I'll respond as soon as I return."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

// Send message with optional attachments
export const sendMessage = async (
  content: string,
  sender: 'visitor' | 'admin',
  options?: {
    email?: string;
    attachments?: File[];
    isAutoReply?: boolean;
  }
) => {
  let attachments: ChatAttachment[] = [];
  
  if (options?.attachments) {
    attachments = await Promise.all(
      options.attachments.map(file => uploadAttachment(file))
    );
  }

  const docRef = await addDoc(collection(db, 'messages'), {
    content: options?.isAutoReply 
      ? `[Auto-Reply] ${content}` 
      : content,
    sender,
    email: options?.email,
    timestamp: serverTimestamp(),
    status: 'sent',
    attachments: attachments.length ? attachments : undefined,
    metadata: {
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      // Note: IP detection would need a backend solution
    }
  });

  // Auto-reply if from visitor and outside working hours
  if (sender === 'visitor' && !options?.isAutoReply) {
    const now = new Date();
    const isOutsideHours = now.getHours() < 9 || now.getHours() > 17;
    
    if (isOutsideHours) {
      const response = await generateAIResponse(content);
      await sendMessage(response, 'admin', { isAutoReply: true });
    }
  }

  return docRef.id;
};