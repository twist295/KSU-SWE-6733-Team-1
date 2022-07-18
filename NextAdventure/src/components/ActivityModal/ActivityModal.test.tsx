import { shallow } from 'enzyme'
import ActivityModal from './ActivityModal'
import { createActivity, getComponent } from '../../utils/Test'
import { Attitude, SkillLevel } from '../../utils/Type'

describe('Components > ActivityModal', () => {
  it('should populate fields when editing activity', () => {
    const wrapper = shallow(
      <ActivityModal 
        activity={createActivity({type: 'Skateboarding' })}
        onConfirm={jest.fn()}
        onDismiss={jest.fn()}
        visible={true}/>
    )

    const typeField = getComponent(wrapper, 'type-field')
    expect(typeField.props().value).toEqual('Skateboarding')
  })

  it('should not confirm changes with empty type', () => {
    const onConfirm = jest.fn()

    const wrapper = shallow(
      <ActivityModal 
        activity={createActivity()}
        onConfirm={onConfirm}
        onDismiss={jest.fn()}
        visible={true}/>
    )

    const confirmButton = getComponent(wrapper, 'confirm-button')
    confirmButton.props().onPress()

    expect(onConfirm).toHaveBeenCalledTimes(0)
  })

  it('should confirm with expected payload', () => {
    const onConfirm = jest.fn()
    const activity = createActivity({ type: 'Skateboarding' })

    const wrapper = shallow(
      <ActivityModal 
        activity={activity}
        onConfirm={onConfirm}
        onDismiss={jest.fn()}
        visible={true}/>
    )

    const confirmButton = getComponent(wrapper, 'confirm-button')
    confirmButton.props().onPress()

    expect(onConfirm).toHaveBeenCalledWith({
      attitude: activity.attitude, preferences: activity.preferences, skillLevel: activity.skillLevel, type: activity.type })
  })
})
