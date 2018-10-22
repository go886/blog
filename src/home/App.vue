<template>
  <div id="app">
      <Header class='header'/>
      <div class="container">
        <div class="content">
          <div class='contentleft'>
            <transition name="fade" mode="out-in">
              <router-view></router-view>
              </transition>
          </div>
          <Sider />
        </div>
        <Footer class='footer'/>
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
  }
};
</script>

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
.header {
  /* height: 70px;
  line-height: 70px; */
  /* background: #20a0ff; */
}
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* padding-top: 20px; */
  /* position: relative;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%; */
  overflow-y: auto;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: row;
  /* background-color: aquamarine; */
  /* align-content: stretch; */
  /* position: relative;
  top: 0px;
  width: 100%;
  height: 100%; */
  overflow-y: auto;
  padding-top: 20px;
  padding-bottom: 50px;
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
.contentleft {
  /* background-color: blue; */
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
