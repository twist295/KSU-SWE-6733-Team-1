import { useState } from 'react'
import { 
  Alert, 
  Button, 
  StyleSheet,
  TextInput, 
  View 
} from 'react-native'
import { createUser } from '../../utils/Firebase'

const styles = StyleSheet.create({
})

const SignupScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signup = async () => {
    try {
      createUser(email, password)
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
        testID="email-input"
        value={email} />
      <TextInput 
        onChange={({ nativeEvent }) => setPassword(nativeEvent.text)} 
        placeholder="Password" 
        secureTextEntry
        testID="password-input"
        value={password} />
      <Button
        disabled={email.length === 0 || password.length === 0}
        onPress={signup}
        testID="signup-button"
        title="Sign Up" />
    </View>
  )
}

export default SignupScreen;
