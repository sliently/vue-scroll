<template>
  <div id="app">
    <div class="item">
      <vue-scroll :data="arr" ref="dd" @scroll="fff" @scrollBottom="test" @scrollTop="test2" height="500px" width="100px">
        <div>
          <div v-for="item in arr">{{item}}</div>
        </div>
      </vue-scroll>
    </div>
    <div class="item">
      <vue-scroll :data="arr" ref="dd" height="500px" width="100px" :TrackYstyle="two" :WrapperTrack="twoWapper">
        <div>
          <div v-for="item in arr">{{item}}</div>
        </div>
      </vue-scroll>
    </div>
    <button @click="click">23</button>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      arr: 130,
      one: {
        boxShadow: "0 0 0 5px #999"
      },
      oneWapper: {
        border: "1px solid #000"
      },
      two: { backgroundColor: "#FFF" },
      twoWapper: {
        backgroundColor: "#000",
        borderRadius: "5px"
      }
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
.item {
  height: 500px;
  width: 100px;
  border: 1px solid #000;
  display: inline-block;
}
</style>
