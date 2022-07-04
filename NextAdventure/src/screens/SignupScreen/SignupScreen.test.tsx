import { shallow } from 'enzyme'
import SignupScreen from './SignupScreen'
import { createUser } from '../../utils/Firebase'
import { getComponent } from '../../utils/Test'

jest.mock('../../utils/Firebase', () => ({
  createUser: jest.fn()
}))

describe('Screens > SignupScreen', () => {
  it('should create user when sign up pressed', () => {
    const wrapper = shallow(<SignupScreen />)

    const signupButton = getComponent(wrapper, 'signup-button')
    let emailInput = getComponent(wrapper, 'email-input')
    let passwordInput = getComponent(wrapper, 'password-input')

    // Simulate typing in sign up info
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
    expect(signupButton.props().disabled).toBeFalsy
    signupButton.props().onPress()

    expect(createUser).toHaveBeenCalled()
  })

  it('should disable button if any field is empty', () => {
    const wrapper = shallow(<SignupScreen />)

    const signupButton = getComponent(wrapper, 'signup-button')

    expect(signupButton.props().disabled).toBeTruthy()
  })
})
