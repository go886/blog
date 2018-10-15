<template>
  <div class="root">
    <div class='item' v-for="item in paths" :key='item.path'>
      <a :href="item.path" >{{item.name}}</a>
    </div>
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  display: flex;
  flex-direction: row;
}
.item {
  margin-left: 35px;
}
</style>
