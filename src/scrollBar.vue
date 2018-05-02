<template>
  <div class="scroll-wrapper" :style="{width:width,height:height}">
    <div v-if="isTrackY" class="scroll-track-y" :style="WrapperTracks">
      <div style="width:100%;background-color:rgba(0,0,0,.2);borderRadius:5px;" :style="TrackYstyles" @mousedown="mouseDown">
      </div>
    </div>
    <div ref="wrapper" class="scroll" @scroll="scroll">
      <div ref="content" :style="{
                marginRight:isTrackY?(TrackSize+'px'):0,
                marginBottom:isTrackX?(TrackSize+'px'):0}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      x: 0,
      y: 0,
      //   滑块大小
      sliderSize: null,
      // 包裹区域高度
      wrapperHeight: null,
      // 内容区域高度
      contentHeight: null,
      // 最大滚动距离
      maxScrollY: null,
      mouse: false,
      // 存储监听事件
      // 判断是否有监听事件
      isTime: false,
      time: null //监听事件
    };
  },
  props: {
    data: {
      type: [Array, Number, Object]
    },
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    },
    // y轴滑块容器
    isTrackY: {
      type: Boolean,
      default: true
    },
    //x轴滑块容器
    isTrackX: {
      type: Boolean,
      default: false
    },
    // 滑块容器大小
    TrackSize: {
      type: Number,
      default: 7
    },
    TrackColor: {
      type: String,
      default: "#eee"
    },
    TrackYstyle: {
      type: Object
    },
    WrapperTrack: {
      type: Object
    }
  },
  computed: {
    WrapperTracks() {
      return {
        ...this.WrapperTrack,
        width: this.TrackSize + "px",
        backgroundColor: this.TrackColor
      };
    },
    TrackYstyles() {
      return {
        ...this.TrackYstyle,
        height: this.sliderSize + "px",
        transform: `translateY(${this.y}px)`
      };
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 计算滑块大小
      this.comSlider();
    },
    // 监听滚动事件 并移动滚动条
    scroll(e) {
      this.moveSlider(e.target.scrollTop);
      // 滚动过程中触发函数
      this.$emit("scroll", e);
      // 滚动开始触发函数
      if (!this.isTime) {
        this.$emit("scrollStart", e);
      }
      if (this.isTime) {
        clearTimeout(this.time);
      }
      // 滚动结束触发函数
      this.time = setTimeout(() => {
        this.$emit("scrollEnd", e);
        this.isTime = false;
      }, 300);
      this.isTime = true;
      if (e.target.scrollTop === this.maxScrollY) {
        this.$emit("scrollBottom", e);
      }
      if (e.target.scrollTop === 0) {
        this.$emit("scrollTop", e);
      }
    },
    /**
     * 计算滑块大小 和高度
     * 包裹区域高度
     * 内容区域高度
     * 最大滚动距离
     */
    comSlider() {
      this.wrapperHeight = this.$refs.wrapper.offsetHeight;
      this.contentHeight = this.$refs.content.offsetHeight;
      this.maxScrollY = this.contentHeight - this.wrapperHeight;
      this.sliderSize =
        this.wrapperHeight * this.wrapperHeight / this.contentHeight;
    },
    // 滑块移动
    moveSlider(Top) {
      this.y = (this.wrapperHeight - this.sliderSize) * Top / this.maxScrollY;
    },
    // 鼠标点击滑块移动
    mouseDown(e) {
      let start = e.clientY;
      let y = this.y;
      let a = e.clientY - e.offsetY;
      document.onmousemove = ev => {
        var ev = ev || window.event;
        // 阻止默认事件
        if (ev.preventDefault) {
          ev.preventDefault(); //
        } else {
          window.event.returnValue = false; //IE //注意：这个地方是无法用return false代替的 //return false只能取消元素
        }
        let range = ev.clientY - start + y;
        if (ev.clientY - start < -a) {
          range = 0;
        }
        if (ev.clientY - start > this.wrapperHeight - this.sliderSize - a) {
          range = this.wrapperHeight - this.sliderSize;
        }
        this.moveSlider(range);
        this.y = range;
        this.$refs.wrapper.scrollTop =
          this.y * this.maxScrollY / (this.wrapperHeight - this.sliderSize);
      };
      document.onmouseup = en => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    scrollTo(val) {
      this.moveSlider(val);
      this.$refs.wrapper.scrollTop = val;
    }
  },
  beforeDestroy() {},
  watch: {
    data: {
      handler(val, old) {
        // 数据变化 更新高度
        this.$nextTick(() => {
          this.init();
          this.moveSlider(this.$refs.wrapper.scrollTop);
        });
      }
    }
  }
};
</script>
<style lang="less">
.scroll-wrapper {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  display: block;
  .scroll {
    overflow-y: scroll;
    height: 100%;
    margin: 0;
    margin-right: -17px;
  }
  .scroll-track-y {
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1000;
  }
}
</style>

