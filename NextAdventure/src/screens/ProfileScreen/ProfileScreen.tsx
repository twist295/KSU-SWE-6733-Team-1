import { 
  FlatList, 
  Image, StyleSheet, Text, View 
} from 'react-native'

type Adventure = {
  skillLevel: string
  type: string
}

const MOCK_ADVENTURES: Adventure[] = [
  { type: 'Skiing', skillLevel: 'proficient' },
  { type: 'Backpacking' }
]

const ProfileScreen = () => {
  const renderAdventure = ({ item }: {item: Adventure}) => {
    return (
      <View><Text>{item.type}</Text></View>
    )
  }

  return (
    <View>
      <Image
        source={{ uri: 'https://pbs.twimg.com/profile_images/914711826662936576/Rp5dIges_400x400.jpg' }} 
        style={styles.pfp} />
      <FlatList data={MOCK_ADVENTURES} renderItem={renderAdventure} />
    </View>
  )
}

const styles = StyleSheet.create({
  pfp: {
    borderRadius: 44,
    height: 88,
    width: 88
  }
})

export default ProfileScreen;
