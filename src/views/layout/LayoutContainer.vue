<script setup>
import {
  //   Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen
  //   SwitchButton,
  //   CaretBottom
} from '@element-plus/icons-vue'
// import avatar from '@/assets/default.png'
</script>
<template>
  <!-- :default-active="$route.path" 默认高亮的菜单项
router 是否启用 vue - router 模式。 router选项开启，el - menu - item 的index就是点击跳转的路径，可以理解为to
<el-menu-item index="/article/channel"> 菜单项 配置的是访问的跳转路径，配合default-active的值，实现高亮 -->
  <div class="common-layout">
    <el-container class="layout-container">
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="24">
            <div class="el-aside__logo"></div>
            <el-menu
              active-text-color="#ffd04b"
              background-color="#232323"
              :default-active="$route.path"
              text-color="#fff"
              router
            >
              <el-menu-item index="/article/channel">
                <el-icon><icon-menu /></el-icon>
                <span>文章分类</span>
              </el-menu-item>
              <el-menu-item index="/article/manage">
                <el-icon>
                  <Promotion />
                </el-icon>
                <span>文章管理</span>
              </el-menu-item>
              <el-sub-menu index="/user">
                <!-- 多级菜单的标题---具名插槽 -->
                <template #title>
                  <el-icon>
                    <el-icon>
                      <UserFilled />
                    </el-icon>
                  </el-icon>
                  <span>个人中心</span>
                </template>
                <!-- 展开的内容 -->
                <el-menu-item index="/user/profile">
                  <el-icon>
                    <User />
                  </el-icon>
                  <span>基本资料</span></el-menu-item
                >
                <el-menu-item index="/user/avatar">
                  <el-icon>
                    <Crop />
                  </el-icon>
                  <span>更换头像</span></el-menu-item
                >
                <el-menu-item index="/user/password"
                  ><el-icon>
                    <EditPen />
                  </el-icon>
                  <span>重置密码</span></el-menu-item
                >
              </el-sub-menu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
