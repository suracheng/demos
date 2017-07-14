/**
 * Created by sura.cheng on 2017/7/12.
 */

let axios = require('axios');

export function getData () {
  return axios.get('/api/data');
}
