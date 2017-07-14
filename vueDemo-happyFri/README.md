# 说明
>  日常练习仿的小demo

>  非常简单的一个vue2 + vuex的项目，整个流程一目了然，麻雀虽小，五脏俱全。

>  开发环境 macOS 10.12.3  Chrome 59 nodejs 8.10.0

>  这个项目主要用于 vue2 + vuex 的入门练习


## 项目运行（nodejs 6.0+）
``` bash
# 克隆到本地

# 安装依赖
npm install

# 开启本地服务器localhost:8080
npm run dev

# 发布环境
npm run build
```


## 路由配置
```js
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
```



## 配置actions
```js
export default {
	addNum({ commit, state }, id) {
		//点击下一题，记录答案id，判断是否是最后一题，如果不是则跳转下一题
		commit('REMBER_ANSWER', id);
		if (state.itemNum < state.itemDetail.length) {
			commit('ADD_ITEMNUM', 1);
		}
	},
	//初始化信息
	initializeData({ commit }) {
		commit('INITIALIZE_DATA');
	}
}

```


## mutations
```js
export default {
	//点击进入下一题
	[ADD_ITEMNUM](state, payload) {
		state.itemNum += payload.num;
	},
	//记录答案
	[REMBER_ANSWER](state, payload) {
		state.answerid[state.itemNum] = payload.id;
	},
	/*
	记录做题时间
	 */
	[REMBER_TIME](state) {
		state.timer = setInterval(() => {
			state.allTime++;
		}, 1000)
	},
	/*
	初始化信息，
	 */
	[INITIALIZE_DATA](state) {
		state.itemNum = 1;
		state.allTime = 0;
	},
}
```

## 创建store
```js
import Vue from 'vue';
import Vuex from 'vuex';
import {state} from './state';
import {mutations} from './mutations';
import {actions} from './action';
Vue.use(Vuex)

const state = {
	level: '第一周',
	itemNum: 1,
	allTime: 0,
	timer: '',
	itemDetail: [],
	answerid: {}
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})
```


## 创建vue实例
```js
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
```

