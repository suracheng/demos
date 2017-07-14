import Vue from 'vue';
import Router from 'vue-router';
import Home from '../page/Home.vue';
import Item from '../page/Item.vue';
import Score from '../page/Score.vue';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/item',
      component: Item
    },
    {
      path: '/score',
      component: Score
    },
    {
      path: '*',
      redirect : '/home'
    }
  ]
})
