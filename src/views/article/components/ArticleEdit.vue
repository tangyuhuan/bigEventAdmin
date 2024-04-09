<script setup>
import { ref, defineExpose, defineEmits } from 'vue'
import { artGetInfo, artUpdateInfo, artAddInfo } from '@/api/article'
import { Plus } from '@element-plus/icons-vue'
import ChannelSelect from './ChannelSelect.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
const visibleDrawer = ref(false)

// 组件对外暴露一个方法 open,  基于 open 的参数，初始化表单数据，并判断区分是添加 还是 编辑
// 1. open({ })                   =>  添加操作，添加表单初始化无数据
// 2. open({ id: xx,  ...  })  =>  编辑操作，编辑表单初始化需回显

// {id: 8080, title: '足球训练', pub_date: 'Sun Apr 07 2024 10:35:06 GMT+0800 (Coordinated Universal Time)', state: '已发布', cate_name: '足球22'}

//默认数据
const defaultForm = {
  id: '',
  title: '', //标题
  cate_id: '', //分类id
  content: '', //内容
  cover_img: '', //封面图片，file格式对象
  state: '' //状态
}
//发布-文章接口 + 更新-文章详情接口 的参数对象
const formModel = ref({ ...defaultForm })
const quilContent = ref()
const emit = defineEmits(['success'])
const open = async (row) => {
  visibleDrawer.value = true
  if (row.id) {
    //编辑
    const res = await artGetInfo(row.id)
    console.log(res.data.data)
    formModel.value = res.data.data
    // formModel.value.content = res.data.data.content
    // formModel.value.cate_id = res.data.data.cate_id
    // formModel.value.cover_img = res.data.data.cover_img
  } else {
    //添加
    //添加前要重置formModel数据
    // console.log('添加前要重置formModel数据')
    formModel.value = { ...defaultForm }
    //图片上传img地址、富文本编辑器内容 => 需要手动重置
    imgUrl.value = ''
    //setHTML
    quilContent.value.setHTML('')
    // console.log(formModel.value)
  }
}

//通过defineExpose对外暴露组件的方法
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

const submitForm = async (state) => {
  //将已发布还是草稿状态，存入formModel
  formModel.value.state = state
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  //提交前校验
  await ruleFormRef.value.validate()

  if (formModel.value.id) {
    //编辑
    await artUpdateInfo(fd)
    //通知父组件,编辑成功了
    emit('success', 'edit')
  } else {
    //添加
    await artAddInfo(fd)
    //通知父组件,添加成功了
    emit('success', 'add')
  }
  ElMessage({
    type: 'success',
    message: formModel.value.id ? '编辑成功' : '添加成功'
  })
  visibleDrawer.value = false
}
//图片上传相关逻辑
const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
  console.log(uploadFile)
  //预览图片,uploadFile.raw 是File类型对象
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  //立刻将图片对象，存入formModel.value.cover_img将来用于提交
  formModel.value.cover_img = uploadFile.raw
}
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
      <!-- width="100%" -->
      <el-form-item label="文章分类:" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>

      <el-form-item label="文章封面" prop="cover_img">
        <!-- action就是后台接口地址，请求方式post，请求参数name="file"
        此处需要关闭element-plus的自动上传，不需要配置action等参数
        只要做前端本地预览图片即可，无需在提交前上传图片
        语法：URL.createObjectURL(...)创建本地预览的地址，来预览 -->
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <!-- <el-input v-model="formModel.content" type="textarea" /> -->
        <div class="editor">
          <quill-editor
            v-model:content="formModel.content"
            content-type="html"
            theme="snow"
            ref="quilContent"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('已发布')">
          发布
        </el-button>
        <el-button @click="submitForm('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
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
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
