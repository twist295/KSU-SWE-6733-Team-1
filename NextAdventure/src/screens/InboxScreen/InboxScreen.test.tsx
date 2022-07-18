import { shallow } from 'enzyme'
import InboxScreen from './InboxScreen'
import { Props } from './InboxScreen.type'
import { getComponent } from '../../utils/Test'

jest.mock('../../utils/Firebase', () => ({
  getMatches: jest.fn().mockReturnValue(['uid']),
  getProfiles: jest.fn().mockReturnValue({uid: { firstName: 'first', lastName: 'last', profileURL: 'blah' }}),
  getLatestMessageForThreads: jest.fn()
}))

type Navigation = Props['navigation']
type Route = Props['route']

describe('Screens > InboxScreen', () => {
  it('should get updated data on refresh', async () => {
    const navigate = jest.fn()

    const navigation: Partial<Navigation> = {
      navigate
    }
    const route: Partial<Route> = {};

    const wrapper = shallow(<InboxScreen navigation={navigation as Navigation} route={route as Route}/>)
    let list = getComponent(wrapper, 'list')

    await list.props().onRefresh()

    wrapper.update()
    list = getComponent(wrapper, 'list')

    expect(list.props().data.length).toEqual(1)
  })
})
