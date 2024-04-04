<script setup>
import { ref, defineExpose, defineEmits } from 'vue'
import { artAddChannelService, artEditChannelService } from '@/api/article.js'
const emit = defineEmits(['success'])
const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  id: '',
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: blur },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'change'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: blur },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类名必须是1-15位的字母或数字',
      trigger: 'change'
    }
  ]
}

const onSubmit = async () => {
  //提交前校验
  await formRef.value.validate()
  if (formModel.value.id) {
    await artEditChannelService(formModel.value)
  } else {
    await artAddChannelService(formModel.value)
  }
  ElMessage({
    type: 'success',
    message: formModel.value.id ? '编辑成功' : '添加成功'
  })
  emit('success')
  dialogVisible.value = false
}
//组件对外暴露一个open方法，基于open传来的参数，区分到底是添加还是编辑
// open({id,cate_name,...})说明是编辑
// open调用后，打开弹窗
const open = (row) => {
  //   console.log(row)
  //   formModel.value = row
  //使用扩展运算符解决拷贝的问题（弹窗数据改变，表格也改变），但注意不支持深拷贝
  formModel.value = { ...row } //添加-->重置了表单内容，编辑--->存储了需要回显的数据
  dialogVisible.value = true
}
const cancel = () => {
  formModel.value = {}
  dialogVisible.value = false
  console.log('cancel')
}
//向外暴露方法
defineExpose({
  open
})
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="500"
  >
    <el-form
      ref="formRef"
      style="max-width: 400px; padding-right: 30px"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name" placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias" placeholder="请输入分类别名" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
