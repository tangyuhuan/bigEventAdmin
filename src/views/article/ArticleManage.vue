<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetManageService } from '@/api/article'
import { formatTime } from '@/utils/format.js'

const articleList = ref([]) //文章列表
const total = ref(0) //总条数
const loading = ref(true)
//定义“获取-文章列表”的请求参数对象
const params = ref({
  pagenum: 1, //当前页
  pagesize: 5, //当前生效的每页条数
  cate_id: '',
  state: ''
})

//编辑逻辑
const onEditArticle = (row) => {
  console.log(row)
}
//删除逻辑
const onDeleteArticle = (row) => {
  console.log(row)
}
//基于params参数，获取文章列表
const onGetList = async () => {
  loading.value = true
  const res = await artGetManageService(params.value)
  // console.log(res.data.data)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}

//进页面初始化列表
onGetList()

//搜索
const onSearch = () => {
  params.value.pagenum = 1
  onGetList()
}
//重置
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  onGetList()
}
//每页条数变化时会触发
const onSizeChange = (val) => {
  // console.log(`${val} items per page`)
  params.value.pageSize = val
  params.value.pagenum = 1
  onGetList()
}
//当前页变化会触发
const onCurrentChange = (val) => {
  // console.log(`current page: ${val}`)
  params.value.pagenum = val
  onGetList()
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary">发布文章</el-button>
    </template>
    <!-- 表单区域 -->
    <!-- 通过设置 inline 属性为 true 可以让表单域变为行内的表单域。 -->
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="文章分类:">
        <!-- label 展示给用户看的，value收集起来提交给后台的  placeholder="请选择" -->
        <!-- Vue2 => v-model是 :value和@input的简写 
        Vue3 => v-model是 :modelValue和@update:modelValue的简写 -->
        <channel-select v-model="params.cate_id"></channel-select>
        <!-- 等价于
        <channel-select v-model:modelValue="params.cate_id"></channel-select> -->
        <!-- Vue3 => v-model:cid 是:cid 和 @update:cid 的简写 -->
        <!-- <channel-select v-model:cid="params.cate_id"></channel-select> -->
      </el-form-item>
      <el-form-item label="发布状态:">
        <!-- 后台标记发布状态，就是通过中文标记的，"已发布", "草稿"  placeholder="请选择" -->
        <el-select v-model="params.state" clearable>
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="文章标题" width="300">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发表时间">
        <!-- prop里只能放直接展示的数据，可通过默认插槽展示日期格式化后数据，展示遵循优先取默认插槽，后取prop的顺序 -->
        <template #default="{ row }">{{ formatTime(row.pub_date) }}</template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="" label="操作">
        <!-- 利用作用域插槽row可以拿到当前行的数据，填充自定义的结构  等价于v-for遍历的item -->
        <template #default="{ row }">
          <el-button
            plain
            type="primary"
            @click="onEditArticle(row)"
            :icon="Edit"
            circle
          />
          <el-button
            plain
            type="danger"
            @click="onDeleteArticle(row)"
            :icon="Delete"
            circle
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <!-- :page-sizes="[2, 3, 5, 10]" 需要包含params.pagesize ,否则会报错 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </page-container>
</template>

<style lang="scss" scoped>
.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
