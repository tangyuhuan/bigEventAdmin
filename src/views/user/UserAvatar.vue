<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userUpdateAvatarService } from '@/api/user'
const userStore = useUserStore()
const imgUrl = ref(userStore.user.user_pic)

const avatar = ref('')
const loading = ref(false)
//图片上传相关逻辑
const onSelectFile = (uploadFile) => {
  //预览图片实现方法1：URL.createObjectURL，uploadFile.raw 是File类型对象
  // imgUrl.value = URL.createObjectURL(uploadFile.raw)

  //预览图片实现方法2：FileReader，将图片转为base64+预览
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
    avatar.value = reader.result
  }

  // fileToBase64(uploadFile.raw)
  //   .then((result) => {
  //     avatar.value = result
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
}

// const fileToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = () => resolve(reader.result)
//     reader.onerror = (error) => reject(error)
//   })
// }
const submitForm = async () => {
  loading.value = true
  //发送请求更新头像
  await userUpdateAvatarService(avatar.value)
  loading.value = false
  //userStore重新渲染
  userStore.getUser()
  ElMessage.success('更换头像成功')
}
const uploader = ref()
const handleClick = () => {
  //可以通过ref.$el获取其原生dom元素
  uploader.value.$el.querySelector('input').click()
}
</script>
<template>
  <page-container title="更换头像" v-loading="loading">
    <el-upload
      class="avatar-uploader"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="onSelectFile"
      ref="uploader"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
    <!-- 按钮加图标用 :icon="XXXX"的方法 -->
    <br />
    <el-button type="primary" :icon="Plus" @click="handleClick" size="large"
      >选择图片
    </el-button>
    <el-button :icon="Upload" @click="submitForm" size="large"
      >上传头像</el-button
    >
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 250px;
      height: 250px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 250px;
      height: 250px;
      text-align: center;
    }
  }
}
</style>
