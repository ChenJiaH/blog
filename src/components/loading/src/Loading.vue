<template>
  <div class="loading">
    <div class="loading-mask" v-show="show"></div>
    <transition name="fade">
      <div class="loading-cont flex flex-middle flex-center" v-show="show">
        <div>
          <i class="icon"></i>
          <p class="text" v-text="text"></p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { createComponent } from '@vue/composition-api';

export default createComponent({
  props: {
    show: Boolean,
    text: {
      type: String,
      default: '加载中',
    },
  },
  setup() {
  },
});
</script>
<style type="text/scss" lang="scss">
  .loading {
    position: relative;

    &-mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    &-cont {
      position: fixed;
      left: 50%;
      top: 50%;
      margin-top: -49px;
      margin-left: -70px;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 4px;
      width: 140px;
      height: 90px;
      z-index: 19999;
      box-sizing: border-box;
      padding: 0 10px;

      .icon {
        display: block;
        width: 34px;
        height: 34px;
        background: url("../../../assets/css/img/icon-loading.png") no-repeat;
        margin: 0 auto;
        animation: loading-rotate 1.2s linear infinite;
      }

      .text {
        text-align: center;
        color: #ffffff;
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-top: 12px;
      }
    }
  }
</style>
