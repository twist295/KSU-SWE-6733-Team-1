import { shallow } from 'enzyme'
import AuthScreen from './AuthScreen'
import { Props } from './AuthScreen.type'

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

    const signupButton = wrapper
      .findWhere((w) => w.prop('testID') === 'signup-button')
      .first()

    signupButton.props().onPress()
    expect(navigate).toHaveBeenCalledWith('Signup')
  })
})
