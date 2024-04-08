<script setup>
import { ref, defineExpose } from 'vue'
const visibleDrawer = ref(false)

// 组件对外暴露一个方法 open,  基于 open 的参数，初始化表单数据，并判断区分是添加 还是 编辑
// 1. open({ })                   =>  添加操作，添加表单初始化无数据
// 2. open({ id: xx,  ...  })  =>  编辑操作，编辑表单初始化需回显

const open = (row) => {
  console.log(row)
  visibleDrawer.value = true
}
defineExpose({
  open
})
</script>
<template>
  <el-drawer
    v-model="visibleDrawer"
    title="I have a nested table inside!"
    direction="rtl"
    size="50%"
  >
  </el-drawer>
</template>
