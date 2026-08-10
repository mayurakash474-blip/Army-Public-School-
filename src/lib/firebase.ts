import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  deleteDoc, 
  updateDoc,
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
    timestamp: new Date().toLocaleString(),
    isDeleted: false
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
        timestamp: data.timestamp,
        isDeleted: !!data.isDeleted,
        deletedAt: data.deletedAt || undefined
      });
    });
    
    return accounts;
  } catch (err) {
    console.error("Error fetching Instagram accounts from Firestore, falling back to local:", err);
    return [];
  }
}

// Soft delete account so it can still be viewed in Admin Panel
export async function softDeleteInstagramAccount(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'instagram_accounts', id);
    await updateDoc(docRef, {
      isDeleted: true,
      deletedAt: new Date().toLocaleString()
    });
  } catch (err) {
    console.error("Error soft deleting account in Firestore, trying permanent delete:", err);
    await deleteDoc(doc(db, 'instagram_accounts', id));
  }
}

// Restore a soft-deleted account
export async function restoreInstagramAccount(id: string): Promise<void> {
  const docRef = doc(db, 'instagram_accounts', id);
  await updateDoc(docRef, {
    isDeleted: false,
    deletedAt: null
  });
}

// Permanently delete an account from Firestore
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

// ==========================================
// 3. PFF FOOTBALL FEDERATION HELPERS
// ==========================================

import { TeamRegistrationRequest, MatchFixture } from '../types';

export async function saveTeamRegistration(registration: Omit<TeamRegistrationRequest, 'id'>): Promise<TeamRegistrationRequest> {
  const docRef = await addDoc(collection(db, 'pff_team_registrations'), {
    ...registration,
    registeredAt: registration.registeredAt || new Date().toLocaleString()
  });
  return {
    id: docRef.id,
    ...registration
  };
}

export async function fetchTeamRegistrations(): Promise<TeamRegistrationRequest[]> {
  try {
    const q = query(collection(db, 'pff_team_registrations'), orderBy('registeredAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const registrations: TeamRegistrationRequest[] = [];
    
    querySnapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
      const data = docSnap.data();
      registrations.push({
        id: docSnap.id,
        fullName: data.fullName,
        gender: data.gender,
        teamId: data.teamId,
        teamName: data.teamName,
        registeredAt: data.registeredAt,
        whatsappNumber: data.whatsappNumber || '',
        username: data.username,
        status: data.status || 'Confirmed',
        position: data.position || 'Forward'
      });
    });
    
    return registrations;
  } catch (err) {
    console.error("Error fetching PFF registrations from Firestore:", err);
    return [];
  }
}

export async function deleteTeamRegistration(id: string): Promise<void> {
  await deleteDoc(doc(db, 'pff_team_registrations', id));
}

export async function saveFixture(fixture: Omit<MatchFixture, 'id'>): Promise<MatchFixture> {
  const docRef = await addDoc(collection(db, 'pff_fixtures'), fixture);
  return {
    id: docRef.id,
    ...fixture
  };
}

export async function fetchFixtures(): Promise<MatchFixture[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'pff_fixtures'));
    const fixtures: MatchFixture[] = [];
    
    querySnapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
      const data = docSnap.data();
      fixtures.push({
        id: docSnap.id,
        homeTeamId: data.homeTeamId,
        homeTeamName: data.homeTeamName,
        homeTeamLogo: data.homeTeamLogo,
        awayTeamId: data.awayTeamId,
        awayTeamName: data.awayTeamName,
        awayTeamLogo: data.awayTeamLogo,
        date: data.date,
        time: data.time,
        venue: data.venue,
        status: data.status,
        homeScore: data.homeScore,
        awayScore: data.awayScore,
        competition: data.competition,
        round: data.round,
        scorers: data.scorers || [],
        possession: data.possession,
        shots: data.shots,
        stadiumImage: data.stadiumImage
      });
    });
    
    return fixtures;
  } catch (err) {
    console.error("Error fetching PFF fixtures from Firestore:", err);
    return [];
  }
}

export async function updateFixtureResult(
  fixtureId: string, 
  homeScore: number, 
  awayScore: number, 
  status: 'Completed' | 'Live' | 'Upcoming' = 'Completed',
  scorers?: string[]
): Promise<void> {
  const docRef = doc(db, 'pff_fixtures', fixtureId);
  await updateDoc(docRef, {
    homeScore,
    awayScore,
    status,
    ...(scorers ? { scorers } : {})
  });
}

