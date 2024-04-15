<script setup>
import { ref } from 'vue'
import { userUpdatePwdService } from '@/api/user'
import PageContainer from '@/components/PageContainer.vue'
const pwdFormRef = ref(null)
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const pwdFormRules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === pwdForm.value.old_pwd) {
          callback(new Error('新密码不能与原密码相同'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== pwdForm.value.new_pwd) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
const loading = ref(false)
const submitForm = async () => {
  loading.value = true
  //提交前校验
  try {
    await pwdFormRef.value.validate()
  } catch {
    loading.value = false
    return
  }
  // await pwdFormRef.value.validate()
  const res = await userUpdatePwdService(pwdForm.value)
  console.log(res)
  ElMessage.success('修改密码成功')
  resetForm()
  loading.value = false
}
const resetForm = () => {
  pwdFormRef.value.resetFields()
  // pwdFormRef.value.$refs.pwdForm.resetFields()
}
</script>
<template>
  <page-container title="更换头像">
    <el-form
      ref="pwdFormRef"
      :model="pwdForm"
      :rules="pwdFormRules"
      label-width="100px"
      class="pwd-form"
      style="width: 50%"
      v-loading="loading"
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input
          v-model="pwdForm.old_pwd"
          placeholder="请输入原密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input
          v-model="pwdForm.new_pwd"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="re_pwd">
        <el-input
          v-model="pwdForm.re_pwd"
          placeholder="请再次输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">修改密码</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped></style>
