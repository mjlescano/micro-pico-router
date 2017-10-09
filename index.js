const { METHODS } = require('http')
const { parse } = require('url')

const defaultHandler = (req, res) => {
  res.statusCode = 404
  res.end()
}

module.exports = function router (options = {}) {
  const {
    methods = METHODS
  } = options

  const handlers = {}

  handlers.default = defaultHandler

  methods.forEach((method) => {
    handlers[method] = {}
  })

  const app = (req, res) => {
    const { method } = req
    const { pathname } = parse(req.url)

    if (!handlers[method] || !handlers[method].hasOwnProperty(pathname)) {
      return handlers.default(req, res)
    }

    return handlers[method][pathname](req, res)
  }

  app.default = (cb) => {
    if (typeof cb !== 'function') {
      throw new Error(`Default handler must be a function`)
    }

    handlers.default = cb
  }

  const createRoute = (method, pathname, cb) => {
    if (typeof cb !== 'function') {
      throw new Error(`Route handler for ${method} ${pathname} must be a function`)
    }

    handlers[method][pathname] = cb

    return app
  }

  methods.forEach((method) => {
    app[method.toLowerCase()] = createRoute.bind(null, method)
  })

  return app
}
