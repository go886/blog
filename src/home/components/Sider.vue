<template>
  <div class="root">
    <div>
        <a href="http://localhost:3000/api/mgr/post/view" target="_blank">view</a>
      </div>
      <div>
        <a href="http://localhost:3000/api/mgr/post/add" target="_blank">post_add</a>
      </div>
            <div>
        <a href="http://localhost:3000/api/mgr/post/first" target="_blank">post_first</a>
      </div>
            <div>
        <a href="http://localhost:3000/api/mgr/post/last" target="_blank">post_last</a>
      </div>
         <div>
        <a href="/login.html" target="_blank">login</a>
      </div>
      <div>
        <a href="/admin.html" target="_blank">admin</a>
      </div>
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
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
