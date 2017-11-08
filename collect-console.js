const collect = method => (fn) => {
  const lines = []
  const oldMethod = global.console[method]

  global.console[method] = (...args) => {
    lines.push(args.join(' '))
  }

  // resets console and returns the collected lines
  const reset = () => {
    global.console[method] = oldMethod
    return lines
  };

  if (!fn) return reset

  let result
  try {
    result = fn()
  } catch(e) {
    reset()
    throw e 
  }

  return (result && result.then) 
    ? result.then(() => reset(), err => { reset(); throw err }) 
    : reset()
}

module.exports = {
    error: collect('error'),
    info: collect('info'),
    log: collect('log'),
    trace: collect('trace'),
    warn: collect('warn'),
}