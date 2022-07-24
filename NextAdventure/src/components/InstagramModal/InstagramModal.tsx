import {
  useEffect,
  useState
} from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { WebView } from 'react-native-webview'
import { Props } from './InstagramModal.type'
import { mapUrlFragments } from '../../utils/Transform/Transform'
import {
  getAuthURL,
  getMe,
  getToken,
} from '../../utils/Instagram/Instagram'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1
  },
  header: {
    alignItems: 'flex-end',
    backgroundColor: 'gray',
    height: 44,
  },
  webView: {
    flex: 1,
    marginTop: 88,
  }
})

const InstagramModal = ({ onConfirm, onDismiss, visible }: Props) => {
  const [code, setCode] = useState<string | null>(null)

  useEffect(() => {
    if (code) {
      getToken(code)
        .then(res => {
          const { access_token } = res
          return getMe(access_token)
        })
        .then(({ username }) => {
          onConfirm({ site: 'Instagram', username })
        })
        .catch(console.log)
    }
  }, [code])

  const onNavigationStateChanged = async ({ url }: { url: string }) => {
    if (url.includes('www.instagram.com') || 
        url.includes('https://l.instagram.com') || 
        !url.includes('https://www.nextadventure.com') || 
        code) {
      return
    }

    let { code: _code } = mapUrlFragments(url)
    _code = _code.replace(/#_/i, '')

    setCode(_code)
  }

  return (
    <Modal
      onRequestClose={onDismiss} transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.webView}>
              <View style={styles.header}>
                <TouchableOpacity>
                  <Text>X</Text>
                </TouchableOpacity>
              </View>
              <WebView
                onNavigationStateChange={onNavigationStateChanged}
                source={{ uri: getAuthURL() }}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default InstagramModal