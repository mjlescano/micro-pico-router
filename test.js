const test = require('ava')
const router = require('.')

test.beforeEach((t) => {
  const app = router()

  app.get('/', (req, res) => {
    res.statusCode = 200
    res.end('okay')
  })

  app.post('/submit', (req, res) => {
    res.statusCode = 200
    res.end()
  })

  t.context.app = app
})

test('GET /', async (t) => {
  const { app } = t.context

  const req = {
    method: 'GET',
    url: 'http://domain.example/'
  }

  const res = {
    end: (msg) => {
      t.is(res.statusCode, 200)
      t.is(msg, 'okay')
    }
  }

  app(req, res)
})

test('POST /submit', async (t) => {
  const { app } = t.context

  const req = {
    method: 'POST',
    url: 'http://domain.example/submit'
  }

  const res = {
    end: () => {
      t.is(res.statusCode, 200)
    }
  }

  app(req, res)
})

test('GET /wrong-url', async (t) => {
  const { app } = t.context

  const req = {
    method: 'GET',
    url: 'http://domain.example/wrong-url'
  }

  const res = {
    end: (msg) => {
      t.is(res.statusCode, 404)
    }
  }

  app(req, res)
})
