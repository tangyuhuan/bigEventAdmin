<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { userUpdateInfoService } from '@/api/user'
import { useUserStore } from '@/stores'
const ruleFormRef = ref(null)
const form = ref({
  id: '',
  username: '',
  nickname: '',
  email: '',
  user_pic: ''
})
// 不需要重写请求了，从store里拿数据就行
const userStore = useUserStore()
form.value = { ...userStore.user } //无需响应式，解构无问题）
const rules = ref({
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称为 2 到 10 个非空字符',
      trigger: 'change'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱格式',
      trigger: ['blur', 'change']
    }
  ]
})
const loading = ref(false)
const submitForm = async () => {
  //等待校验结果
  await ruleFormRef.value.validate()
  loading.value = true
  //提交修改
  await userUpdateInfoService(form.value)
  loading.value = false
  //通知user模块，进行数据的更新
  userStore.getUser()
  //修改成功的提示框
  ElMessage({
    type: 'success',
    message: '修改成功'
  })
  // userStore.setUser({ ...form.value })
  // ruleFormRef.value.validate((valid) => {
  //   if (valid) {
  //     // 表单校验通过，提交表单
  //     console.log(form.value)
  //   } else {
  //     // 表单校验失败
  //     return false
  //   }
  // })
}
</script>
<template>
  <page-container title="基本资料">
    <template #extra></template>
    <!-- 表单部分   -->
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="100px"
      v-loading="loading"
      style="width: 50%"
    >
      <el-form-item label="登录名称">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped></style>
<!-- 请基于element-plus和Vue3的语法，生成组件代码
要求：
一、表单结构要求
1.组件中包含一个el-form表单，有四行内容，前三行是输入框，第四行是按钮
2.第一行label登录名称，输入框禁用不可输入状态
3.第二行 label 用户昵称，输入框可输入
4. 第三行 label 用户邮箱，输入框可输入
5. 第四行按钮，提交修改

二、校验需求
给昵称 和 邮箱添加校验
1. 昵称 nickname 必须是2-10位的非空字符串
2. 邮箱 email 符合邮箱格式即可，且不能为空 -->
