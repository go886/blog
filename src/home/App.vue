<template>
  <div id="app">
      <Header class='header'/>
      <div class="container">
        <Sider class="sider"/>
        <div class="content">
          <transition name="fade" mode="out-in">
              <router-view></router-view>
          </transition>
          <!-- <Footer class='footer'/> -->
        </div>
      </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import Sider from "./components/Sider";
import Footer from "./components/Footer";

export default {
  name: "app",
  components: {
    Header,
    Sider,
    Footer
  },
  data() {
    return {
      data: {}
    };
  },
  created() {
    this.$http("/api/blog/query").then(res => {
      this.data = res;
      if (res.setting) {
        document.title = res.setting.name;
      }
    });
  }
};
</script>

<style scoped>
#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #f0f2f5;
  overflow: hidden;
}
.container {
  flex: 1;
  display: flex;
  flex-direction: row;
  /* padding-top: 20px; */
  min-width: 40%;
  max-width: 100%;
  align-self: center;
  /* background-color: bisque; */
}
.sider {
  min-width: 10px;
  max-width: 20%;
  width: 160px;
  padding-left: 50px;
  padding-right: 10px;
  border-right: 1px solid #eaecef;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  min-width: 80%;
  overflow-y: auto;
  /* align-items: center; */
}
.footer {
  /* position: relative; */
  display: flex;
  flex-direction: row;
  height: 45px;
  min-height: 45px;
  max-height: 45px;
  line-height: 45px;
  background: gray;
}
</style>
<style>
html body {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  /* overflow: hidden; */
}
body {
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 0px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  background-color: rgba(0, 0, 0, 0.65);
}
a {
  color: #0099ff;
  text-decoration: none;
}
a:hover {
  color: #ff6600;
  text-decoration: none;
}
h {
  color:#333;
  color: #111111;

}
</style>

