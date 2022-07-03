import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { FC, useState } from 'react'
import { 
  Button, StyleSheet, TextInput, View 
} from 'react-native'
import { Props } from './AuthScreen.type'

const AuthScreen: FC<Props> = ({ navigation }) => {
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
      <TextInput 
        onChange={({ nativeEvent }) => setEmail(nativeEvent.text)} 
        placeholder="Email" 
        value={email} />
      <TextInput 
        onChange={({ nativeEvent }) => setPassword(nativeEvent.text)} 
        placeholder="Password" 
        secureTextEntry 
        value={password} />
      <Button onPress={onLogin} title="Login" />
      <Button onPress={() => navigation.navigate('Signup')} testID="signup-button" title="Sign Up" />
    </View>
  )
}

const styles = StyleSheet.create({
})

export default AuthScreen;
