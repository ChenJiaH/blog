<template>
  <div class="page-subscribe">
    <div class="subscribe-box">
      <p>与大多数的订阅不同，您需要安装 <strong>Chrome插件</strong> 来获取最新文章推送。</p>
      <div class="action-box flex flex-middle">
        <a href="https://github.com/ChenJiaH/blog-extension" target="_blank" rel="noopener noreferrer">下载地址</a>
        <a href="https://chenjiahao.xyz/blog/#/archives/40" target="_blank" rel="noopener noreferrer">帮助文档</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
  .pc-mode .page-subscribe {
    .subscribe-box {
      padding-left: 20px;

      p {
        &:before {
          content: '';
          position: absolute;
          top: 50%;
          margin-top: -4px;
          left: -22px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #dddddd;
        }
      }
    }
  }
</style>
<style lang="scss">
  .page-subscribe {
    padding-bottom: 16px;

    p {
      position: relative;
      font-size: $sizeMedium;
      color: $mainStrong;
      line-height: 1.5;
    }

    .action-box {
      margin-top: 16px;

      a {
        position: relative;
        font-size: $sizeNormal;
        color: $mainStrong;
        line-height: 1.5;
        font-weight: bold;
        transition: all $animateTime;

        &:hover, &:active {
          color: #1abc9c;
        }
      }

      a + a {
        margin-left: 24px;

        &:before {
          content: '';
          position: absolute;
          left: -12.5px;
          top: 50%;
          margin-top: -9px;
          width: 1px;
          height: 18px;
          background-color: #dddddd;
        }
      }
    }
  }
</style>
