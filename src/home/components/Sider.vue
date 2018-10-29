<template>
  <div class="root">
    <div class="pannel">
      <div >
        <h4>文章分类</h4>
        <li v-for="item in cates" :key="item.id">
        <router-link  :to="'/' + item.name" class='link' >{{item.title }}</router-link>
        </li>
      </div>
      <div  v-if="tags.length > 0">
        <h4>常用标签</h4>
        <div class="tags">
          <router-link v-for="tag in tags" :key="tag.id" :to="'/tag/' + tag.id" class='tag' >
                  {{tag.id}}
          </router-link>
          <!-- <el-tag class="tag" type="info" size="mini" v-for="tag in tags" :key="tag.id">{{tag.id}}</el-tag> -->

        </div>
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
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      links: state => state.config.link.list || [],
      cates: state => state.config.cates.list || [],
      tags: state => state.config.tags.list.sort((a,b)=>{
        return a.add_time > b.add_time;
      }) || []
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  /* background-color: antiquewhite; */
  display: flex;
  flex-direction: row;
  border-right: 1px solid #eaecef;
  white-space: nowrap;
  word-wrap: nowrap;
  overflow: hidden;

  justify-self: flex-end;
}
.pannel {
  /* background-color: blue; */
  padding: 10px;
  /* background-color: aliceblue; */
}
.tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.tag {
  margin-right: 6px;
  margin-bottom: 6px;
  padding: 2px 5px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid rgba(64, 158, 255, 0.2);
  white-space: nowrap;
  color: #909399;
  background-color: hsla(220, 4%, 58%, 0.1);
  border-color: hsla(220, 4%, 58%, 0.2);
  transition: all 0.2s ease-in;
}
.tag:hover {
  color: #ff6600;
  border-color: #ff6600;
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
