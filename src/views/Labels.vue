<template>
  <div class="page-labels">
    <div class="nav flex flex-middle" v-if="archives.labels.length">
      <div class="name flex flex-center flex-middle">标签</div>
      <div class="labels flex-item flex">
        <a class="label flex flex-middle flex-center" :class="[item.name === archives.label && 'active']" href="javascript:;" v-for="item in archives.labels" :key="item.name" v-text="item.name" @click="changeLabel(item)"></a>
      </div>
    </div>
    <div class="list">
      <div class="item">
        <div class="item-name flex flex-middle" v-if="archives.label">
          <p v-text="archives.label"></p>
          <strong class="font-clg" v-text="`( ${archives.totalCount} )`"></strong>
        </div>
        <ul class="archives">
          <li class="archive flex flex-middle" v-for="archive in archives.list" :key="archive.number">
            <span v-text="formatTime(archive.createdAt, 'MM-dd')"></span>
            <router-link :to="`/archives/${archive.number}`" v-text="archive.title" :title="archive.title"></router-link>
            <div class="others flex-item flex-end flex flex-middle">
              <i class="iconfont icon-comment"></i>
              <span v-text="archive.comments.totalCount"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <template v-if="archives.label">
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
          <div class="flex flex-middle flex-center">
            <a class="btn-next flex flex-middle flex-center" href="javascript:;" @click="getData">加载更多</a>
          </div>
        </template>
      </template>
    </template>
  </div>
</template>
<script>
import {
  reactive,
} from '@vue/composition-api';
import { formatTime } from '../utils/utils';

export default {
  setup(props, context) {
    const archives = reactive({
      list: [],
      labels: [],
      label: null,
      totalCount: 0,

      cursor: null,
      loading: false,
      none: false,
    });

    const getData = () => {
      archives.loading = true;
      const query = `query {
          repository(owner: "ChenJiaH", name: "blog") {
            issues(filterBy: {labels: "${archives.label}"}, orderBy: {field: CREATED_AT, direction: DESC}, labels: null, first: 10, after: ${archives.cursor}) {
              nodes {
                title
                createdAt
                number
                comments(first: null) {
                  totalCount
                }
              }
              pageInfo {
                endCursor
                hasNextPage
              }
              totalCount
            }
          }
        }`;
      context.root.$http(query).then((res) => {
        archives.loading = false;
        const { nodes, pageInfo, totalCount } = res.repository.issues;
        if (!pageInfo.hasNextPage) {
          archives.none = true;
        }
        archives.cursor = `"${pageInfo.endCursor}"`;
        archives.list = archives.list.concat(nodes);
        archives.totalCount = totalCount;
      });
    };
    const getLabels = () => {
      context.root.$loading.show('努力为您查询');
      const query = `query {
        repository(owner: "ChenJiaH", name: "blog") {
          labels(first: 100) {
            nodes {
              name
            }
          }
        }
      }`;
      context.root.$http(query).then((res) => {
        archives.loading = false;
        archives.labels = res.repository.labels.nodes;

        if (archives.labels.length) {
          archives.label = archives.labels[0].name;

          getData();
        }
      });
    };


    const resetData = () => {
      archives.cursor = null;
      archives.loading = false;
      archives.none = false;
      archives.list = [];
      archives.totalCount = 0;
    };

    const changeLabel = (item) => {
      if (item.name !== archives.label) {
        archives.label = item.name;
        resetData();
        getData();
      }
    };

    getLabels();


    return {
      formatTime,
      getData,
      changeLabel,

      archives,
    };
  },
};
</script>
<style lang="scss" scoped>
  .pc-mode {
    .page-labels .nav .name { margin-left: -18px;}
  }
  .page-labels {
    .nav { margin-bottom: 24px;
      .name { font-size: $sizeNormal; width: 40px; height: 40px; background-color: #f0f0f0; border-radius: 50%; color: #555555; margin-right: 8px;}
      .labels { flex-wrap: wrap;
        .label { font-size: $sizeSmall; color: #999999; padding: 0 12px; height: 32px; margin-right: 8px; margin-bottom: 8px; border-radius: 15px; background-color: #f6f6f6; transition: all $animateTime;
          &.active, &:hover, &:active { color: $mainStrong; background-color: #f0f0f0;}
        }
      }
    }
    .list {
      .item {
        &-name {
          position: relative;
          height: 32px;
          p, strong {
            font-size: $sizeLarge;
            color: $mainStrong;
          }
          strong { margin-top: 8px;}
        }

        .archives {
          .archive {
            position: relative;
            line-height: 44px;
            span {
              font-size: $sizeSmall;
              color: #888888;
              white-space: nowrap;
              margin-right: 4px;
            }

            a {
              font-size: $sizeMedium;
              color: $mainStrong;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              transition: all 0.5s;

              &:hover,&:active {
                color: #1abc9c;
              }
            }

            .others {
              color: #bbbbbb;
              margin-left: 8px;

              span {
                margin-left: 4px;
                color: #bbbbbb;
              }
            }
          }
        }
      }

      .item + .item {
        margin-top: 40px;
      }
    }
  }
</style>
