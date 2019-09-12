<template>
  <div id="app" :class="mode + '-mode'">
    <div class="header">
      <template v-if="mode === 'pc'">
        <div class="breadcrumb">
          <p v-text="name"></p>
          <i class="iconfont icon-location"></i>
        </div>
        <div class="nav flex">
          <a class="nav-item nav-home flex flex-middle flex-center" href="https://chenjiahao.xyz" rel="noopener noreferer">
            <span>盒子</span>
            <i class="iconfont icon-home"></i>
          </a>
          <div class="list flex flex-middle">
            <router-link class="nav-item flex flex-middle flex-center" :to="nav.path" v-for="(nav, index) in navs" :key="index">
              <span v-text="nav.name"></span>
            </router-link>
          </div>
        </div>
      </template>
      <div class="info" :class="[mode === 'pc' ? 'flex flex-middle' : 'flex-center']">
        <a class="avatar" href="javascript:;">
          <img src="img/avatar.png" alt="">
        </a>
        <div class="flex-item">
          <h3>McChen</h3>
          <p>No pain, no gains!</p>
        </div>
      </div>
    </div>
    <div class="main-cont">
      <transition name="multi-fade">
        <router-view/>
      </transition>
    </div>
  </div>
</template>
<script>
import { ref, watch, onBeforeUnmount } from '@vue/composition-api';
import { debounce } from './utils/utils';

export default {
  setup() {
    const navs = [{
      path: '/archives',
      name: '博客',
    }, {
      path: '/labels',
      name: '标签',
    }, {
      path: '/links',
      name: '友链',
    }, {
      path: '/about',
      name: '关于',
    }, {
      path: '/search',
      name: '搜索',
    }];

    const mode = ref('');
    const name = ref('');

    const setMode = () => {
      const w = document.documentElement.clientWidth || document.body.clientWidth;

      mode.value = w > 750 ? 'pc' : 'mobile';
    };

    const handleResize = debounce(() => {
      setMode();
    });

    setMode();

    window.addEventListener('resize', handleResize, 200);


    watch('$route', (to) => {
      const path = navs.find(_ => ~to.path.indexOf(_.path));
      name.value = path ? path.name : '';
    }, { lazy: true });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    return {
      // static
      navs,
      // dynamic
      mode,
      name,
    };
  },
};
</script>
<style lang="scss">
  @import "./assets/css/_main";
  @import "./assets/css/fonts/iconfont.css";
  @import "./assets/css/fonts/calligraffitti-regular-webfont.css";

  #app {
  }

  .pc-mode {
    width: 500px;
    margin: 0 auto;
    padding: 40px 0 80px;
    border-left: 4px solid #f9f9f9;
  }

  .mobile-mode {
    width: 100%;
    padding: 32px 16px 0;
    .header .info { margin-top: 0;
      .avatar { margin-left: auto; margin-right: auto;}
      h3 { margin: 16px 0 4px;}
    }
  }

  .header { padding-bottom: 32px;
    .breadcrumb {
      width: 60px;
      margin-left: -32px;
      text-align: center;

      p {
        font-size: 13px;
        line-height: 17px;
        color: #d0d0d0;
      }

      i {
        font-size: 26px;
        color: #dfdfdf;
        line-height: 32px;
      }
    }

    .nav {
      margin-top: 8px;

      .nav-home {
        margin-left: -22px;

        span {
          font-size: 13px;
        }

        i {
          font-size: 22px;
          color: #999999;
          display: none;
        }

        &:hover {
          span {
            display: none;
          }

          i {
            display: block;
          }
        }
      }

      .nav-item {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #f0f0f0;
        transition: all 0.5s;
        color: #555555;

        &:hover {
          background-color: #dfdfdf;
        }
      }

      .list {
        margin-left: 6px;

        .nav-item + .nav-item {
          margin-left: 6px;
        }

        @for $i from 1 through 5 {
          .nav-item:nth-child(#{$i}) {
            display: none;
            animation: fadeIn 0.8s #{0.1 * ($i - 1)}s both;
          }
        }
      }

      &:hover {
        .list {
          .nav-item {
            display: flex;
          }
        }
      }
    }

    .info {
      margin-top: 16px;
      .avatar {
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
        margin-left: -32px;
        margin-right: 8px;

        img {
          width: 100%;
        }
      }

      h3 {
        font-family: "calligraffitti-regular-webfont";
        font-weight: bold;
        font-size: 24px;
        transition: all 0.2s;
      }

      p {
        font-size: 16px;
        line-height: 19px;
        color: #999999;
        transition: all 0.2s;
      }
    }
  }
</style>
