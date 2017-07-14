
import {ADD_ITEMNUM, REMBER_ANSWER, REMBER_ITEM, INITIALIZE_DATA} from './mutations-type';

export const mutations = {
    // 点击进入下一题
    [ADD_ITEMNUM] (state, num) {
      state.itemNum += num;
    },
    // 记录答案
    [REMBER_ANSWER] (state, id) {
        state.answerid.push(id);
    },
    // 记录做题时间
    [REMBER_ITEM] (state) {
      state.timer = setInterval(() => {
        state.allTime++;
      }, 1000)
    },
    // 初始化信息
    [INITIALIZE_DATA] (state) {
      state.itemNum = 1;
      state.answerid = [];
      state.allTime = 0;
    }

};
