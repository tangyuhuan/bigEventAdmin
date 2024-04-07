<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
const formInline = ref({
  user: '',
  region: '',
  date: ''
})
const articleList = ref([
  {
    Id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育'
  },
  {
    Id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: null,
    cate_name: '体育'
  }
])
//编辑逻辑
const onEditArticle = (row) => {
  console.log(row)
}
//删除逻辑
const onDeleteArticle = (row) => {
  console.log(row)
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary">发布文章</el-button>
    </template>
    <!-- 表单区域 -->
    <!-- 通过设置 inline 属性为 true 可以让表单域变为行内的表单域。 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="文章分类:">
        <!-- label 展示给用户看的，value收集起来提交给后台的 -->
        <el-select v-model="formInline.region" placeholder="请选择" clearable>
          <el-option label="新闻" value="110" />
          <el-option label="新闻" value="110" />
          <el-option label="体育" value="137" />
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态:">
        <!-- 后台标记发布状态，就是通过中文标记的，"已发布", "草稿" -->
        <el-select v-model="formInline.region" placeholder="请选择" clearable>
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button @click="onSubmit">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" height="250" style="width: 100%">
      <el-table-column prop="title" label="文章标题">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发表时间"></el-table-column>
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
  </page-container>
</template>

<style lang="scss" scoped>
.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
