<script setup>
import { ref, defineExpose } from 'vue'
const dialogVisible = ref(false)

//组件对外暴露一个open方法，基于open传来的参数，区分到底是添加还是编辑
// open({})表单无需渲染，说明是添加
// open({id,cate_name,...})说明是编辑
// open调用后，打开弹窗
const open = (row) => {
  console.log(row)
  dialogVisible.value = true
}
//向外暴露方法
defineExpose({
  open
})
</script>
<template>
  <el-dialog v-model="dialogVisible" title="添加分类" width="500">
    <div>渲染表单</div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
