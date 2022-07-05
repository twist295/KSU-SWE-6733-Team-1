import type { ShallowWrapper } from 'enzyme'

export const getComponent = (wrapper: ShallowWrapper, testID: string) => wrapper
  .findWhere((w) => w.prop('testID') === testID)
  .first()
  
export const componentExists = (wrapper: ShallowWrapper, testID: string) => wrapper
  .findWhere((w) => w.prop('testID') === testID)
  .exists()
  