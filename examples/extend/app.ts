// import axios from '../../src/index'
import axios from 'axios'

console.log(typeof axios)

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})
axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello request'
  }
})

axios.get('/extend/get')

axios.delete('/extend/delete')

axios.options('/extend/options')

axios.head('/extend/head')

axios.post('/extend/post', { msg: 'post' })

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch', { msg: 'patch' })

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res)
    .catch(err => console.error(err))
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user)
  }
}

test()
