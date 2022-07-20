import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Props } from './ActivityCell.type'
import { Attitude, SkillLevel, getEnumKeys } from '../../utils/Type'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 10,
    height: 150,
    width: 375,
    backgroundColor: '#7a42f4',
    borderRadius: 20,

  },

  title: {
    margin: 10,
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

const ActivityCell: FC<Props> = ({ accessory, activity }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{activity.type}</Text>
        <Text style={styles.skill}>{`Skill Level: ${getEnumKeys(SkillLevel)[activity.skillLevel]}`}</Text>
        <Text style={styles.attitude}>{`Attitude: ${getEnumKeys(Attitude)[activity.attitude]}`}</Text>
      </View>
      {accessory}
    </View>
  )
}

export default ActivityCell
