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
import { getMessages, getUser, sendMessage } from '../../utils/Firebase'
import { Message } from '../../utils/Type'

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'gray',
    flexDirection: 'row'
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 8
  },
  fromSelf: {
    alignSelf: 'flex-end',
    backgroundColor: 'blue',
    borderRadius: 4,
    marginBottom: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    width: '66%'
  },
  fromSelfText: {
    color: 'white'
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    flexGrow: 1,
    margin: 8
  },
  toSelf: {
    backgroundColor: 'gray',
    borderRadius: 4,
    marginBottom: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    width: '66%'
  },
  toSelfText: {
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
      <View style={message.sender === getUser()!.uid ? styles.fromSelf : styles.toSelf}>
        <Text style={message.sender === getUser()!.uid ? styles.fromSelfText : styles.toSelf}>
          {message.body}
        </Text>
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
