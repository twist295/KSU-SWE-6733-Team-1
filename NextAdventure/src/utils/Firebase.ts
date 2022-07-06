import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
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

export const signout = async () => {
  const auth = getAuth()
  await signOut(auth)
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

export const getUser = () => {
  const auth = getAuth()
  return auth.currentUser
}

export const updateProfilePicture = async (uri: string) => {
  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  console.log({ blob })

  const storage = getStorage()
  const imageRef = ref(storage, `images/${getUser()!.uid}`);
  await uploadBytes(imageRef, blob)

  blob.close()

  const auth = getAuth()
  const url = await getDownloadURL(imageRef)

  return await updateProfile(auth.currentUser!, { photoURL: url })
}