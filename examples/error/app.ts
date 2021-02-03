import axios, { AxiosError } from '../../src/index'

//url出错
axios({
  method: 'get',
  url: '/error/get1'
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

//正常请求
axios({
  method: 'get',
  url: '/error/get'
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

//模拟网络错误--网络offline，这玩意就发不出去了
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  })
    .then(res => {
      console.log('延时请求：')
      console.log(res)
    })
    .catch(e => {
      console.log('延时请求：')
      console.log(e)
    })
}, 5000)

//超时请求
axios({
  method: 'get',
  url: '/error/get',
  timeout: 1000
})
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e.message)
    console.log(e.config)
    console.log(e.code)
    console.log(e.request)
    console.log(e.isAxiosError)
  })
