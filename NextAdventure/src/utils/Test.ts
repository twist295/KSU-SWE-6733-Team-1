import type { ShallowWrapper } from 'enzyme'
import { Activity, Attitude, SkillLevel } from './Type'

export const getComponent = (wrapper: ShallowWrapper, testID: string) => wrapper
  .findWhere((w) => w.prop('testID') === testID)
  .first()
  
export const componentExists = (wrapper: ShallowWrapper, testID: string) => wrapper
  .findWhere((w) => w.prop('testID') === testID)
  .exists()
  
export const createActivity = (options?: Partial<Activity>): Activity => ({
  attitude: Attitude.Like,
  preferences: [],
  skillLevel: SkillLevel.Intermediate,
  type: '',
  ...options
})