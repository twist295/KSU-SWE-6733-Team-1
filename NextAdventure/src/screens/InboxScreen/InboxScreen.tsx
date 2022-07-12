import { useEffect, useState } from 'react'
import { 
  FlatList, 
  Image, 
  StyleSheet, 
  Text,
  TouchableOpacity,
  View 
} from 'react-native'
import { Props } from './InboxScreen.type'
import { getMatches, getProfiles } from '../../utils/Firebase'
import type { Profile } from '../../utils/Type'

const styles = StyleSheet.create({
  cell: {
    flexDirection: 'row'
  },
  name: {},
  pfp: {
    borderRadius: 44,
    height: 88,
    width: 88
  },
})

const InboxScreen = ({ navigation }: Props) => {
  const [matches, setMatches] = useState<Profile[]>([])

  useEffect(() => {
    Promise.all([getMatches(), getProfiles()])
      .then(([_matches, profiles]) => {
        const mutualMatchProfiles = [] as Profile[]
        _matches.forEach(uid => {
          if (profiles[uid]) {
            mutualMatchProfiles.push(profiles[uid])
          }
        })

        setMatches(mutualMatchProfiles)
      })
      .catch(console.log)
  }, [])

  console.log({ matches })

  const renderProfile = (profile: Profile) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push('Chat', { profile })} 
        style={styles.cell}>
        <Image source={{ uri: profile.photoURL }} style={styles.pfp} />
        <View>
          <Text>{profile.firstName}</Text>
          <Text>MESSAGE BODY</Text>
          <Text>TIMESTAMP</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <FlatList data={matches} renderItem={({ item }) => renderProfile(item)} />
    </View>
  )
}

export default InboxScreen;
