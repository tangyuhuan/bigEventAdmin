import { createRouter, createWebHistory } from 'vue-router'
// createRouter 创建路由实例，===> new VueRouter()
// 1. history模式: createWebHistory()   http://xxx/user
// 2. hash模式: createWebHashHistory()  http://xxx/#/user
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})
//Vite 在一个特殊的 import.meta.env 对象上暴露环境变量
console.log(import.meta.env.DEV) //是否运行在开发环境
// vite中的环境变量 import.meta.env.BASE_URL 就是vite.config.js中的base配置项，指路由的基准地址，默认是 ’/‘
// 通过修改配置的方式修改路由的基准地址，避免代码里写死
// https://vitejs.dev/guide/build.html#public-base-path

// 如果将来你部署的域名路径是：http://xxx/my-path/user
// vite.config.ts  添加配置  base: my-path，路由这就会加上 my-path 前缀了

export default router
