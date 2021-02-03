import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders, flattenHeaders } from '../helpers/header'
import transform from './transform'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

//发送之前对参数进行各种处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transFormURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transFormURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

// // 对post方法的data进行处理
// function transformData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data)
// }

// //对headers进行处理
// function transformHeaders(config: AxiosRequestConfig): any {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }

//处理返回值，成为json
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

export default dispatchRequest
