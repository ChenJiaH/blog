<template>
  <div class="page-search">
    <div class="search flex flex-middle">
      <i class="iconfont icon-search"></i>
      <input class="flex-item" type="text" placeholder="search" v-model="search" @input="onInput"/>
    </div>
    <div class="tips" v-if="archives.totalCount">
      <p v-text="`共 ${archives.totalCount} 条搜索结果`"></p>
    </div>
    <ul class="archives">
      <li class="archive" v-for="archive in archives.list" :key="archive.number">
        <router-link :to="`/archives/${archive.number}`" v-text="archive.title" :title="archive.title"></router-link>
        <p v-text="archive.bodyText"></p>
      </li>
    </ul>
    <div class="auxi flex flex-middle flex-center" v-if="archives.none">
      <i class="iconfont icon-none"></i>
      <span>目前就这么多啦~</span>
    </div>
    <template v-else>
      <template v-if="archives.loading">
        <div class="auxi flex flex-middle flex-center">
          <i class="iconfont icon-loading"></i>
          <span>正在加载中</span>
        </div>
      </template>
      <template v-else>
        <div class="flex flex-middle flex-center" v-if="archives.totalCount">
          <a class="btn-next flex flex-middle flex-center" href="javascript:;" @click="getData">加载更多</a>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
import {
  ref,
  reactive,
} from '@vue/composition-api';
import { debounce } from '../utils/utils';

export default {
  setup(props, context) {
    const search = ref('');
    const archives = reactive({
      list: [],
      labels: [],
      totalCount: 0,

      cursor: null,
      loading: false,
      none: false,
    });

    const getData = () => {
      archives.loading = true;
      const query = `query {
        search(query: "${search.value} repo:ChenJiaH/blog", type: ISSUE, first: 10, after: ${archives.cursor}) {
          issueCount
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            ... on Issue {
              title
              bodyText
              number
            }
          }
        }
      }`;
      context.root.$http(query).then((res) => {
        archives.loading = false;
        const { nodes, pageInfo, issueCount } = res.search;
        if (!pageInfo.hasNextPage) {
          archives.none = true;
        }
        archives.cursor = pageInfo.endCursor;
        archives.list = archives.list.concat(nodes);
        archives.totalCount = issueCount;
      });
    };

    const resetData = () => {
      archives.cursor = null;
      archives.loading = false;
      archives.none = false;
      archives.list = [];
      archives.totalCount = 0;
    };

    const onInput = debounce(() => {
      resetData();
      if (search.value && !archives.loading) {
        getData();
      }
    }, 300);


    return {
      getData,
      onInput,
      search,
      archives,
    };
  },
};
</script>
<style lang="scss" scoped>
  .pc-mode {
    .page-search {
      .search {
        margin-left: 20px;

        &:before {
          content: '';
          position: absolute;
          left: -22px;
          top: 50%;
          margin-top: -4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #dddddd;
        }
      }

      .archives {
        padding-left: 20px;

        .archive a {
          &:before {
            content: '';
            position: absolute;
            left: -22px;
            top: 50%;
            margin-top: -4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #dddddd;
          }
        }
      }
    }
  }

  .page-search {
    .search {
      position: relative;
      max-width: 400px;
      background-color: #f0f0f0;
      height: 36px;
      border-radius: 18px;
      padding: 0 16px;

      i {
        font-size: $sizeMedium;
        margin-left: -8px;
        margin-right: 8px;
      }

      input {
        position: relative;
        height: 100%;
        background-color: transparent;
        border: none;
        font-size: $sizeMedium;
        color: $mainStrong;
      }
    }

    .archives {
      margin-top: 32px;
      margin-bottom: 16px;

      .archive {
        position: relative;

        a {
          display: block;
          position: relative;
          font-size: $sizeMedium;
          font-weight: bold;
          color: $mainStrong;
          line-height: 1.5;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          transition: all 0.5s;

          &:hover {
            color: #1abc9c;
          }
        }

        p {
          color: #555555;
          font-size: $sizeNormal;
          line-height: 1.5;
          max-height: 96px;
          margin-top: 16px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
          word-break: break-all;
        }
      }

      .archive + .archive {
        margin-top: 32px;
      }
    }

    .tips {
      position: relative;
      margin-left: 20px;
      margin-top: 16px;

      p {
        font-size: $sizeNormal;
        color: #999999;
      }
    }

    .auxi {
      color: #cccccc;
      font-size: $sizeSmall;
      line-height: 32px;
      margin-top: 8px;

      i {
        margin-right: 8px;
      }

      .icon-loading {
        animation: loading-rotate 1.2s linear infinite;
      }
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
