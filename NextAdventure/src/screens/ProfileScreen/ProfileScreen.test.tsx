import { shallow } from 'enzyme'
import ProfileScreen from './ProfileScreen'
import { Props } from './ProfileScreen.type'
import { signout } from '../../utils/Firebase'
import { componentExists, getComponent } from '../../utils/Test'

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn()
}))

jest.mock('react-native-webview', () => ({}))

jest.mock('../../utils/Firebase', () => ({
  getProfile: jest.fn().mockResolvedValue({ photoURL: 'twitter.com/blah' }),
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

    const wrapper = shallow(
      <ProfileScreen navigation={navigation as Navigation} route={route as Route}/>)
    const button = getComponent(wrapper, 'signout-button')

    button.props().onPress()
    expect(signout).toHaveBeenCalled()
  })

  it('should show empty pfp button when profile has no image', () => {
    const navigation: Partial<Navigation> = {
      setOptions: jest.fn()
    }
    const route: Partial<Route> = {};

    const wrapper = shallow(<ProfileScreen navigation={navigation as Navigation} route={route as Route}/>)

    expect(componentExists(wrapper, 'empty-pfp-button')).toBeTruthy()
  })

  it('should show my profile picture when I have one', async () => {
    const navigation: Partial<Navigation> = {
      setOptions: jest.fn()
    }
    const route: Partial<Route> = {};

    const wrapper = shallow(<ProfileScreen navigation={navigation as Navigation} route={route as Route}/>)
    await new Promise(resolve => setTimeout(resolve, 0))
    wrapper.update()

    expect(componentExists(wrapper, 'profile-image')).toBeTruthy()
  })
})
