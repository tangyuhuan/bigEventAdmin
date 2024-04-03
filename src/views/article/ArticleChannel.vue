<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetChannelService } from '@/api/article.js'
import { ref } from 'vue'
const loading = ref(true)
const channelList = ref([])
const getList = async () => {
  const res = await artGetChannelService()
  channelList.value = res.data.data
  loading.value = false
  console.log(channelList.value)
}
getList()
const handleEdit = (index, row) => {
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column prop="" label="操作" width="250">
        <template #default="scope">
          <el-button
            plain
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            :icon="Edit"
            circle
          />
          <el-button
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            :icon="Delete"
            circle
          />
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </page-container>
</template>

<style lang="scss" scoped></style>
