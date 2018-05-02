<template>
  <div id="app">
    <div style="height:500px;width:300px;border:1px solid #000;">
      <scroll-bar :data="arr" ref="dd" @scroll="fff" @scrollBottom="test" @scrollTop="test2" height="500px" width="300px" :TrackYstyle="{backgroundColor:'#666'}">
        <div>
          <div v-for="item in arr">{{item}}</div>
        </div>
      </scroll-bar>
    </div>
    <button @click="click">23</button>
  </div>
</template>

<script>
import ScrollBar from "./scrollBar";
export default {
  name: "app",
  components: {
    ScrollBar
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      arr: 30
    };
  },
  mounted() {},
  methods: {
    test(e) {
      console.log("到达底部");
    },
    test2(e) {
      console.log("到达顶部");
    },
    fff(e) {
      console.log("滑动中");
    },
    click() {
      this.arr += 2;
    }
  }
};
</script>

<style lang='less'>
#app {
  padding: 0;
  margin: 0;
}
</style>
