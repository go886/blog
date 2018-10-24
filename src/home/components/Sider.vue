<template>
  <div class="root">
    <div class="pannel">
      <div >
        <h4>文章分类</h4>
        <li v-for="item in cates" :key="item.id">
        <router-link  :to="'/' + item.name" class='link' >{{item.title }}</router-link>
        </li>
      </div>
      <div  v-if="links.length > 0">
        <h4>友情链接</h4>
        <li v-for="item in links" :key="item.id">
          <a :href="item.url" target="_blank">{{item.name}}</a>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cates: [],
      links: []
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.$http("/api/cate/query").then(res => {
        if (!res.error) {
          this.cates = res;
        }
      });

      this.$http("/api/link/query").then(res => {
        if (!res.error) {
          this.links = res;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  /* background-color: red; */
  /* min-width: 300px;
  max-width: 300px;
  width: 300px; */
  min-width: 100px;
  /* max-width: 220px; */
  display: flex;
  flex-direction: row;
  border-left: 1px solid #eaecef;
}
.pannel {
  /* background-color: blue; */
  padding: 10px;
  /* background-color: aliceblue; */
}
li {
  list-style-type: none;
  margin-left: 12px;
}

a {
  font-size: 13px;
  text-overflow: ellipsis;
}
</style>
