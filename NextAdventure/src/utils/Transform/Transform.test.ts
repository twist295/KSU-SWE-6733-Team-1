import { mapUrlFragments } from './Transform'

describe('Utils > Transform', () => {
  it('should map url fragments', () => {
    const url = "https://www.nextadventure.com/?code=AQCG&redirect_uri=blah"
    expect(mapUrlFragments(url)).toEqual({
      code: 'AQCG',
      redirect_uri: 'blah',
    })
  })
})
