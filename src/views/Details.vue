<template>
  <div class="page-details">
    <h4 class="title" v-text="issue.title"></h4>
    <div class="labels flex flex-middle">
      <div class="label" v-for="label in issue.labels" :key="label.name" v-text="label.name" :style="{'background-color': `#${label.color}`, 'color': `${isLightColor(label.color) ? '#000000' : '#ffffff'}`}"></div>
    </div>
    <div class="markdown-body">
      <p class="cont" v-html="issue.bodyHTML"></p>
    </div>
    <div id="comment"></div>
  </div>
</template>
<script>
import {
  reactive,
  onMounted,
} from '@vue/composition-api';
import { isLightColor, formatTime } from '../utils/utils';

export default {
  setup(props, context) {
    const issue = reactive({
      title: '',
      bodyHTML: '',
      labels: [],
    });
    const { id } = context.root.$route.params;
    const getData = () => {
      context.root.$loading.show('努力为您查询');
      const query = `query {
          repository(owner: "ChenJiaH", name: "blog") {
            issue(number: ${id}) {
              title
              bodyHTML
              labels (first: 10) {
                nodes {
                  name
                  color
                }
              }
            }
          }
        }`;
      context.root.$http(query).then((res) => {
        const { title, bodyHTML, labels } = res.repository.issue;
        issue.title = title;
        issue.bodyHTML = bodyHTML;
        issue.labels = labels.nodes;
      });
    };

    getData();

    const initComment = () => {
      const utterances = document.createElement('script');
      utterances.type = 'text/javascript';
      utterances.async = true;
      utterances.setAttribute('issue-number', id);
      utterances.setAttribute('theme', 'github-light');
      utterances.setAttribute('repo', 'ChenJiaH/blog');
      utterances.crossorigin = 'anonymous';
      utterances.src = 'https://utteranc.es/client.js';

      document.getElementById('comment').appendChild(utterances);
    };

    onMounted(() => {
      initComment();
    });

    return {
      formatTime,
      isLightColor,
      issue,
    };
  },
};
</script>
<style lang="scss" scoped>
  .pc-mode {
    .page-details {
      .title { padding-left: 20px;}
      .labels { padding-left: 20px;}
    }
  }
  .page-details {
    .title { font-size: 24px; font-weight: bold; line-height: 32px; color: $mainStrong;}
    .labels { margin-top: 16px;
      .label { padding: 0 8px; font-size: 14px; line-height: 24px; border-radius: 3px; box-shadow: inset 0 -1px 0 rgba(27,31,35,0.12); margin-right: 8px; margin-bottom: 8px;}
    }
  }
</style>
