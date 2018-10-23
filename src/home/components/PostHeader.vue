<template>
  <div class="header">
        <h1 class="title" v-if="enabledlink == true" >
            <router-link :to="'/' + post.category_name + '/' +post._k">{{post.title}}</router-link>
        </h1>
        <h1 class="title" v-else >
            {{post.title}}
        </h1>
        <div class="toolbar">
            <i class="el-icon-date"/>
            <div class='tool-text'>{{gmtDateFormatter(post.add_time)}}</div>
            <i class="el-icon-document"/>
            <router-link :to="'/' + post.category_name" class='tool-text'>{{post.category_title}}</router-link>
        </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["post", "enabledlink"],
  methods: {
    gmtDateFormatter(time) {
      return moment(time).format("YYYY/MM/DD");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  display: flex;
  flex-direction: column;
  font-family: Georgia, Palatino, serif;
  border-left: 5px solid #6ce26c;
  /* padding-bottom: 5px; */
  padding-left: 5px;
  margin-bottom: 20px;
}
.header a{
  color: #333;
  text-decoration: none;
}
.header a:hover {
  color: #ff6600;
  /* text-decoration: underline; */
}
.title {
  font-size: 42px;
  line-height: 42px;
  color: #111111;
  font-weight: 400;
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
}
.toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 11px;
  color: #999;
  /* background-color: aqua; */
}
.tool-text {
    margin-left: 4px;
    margin-right: 20px;
}
</style>
