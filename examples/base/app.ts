import axios from '../../src/index'
// import axios from 'axios'

/*
//数组
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

//对象
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      name: 'ming',
      age: 20
    },
    bar: 'go'
  }
})

//日期
const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

//特殊字符
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

//空值忽略
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'ming',
    bar: null,
    naz: undefined
  }
})

//hash
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: ['bar', 'baz']
  }
})

//带参数
axios({
  method: 'get',
  url: '/base/get?status=begin',
  params: {
    foo: 'bar'
  }
})

*/

axios({
  method: 'post',
  url: '/base/post',
  data: {
    name: 'ming',
    age: 20
  }
}).then(res => {
  console.log(res)
})

axios({
  method: 'post',
  url: '/base/post',
  // headers: {
  //   'content-type': 'application/json;charset=UTF-8',
  //   Accept: 'application/json,text/plain,*/*'
  // },
  responseType: 'json',
  data: {
    name: 'ming',
    age: 20
  }
}).then(res => {
  console.log(res)
})

// const arr = new Int32Array([21, 22, 23])
// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })

/**
 * 浏览器本身支持直接传入 URLSearchParams | FormData 等类型对象
 * 会自动将请求添加一个合适的 Content-Type
 */
// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })
