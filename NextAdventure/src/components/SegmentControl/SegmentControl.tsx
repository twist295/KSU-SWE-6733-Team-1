import { FC } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Props } from './SegmentControl.type'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  item: {
    alignItems: 'center',
    borderWidth: 1,
    flexGrow: 1,
    paddingVertical: 4
  }
})

const SegmentControl: FC<Props> = ({ items, onChangeIndex, selectedIndex }) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const style = index === selectedIndex ? { 
          ...styles.item, 
          backgroundColor: 'rgb(14, 122, 254)' 
        } : styles.item
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onChangeIndex(index)}
            style={style}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )})}
    </View>
  )
}

export default SegmentControl
