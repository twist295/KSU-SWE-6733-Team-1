import { shallow } from 'enzyme'
import ActivityModal from './ActivityModal'
import {
  createActivity,
  getComponent, componentExists } from '../../utils/Test'

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

  it('should disable confirmation with empty type', () => {
    const onConfirm = jest.fn()

    const wrapper = shallow(
      <ActivityModal 
        activity={createActivity()}
        onConfirm={onConfirm}
        onDismiss={jest.fn()}
        visible={true}/>
    )

    const confirmButton = getComponent(wrapper, 'confirm-button')
    confirmButton.props().disabled

    expect(confirmButton.props().disabled).toBeTruthy()
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

    expect(onConfirm).toHaveBeenCalledWith(activity)
  })

  it('should not show delete button when adding activity', () => {
    const wrapper = shallow(
      <ActivityModal 
        onDelete={jest.fn()}
        onConfirm={jest.fn()}
        onDismiss={jest.fn()}
        visible={true}/>
    )

    expect(componentExists(wrapper, 'delete-button')).toBeFalsy()
  })

  it('should call onDelete when delete button pressed', () => {
    const onDelete = jest.fn()
    const activity = createActivity({ type: 'Skateboarding' })
    
    const wrapper = shallow(
      <ActivityModal 
        activity={activity}
        onDelete={onDelete}
        onConfirm={jest.fn()}
        onDismiss={jest.fn()}
        visible={true}/>
    )

    const deleteButton = getComponent(wrapper, 'delete-button')
    deleteButton.props().onPress()

    expect(onDelete).toHaveBeenCalledWith(activity)
  })
})
