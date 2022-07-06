import {
  FC,
  useState
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
  modal: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 88,
    padding: 16
  }
})

const ActivityModal: FC<Props> = ({ onConfirm, onDismiss, visible }) => {
  const [attitude, setAttitude] = useState(Attitude.Like)
  const [preferences, setPreferences] = useState([] as string[])
  const [skillLevel, setSkillLevel] = useState(SkillLevel.Intermediate)
  const [type, setType] = useState('')
  
  const confirmPressed = () => {
    onConfirm({ attitude, preferences, skillLevel, type })
  }

  return (
    <Modal onRequestClose={onDismiss} transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <TextInput
                onChange={({ nativeEvent }) => setType(nativeEvent.text)}
                placeholder="Type" />
              <Text>Skill Level</Text>
              <SegmentControl
                items={getEnumKeys(SkillLevel)}
                onChangeIndex={(index) => setSkillLevel(index)}
                selectedIndex={skillLevel} />
              <Text>Attitude</Text>
              <SegmentControl
                items={getEnumKeys(Attitude)}
                onChangeIndex={(index) => setAttitude(index)}
                selectedIndex={attitude} />
              <Text>Preferences</Text>
              <Button onPress={confirmPressed} title="Add" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ActivityModal
