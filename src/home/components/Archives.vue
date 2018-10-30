<template>
  <div class="root">
    <el-collapse  class="collapse" v-model="activeName" >
      <el-collapse-item 
          v-for="info in list" 
          :key="info.year" 
          :title="info.year + ' ('+ info.list.length +')'"
          :name="info.year" >
           <ul class="fa-ul">
              <li v-for="post in info.list" :key="post.id" class="item">
                <!-- <span class="fa fa-minus-square-o icon"></span> -->
                <span class="date">{{$store.gmtDateFormatter(post.add_time, 'MM-DD')}}</span>
                <router-link :to="$store.postURL(post)">{{post.title}}</router-link>
              </li>
            </ul>
      </el-collapse-item>
    </el-collapse>
     <div class="pagination">
    <el-pagination v-if='list.length > 0'
      :page-size="pageSize"
      :current-page.sync="page"  
      layout="total, prev, pager, next"
      :total="total"
      @current-change="onPageChanged"
      background>
    </el-pagination>
   </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageSize: 20,
      page: 1,
      total: 0,
      activeName: []
    };
  },
  watch: {
    $route() {
      this.load();
    }
  },
  created() {
    this.page = parseInt(this.$route.query.page || 1);
    this.load();
  },
  methods: {
    load() {
      this.$http("/api/article/archives", {
        params: {
          pageSize: this.pageSize,
          page: this.page,
          des: false
        }
      }).then(res => {
        if (!res.error) {
          let yearsMap = {};
          let list = [];
          let activeName = [];
          res.list.forEach(e => {
            const year = new Date(e.add_time).getFullYear();
            let map = yearsMap[year];
            if (!map) {
              map = { year, list: [] };
              yearsMap[year] = map;
              list.push(map);
              if (activeName.length < 2) {
                activeName.push(year);
              }
            }

            map.list.push(e);
          });

          this.list = list;
          this.total = res.total;
          this.page = res.page;
          this.activeName = activeName;
        }
      });
    },
    onPageChanged(page) {
      this.$router.push({ query: { page } });
      this.load();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  /* padding: 40px; */
}
.collapse {
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
  border: 0;
}
.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #909399;
}
.icon {
    font-size: 8px;
}
.date {
  font-size: 12px;
  /* color: #ccc; */
  margin-right: 10px;
  margin-left: 4px;
}
.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
