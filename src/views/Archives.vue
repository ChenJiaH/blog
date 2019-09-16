<template>
  <div class="page-archives">
    <div class="list">
      <div class="item" v-for="year in years" :key="year.year">
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
    <div class="auxi flex flex-middle flex-center" v-if="none">
      <i class="iconfont icon-none"></i>
      <span>目前就这么多啦~</span>
    </div>
    <template v-else>
      <template v-if="loading">
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
  ref,
  reactive,
} from '@vue/composition-api';
import { formatTime, getZodiac } from '../utils/utils';

export default {
  setup(props, context) {
    console.log(props, context);
    const endCursor = ref(null);
    const loading = ref(false);
    const none = ref(false);
    const years = reactive([]);
    const archives = reactive([]);
    const hash = {};

    const getData = () => {
      loading.value = true;
      const query = `query {
          repository(owner: "ChenJiaH", name: "blog") {
            issues(orderBy: {field: CREATED_AT, direction: DESC}, labels: null, first: 10, after: ${endCursor.value}) {
              nodes {
                title
                createdAt
                updatedAt
                lastEditedAt
                publishedAt
                number
                url
                comments(first: null) {
                  totalCount
                }
              }
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
              }
              totalCount
            }
          }
        }`;
      context.root.$http(query).then((res) => {
        loading.value = false;
        const { nodes, pageInfo } = res.repository.issues;
        if (!pageInfo.hasNextPage) {
          none.value = true;
        }
        endCursor.value = pageInfo.endCursor;

        nodes.forEach((_) => {
          const year = parseFloat(_.createdAt.substr(0, 4));
          if (hash[year]) {
            years[years.length - 1].archives.push(Object.assign({}, _));
          } else {
            hash[year] = true;
            years.push({
              year,
              archives: reactive([Object.assign({}, _)]),
            });
          }
        });
      });
    };

    getData();

    return {
      formatTime,
      getZodiac,

      archives,
      loading,
      none,
      getData,
      years,
    };
  },
};
</script>
<style lang="scss" scoped>
  .pc-mode {
    .page-archives {
      .list .item {
        padding-left: 20px;

        &-name {
          &:before {
            content: '';
            position: absolute;
            top: 50%;
            left: -18px;
            width: 8px;
            height: 8px;
            margin-top: -8px;
            margin-left: -4px;
            border-radius: 50%;
            background-color: #dddddd;
          }
        }

        &:nth-child(5n + 1) {
          .item-name {
            &:before {
              background-color: #1abc9c;
            }
          }
        }

        &:nth-child(5n + 2) {
          .item-name {
            &:before {
              background-color: #3498db;
            }
          }
        }

        &:nth-child(5n + 3) {
          .item-name {
            &:before {
              background-color: #9b59b6;
            }
          }
        }

        &:nth-child(5n + 4) {
          .item-name {
            &:before {
              background-color: #e67e22;
            }
          }
        }

        &:nth-child(5n + 5) {
          .item-name {
            &:before {
              background-color: #e74c3c;
            }
          }
        }
      }
    }
  }

  .mobile-mode {
    .page-archives {
    }
  }

  .page-archives {
    .list {
      .item {
        &-name {
          position: relative;

          a, i {
            font-size: 20px;
            color: #222222;
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
            line-height: 44px;

            span {
              font-size: 12px;
              color: #888888;
              white-space: nowrap;
              margin-right: 4px;
            }

            a {
              font-size: 16px;
              color: #333333;
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
      font-size: 12px;
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
