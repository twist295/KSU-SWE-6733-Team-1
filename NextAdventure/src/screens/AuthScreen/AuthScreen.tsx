import {
  FC,
  useState 
} from 'react'
import {
  Button, 
  Pressable,
  StyleSheet,
  Text,
  TextInput, 
  View 
} from 'react-native'
import { Props } from './AuthScreen.type'
import { sendPWResetEmail, signIn } from '../../utils/Firebase'

const AuthScreen: FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isResettingPW, setIsResettingPW] = useState(false)

  const onLogin = async () => {
    try {
      signIn(email, password)
    } catch (err) {
      console.log(err)
    }
  }

  const resetPW = async () => {
    try {
      sendPWResetEmail(email)
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
      {!isResettingPW && (
        <TextInput 
          onChange={({ nativeEvent }) => setPassword(nativeEvent.text)} 
          placeholder="Password" 
          secureTextEntry 
          testID="password-input"
          value={password} />
      )}
      <Pressable onPress={() => setIsResettingPW(!isResettingPW)} testID="forgot-pw-button">
        <Text>{isResettingPW ? 'Cancel' : 'Forgot Password' }</Text>
      </Pressable>
      { isResettingPW ? (
        <Button
          disabled={email.length === 0}
          onPress={resetPW}
          testID="reset-pw-button"
          title="Reset Password" />
      ) : (
        <>
          <Button 
            disabled={email.length === 0 || password.length === 0}
            onPress={onLogin} 
            testID="login-button"
            title="Login" />
          <Button
            onPress={() => navigation.navigate('Signup')}
            testID="signup-button"
            title="Sign Up" />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
})

export default AuthScreen;
