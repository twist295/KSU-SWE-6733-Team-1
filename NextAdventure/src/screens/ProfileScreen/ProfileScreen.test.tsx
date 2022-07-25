import { shallow, ShallowWrapper } from 'enzyme'
import ProfileScreen from './ProfileScreen'
import { Props } from './ProfileScreen.type'
import {
  deleteProfile,
  signout
} from '../../utils/Firebase'
import { componentExists, getComponent } from '../../utils/Test'

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn()
}))

jest.mock('expo-location', () => ({}))

jest.mock('react-native-webview', () => ({}))

jest.mock('../../utils/Firebase', () => ({
  deleteProfile: jest.fn(),
  getProfile: jest.fn().mockResolvedValue({ photoURL: 'twitter.com/blah', location: 0 }),
  getSocials: jest.fn().mockResolvedValue({ socials: [{ site: 'Instagram', username: 'twist295' }] }),
  signout: jest.fn()
}))

type Navigation = Props['navigation']
type Route = Props['route']

describe('Screens > ProfileScreen', () => {
  let navigation: Partial<Navigation>
  let route: Partial<Route>
  let wrapper: ShallowWrapper

  beforeAll(() => {
    navigation = {
      setOptions: jest.fn()
    }
    route = {};

    wrapper = shallow(
      <ProfileScreen
        navigation={navigation as Navigation}
        route={route as Route}/>
    )
  })

  it('should signout user when signout button pressed', () => {
    const button = getComponent(wrapper, 'signout-button')

    button.props().onPress()
    expect(signout).toHaveBeenCalled()
  })

  it('should delete my profile when I press the delete profile button', () => {
    const button = getComponent(wrapper, 'delete-profile-button')
    button.props().onPress()
  })

  it('should show empty pfp button when profile has no image', () => {
    expect(componentExists(wrapper, 'empty-pfp-button')).toBeTruthy()
  })

  it('should show my profile picture when I have one', async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
    wrapper.update()

    expect(componentExists(wrapper, 'profile-image')).toBeTruthy()
  })

  it('should show my Instagram when I connect it', async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
    wrapper.update()

    expect(componentExists(wrapper, 'social-text')).toBeTruthy()
  })

  it('should delete my profile when I press the delete button', async () => {
    const button = getComponent(wrapper, 'delete-profile-button')

    button.props().onPress()
    expect(deleteProfile).toHaveBeenCalled()
  })
})
