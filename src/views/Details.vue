<template>
  <div class="page-details">
    <div class="markdown-body">
      <h4 v-text="issue.title"></h4>
      <p class="cont" v-html="issue.bodyHTML"></p>
    </div>
  </div>
</template>
<script>
import {
  reactive,
} from '@vue/composition-api';
import { formatTime } from '../utils/utils';

export default {
  setup(props, context) {
    const issue = reactive({
      title: '',
      bodyHTML: '',
    });
    const { id } = context.root.$route.params;
    const getData = () => {
      context.root.$loading.show('努力为您查询');
      const query = `query {
          repository(owner: "ChenJiaH", name: "blog") {
            issue(number: ${id}) {
              title
              bodyHTML
            }
          }
        }`;
      context.root.$http(query).then((res) => {
        const { title, bodyHTML } = res.repository.issue;
        issue.title = title;
        issue.bodyHTML = bodyHTML;
      });
    };

    getData();

    return {
      formatTime,

      issue,
    };
  },
};
</script>
<style lang="scss" scoped>
  .page-details {

  }
</style>
