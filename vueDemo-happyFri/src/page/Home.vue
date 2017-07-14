<template>
    <div>
        <m-header :fatherComponent="'home'"></m-header>
        <div class="home_logo item_container_style"></div>
        <router-link to="/item" class="start button_style" ></router-link>
    </div>
</template>
<script>
    import MHeader from '../components/MHeader.vue';

    export default {
        components: {
            MHeader
        }
    }
</script>

<style scoped lang='less'>
  .item_container_style {
    height: 11.625rem;
    width: 13.15rem;
    background-repeat: no-repeat;
    position: absolute;
    top: 4.1rem;
    left: 1rem;
  }
  .home_logo {
    background: url(../images/1-2.png) no-repeat right center;
    background-size: 13.142rem 100%;
  }
  .button_style {
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
  .start {
    background-image: url(../images/1-4.png);
  }


</style>
