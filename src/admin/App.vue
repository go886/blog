<template>
  <div id="app">
      <Header class='header'/>
      <div class="content">
         <div class="side">
          <Sider />
        </div>
        <div class='container'>
          <el-breadcrumb separator="/" >
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
           <transition name="fade" mode="out-in">
            <router-view></router-view>
            </transition>
        </div>
       
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
  background-color:#f5f5d5;
}
#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.header {
  height: 60px;
  line-height: 60px;
  background: #20a0ff;
}
.content {
  display: flex;
  position: absolute;
  top: 60px;
  bottom: 45px;
  width: 100%;
}
.footer {
  display: flex;
  position: absolute;
  width: 100%;
  height: 45px;
  line-height: 45px;
  background: gray;
  bottom: 0px;
}
.container {
  /* background-color: blue; */
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
}
.side {
  /* background-color: red; */
  width: 200px;
  display: flex;
}
</style>
