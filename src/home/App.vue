<template>
  <div id="app">
      <Header class='header'/>
      <div class="container">
        <div  class="left">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
                </div>

        <Sider />
      </div>
      <Footer class='footer'/>
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
        if (res.setting.tracker) {
          new Function(res.setting.tracker)();
        }
      }
    });
  }
};
</script>

<style scoped>
#app {
  display: flex;
  flex: 1;
  padding-top: 60px;
  flex-direction: column;
  background-color: #f0f2f5;
  overflow: hidden;
  align-items: center;
}
.container {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* max-width: 70%; */
  /* width: 860px;
  min-width: 300px;
  max-width: 860px; */
  /* background-color: antiquewhite; */
}

.left {
  padding: 30px 18px 30px 18px;
  width: 660px;
  max-width: 660px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
}

.footer {
  display: flex;
  flex-direction: row;
  height: 45px;
  min-height: 45px;
  max-height: 45px;
  line-height: 45px;
}
</style>
<style>
body {
  margin: 0px;
  padding: 0px;
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
  color: #333;
  color: #111111;
}
</style>

