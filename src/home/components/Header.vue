<template>
  <div class="root">
    <el-menu class="el-menu-demo" @select="handleSelect" mode="horizontal" 
    background-color="#545C64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="formatPath($route.path)">
        <el-menu-item v-for="item in paths" :index='item.path' :key="item.path">
          {{item.name}}
        </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      paths: [
        {
          name: "首页",
          path: "/"
        },
        {
          name: "存档",
          path: "/achive"
        },
        {
          name: "作品",
          path: "/production"
        },
        {
          name: "关于",
          path: "/about"
        }
      ]
    };
  },
  methods: {
    formatPath(path) {
      var p = path.split("/")[1];
      return "/" + p;
    },
    handleSelect(key) {
      this.$router.push({ path: key });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  display: flex;
  flex-direction: row;
  /* background-color: #545C64; */
}
.item {
  margin-left: 35px;
}
.el-menu {
  width: 100%;
}
.el-menu-item.is-active {
  background-color: transparent;
}
.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover {
  background-color:#545C64;
}
</style>
