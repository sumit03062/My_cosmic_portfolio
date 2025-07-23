import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, signInWithGoogle, signOutUser } from '@/lib/firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'user';
  createdAt: Date;
  lastLogin: Date;
}

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile
    await updateProfile(user, { displayName });
    
    // Create user document in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      role: 'user',
      createdAt: new Date(),
      lastLogin: new Date()
    };
    
    await setDoc(doc(db, 'users', user.uid), userProfile);
    
    return { user, profile: userProfile };
  } catch (error) {
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update last login
    await setDoc(doc(db, 'users', user.uid), { lastLogin: new Date() }, { merge: true });
    
    return user;
  } catch (error) {
    throw error;
  }
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

// Reset password
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

// Google sign in
export const signInWithGoogleAuth = async () => {
  try {
    const result = await signInWithGoogle();
    const user = result.user;
    
    // Check if user profile exists, if not create one
    const existingProfile = await getUserProfile(user.uid);
    
    if (!existingProfile) {
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || 'User',
        photoURL: user.photoURL || undefined,
        role: 'user',
        createdAt: new Date(),
        lastLogin: new Date()
      };
      
      await setDoc(doc(db, 'users', user.uid), userProfile);
      return { user, profile: userProfile };
    } else {
      // Update last login
      await setDoc(doc(db, 'users', user.uid), { lastLogin: new Date() }, { merge: true });
      return { user, profile: existingProfile };
    }
  } catch (error) {
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  try {
    await signOutUser();
  } catch (error) {
    throw error;
  }
};