import {
  FC,
  useEffect,
  useState,
} from 'react'
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { Props } from './ActivityModal.type'
import SegmentControl from '../SegmentControl/SegmentControl'
import { Attitude, SkillLevel, getEnumKeys } from '../../utils/Type'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1
  },
  header: {
    fontWeight: 'bold'
  },
  modal: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 88,
    padding: 16
  },
  segment: {
    marginVertical: 8
  },
  title: {
    fontSize: 24
  }
})

const ActivityModal: FC<Props> = ({ activity, onConfirm, onDismiss, visible }) => {
  const [attitude, setAttitude] = useState(Attitude.Like)
  const [preferences, setPreferences] = useState([] as string[])
  const [skillLevel, setSkillLevel] = useState(SkillLevel.Intermediate)
  const [type, setType] = useState('')

  useEffect(() => {
    if (activity) {
      setType(activity.type)
      setAttitude(activity.attitude)
      setSkillLevel(activity.skillLevel)
      setPreferences(activity.preferences)
    }
  }, [activity])
  
  const confirmPressed = () => {
    onConfirm({ attitude, preferences, skillLevel, type })
  }

  return (
    <Modal
      onRequestClose={onDismiss}
      transparent={true}
      visible={visible}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Text style={styles.title}>{activity ? 'Update Activity': 'Add Activity'}</Text>
              <Text style={styles.header}>Type</Text>
              <TextInput
                onChange={({ nativeEvent }) => setType(nativeEvent.text)}
                placeholder="Type" 
                value={type} />
              <Text style={styles.header}>Skill Level</Text>
              <SegmentControl
                items={getEnumKeys(SkillLevel)}
                onChangeIndex={(index) => setSkillLevel(index)}
                selectedIndex={skillLevel} 
                style={styles.segment}/>
              <Text style={styles.header}>Attitude</Text>
              <SegmentControl
                items={getEnumKeys(Attitude)}
                onChangeIndex={(index) => setAttitude(index)}
                selectedIndex={attitude} 
                style={styles.segment}/>
              <Text style={styles.header}>Preferences</Text>
              <Button onPress={confirmPressed} title="Add" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ActivityModal
