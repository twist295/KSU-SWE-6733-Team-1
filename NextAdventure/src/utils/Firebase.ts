import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import {
  addDoc,
  collection,
  getFirestore
} from 'firebase/firestore'

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

export const signIn = async (email: string, password: string) => {
  const auth = getAuth()
  await signInWithEmailAndPassword(auth, email, password)
}
