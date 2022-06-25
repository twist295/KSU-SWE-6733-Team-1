import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { 
  Button, StyleSheet, TextInput, View 
} from 'react-native'

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async () => {
    const auth = getAuth()
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" />
      <Button onPress={onLogin} title="Login" />
      <Button onPress={() => navigation.navigate('Signup')} title="Sign Up" />
    </View>
  )
}

const styles = StyleSheet.create({
})

export default AuthScreen;
