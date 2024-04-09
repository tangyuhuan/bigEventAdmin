<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetChannelService, artDelChannelService } from '@/api/article.js'
import { ref } from 'vue'
import ChannelEdit from './components/ChannelEdit.vue'
const loading = ref(true)
const dialog = ref(null)
const channelList = ref([])
const getList = async () => {
  const res = await artGetChannelService()
  channelList.value = res.data.data
  loading.value = false
  // console.log(channelList.value)
}
getList()
//分类文章删除
const handleDelete = async (index, row) => {
  //ElMessageBox消息弹出框
  await ElMessageBox.confirm('你确认删除该分类信息吗?', '温馨提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await artDelChannelService(row.id)
  ElMessage({
    type: 'success',
    message: '删除成功'
  })
  getList()
  // console.log(index, row)
}
// const handleDelete = (index, row) => {
//   console.log(index, row)
// }
const handleEdit = (index, row) => {
  dialog.value.open(row)
}
const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getList()
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
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
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
