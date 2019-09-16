<template>
  <div class="page-about">
    <div class="list">
      <div class="item">
        <div class="item-name flex flex-middle">
          <h4>Art系列</h4>
        </div>
        <ul class="projects">
          <li class="project" :class="[item.private && 'private']" v-for="(item, index) in art" :key="index">
            <template v-if="item.private">
              <a class="flex flex-middle" :href="item.url" target="_blank" rel="noopener noreferrer">
                <i class="iconfont icon-github"></i>
                <h4 v-text="item.name" :title="item.name"></h4>
              </a>
              <p>暂未开源，敬请期待</p>
            </template>
            <template v-else>
              <a class="flex flex-middle" :class="[item.private && 'private']" :href="item.url" target="_blank" rel="noopener noreferrer">
                <i class="iconfont icon-github"></i>
                <h4 v-text="item.name" :title="item.name"></h4>
                <div class="flex-item flex flex-end">
                  <img :src="`//img.shields.io/github/stars/artFE/${item.name}.svg?style=social`" alt="">
                  <img :src="`//img.shields.io/github/forks/artFE/${item.name}.svg?style=social`" alt="">
                </div>
              </a>
              <p v-text="item.desc"></p>
            </template>
          </li>
        </ul>
      </div>
      <div class="item">
        <div class="item-name flex flex-middle">
          <h4>CNode系列</h4>
        </div>
        <ul class="projects">
          <li class="project" v-for="(item, index) in cnode" :key="index">
            <template v-if="item.private">
              <a class="flex flex-middle" :class="[item.private && 'private']" :href="item.url" target="_blank" rel="noopener noreferrer">
                <i class="iconfont icon-github"></i>
                <h4 v-text="item.name" :title="item.name"></h4>
              </a>
              <p>暂未开源，敬请期待</p>
            </template>
            <template v-else>
              <a class="flex flex-middle" :class="[item.private && 'private']" :href="item.url" target="_blank" rel="noopener noreferrer">
                <i class="iconfont icon-github"></i>
                <h4 v-text="item.name" :title="item.name"></h4>
                <div class="flex-item flex flex-end">
                  <img :src="`//img.shields.io/github/stars/ChenJiaH/${item.name}.svg?style=social`" alt="">
                  <img :src="`//img.shields.io/github/forks/ChenJiaH/${item.name}.svg?style=social`" alt="">
                </div>
              </a>
              <p v-text="item.desc"></p>
            </template>
          </li>
        </ul>
      </div>
      <div class="item">
        <div class="item-name flex flex-middle">
          <h4>JM系列</h4>
        </div>
        <ul class="projects">
          <li class="project" v-for="(item, index) in jm" :key="index">
            <template v-if="item.private">
              <a class="flex flex-middle" :class="[item.private && 'private']" :href="item.url" target="_blank" rel="noopener noreferrer">
                <i class="iconfont icon-github"></i>
                <h4 v-text="item.name" :title="item.name"></h4>
              </a>
              <p>暂未开源，敬请期待</p>
            </template>
            <template v-else>
              <a class="flex flex-middle" :class="[item.private && 'private']" :href="item.url" target="_blank" rel="noopener noreferrer">
                <i class="iconfont icon-github"></i>
                <h4 v-text="item.name" :title="item.name"></h4>
                <div class="flex-item flex flex-end">
                  <img :src="`//img.shields.io/github/stars/ChenJiaH/${item.name}.svg?style=social`" alt="">
                  <img :src="`//img.shields.io/github/forks/ChenJiaH/${item.name}.svg?style=social`" alt="">
                </div>
              </a>
              <p v-text="item.desc"></p>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    return {
      art: [{
        logo: 'https://raw.githubusercontent.com/artFE/art-vue/master/static/logo.png',
        name: 'art-vue',
        desc: 'A component libraries for middle-back development built on Vue 2.x.',
        url: 'https://github.com/artFE/art-vue',
      }, {
        logo: 'https://raw.githubusercontent.com/artFE/art-vue-mobile/master/public/logo.png',
        name: 'art-vue-mobile',
        desc: 'A component libraries for h5 development built on Vue 2.x.',
        url: 'https://github.com/artFE/art-vue-mobile',
      }, {
        logo: 'https://raw.githubusercontent.com/artFE/art-vue-pro/master/public/logo.png',
        name: 'art-vue-pro',
        desc: 'Suitable for most middle-back projects based on art-vue.',
        url: 'https://github.com/artFE/art-vue-pro',
      }, {
        logo: 'https://raw.githubusercontent.com/artFE/art-cli/master/logo.png',
        name: 'art-cli',
        desc: 'A command line tool for quickly initializing projects.',
        url: 'https://github.com/artFE/art-cli',
      }, {
        logo: 'https://raw.githubusercontent.com/artFE/art-templates/master/logo.png',
        name: 'art-templates',
        desc: 'Project template store, it\'s recommended to work with art-cli.',
        url: 'https://github.com/artFE/art-templates',
      }, {
        name: 'art-doc',
        desc: 'A simple and efficient document interface online debugging platform.',
        url: 'https://github.com/artFE/art-doc',
        private: true,
      }],
      jm: [{
        name: 'jmui',
        desc: 'A UI library, includes the most useful widgets/modules in mobile web applications.',
        url: 'https://github.com/ChenJiaH/jmui',
      }, {
        name: 'jm-base',
        desc: 'A universal tool in any surrounding.',
        url: 'https://github.com/ChenJiaH/jm-base',
      }, {
        name: 'jm-mkdirs',
        desc: 'A useful module to make multi-level directories.',
        url: 'https://github.com/ChenJiaH/jm-mkdirs',
      }, {
        name: 'jm-copy-base64',
        desc: 'A useful node_module to copy file by base64.',
        url: 'https://github.com/ChenJiaH/jm-copy-base64',
      }],
      cnode: [{
        name: 'vue-cnode',
        desc: 'A website for cnode written by react&react-router&webpack.',
        url: 'https://github.com/ChenJiaH/vue-cnode',
      }, {
        name: 'react-cnode',
        desc: 'A useful node_module to copy file by base64.',
        url: 'https://github.com/ChenJiaH/react-cnode',
      }],
    };
  },
};
</script>
<style lang="scss" scoped>
  .pc-mode {
    .page-about {
      .projects {
        .project {
          a { margin-left: -26px;}
        }
      }
    }
  }
  .page-about {
    .list {
      .item {
        &-name { position: relative; height: 32px;
          h4 { font-weight: bold; font-size: $sizeLarge; color: $mainStrong; line-height: 1.5;}
        }
      }
      .item + .item { padding-top: 16px;}
    }
    .projects { margin-top: 24px; margin-bottom: 16px;
      .project {
        a { position: relative; cursor: auto;
          h4 { font-size: $sizeMedium; color: $mainStrong; line-height: 1.5; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; transition: all $animateTime; cursor: pointer;
            &:hover { color: #1abc9c;}
          }
          i { color: $main; transition: color $animateTime; cursor: pointer; margin-right: 10px;
            &:hover { color: $mainStrong;}
          }
          img { cursor: pointer; margin-left: 8px;}
        }
        p { color: $main; font-size: $sizeNormal; line-height: 1.5; margin-top: 8px;}
        &.private { cursor: not-allowed; pointer-events: none; opacity: 0.5;}
      }
      .project + .project { margin-top: 24px;}
    }
  }
</style>
