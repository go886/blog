<template>
  <div class="root">
    <el-collapse  class="collapse" v-model="activeName" accordion>
      <el-collapse-item 
          v-for="info in list" 
          :key="info.year" 
          :title="info.year" 
          :name="info.year">
          <div class="pannel">
             <el-steps direction="vertical">
              <el-step 
                  v-for="post in info.list" 
                  :key="post.id" 
                  :title="$store.gmtDateFormatter(post.add_time)"
                  :description="post.title" 
                  icon="el-icon-date">
              </el-step>
            </el-steps>
            <!-- <ui v-for="post in info.list" :key="post.id">{{post.title}}</ui> -->
          </div>
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
      activeName: null
    };
  },
  created() {
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
          res.list.forEach(e => {
            const year = new Date(e.add_time).getFullYear();
            let map = yearsMap[year];
            if (!map) {
              map = { year, list: [] };
              yearsMap[year] = map;
              list.push(map);
              if (!this.activeName) this.activeName = year;
            }

            map.list.push(e);
          });

          console.log(list);

          this.list = list;
          this.total = res.total;
          this.page = res.page;
        }
      });
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
}
.pannel {
  display: flex;
  flex-direction: column;
}
</style>
