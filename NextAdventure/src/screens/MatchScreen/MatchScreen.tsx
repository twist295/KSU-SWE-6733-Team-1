import { useEffect, useState } from 'react'
import { 
  Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View 
} from 'react-native'
import { Directions } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ActivityCell from '../../components/ActivityCell/ActivityCell'
import { 
  getPotentialMatches, getUser 
} from '../../utils/Firebase'
import type { Profile } from '../../utils/Type'

const styles = StyleSheet.create({
  header: {
    fontSize: 24
  },
  pfp: {
    height: '50%',
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

  const renderActions = (direction: Directions) => {
    const onPress = (direction: Directions) => {
      if (direction === Directions.LEFT) {
        // match
      } else {
        // pass
        setCursor(cursor + 1)
      }
    }

    return (
      <TouchableOpacity onPress={() => onPress(direction)}>
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
          <Text style={styles.header}>{potentialMatches[cursor].firstName}</Text>
          <Text>3000 miles away</Text>
          <FlatList
            ListHeaderComponent={<Text style={styles.header}>Favorite Activities</Text>} 
            data={potentialMatches[cursor].favoriteActivities} 
            renderItem={({ item }) => <ActivityCell activity={item} />}/>
        </Swipeable>
      ) : (
        <View>
          <Text>You've swiped through all your suggested matches, please come back later or restart!</Text>
          <Button onPress={() => setCursor(0)} title="Restart" />
        </View>
      ) }
    </View>
  )
}

export default MatchScreen;