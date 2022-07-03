import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { Button, TextInput, View } from 'react-native'

const SignupScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signup = async () => {
    const auth = getAuth()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.log(err)
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
