<template>
  <div class="header">
        <h1 class="title" v-if="summary == true" >
            <router-link :to="$store.postURL(post)">{{post.title}}</router-link>
        </h1>
        <h1 class="title" v-else >
            {{post.title}}
        </h1>
        <div class="toolbar">
          <i class="fa fa-calendar" >
              <span>{{$store.gmtDateFormatter(post.add_time)}}</span>
          </i>
          <i class="fa fa-eye" v-if="post.pv > 0">
              <span>{{post.pv}}</span>
          </i>
           <router-link :to="$store.cateURL(post)">
              <i class="fa fa-book" >
                <span>{{post.category_title}}</span>
              </i>
           </router-link>
          <i class="fa fa-tag" v-if="post.tags && post.tags.length > 0" style="margin-right:8px;">
              <router-link v-for="tag in post.tags" :key="tag" :to="$store.cateURL(post)">
                  {{tag}}
              </router-link>
          </i>
           
           <a v-if="post.type == 1 && summary !== true" :href="post.source_url">
              <i  class="fa fa-map">
                <span>查看原文</span>
             </i>
           </a>

        </div>
  </div>
</template>

<script>
export default {
  props: ["post", "summary"],
  methods: {
  
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
.header a {
  color: #333;
  text-decoration: none;
}
.header a:hover {
  color: #ff6600;
  /* text-decoration: underline; */
}

.title {
  font-size: 32px;
  line-height: 32px;
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
  font-size: 10px;
  color: #999;
  /* background-color: aqua; */
}

.toolbar span {
  margin-left: 4px;
  margin-right: 14px;
  font-family: Georgia, Palatino, serif;
}
.toolbar a {
  color: #999;
}
.toolbar a:hover {
  color:#111111;
}
</style>
