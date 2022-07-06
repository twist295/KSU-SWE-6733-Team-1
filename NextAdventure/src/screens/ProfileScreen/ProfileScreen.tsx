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
import { Attitude, SkillLevel, getEnumKeys } from '../../utils/Type'
import type { Activity } from '../../utils/Type'

const ProfileScreen: FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [favoriteActivities, setFavoriteActivites] = useState<Activity[]>([])
  const [isAddingActivity, setIsAddingActivity] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)

  useEffect(() => {
    getProfile()
      .then(profile => {
        if (!profile) {
          setIsEditing(true)
          return
        }

        setFirstName(profile.firstName)
        setLastName(profile.lastName)
        setFavoriteActivites(profile.favoriteActivities)
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

  const addActivity = (activity: Activity) => {
    setFavoriteActivites([...favoriteActivities, activity])
    setIsAddingActivity(false)
  }

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

  const renderActivity = (activity: Activity) => {
    return (
      <View style={styles.activityCell}>
        <View>
          <Text style={styles.activityTitle}>{activity.type}</Text>
          <Text>{`Skill Level: ${getEnumKeys(SkillLevel)[activity.skillLevel]}`}</Text>
          <Text>{`Attitude: ${getEnumKeys(Attitude)[activity.attitude]}`}</Text>
        </View>
        {isEditing && (
          <View style={styles.editActivityButton}><Button onPress={() => setEditingActivity(activity)} title="Edit"/></View>
        )}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: 'https://pbs.twimg.com/profile_images/914711826662936576/Rp5dIges_400x400.jpg' }}
          style={styles.pfp} />
        <Text style={styles.header}>Personal Info</Text>
        <View style={styles.name}>
          <Text>Name: </Text>
          { isEditing ? (
            <TextInput 
              onChange={({ nativeEvent }) => setFirstName(nativeEvent.text)}
              placeholder="First Name"
              style={styles.nameInput}
              value={firstName} />
          ) : <Text>{firstName}</Text> }
          { isEditing ? (
            <TextInput
              onChange={({ nativeEvent }) => setLastName(nativeEvent.text)} 
              placeholder="Last Name" 
              style={styles.nameInput}
              value={lastName} />
          ) :  <Text>{lastName}</Text> }
        </View>
        {/* { isEditing ? <TextInput placeholder="Location" /> :  <Text></Text> } */}
        <FlatList
          ListHeaderComponent={<Text style={styles.header}>Favorite Activities</Text>} 
          ListFooterComponent={isEditing ? (<Button title="Add New" onPress={() => setIsAddingActivity(true)}/>) : null }
          data={favoriteActivities}
          renderItem={({ item }) => renderActivity(item)} 
          style={styles.favoriteActivities}/>
      </View>
      <View style={styles.signout}>
        <Button color="red" title="Sign Out" onPress={signout} />
      </View>
      <ActivityModal
        onConfirm={addActivity}
        onDismiss={() => setIsAddingActivity(false)}
        visible={isAddingActivity}/>
    </View>
  )
}

const styles = StyleSheet.create({
  activityCell: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  activityTitle: {
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  editActivityButton: {
    justifyContent: 'center'
  },
  favoriteActivities: {
    marginTop: 16
  },
  header: {
    fontSize: 24
  },
  name: {
    flexDirection: 'row'
  },
  nameInput: {
    borderBottomWidth: 1,
    flexGrow: 1,
    marginHorizontal: 8
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
