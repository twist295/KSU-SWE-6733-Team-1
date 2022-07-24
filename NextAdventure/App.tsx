import { useFonts } from 'expo-font'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {
  useEffect,
  useState
} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { 
  MatchStackParamList,
  ProfileStackParamList,
  SocialStackParamList, 
  StackParamList,
  TabParamList
} from './App.type'
import AuthScreen from './src/screens/AuthScreen/AuthScreen'
import ChatScreen from './src/screens/ChatScreen/ChatScreen'
import InboxScreen from './src/screens/InboxScreen/InboxScreen'
import MatchScreen from './src/screens/MatchScreen/MatchScreen'
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen'
import SignupScreen from './src/screens/SignupScreen/SignupScreen'

const MatchStack = createNativeStackNavigator<MatchStackParamList>()
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>()
const Tab = createBottomTabNavigator<TabParamList>()
const Stack = createNativeStackNavigator<StackParamList>()
const SocialStack = createNativeStackNavigator<SocialStackParamList>()

export default function App() {
  const [signedIn, setSignedIn] = useState(false);

  useFonts({
    'Monoton': require('./assets/fonts/Monoton-Regular.ttf'),
    'ComingSoon': require('./assets/fonts/ComingSoon-Regular.ttf'),
    'Dancing': require('./assets/fonts/DancingScript-Regular.ttf'),
    'Ubuntu': require('./assets/fonts/Ubuntu-Regular.ttf'),
    'DancingBold': require('./assets/fonts/DancingScript-Bold.ttf'),
    'Anton': require('./assets/fonts/Anton-Regular.ttf'),
    'Prata': require('./assets/fonts/Prata-Regular.ttf'),
    'Cormorant': require('./assets/fonts/CormorantSC-Bold.ttf'),
    'Lobster': require('./assets/fonts/Lobster-Regular.ttf'),
    'Righteous': require('./assets/fonts/Righteous-Regular.ttf'),
    'AlfaSlabOne': require('./assets/fonts/AlfaSlabOne-Regular.ttf'),
    'AbrilFatface': require('./assets/fonts/AbrilFatface-Regular.ttf'),
  })

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

  const SocialStackScreen = () => (
    <SocialStack.Navigator>
      <SocialStack.Screen name="Inbox" component={InboxScreen} />
      <SocialStack.Screen name="Chat" component={ChatScreen} />
    </SocialStack.Navigator>
  )

  const MatchStackScreen = () => (
    <MatchStack.Navigator>
      <MatchStack.Screen name="Match" component={MatchScreen}/>
    </MatchStack.Navigator>
  )

  const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  )

  return (
    <NavigationContainer>
      {signedIn ? (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="SocialStack" component={SocialStackScreen}  />
          <Tab.Screen name="MatchStack" component={MatchStackScreen} />
          <Tab.Screen name="ProfileStack" component={ProfileStackScreen} />
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
