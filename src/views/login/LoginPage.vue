<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userRegisterService } from '@/api/user.js'

const isRegister = ref(true)
//整个用于提交的form数据对象
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
//整个表单的校验规则，不需要响应式
//1.非空校验 required: true   message消息提示，trigger触发校验的时机：blur失焦触发,change改变时触发
//2.长度校验 min: 1, max: 10
//3.正则校验 pattern:  \S非空字符
//4.自定义校验 =》 自己写校验逻辑（校验函数）
// validator:(rule,value,callback)
// (1)rule 当前校验规则相关的信息
// (2)value 所校验的表单元素目前的表单值
// (3)callback 无论成功还是失败，都需要callback回调
//     -callback() 校验成功
//     -callback(new Error(错误信息)) 校验失败
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }, //trigger什么时候触发校验，blur失焦触发,change改变时触发
    { min: 1, max: 10, message: '用户名必须是1到10位的字符', trigger: 'blur' },
    {
      pattern: /^[A-Za-z0-9]+$/,
      message: '用户名只能由大小写字母和数字组成',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
const form = ref(null)
const register = async () => {
  //注册成功之前，先进行校验，校验成功，请求注册接口；校验失败，提示
  await form.value.validate()
  await userRegisterService(formModel.value)
  // alert('注册成功')
  ElMessage.success('注册成功') //element配置了按需导入，组件和方法都可以自动导入，但是需要告知eslint此不需要校验
  isRegister.value = false
}
</script>
<template>
  <!--
    1.结构相关 
    el-row表示一行，一行分成24份，分成12+3+6+3 
        el-col 表示列 
        （1）:span="12" 表示在一行中占12份
        （2）:offset="3" 在一行中距离左侧的margin份数
    el-form 整个表单组件
    el-form-item 表单的一行（一个表单域）
    el-input 表单元素

    2.校验相关
    （1）el-form属性之 :model="ruleForm"绑定的整个form的数据对象 {xxx,xxx,xxx}通过一个对象维护表单里的所有数据
    （2）el-form属性之 :rules="rules" 绑定的整个rules规则对象    {xxx,xxx,xxx}
    （3）表单元素 => v-model="ruleForm.xxx"给表单元素，绑定form子属性，v-model的值跟ruleForm中的xxx值对应起来
    （4）el-form-item  prop配置生效的是哪个校验规则，prop的值跟rule规则字段对应起来
    -->
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册相关表单 -->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
        :model="formModel"
        :rules="rules"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
            v-model="formModel.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="register"
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录相关表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
