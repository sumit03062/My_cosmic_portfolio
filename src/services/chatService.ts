
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface FirebaseMessage {
  id: string;
  content: string;
  sender: 'user' | 'owner';
  timestamp: Timestamp;
}

export interface MessageToSend {
  content: string;
  sender: 'user' | 'owner';
}

// Collection reference
const messagesRef = collection(db, 'messages');

// Add a new message
export const addMessage = async (message: MessageToSend): Promise<void> => {
  await addDoc(messagesRef, {
    ...message,
    timestamp: serverTimestamp()
  });
};

// Subscribe to messages
export const subscribeToMessages = (callback: (messages: FirebaseMessage[]) => void) => {
  const q = query(messagesRef, orderBy('timestamp', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    const messages: FirebaseMessage[] = snapshot.docs.map(doc => ({
      id: doc.id,
      content: doc.data().content,
      sender: doc.data().sender,
      timestamp: doc.data().timestamp
    }));
    
    callback(messages);
  });
};
