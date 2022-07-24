import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Props } from './ActivityCell.type'
import { Attitude, SkillLevel, getEnumKeys } from '../../utils/Type'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#7a42f4',
    borderRadius: 20,
  },
  title: {
    textAlign: 'center',
    color: "blue",
    fontWeight: 'bold',
    fontSize: 20,

  },
  skill: {
    margin: 5,
    fontSize: 20,
    color: "white",
  },
  attitude: {
    margin: 5,
    fontSize: 20,
    color: "white",
  },
})

const ActivityCell = ({ accessory, activity }: Props) => {
  const { type, skillLevel, attitude } = activity
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{type}</Text>
        <Text style={styles.skill}>{`Skill Level: ${getEnumKeys(SkillLevel)[skillLevel]}`}</Text>
        <Text style={styles.attitude}>{`Attitude: ${getEnumKeys(Attitude)[attitude]}`}</Text>
      </View>
      {accessory}
    </View>
  )
}

export default ActivityCell
