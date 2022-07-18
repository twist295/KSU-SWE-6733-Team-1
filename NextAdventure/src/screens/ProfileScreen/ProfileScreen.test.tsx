import { shallow } from 'enzyme'
import ProfileScreen from './ProfileScreen'
import { Props } from './ProfileScreen.type'
import { signout } from '../../utils/Firebase'
import { getComponent } from '../../utils/Test'

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn()
}))

jest.mock('../../utils/Firebase', () => ({
  getProfile: jest.fn().mockResolvedValue({}),
  signout: jest.fn()
}))

type Navigation = Props['navigation']
type Route = Props['route']

describe('Screens > ProfileScreen', () => {
  it('should signout user when signout button pressed', () => {
    const navigation: Partial<Navigation> = {
      setOptions: jest.fn()
    }
    const route: Partial<Route> = {};

    const wrapper = shallow(<ProfileScreen navigation={navigation as Navigation} route={route as Route}/>)
    const button = getComponent(wrapper, 'signout-button')

    button.props().onPress()
    expect(signout).toHaveBeenCalled()
  })
})
