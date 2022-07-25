import { shallow } from 'enzyme'
import ActivityCell from './ActivityCell'
import { getComponent } from '../../utils/Test'
import {
  Activity,
  Attitude,
  SkillLevel
} from '../../utils/Type'

describe('Components > ActivityCell', () => {
  it('should render right text based on enum values', () => {
    const activity: Activity = {
      attitude: Attitude.Like,
      skillLevel: SkillLevel.Advanced,
      type: 'Skateboarding',
      preferences: []
    }
    const wrapper = shallow(<ActivityCell activity={activity}/>)

    const skillLevelText = getComponent(wrapper, 'skill-level-text')
    const attitudeText = getComponent(wrapper, 'attitude-text')
    expect(skillLevelText.props().children).toEqual("Skill Level: Advanced")
    expect(attitudeText.props().children).toEqual("Attitude: Like")
  })
})
