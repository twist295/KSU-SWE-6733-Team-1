import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore'
import { 
  getDownloadURL, 
  getStorage, 
  ref, 
  uploadBytes 
} from 'firebase/storage'
import type { Message, Profile } from './Type'

export type ProfilesResults = { [key: string]: Profile }

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

/**
 * 
 * @param email 
 */
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

/**
 * 
 * @param profile 
 */
export const setProfile = async (profile: Profile) => {
  const auth = getAuth()
  const db = getFirestore();

  const body: Profile = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    favoriteActivities: profile.favoriteActivities,
  }
  
  if (profile.photoURL) {
    body.photoURL = profile.photoURL
  }
  
  return await setDoc(doc(db, 'profiles', auth.currentUser!.uid), body)
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

/**
 * 
 * @param uri 
 */
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

  const storage = getStorage()
  const imageRef = ref(storage, `images/${getUser()!.uid}`);
  await uploadBytes(imageRef, blob)

  blob.close()

  const url = await getDownloadURL(imageRef)
  return url
}

export const getProfiles = async (): Promise<ProfilesResults> => {
  const db = getFirestore();

  const q = query(collection(db, 'profiles'))
  const querySnapshot = await getDocs(q);
  const results = <ProfilesResults>{}
  querySnapshot.forEach((doc) => {
    results[doc.id] = { 
      ...doc.data() as Profile, 
      uid: doc.id 
    }
  })

  return Promise.resolve(results)
}

/**
 * 
 * @param uid 
 */
export const saveMatch = async (uid: string) => {
  const auth = getAuth()
  const db = getFirestore()

  const existingMatches = await getDoc(doc(db, 'matches', auth.currentUser!.uid))
  let matches: string[]
  if (existingMatches.exists()) {
    matches = existingMatches.data().matches
    matches.push(uid)
  } else {
    matches = [uid]
  }

  return await setDoc(doc(db, 'matches', auth.currentUser!.uid), { matches })
}

export const getMatches = async (): Promise<string[]> => {
  const auth = getAuth()
  const db = getFirestore()

  if (!auth.currentUser) {
    return []
  }

  const q = query(collection(db, 'matches'))
  const querySnapshot = await getDocs(q)

  type Matches = {
    matches: string[]
  }

  type Results = { [key: string]: string[] }
  const results = <Results>{}
  
  querySnapshot.forEach((doc) => {
    const { matches } = doc.data() as Matches
    results[doc.id] = matches
  })

  // find all mutual matches for the current user  
  return results[auth.currentUser!.uid].filter(uid => {
    return results[uid] && results[uid].includes(auth.currentUser!.uid)
  })
}

/**
 * 
 * @param uid 
 */
export const getMessages = async (uid: string) => {
  const auth = getAuth()
  const db = getFirestore()

  const ref = collection(db, 'messages')

  // get the messages sent by the current user to the target user
  const senderQ = query(ref, where('sender', '==', auth.currentUser!.uid), where('recipient', '==', uid))
  const senderQSnapshot = await getDocs(senderQ)

  const messages: Message[] = []

  senderQSnapshot.forEach((doc) => {
    const message = doc.data() as Message
    messages.push(message)
  })

  const recipientQ = query(ref, where('sender', '==', uid), where('recipient', '==', auth.currentUser!.uid))
  const recipientQSnapshot = await getDocs(recipientQ)

  recipientQSnapshot.forEach((doc) => {
    const message = doc.data() as Message
    messages.push(message)
  })

  // sort messages by timestamp
  messages.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)

  return messages
}

/**
 * 
 * @param uid 
 * @param message 
 */
export const sendMessage = async (uid: string, body: string) => {
  const auth = getAuth()
  const db = getFirestore()

  const timestamp = Timestamp.fromDate(new Date(Date.now()))
  return await addDoc(collection(db, 'messages'), {
    sender: auth.currentUser!.uid,
    recipient: uid,
    timestamp,
    body
  })
}
