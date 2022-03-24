import router from '@/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Toast } from 'vant'
import { successStatus, errorStatus, successCodes, errorCodes } from './httpStatus'
import { RequestQueue } from '@/utils/tools'

// config
const TIME_OUT = 60 // 默认接口请求延迟，单位：秒
const loginPath = '/login' // 登录页路由
const serverStatusKey = 'status' // 服务状态码key

const requestQueue = new RequestQueue() // 请求队列

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: TIME_OUT * 1000
})

service.interceptors.request.use(
  (config) => {
    // 配置是否显示loading
    if (config.loading !== false) {
      Toast.loading({ duration: 0, forbidClick: true })
    }
    if (Cookies.get('AuthenToken')) {
      config.headers.Authorization = Cookies.get('AuthenToken')
    }
    // 入队列
    requestQueue.insert(config.baseURL + config.url)
    return config
  },
  (error) => {
    Toast.clear()
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  // http状态码正常
  (response) => {
    // 出队列
    requestQueue.out(response.config.baseURL + response.config.url)
    if (requestQueue.isClear()) {
      Toast.clear()
    }
    const httpStatus = response.status ? Number(response.status) : 0
    const serviceStatus = response.data[serverStatusKey] ? Number(response.data[serverStatusKey]) : 0
    const responseData = response.data ?? {}
    if (successCodes.includes(httpStatus)) {
      // 服务状态码正常
      if (successCodes.includes(serviceStatus)) {
        return Promise.resolve(responseData.data)
      } else {
        // 服务状态码异常
        const message = responseData.message ? `ErrorCode:${responseData.code},${responseData.message}` : errorStatus[1]
        Toast.fail(message)
        return Promise.reject(responseData)
      }
    }
  },
  // Http状态码异常
  (error) => {
    // 出队列
    requestQueue.out(error.config.baseURL + error.config.url)
    if (requestQueue.isClear()) {
      Toast.clear()
    }
    const errorData = error.response || {}
    const httpStatus = errorData.status ? Number(errorData.status) : 0
    // 登录失效
    if (httpStatus === 401) {
      Toast(errorStatus[httpStatus])
      setTimeout(() => {
        router.replace(loginPath)
      }, 1500)
    } else if (errorCodes.includes(httpStatus)) {
      // 其他类型的http状态错误
      const message = errorStatus[httpStatus]
      Toast.fail(message)
    } else {
      Toast(errorStatus[httpStatus])
    }
    return Promise.reject(errorData)
  }
)

export default service
