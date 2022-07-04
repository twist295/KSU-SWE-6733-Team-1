import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {
  useEffect,
  useState
} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackParamList, TabParamList } from './App.type'
import AuthScreen from './src/screens/AuthScreen/AuthScreen'
import InboxScreen from './src/screens/InboxScreen/InboxScreen'
import MatchScreen from './src/screens/MatchScreen/MatchScreen'
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen'
import SignupScreen from './src/screens/SignupScreen/SignupScreen'

const Tab = createBottomTabNavigator<TabParamList>()
const Stack = createNativeStackNavigator<StackParamList>()

export default function App() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    initializeApp({
      apiKey: "AIzaSyBKEi96xXCM9xRZbOPExFWhOMH3VpEgnxY",
      authDomain: "nextadventure-efe1f.firebaseapp.com",
      projectId: "nextadventure-efe1f",
      storageBucket: "nextadventure-efe1f.appspot.com",
      messagingSenderId: "356964455987",
      appId: "1:356964455987:web:23783f3f031a29b1aab546"
    })

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      setSignedIn(!!user)
    })
  }, [])

  return (
    <NavigationContainer>
      {signedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Inbox" component={InboxScreen} />
          <Tab.Screen name="Match" component={MatchScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
