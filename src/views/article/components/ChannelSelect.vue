<!-- 文章分类组件，用法如下
<el-form-item label="文章分类:">
    <channel-select v-model="params.cate_id"></channel-select>
</el-form-item> -->

<script setup>
import { artGetChannelService } from '@/api/article.js'
import { ref, defineModel, defineProps } from 'vue'
const modelValue = defineModel()
defineProps({
  width: {
    type: String
  }
})
// const width1 = { width: '30%' }
// const props = defineProps({
//   modelValue: [String, Number] //两种类型都支持
// })
// const emit = defineEmits(['update:modelValue'])
const channelList = ref([])
const getList = async () => {
  const res = await artGetChannelService()
  channelList.value = res.data.data
  //   console.log(props)
  //   console.log(channelList.value)
}

getList()
</script>
<template>
  <!-- 注意：由于要封装组件，这里不能用 <el-select v-model
    vv-model是双向绑定，收集数据。此处收集完的数据都是要给到父组件的，el-select关联的数据项一定是由父组件传来的prop值 
    我们需要先定义 props，再定义 emits 。-->
  <!-- Vue2 => v-model是 :value和@input的简写 
    在Vue3中，自定义组件上使用v-model, 相当于传递一个modelValue属性，同时触发 update:modelValue 事件 -->
  <!-- <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    style="width: 240px"
  > -->
  <!-- 固定style  style="width: 100%" -->
  <!-- https://www.jb51.net/article/263547.htm#_lab2_1_3 -->
  <!-- Vue 动态style  :style=" { width:30px } " -->
  <el-select
    :modelValue="modelValue"
    @update:modelValue="modelValue = $event"
    :style="{ width }"
  >
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    />
    <!-- <el-option label="新闻" value="110" />
        <el-option label="体育" value="137" /> -->
  </el-select>
</template>
