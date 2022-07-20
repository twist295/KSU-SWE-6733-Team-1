import { shallow } from 'enzyme'
import MatchScreen from './MatchScreen'
import { componentExists } from '../../utils/Test'

jest.mock('../../utils/Firebase', () => ({
  getProfiles: jest.fn().mockResolvedValue({}),
  getUser: jest.fn().mockResolvedValue({}),
  saveMatch: jest.fn()
}))

describe('Screens > MatchScreen', () => {
  it('should not show empty state before first load', () => {
    const wrapper = shallow(<MatchScreen />)
    expect(componentExists(wrapper, 'restart-button')).toBeFalsy()
  })

  it('should show me a refresh prompt when I go through all my matches', async () => {
    const wrapper = await shallow(<MatchScreen />)
    await new Promise(resolve => setTimeout(resolve, 0))
    wrapper.update()

    expect(componentExists(wrapper, 'restart-button')).toBeTruthy()
  })
})
