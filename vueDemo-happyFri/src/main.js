import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import './common/common.less';
import './config/rem';
import store from './store';


new Vue({
  router,
  store,
  ...App
}).$mount("#app");
