import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
// createRouter 创建路由实例，===> new VueRouter()
// 1. history模式: createWebHistory()   http://xxx/user
// 2. hash模式: createWebHashHistory()  http://xxx/#/user
// import LoginPage from '@/views/login/LoginPage'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

//登录访问拦截 => 默认直接放行
// 需求：只有登录页，可以未授权的时候访问，其他所有页面，都需要先登录再访问
// 即在未登录的情况下，直接访问其他页面是不允许的
//https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
// 返回值：
// 1.undefined/true 直接放行
// 2.false拦回from的地址页面
// 3.具体路径 or 路径对象，拦截到对应的地址
// '/login'  {name:'login'}

router.beforeEach((to) => {
  //如果没有token，且访问的是非登录页，拦截到登录，其他情况正常放行
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})

//Vite 在一个特殊的 import.meta.env 对象上暴露环境变量
console.log(import.meta.env.DEV) //是否运行在开发环境
// vite中的环境变量 import.meta.env.BASE_URL 就是vite.config.js中的base配置项，指路由的基准地址，默认是 ’/‘
// 通过修改配置的方式修改路由的基准地址，避免代码里写死
// https://vitejs.dev/guide/build.html#public-base-path

// 如果将来你部署的域名路径是：http://xxx/my-path/user
// vite.config.ts  添加配置  base: my-path，路由这就会加上 my-path 前缀了

export default router
