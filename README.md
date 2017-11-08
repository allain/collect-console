# collect-console

A utility library for collecting usages of console.

## Usage

```js
const collect = require('collect-console')

// usage with resetter
const reset = collect.log()
console.log('hello')
console.log(',', 'world')
reset() // returns ['hello', ', world']

// sync usage that automatically resets
collect.warn(() => {
    console.warn('warning')
    console.warn(',', 'world')
}) // returns ['warning', ', world']

// async usage that automatically resets
collect.error(() => {
    console.error('argh')
    console.error(',', 'world')
    return Promise.resolve()
}).then(...) // resolves to ['argh', ', world']
```