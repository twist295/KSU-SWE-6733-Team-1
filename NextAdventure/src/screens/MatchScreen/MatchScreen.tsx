import { useEffect, useState } from 'react'
import { 
  Image, StyleSheet, Text, TouchableOpacity, View 
} from 'react-native'
import { Directions } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { 
  getPotentialMatches, getUser 
} from '../../utils/Firebase'
import type { Profile } from '../../utils/Type'

const styles = StyleSheet.create({
  pfp: {
    height: '75%',
    width: '100%'
  }
})

const MatchScreen = () => {
  const [potentialMatches, setPotentialMatches] = useState<Profile[]>([])
  const [cursor, setCursor] = useState(0)

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

  }, [cursor, potentialMatches])

  const renderActions = (direction: Directions) => {
    return (
      <TouchableOpacity>
        <Text>{direction === Directions.LEFT ? 'MATCH' : 'PASS'}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {potentialMatches[cursor] ? (
        <Swipeable
          renderLeftActions={() => renderActions(Directions.LEFT)}
          renderRightActions={() => renderActions(Directions.RIGHT)} containerStyle={{ flex: 1 }}>
          <Image
            source={{ uri: potentialMatches[cursor].photoURL }}
            style={styles.pfp} />
          <Text>{potentialMatches[cursor].firstName}</Text>
          <Text>3000 miles away</Text>
        </Swipeable>
      ) : <></> }
    </View>
  )
}

export default MatchScreen;