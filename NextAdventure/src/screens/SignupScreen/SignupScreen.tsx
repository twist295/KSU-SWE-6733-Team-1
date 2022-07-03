import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { useState } from 'react'
import { 
  Alert, Button, TextInput, View } from 'react-native'

const SignupScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signup = async () => {
    if (email.length === 0 || password.length === 0) {
      Alert.alert('Error', 'All fields must not be empty')
      return
    }

    const auth = getAuth()
    try {
      const db = getFirestore();
      const user = await createUserWithEmailAndPassword(auth, email, password)
      await addDoc(collection(db, 'users'), {
        uid: user.user.uid
      })
    } catch (err) {
      if (err.message.includes('invalid-email')) {
        Alert.alert('Error', 'Email address is invalid')
        return
      }

      Alert.alert('Error', err)
    }
  }

  return (
    <View>
      <TextInput 
        onChange={({ nativeEvent }) => setEmail(nativeEvent.text)} 
        placeholder="Email" 
        value={email} />
      <TextInput 
        onChange={({ nativeEvent }) => setPassword(nativeEvent.text)} 
        placeholder="Password" 
        secureTextEntry 
        value={password} />
      <Button onPress={signup} title="Sign Up" />
    </View>
  )
}

export default SignupScreen;
