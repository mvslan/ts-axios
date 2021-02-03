import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/header'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data,
      method = 'get',
      url,
      params,
      headers,
      responseType,
      timeout,
      cancelToken
    } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    //配置超时时间
    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toLocaleUpperCase(), url!, true)

    //处理返回数据
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      //根据status的不同值来做处理
      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())

      const responseData = responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      handleResponse(response)
    }
    //没有response
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    //处理超时错误-没有response
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLocaleUpperCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
