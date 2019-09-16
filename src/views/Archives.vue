<template>
  <div class="page-archives">
    <div class="list">
      <div class="item" v-for="year in archives.years" :key="year.year">
        <div class="item-name flex flex-middle">
          <a class="font-clg" href="javascript:;" v-text="year.year"></a>
          <i class="iconfont" :class="[`icon-${getZodiac(year.year)}`]"></i>
        </div>
        <ul class="archives">
          <li class="archive flex flex-middle" v-for="archive in year.archives" :key="archive.number">
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
  </div>
</template>
<script>
import {
  reactive,
} from '@vue/composition-api';
import { formatTime, getZodiac } from '../utils/utils';

export default {
  setup(props, context) {
    const hash = {};

    const archives = reactive({
      years: [],

      cursor: null,
      loading: false,
      none: false,
    });

    const getData = () => {
      archives.loading = true;
      const query = `query {
          repository(owner: "ChenJiaH", name: "blog") {
            issues(orderBy: {field: CREATED_AT, direction: DESC}, labels: null, first: 10, after: ${archives.cursor}) {
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
            }
          }
        }`;
      context.root.$http(query).then((res) => {
        archives.loading = false;
        const { nodes, pageInfo } = res.repository.issues;
        if (!pageInfo.hasNextPage) {
          archives.none = true;
        }
        archives.cursor = pageInfo.endCursor;

        nodes.forEach((archive) => {
          const year = parseFloat(archive.createdAt.substr(0, 4));
          if (hash[year]) {
            archives.years[archives.years.length - 1].archives.push(archive);
          } else {
            hash[year] = true;
            archives.years.push({
              year,
              archives: [archive],
            });
          }
        });
      });
    };

    getData();

    return {
      formatTime,
      getZodiac,
      getData,

      archives,
    };
  },
};
</script>
<style lang="scss" scoped>
  .page-archives {
    .list {
      .item {
        &-name {
          position: relative;
          height: 32px;
          &:before { margin-top: -8px;}
          a, i {
            font-size: 20px;
            color: $mainStrong;
            line-height: 1.5;
          }

          a {
            font-weight: bold;
            margin-right: 8px;
          }

          i {
            margin-top: -6px;
          }
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

              &:hover {
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
