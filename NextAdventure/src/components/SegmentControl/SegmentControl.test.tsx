import { shallow } from 'enzyme'
import SegmentControl from './SegmentControl'
import { getComponent } from '../../utils/Test'

describe('Components > SegmentControl', () => {
  it('should render all items', () => {
    const wrapper = shallow(<SegmentControl items={['a', 'b', 'c']} onChangeIndex={jest.fn()} selectedIndex={0} />)
    expect(wrapper.find('Text')).toHaveLength(3)
  })

  it('should call onChangeIndex on press', () => {
    const onChangeIndex = jest.fn()
    const wrapper = shallow(<SegmentControl items={['a', 'b', 'c']} onChangeIndex={onChangeIndex} selectedIndex={0} />)

    const touchable = wrapper.find('TouchableOpacity').at(1)
    touchable.props().onPress()

    expect(onChangeIndex).toHaveBeenCalledWith(1)
  })

  it('should render item at selectedIndex differently', () => {
    const wrapper = shallow(<SegmentControl items={['a', 'b', 'c']} onChangeIndex={jest.fn()} selectedIndex={1} />)
    const touchable = getComponent(wrapper, 'touchable-selected')
    expect(touchable).toEqual(wrapper.find('TouchableOpacity').at(1))
  })
})
