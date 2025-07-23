import { db } from '@/lib/firebase';
import { storage } from '@/lib/firebase';
import { 
  collection, addDoc, onSnapshot, query, orderBy, 
  serverTimestamp, where, updateDoc, doc, getDoc, limit
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
  sender: 'visitor' | 'admin' | 'bot';
  timestamp: any;
  email?: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: ChatAttachment[];
  metadata?: {
    userAgent?: string;
    ipRegion?: string;
    sessionId?: string;
  };
  isBot?: boolean;
  context?: string;
}

// AI Bot responses for full-stack development
const getBotResponse = async (userMessage: string): Promise<string> => {
  const message = userMessage.toLowerCase();
  
  // About me responses
  if (message.includes('who are you') || message.includes('about you') || message.includes('tell me about')) {
    return `Hi! I'm Sumit Kumar, a passionate Full Stack Developer with 3+ years of experience. I specialize in:

🚀 **Frontend Development**: React, Next.js, TypeScript, Tailwind CSS
⚡ **Backend Development**: Python, Django, Node.js, Express
🗄️ **Databases**: MongoDB, MySQL, PostgreSQL
☁️ **Cloud & DevOps**: Firebase, AWS, Docker
🎨 **UI/UX Design**: Figma, Adobe XD, Responsive Design

I've built 25+ projects including AI Interview Mockers, E-commerce platforms, and Student Management Systems. I love solving complex problems and creating user-friendly digital experiences!

How can I help you with your development project?`;
  }

  // React/Frontend questions
  if (message.includes('react') || message.includes('frontend') || message.includes('component')) {
    return `Great question about React/Frontend development! Here's what I can help you with:

🔧 **React Expertise**:
- Custom Hooks and State Management
- Component Architecture & Reusability  
- Performance Optimization (React.memo, useMemo, useCallback)
- Context API & Redux for state management
- React Router for navigation

💡 **Frontend Best Practices**:
- Responsive Design with Tailwind CSS/SCSS
- TypeScript for type safety
- Testing with Jest & React Testing Library
- SEO optimization with Next.js
- Progressive Web Apps (PWA)

What specific React/Frontend challenge are you facing? I'd love to help you solve it!`;
  }

  // Backend/API questions
  if (message.includes('backend') || message.includes('api') || message.includes('server') || message.includes('django') || message.includes('node')) {
    return `Excellent! Backend development is one of my core strengths. Here's how I can assist:

🔥 **Backend Technologies**:
- **Python/Django**: REST APIs, ORM, Authentication, Admin Panel
- **Node.js/Express**: RESTful APIs, Middleware, JWT Authentication
- **Database Design**: MongoDB, MySQL, PostgreSQL optimization
- **API Development**: RESTful services, GraphQL, API documentation

🛠️ **Backend Solutions**:
- User Authentication & Authorization
- Database schema design & optimization
- File upload & storage systems
- Real-time features with WebSockets
- Payment integration (Stripe, PayPal)
- Email services with Nodemailer

What backend challenge can I help you solve? Share your specific requirements!`;
  }

  // Database questions
  if (message.includes('database') || message.includes('mongodb') || message.includes('mysql') || message.includes('sql')) {
    return `Database design and optimization is crucial for any application! Here's my expertise:

📊 **Database Technologies**:
- **MongoDB**: NoSQL, Aggregation pipelines, Indexing
- **MySQL/PostgreSQL**: Relational design, Complex queries, Joins
- **Database Design**: Normalization, Schema optimization
- **Performance**: Query optimization, Indexing strategies

🔍 **Common Database Solutions**:
- User management systems
- E-commerce product catalogs
- Content management systems
- Analytics and reporting
- Data migration strategies

What's your database challenge? I can help with schema design, query optimization, or choosing the right database for your project!`;
  }

  // Deployment/DevOps questions
  if (message.includes('deploy') || message.includes('hosting') || message.includes('server') || message.includes('aws') || message.includes('firebase')) {
    return `Deployment and hosting are critical for getting your app live! Here's my experience:

☁️ **Deployment Platforms**:
- **Firebase**: Hosting, Functions, Authentication, Firestore
- **Vercel/Netlify**: Frontend deployment, Serverless functions
- **AWS**: EC2, S3, Lambda, RDS
- **Docker**: Containerization for consistent deployments

🚀 **Deployment Best Practices**:
- CI/CD pipelines with GitHub Actions
- Environment variable management
- SSL certificates and security
- Performance monitoring
- Backup and disaster recovery

Need help deploying your application? I can guide you through the entire process from development to production!`;
  }

  // Project help
  if (message.includes('project') || message.includes('help') || message.includes('build') || message.includes('create')) {
    return `I'd love to help you with your project! Here are some projects I've successfully built:

🎯 **Recent Projects**:
- **AI Interview Mocker**: React + Node.js + MongoDB + Stripe
- **E-commerce Platform (VastraVerse)**: Next.js + PostgreSQL
- **Student Management System**: Django + SQLite
- **Smart Inventory System**: Angular + Django + MongoDB
- **Chat Bot**: React + Gemini API

💼 **I can help you build**:
- Full-stack web applications
- E-commerce platforms
- Management systems (CRM, ERP, LMS)
- AI-integrated applications
- Real-time chat applications
- Portfolio websites

What kind of project are you planning? Share your requirements and I'll provide a detailed roadmap!`;
  }

  // General programming help
  if (message.includes('error') || message.includes('bug') || message.includes('problem') || message.includes('issue')) {
    return `I'm here to help debug your issue! As a full-stack developer, I've solved countless bugs. Here's how I can assist:

🐛 **Common Issues I Help With**:
- Frontend: Component rendering, state management, API integration
- Backend: Server errors, database connections, authentication
- Database: Query optimization, data relationships
- Deployment: Build errors, environment issues, performance

📝 **To help you better, please share**:
- What technology/framework you're using
- The specific error message
- What you were trying to accomplish
- Any relevant code snippets

Paste your error or describe your problem, and I'll provide a solution with code examples!`;
  }

  // Default response
  return `Hello! I'm Sumit Kumar, your Full Stack Development Assistant! 🚀

I'm here to help you with:
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Python/Django, Node.js, APIs
- **Databases**: MongoDB, MySQL, PostgreSQL  
- **Deployment**: Firebase, AWS, Vercel
- **UI/UX**: Design systems, responsive layouts

**Popular topics I can help with**:
- Building full-stack applications
- Debugging code issues
- Database design & optimization
- API development & integration
- Deployment strategies
- Best practices & architecture

What development challenge can I help you solve today? Feel free to ask specific questions or describe your project requirements!`;
};

