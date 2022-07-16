import { types } from '@babel/core';
import { useEffect, useState } from 'react'
import { 
  Button,
  FlatList,
  Image,
  StyleSheet, Text, TouchableOpacity, View 
} from 'react-native'
import { Directions } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ActivityCell from '../../components/ActivityCell/ActivityCell'
import { 
  getProfiles, getUser, saveMatch
} from '../../utils/Firebase'
import type { Profile } from '../../utils/Type'

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontFamily: 'Cormorant',
    marginLeft: 5,
    marginBottom: 5,
    color: '#333333'

  },
 
  pfp: {
    height: '50%',
    width: '100%',
  },

  name: {
    fontSize: 30,
    fontFamily: 'Prata',
    textAlign: 'center',
    marginTop: 10,
    color: '#333333'

  },

  distance: {
    fontSize: 15,
    fontFamily: 'Ubuntu',
    marginLeft: 10,
    },

  txt: {
    marginTop: 220,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 25,
    //fontFamily: 'Ubuntu',
    fontFamily: 'DancingBold',
    textAlign: 'center',
    color: '#ff0099'
  },

  container: {
    flex: 1,
    backgroundColor: '#ccffff',
    
  },

  passOrMatch: {
    marginLeft:10,
    marginRight: 10,
    fontFamily: 'Monoton',
    color: '#0000ff',
    marginTop: 15
  },

  items: {
    marginLeft: 15,
  }

  
  
  
})

const MatchScreen = () => {
  const [potentialMatches, setPotentialMatches] = useState<Profile[]>([])
  const [cursor, setCursor] = useState(0)

  useEffect(() => {
    getProfiles()
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
        saveMatch(potentialMatches[cursor].uid!)
      } else {
        // pass
      }

      setCursor(cursor + 1)
    }

    return (
      <TouchableOpacity onPress={() => onPress(direction)}>
        <Text style={styles.passOrMatch}>{direction === Directions.LEFT ? 'MATCH' : 'PASS'}</Text>
      </TouchableOpacity>
    )
  }

  return (
    //<View style={{ flex: 1 }}>
      <View style={styles.container}>
      {potentialMatches[cursor] ? (
        <Swipeable
          renderLeftActions={() => renderActions(Directions.LEFT)}
          renderRightActions={() => renderActions(Directions.RIGHT)} containerStyle={{ flex: 1 }}>
          <Image
            source={{ uri: potentialMatches[cursor].photoURL }}
            style={styles.pfp} />
          <Text style={styles.name}>{potentialMatches[cursor].firstName}</Text>
          <Text style={styles.distance}>📍3000 miles away</Text>
          <FlatList
            ListHeaderComponent={<Text style={styles.header}>✨Favorite Activities✨</Text>}
            data={ potentialMatches[cursor].favoriteActivities}
            // renderItem={({ item }) => <ActivityCell activity={item} />}/>
            renderItem={({ item }) => (<Text style={styles.items}>{<ActivityCell activity={item}/>}</Text>)}
            />

                 
        </Swipeable>
      ) : (
        <View>
          <Text style={styles.txt}>You've swiped through all your suggested matches, please come back later or restart!</Text>
          <Button onPress={() => setCursor(0)} title="Restart" />
        </View>
      ) }
    </View>
  )
}

export default MatchScreen;