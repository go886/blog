<template>
  <div id="app">
      <!-- <Header class='header'/> -->
      <div class="content">
        <div class='contentleft'>
           <transition name="fade" mode="out-in">
            <router-view></router-view>
            </transition>
        </div>
        <!-- <div class="side">
          <Sider />
        </div> -->
      </div>
      <!-- <Footer class='footer'/> -->
  </div>
</template>

<script>
// import Header from "@/components/Header";
// import Sider from "@/components/Sider";
// import Footer from "@/components/Footer";

export default {
  name: "app",
  components: {
    // Header,
    // Sider,
    // Footer
  }
};
</script>

<style>
html {
  height: 100%;
}
body {
  min-height: 100%;
  display: flex;
  flex-direction: column;

  margin: 0px;
  padding: 0px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
#app {
  color: #2c3e50;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.header {
  height: 60px;
  line-height: 60px;
  background: #20a0ff;
}
.content {
  /* display: flex;
  position: absolute; */
  /* top: 60px;
  bottom: 0px; */
  flex: 1;
  display: flex;
  /* background: yellowgreen; */
}
.footer {
  height: 45px;
  line-height: 45px;
  background: gray;
}
.contentleft {
  /* background-color: blue; */
  flex: 1;
  padding: 20px;
  display: flex;
}
.side {
  /* background-color: red; */
  width: 300px;
}
</style>