// Real-time message subscription with read receipts
export const subscribeToMessages = (
  callback: (messages: FirebaseMessage[]) => void,
  markAsRead: boolean = false,
  sessionId?: string
) => {
  let q;
  
  if (sessionId) {
    q = query(
      collection(db, 'messages'),
      where('metadata.sessionId', '==', sessionId),
      orderBy('timestamp'),
      limit(50)
    );
  } else {
    q = query(
      collection(db, 'messages'),
      orderBy('timestamp'),
      limit(50)
    );
  }
  
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

// Generate session ID for anonymous users
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Send message with bot response
export const sendMessage = async (
  content: string,
  sender: 'visitor' | 'admin' | 'bot',
  options?: {
    email?: string;
    attachments?: File[];
    isAutoReply?: boolean;
    sessionId?: string;
    context?: string;
  }
) => {
  let attachments: ChatAttachment[] = [];
  
  if (options?.attachments) {
    attachments = await Promise.all(
      options.attachments.map(file => uploadAttachment(file))
    );
  }

  const sessionId = options?.sessionId || generateSessionId();

  // Send user message
  const docRef = await addDoc(collection(db, 'messages'), {
    content: options?.isAutoReply 
      ? `[Auto-Reply] ${content}` 
      : content,
    sender,
    email: options?.email,
    timestamp: serverTimestamp(),
    status: 'sent',
    attachments: attachments.length ? attachments : undefined,
    isBot: sender === 'bot',
    context: options?.context,
    metadata: {
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      sessionId,
    }
  });

  // Auto-reply with bot response if from visitor
  if (sender === 'visitor' && !options?.isAutoReply) {
    setTimeout(async () => {
      const botResponse = await getBotResponse(content);
      
      await addDoc(collection(db, 'messages'), {
        content: botResponse,
        sender: 'bot',
        email: options?.email,
        timestamp: serverTimestamp(),
        status: 'sent',
        isBot: true,
        context: 'full-stack-development-assistant',
        metadata: {
          sessionId,
          userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
        }
      });
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  }

  return docRef.id;
};

// Get conversation history
export const getConversationHistory = async (sessionId: string): Promise<FirebaseMessage[]> => {
  const q = query(
    collection(db, 'messages'),
    where('metadata.sessionId', '==', sessionId),
    orderBy('timestamp')
  );
  
  return new Promise((resolve) => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()
      })) as FirebaseMessage[];
      
      unsubscribe();
      resolve(messages);
    });
  });
};