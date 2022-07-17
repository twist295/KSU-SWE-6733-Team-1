import { launchImageLibraryAsync } from 'expo-image-picker'
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
  TouchableOpacity,
  View
} from 'react-native'
import { Props } from './ProfileScreen.type'
import ActivityCell from '../../components/ActivityCell/ActivityCell'
import ActivityModal from '../../components/ActivityModal/ActivityModal'
import {
  getProfile,
  setProfile,
  signout,
  updateProfilePicture
} from '../../utils/Firebase'
import type { Profile } from '../../utils/Type'
import type { Activity } from '../../utils/Type'
import { browserPopupRedirectResolver } from 'firebase/auth'

const ProfileScreen: FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [favoriteActivities, setFavoriteActivites] = useState<Activity[]>([])
  const [isAddingActivity, setIsAddingActivity] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingActivity, setEditingActivity] = useState<number>(-1)
  const [pictureUrl, setPictureUrl] = useState<string | null>(null)
  const [hasUpdatedPFP, setHasUpdatedPFP] = useState(false)

  useEffect(() => {
    refreshProfile()
  }, [])

  const refreshProfile = () => {
    getProfile()
      .then(profile => {
        if (!profile) {
          setIsEditing(true)
          return
        }

        setFirstName(profile.firstName)
        setLastName(profile.lastName)
        setFavoriteActivites(profile.favoriteActivities)
        if (profile.photoURL) {
          setPictureUrl(profile.photoURL)
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => isEditing ? (
        <Button
          color="red"
          title="Cancel"
          onPress={() => setIsEditing(false)} />
      ) : <></>,
      headerRight: () => isEditing ? (
        <Button
          title="Save"
          onPress={() => save()} />
      ) : (
        <Button title="Edit" onPress={() => setIsEditing(true)} />
      )
    })
  }, [isEditing])

  const addActivity = (activity: Activity) => {
    setFavoriteActivites([...favoriteActivities, activity])
    setIsAddingActivity(false)
  }

  const updateActivity = (activity: Activity) => {
    const updatedFavoriteActivities = [...favoriteActivities]
    updatedFavoriteActivities[editingActivity] = activity
    setFavoriteActivites(updatedFavoriteActivities)
    setEditingActivity(-1)
  }

  const save = async () => {
    try {
      let photoURL = pictureUrl
      if (hasUpdatedPFP && pictureUrl) {
        photoURL = await updateProfilePicture(pictureUrl)
      }

      const profile: Profile = { firstName, lastName, favoriteActivities }
      if (photoURL) {
        profile.photoURL = photoURL
      }

      await setProfile(profile)
      refreshProfile()
      setIsEditing(false)
      setHasUpdatedPFP(false)
    } catch (err) {
      console.log(err)
    }
  }

  const renderActivity = (activity: Activity, index: number) => {
    const accessory = isEditing ? (
      <View style={styles.editActivityButton}>
        <Button onPress={() => setEditingActivity(index)} title="Edit" />
      </View>
    ) : null

    return (
      <ActivityCell activity={activity} accessory={accessory} />
    )
  }

  const renderProfilePicture = () => {
    if (!pictureUrl) {
      return <TouchableOpacity disabled={!isEditing} onPress={pickImage} style={styles.emptyPfp} />
    }

    return (
      <TouchableOpacity disabled={!isEditing} onPress={pickImage}>
        <Image
          source={{ uri: pictureUrl }}
          style={styles.pfp} />
      </TouchableOpacity>
    )
  }

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({})
    if (result.cancelled) {
      return
    }

    setPictureUrl(result.uri)
    setHasUpdatedPFP(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>{renderProfilePicture()}</View>
      <View>
        <Text style={styles.name1}>Profile</Text>
        <View style={styles.name}>
          <Text>Name: </Text>
          {isEditing ? (
            <TextInput
              onChange={({ nativeEvent }) => setFirstName(nativeEvent.text)}
              placeholder="First Name"
              style={styles.nameInput}
              value={firstName} />
          ) : <Text>{firstName}</Text>}
          {isEditing ? (
            <TextInput
              onChange={({ nativeEvent }) => setLastName(nativeEvent.text)}
              placeholder="Last Name"
              style={styles.nameInput}
              value={lastName} />
          ) : <Text>{lastName}</Text>}
        </View>
        {/* { isEditing ? <TextInput placeholder="Location" /> :  <Text></Text> } */}
        <FlatList
          ListHeaderComponent={<Text style={styles.name}>Favorite Activities</Text>}
          ListFooterComponent={isEditing ? (<Button title="Add New" onPress={() => setIsAddingActivity(true)} />) : null}
          data={favoriteActivities}
          renderItem={({ item, index }) => renderActivity(item, index)}
          style={styles.favoriteActivities} />
      </View>
      <View style={styles.signout}>
        <Button color="red" title="Sign Out" onPress={signout} />
      </View>
      <ActivityModal
        onConfirm={addActivity}
        onDismiss={() => setIsAddingActivity(false)}
        visible={isAddingActivity} />
      <ActivityModal
        activity={editingActivity !== -1 ? favoriteActivities[editingActivity] : null}
        onConfirm={updateActivity}
        onDismiss={() => setEditingActivity(-1)}
        visible={editingActivity != -1} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },

  header: {
    fontSize: 24,
    backgroundColor: "purple",
    height: 200,
  },
  pfp: {
    marginTop: 120,
    alignSelf: 'center',
    borderRadius: 50,
    height: 120,
    width: 120,
    borderColor: 'yellow',
    borderWidth: 4,
    marginBottom: 10,
    position: 'absolute'
  },
  editActivityButton: {
    justifyContent: 'center',
    marginRight: 10,
  },
  emptyPfp: {
    marginTop: 150,
    alignSelf: 'center',
    borderRadius: 60,
    height: 120,
    width: 120,
    borderColor: 'yellow',
    borderWidth: 4,
    backgroundColor: "gray",
    position: 'absolute'
  },

  name1: {
    flexDirection: 'row',
    fontSize: 25,
    fontWeight: "600",
    marginTop: 100
  },
  favoriteActivities: {
    marginTop: 20,
    marginBottom: 20,
    border: 10,

  },

  name: {
    flexDirection: 'row',
    fontSize: 25,
    fontWeight: "600",
    marginTop: 10

  },
  nameInput: {
    borderBottomWidth: 1,
    flexGrow: 1,
    marginHorizontal: 8
  },

  signout: {
    borderWidth: 1

  }
})

export default ProfileScreen;
