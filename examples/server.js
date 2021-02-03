const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mutipart = require('connect-multiparty')
const atob = require('atob')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const path = require('path')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__',
    stats: {
      color: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleware(compiler))
app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

registerCancelRouter()

app.use(router)

const port = process.env.PORT || 8080

module.exports = app.listen(port, () => {
  console.log('server is listening:' + port)
})

function registerSimpleRouter() {
  router.get('/simple/get', function(req, res) {
    res.json({
      msg: 'hello base get'
    })
  })
}

function registerBaseRouter() {
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })

  router.post('/base/post', function(req, res) {
    res.json(req.body)
  })

  router.post('/base/buffer', function(req, res) {
    let msg = []
    req.on('data', chunk => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}

function registerErrorRouter() {
  //测试error
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: 'test err'
      })
    } else {
      res.status(500)
      res.end
    }
  })

  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: 'test err2'
      })
    }, 4000)
  })
}

function registerExtendRouter() {
  router.get('/extend/get', function(req, res) {
    res.json({
      msg: 'response get'
    })
  })

  router.get('/extend/user', function(req, res) {
    res.json({
      name: 'ming',
      age: 21
    })
  })

  router.options('/extend/options', function(req, res) {
    res.end()
  })

  router.head('/extend/head', function(req, res) {
    res.end()
  })

  router.delete('/extend/delete', function(req, res) {
    res.end()
  })

  router.post('/extend/post', function(req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function(req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
  })
}

function registerInterceptorRouter() {
  router.get('/interceptor/get', function(req, res) {
    res.end('hello')
  })
}

function registerConfigRouter() {
  router.post('/config/post', function(req, res) {
    res.json(req.body)
  })
}

function registerCancelRouter() {
  router.post('/cancel/get', function(req, res) {
    setTimeout(() => {
      res.json('hello')
    }, 1000)
  })

  router.post('/cancel/post', function(req, res) {
    setTimeout(() => {
      res.json(req.body)
    }, 1000)
  })
}
