# Micro Pico Router

Absolutely minimal, zero-dependency, [Node](https://nodejs.org/api/http.html) or [Micro](https://github.com/zeit/micro) router.

It allows you to map specific method-endpoint combinations to specific handlers.

## Getting Started

```
npm install --save micro-pico-router
```

### [Node HTTP Server]() Usage

```javascript
const http = require('http')
const router = require('micro-pico-router')

const app = router()

app.get('/', (req, res) => {
  res.statusCode = 200
  res.end('okay')
})

app.post('/submit', (req, res) => {
  res.statusCode = 200
  res.end()
})

// If you not define a default handler it will return status 404 by default
app.default((req, res) => {
  res.statusCode = 404
  res.end('Not Found')
})

http.createServer(app).listen(3000)
```

The previous example, is the same as doing this:

```javascript
const http = require('http')
const { parse } = require('url')

http.createServer((req, res) => {
  const { pathname } = parse(req.url)

  if (req.method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello!')
  } else if (req.method === 'POST' && pathname === '/submit') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Thank you for submitting')
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not Found')
  }
}).listen(3000)
```

### [Micro](https://github.com/zeit/micro) Usage

```javascript
const app = require('micro-pico-router')()

module.exports = app.get('/', (req, res) => 'Hello!')
```

#### Micro with Async

```javascript
const sleep = require('then-sleep')
const app = require('micro-pico-router')()

module.exports = app.get('/', async (req, res) => {
  await sleep(500)
  return 'Ready!'
})
```

## HTTP Methods

The methods available on `app[METHOD]` are the ones listed by [`http.METHODS`](https://nodejs.org/api/http.html#http_http_methods), but lowercased.

You can also give them using the options:

```javascript
const router = require('micro-pico-router')

const app = router({
  methods: ['GET', 'WEIRD']
})

app.weird('/', (req, res) => 'Some weird http method!')
```

## Tests

```
npm run test
```

## License

**MIT**
