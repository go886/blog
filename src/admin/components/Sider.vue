<template>
  <div class="root">
    <el-menu default-active="/"  class="el-menu-vertical-demo" @select="handleSelect" :collapse="isCollapse">
        <el-submenu index="1" >
            <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">内容管理</span>
            </template>
            <el-menu-item v-for="item in managers" :index="item.path" :key="item.path">{{item.name}}</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">设置</span>
            </template>
            <el-menu-item v-for="item in settings" :index="item.path" :key="item.path">{{item.name}}</el-menu-item>
        </el-submenu>
    </el-menu>
  </div>
</template>

<script>
/**
 * 分类
 * 热门
 * 最近更新
 * 搜索
 */
export default {
  data() {
    return {
      isCollapse: false,
      managers: [
        {
          name: "概览",
          path: "/"
        },
        {
          name: "分类",
          path: "/cate"
        },
        {
          name: "文章",
          path: "/post"
        },
        {
          name: "标签",
          path: "/tag"
        },
        {
          name: "链接",
          path: "/link"
        }
      ],
      settings: [
        {
          name: "全局设置",
          path: "/setting"
        },
        {
          name: "用户设置",
          path: "/usersetting"
        }
      ]
    };
  },
  methods: {
    handleSelect(key) {
      this.$router.push({path:key})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
