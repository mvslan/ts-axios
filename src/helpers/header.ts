import { isPlainObject } from './util'
import { Method } from '../types'
import { deepMerge } from './util'

//Content-type大小写都可以，所以需要规范化
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

//处理Headers的方法
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-type')
  //  没有data说明不需要参数，就可以不管了
  if (isPlainObject(data)) {
    if (headers && !headers['Content-type']) {
      headers['Content-type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

//把字符串转成对象
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}

//处理合并后config的headers内容
export function flattenHeaders(headers: any, method: Method): any {
  console.log(headers)

  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'put', 'post', 'patch', 'common']
  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
