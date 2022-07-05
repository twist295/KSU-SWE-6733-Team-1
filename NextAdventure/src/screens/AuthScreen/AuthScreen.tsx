import {
  FC,
  useState 
} from 'react'
import {
  Button, 
  StyleSheet, 
  TextInput, 
  View 
} from 'react-native'
import { Props } from './AuthScreen.type'
import { signIn } from '../../utils/Firebase'

const AuthScreen: FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async () => {
    try {
      signIn(email, password)
    } catch (err) {
      console.log(err)
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
        onPress={onLogin} 
        testID="login-button"
        title="Login" />
      <Button
        onPress={() => navigation.navigate('Signup')}
        testID="signup-button"
        title="Sign Up" />
    </View>
  )
}

const styles = StyleSheet.create({
})

export default AuthScreen;
