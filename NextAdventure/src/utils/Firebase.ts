import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from 'firebase/auth'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore'
import type { Activity } from './Type'

type Profile = {
  firstName: string
  lastName: string
  // location: string
  favoriteActivities: Activity[]
}

/**
 * 
 * @param email 
 * @param password 
 */
export const createUser = async (email: string, password: string) => {
  const auth = getAuth()
  const db = getFirestore();
  const user = await createUserWithEmailAndPassword(auth, email, password)
  await addDoc(collection(db, 'users'), {
    uid: user.user.uid
  })
}

export const sendPWResetEmail = async (email: string) => {
  const auth = getAuth()
  await sendPasswordResetEmail(auth, email)
}

/**
 * 
 * @param email 
 * @param password 
 */
export const signIn = async (email: string, password: string) => {
  const auth = getAuth()
  await signInWithEmailAndPassword(auth, email, password)
}

export const setProfile = async (profile: Profile) => {
  const auth = getAuth()
  const db = getFirestore();

  return await setDoc(doc(db, 'profiles', auth.currentUser!.uid), {
    firstName: profile.firstName,
    lastName: profile.lastName,
    // location: profile.location
    favoriteActivities: profile.favoriteActivities
  })
}

export const getProfile = async (): Promise<Profile | null> => {
  const auth = getAuth()
  const db = getFirestore();

  const profile = await getDoc(doc(db, 'profiles', auth.currentUser!.uid))
  if (profile.exists()) {
    return Promise.resolve(profile.data() as Profile)
  } else {
    return Promise.resolve(null)
  }
}
