import { User } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { 
  Image, StyleSheet, Text, View 
} from 'react-native'
import { Directions, TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { 
  getPotentialMatches, getOtherUser, getUser 
} from '../../utils/Firebase'
import type { Profile } from '../../utils/Type'

const styles = StyleSheet.create({
  pfp: {
  }
})

const MatchScreen = () => {
  const [potentialMatches, setPotentialMatches] = useState<Profile[]>([])
  const [cursor, setCursor] = useState(0)
  const [otherUser, setOtherUser] = useState<User | null>(null)

  useEffect(() => {
    getPotentialMatches()
      .then((profiles) => {
        const currentUserUid = getUser()!.uid

        // This chain can be extended to support other criteria based on profile
        const otherProfiles = Object.keys(profiles)
          .filter(uid => uid !== currentUserUid)
          .map(uid => ({ uid, ...profiles[uid] }))

        setPotentialMatches(otherProfiles)
      })
      .catch(console.log)
  }, [])

  useEffect(() => {
    if (!potentialMatches || !potentialMatches[cursor]) {
      return
    }

    getOtherUser(potentialMatches[cursor].uid!).then(console.log).catch(console.log)
  }, [cursor, potentialMatches])

  const renderActions = (direction: Directions) => {
    return (
      <TouchableOpacity>
        <Text>{direction === Directions.LEFT ? 'MATCH' : 'PASS'}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      {potentialMatches[cursor] ? (
        <Swipeable
          renderLeftActions={() => renderActions(Directions.LEFT)}
          renderRightActions={() => renderActions(Directions.RIGHT)}>
          <Image
            // source={{ uri: pictureUrl }}
            style={styles.pfp} />
          <Text>{potentialMatches[cursor].firstName}</Text>
        </Swipeable>
      ) : <></> }
    </View>
  )
}

export default MatchScreen;