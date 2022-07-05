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
  const [skillLevel, setSkillLevel] = useState(SkillLevel.Intermediate)
  
  console.log({ attitude, skillLevel })

  const confirmPressed = () => {
    onConfirm({ attitude, skillLevel })
  }

  return (
    <Modal onRequestClose={onDismiss} transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <TextInput placeholder="Type" />
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
