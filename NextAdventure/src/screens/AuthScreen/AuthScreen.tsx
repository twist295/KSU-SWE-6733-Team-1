import { useState } from 'react'
import {
  Button, 
  Pressable,
  StyleSheet,
  Text,
  TextInput, 
  View,
  Image
} from 'react-native'
import { Props } from './AuthScreen.type'
import {
  sendPWResetEmail,
  signIn
} from '../../utils/Firebase'

const AuthScreen = ({ navigation }: Props) => {
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
    <View style = {styles.container}>
      
      <View style = {styles.image}>
      <Image source={require('../../../assets/images.jpeg')}/>
      </View>

      <Text style = {styles.baseText}>Venture
      <Text style = {styles.innerText}>Match</Text>
      </Text>
      <Text style = {styles.smallText}>let's choose your match!</Text>
      
      <TextInput style = {styles.email_input}
        onChange={({ nativeEvent }) => setEmail(nativeEvent.text)} 
        placeholder="Email" 
        testID="email-input"
        value={email} />
      {!isResettingPW && (
        <TextInput style = {styles.password_input}
          onChange={({ nativeEvent }) => setPassword(nativeEvent.text)} 
          placeholder="Password" 
          secureTextEntry 
          testID="password-input"
          value={password} />
      )}
      <Pressable 
        onPress={() => setIsResettingPW(!isResettingPW)}
        testID="forgot-pw-button">
        <Text style={styles.forgot_passowrd}>{isResettingPW ? 'Cancel' : 'Forgot Password?' }</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#fbf9ed'
  },

  image: {
    marginHorizontal: 60,
    marginVertical: 30,
  },

  baseText: {
    fontFamily: 'Monoton',
    textAlign: 'center',
    fontSize: 30,
    color: '#004488',
    backgroundColor: '#fdfbf4',
  },

  innerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#EE3377',
    backgroundColor: '#fdfbf4',
  },

  smallText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#c00000',
    backgroundColor: '#fdfbf4',
    fontFamily: 'Ubuntu',
  },
  
  email_input: {
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderRadius: 6
  },

  password_input: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderRadius: 6
  },

  forgot_passowrd: {
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'ComingSoon' 
  }

})

export default AuthScreen;
