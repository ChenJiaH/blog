<template>
  <div class="page-archives">
    page-archives
  </div>
</template>
<script>
import {
  ref,
} from '@vue/composition-api';

export default {
  setup(props, context) {
    console.log(props, context);
    const cursorRef = ref(null);

    const query = `query {
        repository(owner:"ChenJiaH", name: "blog") {
          issues(orderBy:{field: CREATED_AT, direction: DESC} , labels: null, first: 10, after: ${cursorRef.value}) {
            nodes{
              author {
                avatarUrl
                login
              }
              title
              updatedAt
              bodyText
              number
              url
              comments {
                totalCount
              }
            }
            pageInfo{
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
            totalCount
          }
          labels(first: 100){
            nodes{
              name
            }
          }
        }
      }`;

    console.log(query);
    // const getData = async () => {
    //   context.root.$loading.show('查询中...');
    //   const data = await context.root.$http(query);
    //   console.log(data);
    // };

    // getData()
  },
};
</script>
