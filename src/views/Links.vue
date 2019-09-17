<template>
  <div class="page-links">
    <ul class="links">
      <li>
        <a class="link flex flex-middle" :href="link.url" target="_blank" rel="noopener noreferrer" v-for="(link, index) in links" :key="index">
          <div class="avatar">
            <img :src="link.avatar" alt="" v-if="link.avatar">
          </div>
          <div class="flex-item">
            <h4 class="name" v-text="link.name"></h4>
            <p class="bio" v-text="link.bio"></p>
          </div>
        </a>
      </li>
    </ul>
    <div class="tips flex flex-middle">
      <span class="flex flex-middle flex-center">
        <i class="iconfont icon-mail"></i>
      </span>
      <p>交换友链可以邮件 chenjiahao.xyz@gmail.com</p>
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    return {
      links: [{
        avatar: 'http://forsigner.com/images/avatar.jpg',
        bio: 'Find the bug of the world',
        name: 'Forsigner',
        url: 'http://forsigner.com',
      }, {
        avatar: 'http://forsigner.com/images/avatar.jpg',
        bio: 'Find the bug of the world',
        name: 'Forsigner',
        url: 'http://forsigner.com',
      }],
    };
  },
};
</script>
<style lang="scss" scoped>
  .pc-mode {
    .page-links {
      .links { margin-left: -20px;}
      .tips { margin-left: -10px;}
    }
  }
  .mobile-mode {
    .page-links .links { margin-top: 8px;
      &:before { content: ''; position: absolute; left: 0; right: 0; top: -16px; height: 1px; background-image: linear-gradient(0deg, transparent, #d5d5d5, transparent); background-image: -webkit-linear-gradient(0deg, transparent, #d5d5d5, transparent);}
    }
  }
  .page-links {
    .links { position: relative; margin-bottom: 24px;
      .link {
        .avatar { width: 44px; height: 44px; border-radius: 50%; background-color: #f0f0f0; margin-right: 8px;
          img { width: 100%; height: 100%; border-radius: 50%; overflow: hidden;}
        }
        .name { font-weight: bold; font-size: $sizeMedium; color: $mainStrong; line-height: 24px;}
        .bio { font-size: $sizeNormal; color: #999999; text-overflow: ellipsis; overflow: hidden; line-height: 20px;}
      }
      .link + .link { margin-top: 16px;}
    }
    .tips { min-height: 32px; color: #dddddd; margin-top: 8px;
      span { width: 24px; height: 24px; border-radius: 50%; background-color: #f0f0f0; margin-right: 8px;
        i { font-size: $sizeMedium; color: #ffffff;}
      }
      p { font-size: $sizeMedium; color: #dddddd; line-height: 24px;}
    }
  }
</style>
