// 一般项目开发中, 都会对 axios 进行基本的二次封装, 单独封装到一个模块中, 便于使用
// 利用 axios.create 创建一个自定义的 axios 来使用
// http://www.axios-js.com/zh-cn/docs/#axios-create-config

//接口文档: https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850835

import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

//创建一个axios实例，将来对创建出来的实例，进行自定义配置
//好处：不会污染原始的axios实例
const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL: baseURL,
  timeout: 5000 //允许最大的超时时间
})

//拦截器:在请求或响应被 then 或 catch 处理前拦截它们。
//请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    //在发送请求之前做些什么
    return config
  },
  //对请求错误做些什么
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    //对响应数据做点什么（默认axios会多包装一层data，需要响应拦截器中处理一下）
    if (res.data.code === 0) {
      return res
    }
    // 处理业务失败，给错误提示并抛出错误
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 处理401错误
    // 错误的特殊情况 =》权限不足 或 token过期 =》拦截到登录
    if (err.response?.status === 401) {
      router.push('/login')
    }
    // 错误的默认情况 =》只要给提示
    console.log(err)
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  }
)

//默认导出和按需导出，并不冲突
export default instance
export { baseURL }
