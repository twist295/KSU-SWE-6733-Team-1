import { getAuth, signOut } from 'firebase/auth';
import { 
  FC, useEffect, useState } from 'react'
import {
  Button,
  Image, 
  StyleSheet, Text,
  TextInput,
  View 
} from 'react-native'
import { Props } from './ProfileScreen.type'
import {
  getProfile, setProfile } from '../../utils/Firebase'

const ProfileScreen: FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    getProfile()
      .then(profile => {
        console.log({ profile })
        if (!profile) {
          setIsEditing(true)
          return
        }
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    navigation.setOptions({ 
      headerLeft: () => isEditing ? <Button color="red" title="Cancel" onPress={() => setIsEditing(false)}/> : <></>,
      headerRight: () => isEditing ? (
        <Button title="Save" onPress={() => save()} />
      ) : (
        <Button title="Edit" onPress={() => setIsEditing(true)}/>
      )
    })
  }, [isEditing])

  const save = async () => {
    setProfile({ firstName, lastName })
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
          <TextInput placeholder="First Name" value={firstName} onChange={({ nativeEvent }) => setFirstName(nativeEvent.text)} />
        ) :  <Text>{firstName}</Text> }
        { isEditing ? <TextInput placeholder="Last Name" value={lastName} /> :  <Text></Text> }
        {/* { isEditing ? <TextInput placeholder="Location" /> :  <Text></Text> } */}
      </View>
      <View style={styles.signout}>
        <Button color="red" title="Sign Out" onPress={signout} />
      </View>
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
