<template>
    <div>
      <header class="top_tips">
        <span class="num_tip" v-if=" fatherComponent == 'home'">{{level}}</span>
        <span class="num_tip" v-else>题目{{itemNum}}</span>
      </header>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    export default {
        props : ['fatherComponent'],
        data(){
            return {}
        },
        computed: {
          ...mapState([
            'itemNum', //第几题
            'level' //第几周
          ])
        },
        components: {},
        methods: {}
    }
</script>
<style scoped lang="less">
  .top_tips {
    position: absolute;
    height: 7.35rem;
    width: 3.25rem;
    top: -1.3rem;
    right: 1.6rem;
    background: url(../images/WechatIMG2.png) no-repeat;
    background-size: 100% 100%;
    z-index: 10;
    .num_tip {
      position: absolute;
      left: 0.48rem;
      bottom: 1.1rem;
      height: 0.7rem;
      width: 2.5rem;
      font-size: 0.6rem;
      font-family: '黑体';
      font-weight: 600;
      color: #a57c50;
      text-align: center;
    }
  }
</style>
