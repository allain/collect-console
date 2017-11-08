const collect = require('./collect-console')

describe('collect-console', () => {
  for (let method of ['error', 'info', 'log', 'trace']) {
    it(`supports collecting ${method} using resetter`, () => {
        let reset = collect[method]()
        console[method]('a')
        console[method]('b c')
        expect(reset()).toEqual(['a', 'b c'])
    })

    it(`supports collecting ${method} using sync handler`, () => {
      expect(collect[method](() => {
        console[method]('a')
        console[method]('b c')
      })).toEqual(['a', 'b c'])
    })

    it(`supports collecting ${method} using async handler`, () => {
      expect(collect[method](() => {
        console[method]('a')
        console[method]('b c')
        return Promise.resolve()
      })).resolves.toEqual(['a', 'b c'])
    })
  }

})