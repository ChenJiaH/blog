<template>
  <div class="page-board">
    <div id="board"></div>
  </div>
</template>
<script>
import {
  onMounted,
} from '@vue/composition-api';

export default {
  setup(props, context) {
    context.root.$loading.show('努力为您查询');

    const initBoard = () => {
      const utterances = document.createElement('script');
      utterances.type = 'text/javascript';
      utterances.async = true;
      utterances.setAttribute('issue-term', '【留言板】');
      utterances.setAttribute('label', ':speech_balloon:');
      utterances.setAttribute('theme', 'github-light');
      utterances.setAttribute('repo', 'ChenJiaH/chenjiah.github.io');
      utterances.crossorigin = 'anonymous';
      utterances.src = 'https://utteranc.es/client.js';

      document.getElementById('board').appendChild(utterances);

      utterances.onload = () => {
        context.root.$loading.hide();
      };
    };

    onMounted(() => {
      initBoard();
    });

    return {
    };
  },
};
</script>
<style lang="scss" scoped>
  .pc-mode .page-board {
    #board { padding-left: 20px;}
  }
</style>
