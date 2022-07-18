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
import {
  getLatestMessageForThreads,
  getMatches,
  getProfiles
} from '../../utils/Firebase'
import type { Message, Profile } from '../../utils/Type'

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
  const [loading, setLoading] = useState(false)
  const [matches, setMatches] = useState<Profile[]>([])
  const [latestMessages, setLatestMessages] = useState<{ [key: string]: Message | null }>({})
  
  const getInbox = async () => {
    setLoading(true)
    return Promise.all([getMatches(), getProfiles()])
      .then(async ([_matches, profiles]) => {
        const mutualMatchProfiles = [] as Profile[]
        _matches.forEach(uid => {
          if (profiles[uid]) {
            mutualMatchProfiles.push(profiles[uid])
          }
        })

        setMatches(mutualMatchProfiles)
      })
      .catch(console.log)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getInbox()
  }, [])

  useEffect(() => {
    const uids = matches.map((match) => match.uid!)
    getLatestMessageForThreads(uids)
  }, [matches])

  const renderProfile = (profile: Profile) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push('Chat', { profile })} 
        style={styles.cell}
        testID="chat-cell">
        <Image source={{ uri: profile.photoURL }} style={styles.pfp} />
        <View>
          <Text>{profile.firstName}</Text>
          <Text>{latestMessages[profile.uid!]?.body}</Text>
          <Text>{latestMessages[profile.uid!]?.timestamp.toString()}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      data={matches}
      refreshing={loading}
      onRefresh={getInbox}
      renderItem={({ item }) => renderProfile(item)}
      testID="list" />
  )
}

export default InboxScreen;
