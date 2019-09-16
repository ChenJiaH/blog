<template>
  <div class="page-links">
    <div class="links">
      <a class="link flex flex-middle" :href="link.url" target="_blank" rel="noopener noreferrer" v-for="(link, index) in links" :key="index">
        <div class="avatar">
          <img :src="link.avatar" alt="" v-if="link.avatar">
        </div>
        <div class="flex-item">
          <h4 class="name" v-text="link.name"></h4>
          <p class="bio" v-text="link.bio"></p>
        </div>
      </a>
    </div>
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
      }],
    };
  },
};
</script>
<style lang="scss" scoped>
  .page-links {
    .links { margin-bottom: 24px;
      .link { margin-left: -20px;
        .avatar { width: 44px; height: 44px; border-radius: 50%; background-color: #f0f0f0; margin-right: 8px;
          img { width: 100%; height: 100%; border-radius: 50%; overflow: hidden;}
        }
        .name { font-weight: bold; font-size: 16px; color: #444444; line-height: 24px;}
        .bio { font-size: 13px; color: #999999; text-overflow: ellipsis; overflow: hidden; line-height: 20px;}
      }
      .link + .link { margin-top: 16px;}
    }
    .tips { height: 32px; color: #dddddd; margin-top: 8px;
      span { width: 24px; height: 24px; border-radius: 50%; background-color: #f0f0f0; margin-right: 8px; margin-left: -10px;
        i { font-size: 16px; color: #ffffff;}
      }
      p { font-size: 16px; color: #dddddd;}
    }

    .btn-next {
      width: 100px;
      height: 32px;
      border: 1px solid #eeeeee;
      border-radius: 16px;
      color: #888888;
      margin-top: 8px;
    }
  }
</style>
