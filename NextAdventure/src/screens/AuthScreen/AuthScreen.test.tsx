import { shallow } from 'enzyme'
import AuthScreen from './AuthScreen'
import { Props } from './AuthScreen.type'
import { signIn } from '../../utils/Firebase'
import { componentExists, getComponent } from '../../utils/Test'

jest.mock('../../utils/Firebase', () => ({
  signIn: jest.fn()
}))

type Navigation = Props['navigation']
type Route = Props['route']

describe('Screens > AuthScreen', () => {
  it('should navigate to sign up on button press', () => {
    const navigate = jest.fn()

    let navigation: Partial<Navigation> = {
      navigate
    }

    const route: Partial<Route> = {};

    const wrapper = shallow(
      <AuthScreen
        navigation={navigation as Navigation}
        route={route as Route} />
    )

    const signupButton = getComponent(wrapper, 'signup-button')

    signupButton.props().onPress()
    expect(navigate).toHaveBeenCalledWith('Signup')
  })

  it('should disable button if any field is empty', () => {
    const navigation: Partial<Navigation> = {}
    const route: Partial<Route> = {};
    const wrapper = shallow(
      <AuthScreen 
        navigation={navigation as Navigation}
        route={route as Route}/>)
    const loginButton = getComponent(wrapper, 'login-button')

    expect(loginButton.props().disabled).toBeTruthy()
  })

  it('should sign in user when sign in pressed', () => {
    const navigation: Partial<Navigation> = {}
    const route: Partial<Route> = {};
    const wrapper = shallow(
      <AuthScreen 
        navigation={navigation as Navigation}
        route={route as Route}/>
    )

    const loginButton = getComponent(wrapper, 'login-button')
    let emailInput = getComponent(wrapper, 'email-input')
    let passwordInput = getComponent(wrapper, 'password-input')

    // Simulate typing in sign in info
    emailInput.simulate('change', {
      nativeEvent: {
        text: 'test@test.com'
      }
    })

    passwordInput.simulate('change', { 
      nativeEvent: {
        text: 'test1231'
      }
    })

    // Update the screen and get new references to the inputs
    wrapper.update()
    emailInput = getComponent(wrapper, 'email-input')
    passwordInput = getComponent(wrapper, 'password-input')

    expect(emailInput.props().value).toBe('test@test.com')
    expect(passwordInput.props().value).toBe('test1231')

    loginButton.props().onPress()
    expect(signIn).toHaveBeenCalled()
  })

  it('should hide password field when resetting password', () => {
    const navigation: Partial<Navigation> = {}
    const route: Partial<Route> = {};
    const wrapper = shallow(
      <AuthScreen 
        navigation={navigation as Navigation}
        route={route as Route}/>
    )

    expect(componentExists(wrapper, 'reset-pw-button')).toBeFalsy()
  })

  it('should show password field when resetting password', () => {
    const navigation: Partial<Navigation> = {}
    const route: Partial<Route> = {};
    const wrapper = shallow(
      <AuthScreen 
        navigation={navigation as Navigation}
        route={route as Route}/>
    )

    const forgotPasswordPressable = getComponent(wrapper, 'forgot-pw-button')
    forgotPasswordPressable.props().onPress()

    expect(componentExists(wrapper, 'reset-pw-button')).toBeTruthy()
  })
})