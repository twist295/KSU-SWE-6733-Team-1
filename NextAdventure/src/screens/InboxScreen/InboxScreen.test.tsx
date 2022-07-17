import { shallow } from 'enzyme'
import InboxScreen from './InboxScreen'
import { Props } from './InboxScreen.type'
import { getComponent } from '../../utils/Test'

jest.mock('../../utils/Firebase', () => ({
  getMatches: jest.fn(),
  getProfiles: jest.fn()
}))

type Navigation = Props['navigation']
type Route = Props['route']

describe('Screens > InboxScreen', () => {
  // it('should navigate to chat when conversation is pressed', () => {
  //   const navigate = jest.fn()

  //   const navigation: Partial<Navigation> = {
  //     navigate
  //   }
  //   const route: Partial<Route> = {};

  //   const wrapper = shallow(<InboxScreen navigation={navigation as Navigation} route={route as Route}/>)
    
  //   expect(navigate).toHaveBeenCalledWith('Chat')
  // })

  it('should render threads as expected', () => {
    // const wrapper = shallow(<InboxScreen />)
  })
})
