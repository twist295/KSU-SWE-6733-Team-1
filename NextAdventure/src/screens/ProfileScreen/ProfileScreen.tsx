import { getAuth, signOut } from 'firebase/auth';
import { 
  FC,
  useEffect,
  useState
} from 'react'
import {
  Button,
  FlatList,
  Image, 
  StyleSheet, 
  Text,
  TextInput,
  View 
} from 'react-native'
import { Props } from './ProfileScreen.type'
import ActivityModal from '../../components/ActivityModal/ActivityModal'
import {
  getProfile,
  setProfile
} from '../../utils/Firebase'

const ProfileScreen: FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [favoriteActivities, setFavoriteActivites] = useState([])
  const [isAddingActivity, setIsAddingActivity] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    getProfile()
      .then(profile => {
        console.log({ profile })
        if (!profile) {
          setIsEditing(true)
          return
        }

        setFirstName(profile.firstName)
        setLastName(profile.lastName)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    navigation.setOptions({ 
      headerLeft: () => isEditing ? (
        <Button color="red" title="Cancel" onPress={() => setIsEditing(false)}/>
      ) : <></>,
      headerRight: () => isEditing ? (
        <Button title="Save" onPress={() => save()} />
      ) : (
        <Button title="Edit" onPress={() => setIsEditing(true)}/>
      )
    })
  }, [isEditing])

  const save = async () => {
    try {
      await setProfile({ firstName, lastName, favoriteActivities })
      setIsEditing(false)
    } catch (err) {
      console.log(err)
    }
  }

  const signout = async () => {
    const auth = getAuth()
    await signOut(auth)
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: 'https://pbs.twimg.com/profile_images/914711826662936576/Rp5dIges_400x400.jpg' }}
          style={styles.pfp} />
        { isEditing ? (
          <TextInput 
            onChange={({ nativeEvent }) => setFirstName(nativeEvent.text)}
            placeholder="First Name" 
            value={firstName} />
        ) : <Text>{firstName}</Text> }
        { isEditing ? (
          <TextInput 
            onChange={({ nativeEvent }) => setLastName(nativeEvent.text)} 
            placeholder="Last Name" 
            value={lastName} />
        ) :  <Text>{lastName}</Text> }
        {/* { isEditing ? <TextInput placeholder="Location" /> :  <Text></Text> } */}
        <FlatList
          ListHeaderComponent={<Text>Favorite Activities</Text>} 
          ListFooterComponent={<Button title="Add New" onPress={() => setIsAddingActivity(true)}/> }/>
      </View>
      <View style={styles.signout}>
        <Button color="red" title="Sign Out" onPress={signout} />
      </View>
      <ActivityModal visible={isAddingActivity} onDismiss={() => setIsAddingActivity(false)}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  pfp: {
    alignSelf: 'center',
    borderRadius: 44,
    height: 88,
    width: 88
  },
  signout: {
    borderWidth: 1
  }
})

export default ProfileScreen;
