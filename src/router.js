import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/archives',
      name: 'archives',
      component: () => import(/* webpackChunkName: "archives" */ './views/Archives.vue'),
    },
    {
      path: '/archives/:id',
      name: 'archiveDetails',
      component: () => import(/* webpackChunkName: "archiveDetails" */ './views/Details.vue'),
    },
    {
      path: '/labels',
      name: 'labels',
      component: () => import(/* webpackChunkName: "labels" */ './views/Labels.vue'),
    },
    {
      path: '/links',
      name: 'links',
      component: () => import(/* webpackChunkName: "labels" */ './views/Links.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/board',
      name: 'board',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "board" */ './views/Board.vue'),
    },
    {
      path: '/search',
      name: 'search',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "search" */ './views/Search.vue'),
    },
    {
      path: '*',
      beforeEnter: () => {
        router.replace('/archives');
      },
    },
  ],
});

export default router;
