<script setup>
//在 Vue3 CompositionAPI中
//1.获取路由对象 router 有专门的方法useRouter
// const router = useRouter()
//2.获取路由参数 route 有专门的方法useRoute
// const route = useRoute()
import { useRoute, useRouter } from 'vue-router'
// import { useUserStore } from '@/stores/modules/user'
import { useUserStore } from '@/stores'
//导入，就当普通axios来用
import axios from '@/utils/request'
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const goList = () => {
  router.push('/list')
  console.log(router) //路由对象
  console.log(route) //路由参数
}
async function getUser() {
  const response = await axios.get('/my/cate/list?id=1284')
  console.log(response)
}
</script>
<template>
  <router-view></router-view>
  <div>我是APP</div>
  <test-demo></test-demo>
  <el-button @click="$router.push('/home')" type="success">跳首页</el-button>
  <el-button @click="goList">跳列表页</el-button>
  <p>{{ userStore.token }}</p>
  <el-button type="" @click="userStore.setToken('tyh')">登录</el-button>
  <el-button type="" @click="userStore.removeToken()">退出</el-button>
  <el-button type="" @click="getUser">getUser</el-button>
</template>

<style scoped></style>
