<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>
<template>
  <el-card class="page-container">
    <!-- 通过template包裹需要分发的结构，包成一个整体 -->
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <div class="extra">
          <!-- 具名插槽 -->
          <slot name="extra"></slot>
          <!-- <el-button type="primary">添加分类</el-button> -->
        </div>
      </div>
    </template>
    <!-- 默认插槽 -->
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box; //将border和padding数值包含在width和height之内，这样的好处就是修改border和padding数值盒子的大小不变。

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
