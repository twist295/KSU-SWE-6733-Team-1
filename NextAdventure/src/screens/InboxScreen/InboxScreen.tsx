import { useEffect } from 'react'
import { View } from 'react-native'
import { getMatches } from '../../utils/Firebase'

const InboxScreen = () => {
  useEffect(() => {
    getMatches().then(console.log).catch(console.log)
  }, [])

  return (
    <View></View>
  )
}

export default InboxScreen;
