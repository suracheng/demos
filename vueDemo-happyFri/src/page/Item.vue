<template>
    <div>
      <m-header :fatherComponent="'item'"></m-header>
      <div class="item_back item_container_style">
        <div class="item_list_container">
          <header class="item_title">{{itemDetail[itemNum - 1].topic_name}}</header>
          <ul>
            <li class="item_list" v-for='(item,index) in itemDetail[itemNum - 1].topic_answer' @click='choosed(index, item.topic_answer_id)'>
              <span class="option_style" :class="{'has_choosed':choosedNum==index}">{{chooseType(index)}}</span>
              <span class="option_detail">{{item.answer_name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <span class="next_item button_style" v-if='itemNum < itemDetail.length' @click='nextItem'></span>
      <span class="submit_item button_style" v-else @click='submitBtn'></span>
    </div>
</template>
<script>
    import MHeader from '../components/MHeader.vue';
    import {mapState, mapActions} from 'vuex';


    export default {
        data(){
            return {
              choosedNum : null,
              choosedId : null
            }
        },
        created () {
            this.initializeData();
            document.body.style.backgroundImage = 'url(/static/img/1-1.a92218b.jpg)';

        },
        computed: {
          ...mapState([
              'itemNum', //第几题
              'itemDetail', //题目详情
              'timer' //计时器
          ])
        },
        components: {
            MHeader
        },
        methods: {
            ...mapActions(['addNum', 'initializeData']),
            // 0 - 3 对应 A - D 答案
            chooseType (type) {
                switch (type) {
                  case 0:
                      return 'A';
                  case 1:
                      return 'B';
                  case 2:
                      return 'C';
                  case 3:
                      return 'D';
                }
            },
            // 选中答案的信息
            choosed (type, id) {
                this.choosedNum = type;
                this.choosedId = id;
            },
            nextItem () {
                if (this.choosedNum !== null) {
                    this.choosedNum = null;
                    this.addNum(this.choosedId);
                } else {
                    alert('您还没有选择答案哦');
              }
            },
            // 到达最后一题，交卷，请空定时器，跳转分数页面
            submitBtn () {
                if (this.choosedNum !== null) {
                    this.addNum(this.choosedId);
                    clearInterval(this.timer);
                    this.$router.push('/score');
                } else {
                    alert('您还没有选择答案哦');
                }
            }
        }
    }
</script>
<style scoped lang='less'>
  body {
    background: url(../images/1-1.jpg) no-repeat;
  }
  .item_back{
    background-image: url(../images/2-1.png);
    background-size: 100% 100%;
  }
  .button_style{
    display: block;
    height: 2.1rem;
    width: 4.35rem;
    background-size: 100% 100%;
    position: absolute;
    top: 16.5rem;
    left: 50%;
    margin-left: -2.4rem;
    background-repeat: no-repeat;
  }
  .item_container_style{
    height: 11.625rem;
    width: 13.15rem;
    background-repeat: no-repeat;
    position: absolute;
    top: 4.5rem;
    left: 1rem;
  }
  .item_list_container{
    position: absolute;
    height: 7.0rem;
    width: 8.0rem;
    top: 2.4rem;
    left: 3rem;
    -webkit-font-smoothing: antialiased;
  }
  .item_title{
    font-size: 0.65rem;
    color: #fff;
    line-height: 0.7rem;
  }
  .item_list{
    font-size: 0;
    margin-top: 0.4rem;
    width: 10rem;
    span{
      display: inline-block;
      font-size: 0.6rem;
      color: #fff;
      vertical-align: middle;
    }
    .option_style{
      height: 0.725rem;
      width: 0.725rem;
      border: 2px solid #fff;
      border-radius: 50%;
      line-height: 0.725rem;
      text-align: center;
      margin-right: 0.3rem;
      font-size: 0.5rem;
      font-family: 'Arial';
    }
    .has_choosed{
      background-color: #ffd400;
      color: #575757;
      border-color: #ffd400;
    }
    .option_detail{
      width: 7.5rem;
      padding-top: 0.11rem;
    }
  }
  .next_item{
    background-image: url(../images/2-2.png);
  }
  .submit_item{
    background-image: url(../images/3-1.png);
  }

</style>
