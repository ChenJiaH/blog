
import { GraphQLClient } from 'graphql-request';

import config from '../../config/config';
import Loading from '../components/loading/loading';

const endpoint = 'https://api.github.com/graphql';

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `bearer ${config.tokenA}${config.tokenB}`,
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
});

const Http = (query = {}, variables = {}, alive = false) => new Promise((resolve, reject) => {
  graphQLClient.request(query, variables).then((res) => {
    if (!alive) {
      Loading.hide();
    }
    resolve(res);
  }).catch((error) => {
    Loading.hide();
    reject(error);
  });
});

export default Http;
