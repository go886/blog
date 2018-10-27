<template>
  <div ref="root" class="root" :class="btop ? 'fixed' : 'unfixed'">
      <div class="content">
        <div class="item" v-for="item in paths" :key="item.path">
            <router-link :to="item.path" >
                <i :class="'fa fa-lg fa-' + item.icon" />
                <span>{{item.name}}</span>
                </router-link>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      distance: 100,
      btop: false,
      paths: [
        {
          name: "首页",
          path: "/",
          icon: "home"
        },
        {
          name: "存档",
          path: "/achive",
          icon: "archive"
        },
        {
          name: "作品",
          path: "/production",
          icon: "tags"
        },
        {
          name: "关于",
          path: "/about",
          icon: "user"
        }
      ]
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    this.distance = this.$refs["root"].offsetTop;
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      const btop =
        document.body.scrollTop || document.documentElement.scrollTop;
      this.btop = btop >= this.distance;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fixed {
  position: fixed;
  left: 0;
  top: 0px;
  z-index: 9;
  opacity: 1;
  transition: all 0.2s ease-in;
  background-color: #545c64;
}
.root {
  width: 100%;
  /* height: 40px; */
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
}
.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* margin-right: 200px; */
  align-self: stretch;
  align-items: stretch;
  /* background-color: hsla(0, 0%, 100%, 0.65); */
  padding-left: 30px;
}
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin-right: 10px;
}

.fixed >>> .item:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.unfixed .content {
  /* background-color: rgb(15, 25, 50); */
  /* opacity: 0.5; */

  background: hsla(0, 0%, 100%, 0.65);
}
.root >>> span {
  margin-left: 4px;
  vertical-align: middle;
  display: inline-block;
}

.fixed >>> a {
  color: #ccc;
}

.fixed >>> a:hover {
  color: #fff;
}
.fixed >>> span:hover {
  color: #fff;
}
</style>
