import {
  useEffect, 
  useState
} from 'react'
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { Props } from './ChatScreen.type'
import { getMessages, sendMessage } from '../../utils/Firebase'
import { Message } from '../../utils/Type'

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'gray',
    flexDirection: 'row'
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  fromSelf: {
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    flexGrow: 1,
    margin: 8
  },
  toSelf: {
  }
})

const ChatScreen = ({ navigation, route }: Props) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')

  useEffect(() => {
    navigation.setOptions({ headerTitle: route.params.profile.firstName })

    loadConversation()
  }, [])

  const loadConversation = () => {
    getMessages(route.params.profile.uid!)
      .then(setMessages)
      .catch(console.log)
  }

  const onSend = () => {
    sendMessage(route.params.profile.uid!, text)
      .then(() => {
        setText('')
        loadConversation()
      })
      .catch(console.log)
  }

  const renderMessage = (message: Message) => {
    return (
      <View>
        <Text>{message.body}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList data={messages} renderItem={({ item }) => renderMessage(item)} />
      <View style={styles.bar}>
        <TextInput 
          onChange={({ nativeEvent }) => setText(nativeEvent.text)}
          style={styles.input}
          value={text} />
        <Button disabled={text.length === 0} onPress={onSend} title="Send"/>
      </View>
    </View>
  )
}

export default ChatScreen;
