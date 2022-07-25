import { launchImageLibraryAsync } from 'expo-image-picker'
import {
  getCurrentPositionAsync, getForegroundPermissionsAsync, requestForegroundPermissionsAsync } from 'expo-location';
import {
  useEffect,
  useState
} from 'react'
import {
  Button,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { Props } from './ProfileScreen.type'
import ActivityCell from '../../components/ActivityCell/ActivityCell'
import ActivityModal from '../../components/ActivityModal/ActivityModal'
import InstagramModal from '../../components/InstagramModal/InstagramModal'
import {
  deleteProfile,
  getProfile,
  getSocials,
  setProfile,
  signout,
  updateProfilePicture,
  updateSocials
} from '../../utils/Firebase'
import { getLocation } from '../../utils/Location'
import type { Activity, Profile, Social } from '../../utils/Type'
import { GeoPoint } from 'firebase/firestore';

const ProfileScreen = ({ navigation }: Props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [favoriteActivities, setFavoriteActivites] = useState<Activity[]>([])
  const [isAddingActivity, setIsAddingActivity] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingActivity, setEditingActivity] = useState<number>(-1)
  const [pictureUrl, setPictureUrl] = useState<string | null>(null)
  const [socials, setSocials] = useState<Social[]>([])
  const [hasUpdatedPFP, setHasUpdatedPFP] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showInstagramModal, setShowInstagramModal] = useState(false)
  const [isNewProfile, setIsNewProfile] = useState(false)
  const [location, setLocation] = useState<GeoPoint | null>(null)
  const [address, setAddress] = useState<string | null>(null)

  const refreshProfile = () => {
    setLoading(true)
    
    getSocials()
      .then((res) => {
        if (res && res.socials.length > 0) {
          setSocials(res.socials)
        }
      })
      .catch(console.log)

    return getProfile()
      .then(profile => {
        if (!profile) {
          setIsNewProfile(true)
          setIsEditing(true)
          return
        }

        setIsNewProfile(false)
        setFirstName(profile.firstName)
        setLastName(profile.lastName)
        setFavoriteActivites(profile.favoriteActivities)
        if (profile.location) {
          setLocation(profile.location)
        }
        if (profile.photoURL) {
          setPictureUrl(profile.photoURL)
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    refreshProfile()
  }, [])

  useEffect(() => {
    if (isSaving) {
      save()
    }
  }, [isSaving])

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
          onPress={() => setIsSaving(true)} />
      ) : (
        <Button title="Edit" onPress={() => setIsEditing(true)} />
      )
    })
  }, [isEditing])

  const addActivity = (activity: Activity) => {
    setFavoriteActivites([...favoriteActivities, activity])
  }

  useEffect(() => {
    setIsAddingActivity(false)
    setEditingActivity(-1)
    setLoading(false)
  }, [favoriteActivities])

  const deleteActivity = (activity: Activity) => {
    const updatedFavoriteActivities = [...favoriteActivities]
    const index = updatedFavoriteActivities.findIndex(
      (_activity) => _activity.type === activity.type
    )
    if (index > -1) {
      updatedFavoriteActivities.splice(index, 1)
    }
    setFavoriteActivites(updatedFavoriteActivities)
  }

  const updateActivity = (activity: Activity) => {
    const updatedFavoriteActivities = [...favoriteActivities]
    updatedFavoriteActivities[editingActivity] = activity
    setFavoriteActivites(updatedFavoriteActivities)
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
      if (location) {
        profile.location = location
      }

      await setProfile(profile)
      await updateSocials(socials)
      setIsNewProfile(false)
      setIsEditing(false)
      setHasUpdatedPFP(false)
    } catch (err) {
      console.log(err)
    } finally {
      setIsSaving(false)
    }
  }

  const renderActivity = (activity: Activity, index: number) => {
    const accessory = isEditing ? (
      <View style={styles.editActivityButton}>
        <Button
          onPress={() => setEditingActivity(index)} title="Edit" />
      </View>
    ) : null

    return (
      <ActivityCell activity={activity} accessory={accessory} />
    )
  }

  const renderProfilePicture = () => {
    return pictureUrl ? (
      <TouchableOpacity disabled={!isEditing} onPress={pickImage}>
        <Image
          source={{ uri: pictureUrl }}
          style={styles.pfp} testID="profile-image"/>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        disabled={!isEditing}
        onPress={pickImage}
        style={styles.emptyPfp}
        testID="empty-pfp-button"/>
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

  const resetProfile = async () => {
    try {
      await deleteProfile()
      await refreshProfile()
    } catch (e) {
      console.log(e)
    }
  }

  const setInstagram = (social: Social) => {
    setSocials([social])
    setShowInstagramModal(false)
  }

  useEffect(() => {
    if (location) {
      getLocation(location)
        .then(address => {
          if (address) {
            setAddress(address)
          }
        })
        .catch(console.log)
    }
  }, [location])

  const syncLocation = async () => {
    const permissions = await getForegroundPermissionsAsync()
    if (!permissions.granted) {
      const { status } = await requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        return
      }
    }

    const location = await getCurrentPositionAsync()
    setLocation(new GeoPoint(location.coords.latitude, location.coords.longitude))
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.background}/>
      <View style={styles.header}>
        {renderProfilePicture()}
        </View>
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
        {socials.map(social => (
          <TouchableOpacity
            key={social.site}
            onPress={() => Linking.openURL(`https://instagram.com/${social.username}`)}>
            <Text testID="social-text">
              {`${social.site}: ${social.username}`}</Text>
          </TouchableOpacity>
        ))}
        { address && <Text testID="location-text">{`Location: ${address}`}</Text> }
        { isEditing && (
          <Button
            onPress={syncLocation} title="Sync Location"/>
        ) }
        {isEditing && socials.length === 0 && (
          <Button
            onPress={() => setShowInstagramModal(true)}
            title="Connect Instagram"/>
        )}
        <FlatList
          ListHeaderComponent={<Text style={styles.name}>Favorite Activities</Text>} 
          ListFooterComponent={isEditing ? (
            <Button title="Add New" onPress={() => setIsAddingActivity(true)}/>
          ) : null }
          data={favoriteActivities}
          onRefresh={refreshProfile}
          refreshing={loading}
          renderItem={({ item, index }) => renderActivity(item, index)} 
          scrollEnabled={false}
          style={styles.favoriteActivities}/>
      </View>
      <View style={styles.danger}>
        <Button
          color="red"
          title="Sign Out" onPress={signout} testID="signout-button"/>
      </View>
      {!isNewProfile && (
        <View style={styles.danger}>
          <Button 
            color="red"
            title="Delete Profile"
            onPress={resetProfile}
            testID="delete-profile-button"/>
        </View>
      )}
      <ActivityModal
        onConfirm={addActivity}
        onDismiss={() => setIsAddingActivity(false)}
        visible={isAddingActivity} />
      <ActivityModal
        activity={editingActivity !== -1 ? favoriteActivities[editingActivity] : null}
        onConfirm={updateActivity}
        onDelete={deleteActivity}
        onDismiss={() => setEditingActivity(-1)}
        visible={editingActivity != -1} />
      <InstagramModal
        onConfirm={setInstagram}
        onDismiss={() => setShowInstagramModal(false)}
        visible={showInstagramModal}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    backgroundColor: "purple",
    height: 200,
    position: 'absolute',
    width: '100%',
  },
  header: {
    marginTop: 120
  },
  pfp: {
    alignSelf: 'center',
    borderRadius: 50,
    height: 120,
    width: 120,
    borderColor: 'yellow',
    borderWidth: 4,
    marginBottom: 10,
  },
  editActivityButton: {
    justifyContent: 'center',
    marginRight: 10,
  },
  emptyPfp: {
    alignSelf: 'center',
    borderRadius: 60,
    height: 120,
    width: 120,
    borderColor: 'yellow',
    borderWidth: 4,
    backgroundColor: "gray",
  },
  name1: {
    flexDirection: 'row',
    fontSize: 25,
    fontWeight: "600",
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
  danger: {
    borderRadius: 8,
    borderWidth: 1,
    margin: 8
  }
})

export default ProfileScreen;
