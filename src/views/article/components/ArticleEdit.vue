<script setup>
import { ref, defineExpose } from 'vue'
import {
  artGetInfo,
  artGetChannelService,
  artUpdateInfo,
  artAddInfo
} from '@/api/article'
import { Plus } from '@element-plus/icons-vue'
const visibleDrawer = ref(false)

// 组件对外暴露一个方法 open,  基于 open 的参数，初始化表单数据，并判断区分是添加 还是 编辑
// 1. open({ })                   =>  添加操作，添加表单初始化无数据
// 2. open({ id: xx,  ...  })  =>  编辑操作，编辑表单初始化需回显

// {id: 8080, title: '足球训练', pub_date: 'Sun Apr 07 2024 10:35:06 GMT+0800 (Coordinated Universal Time)', state: '已发布', cate_name: '足球22'}

//发布-文章接口 + 更新-文章详情接口 的参数对象
const formModel = ref({
  id: '',
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
})

const open = async (row) => {
  if (Object.keys(row).length === 0) {
    getList()
    visibleDrawer.value = true
  } else {
    // formModel.value = { ...row }
    formModel.value.id = row.id
    formModel.value.title = row.title
    formModel.value.state = row.state
    // console.log(row)
    // console.log(formModel.value)

    const res = await artGetInfo(formModel.value.id)
    console.log(res.data.data)
    formModel.value.content = res.data.data.content
    formModel.value.cate_id = res.data.data.cate_id
    formModel.value.cover_img = res.data.data.cover_img
    getList()
    visibleDrawer.value = true
    console.log(formModel.value)
  }
}
//获取文章分类列表
const channelList = ref([])
const getList = async () => {
  const res = await artGetChannelService()
  channelList.value = res.data.data
  channelList
  console.log(channelList.value)
}

defineExpose({
  open
})
const rules = ref({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 1, max: 20, message: '长度需要在1到20个字符之间', trigger: 'blur' }
  ],
  cate_id: [{ required: true, trigger: 'blur' }],
  cover_img: [{ required: true, trigger: 'blur' }],
  content: [
    { required: true, message: '请输入正文', trigger: 'blur' },
    { min: 1, max: 200, message: '长度需要在1到200个字符之间', trigger: 'blur' }
  ]
})
const ruleFormRef = ref()
const submitForm = async () => {
  //提交前校验
  await ruleFormRef.value.validate()
  if (formModel.value.id) {
    console.log(formModel.value)
    await artUpdateInfo(formModel.value)
  } else {
    await artAddInfo(formModel.value)
  }
  ElMessage({
    type: 'success',
    message: formModel.value.id ? '编辑成功' : '添加成功'
  })

  visibleDrawer.value = false
}

const handleAvatarSuccess = () => {}
const beforeAvatarUpload = () => {}
</script>
<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="formModel"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" />
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <el-select v-model="formModel.cate_id" style="width: 240px">
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.cate_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="formModel.cover_img"
            :src="formModel.cover_img"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <el-input v-model="formModel.content" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          发布
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
