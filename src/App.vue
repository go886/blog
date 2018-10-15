<template>
  <div id="app">
    <el-col :span="24" class="header">
      <Header/>
    </el-col>
    <el-col :span="24" class="main">
       <section class="content">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
            <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>

      <aside class="side">
        <Sider />
      </aside>
    </el-col>
    <el-col :span="24" class="footer">
      <Footer />
    </el-col>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Sider from "@/components/Sider";
import Footer from "@/components/Footer";

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
body {
  margin: 0px;
  padding: 0px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  position: absolute;
  top: 0px;
  bottom: 0px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  height: 60px;
  line-height: 60px;
  background: #20a0ff;
}
.main {
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
.content {
  /* background-color: blue; */
  flex: 1;
}
.side {
  /* background-color: red; */
  width: 300px;
}
</style>
