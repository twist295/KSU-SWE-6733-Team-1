import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Props } from './ActivityCell.type'
import { Attitude, SkillLevel, getEnumKeys } from '../../utils/Type'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 8
  },
  title: {
    fontWeight: 'bold'
  },
})

const ActivityCell: FC<Props> = ({ accessory, activity }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{activity.type}</Text>
        <Text>{`Skill Level: ${getEnumKeys(SkillLevel)[activity.skillLevel]}`}</Text>
        <Text>{`Attitude: ${getEnumKeys(Attitude)[activity.attitude]}`}</Text>
      </View>
      {accessory}
    </View>
  )
}

export default ActivityCell
