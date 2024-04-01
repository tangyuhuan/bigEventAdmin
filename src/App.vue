<script setup>
//在 Vue3 CompositionAPI中
//1.获取路由对象 router 有专门的方法useRouter
// const router = useRouter()
//2.获取路由参数 route 有专门的方法useRoute
// const route = useRoute()
import { useRoute, useRouter } from 'vue-router'
// import { useUserStore } from '@/stores/modules/user'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const goList = () => {
  router.push('/list')
  console.log(router) //路由对象
  console.log(route) //路由参数
}
</script>
<template>
  <div>我是APP</div>
  <test-demo></test-demo>
  <el-button @click="$router.push('/home')" type="success">跳首页</el-button>
  <el-button @click="goList">跳列表页</el-button>
  <P>{{ userStore.token }}</P>
  <el-button type="" @click="userStore.setToken('yh')">登录</el-button>
  <el-button type="" @click="userStore.removeToken()">退出</el-button>
</template>

<style scoped></style>
@/stores/modules/user
