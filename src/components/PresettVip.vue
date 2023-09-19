<!-- VIP预设问答模块 -->
<template>
  <div class="preset-vip">
    <img src="/@/assets/imgs/dollar.svg" alt="">
    <div class="plus">Plus</div>
    <div class="text">
        {{ lang == 'zh' ? item.topicDesc :  item.topicDescEN}}
        <div class="bgtext">
          {{ lang == 'zh' ? item.topicDesc :  item.topicDescEN}}
        </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'

export default {
  name: 'presetVip',
  props:{
    item: {
        type: Object,
        default:  null
    }
  },
  setup(props) {
    const store = useStore()
    const lang = computed(() => store.state.lang)
    const item = ref(props.item)
    return {
      item,
      lang
    } 
  },
  components: {
    
  },
  methods: {
    
  },
  mounted() {
    
  },
  unmounted() {
    
  },
}
</script>

<style scoped lang='scss'>
.preset-vip{
    width: 100%;
    height: 100%;
    background: #1C1E1F;
    border-radius: .37rem;
    cursor: pointer;
    padding: .8rem .3rem .6rem;
    position: relative;

    img{
      height: 2rem;
      position: absolute;
      top: .6rem;
    }
    .bgtext{
      font-size: .6666rem;
      font-family: Poppins-Bold, Poppins;
      font-weight: bold;
      color: rgba(0,0,0,0);
      line-height: 42px;
      -webkit-text-stroke: 1px rgba(255,255,255,0.11);
      text-stroke: 1px rgba(255,255,255,0.11);
      margin-top: .2rem;
    }
    .plus{
      position: absolute;
      top: .2rem;
      right: .2rem;
      width: 71px;
      height: 32px;
      background: rgba(0,255,102,0.11);
      box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
      border-radius: .148rem;
      font-size: 12px;
      font-family: Poppins-Bold, Poppins;
      font-weight: bold;
      color: #00FF66;
      text-align: center;
      line-height: 32px;
    }
    &:hover{
        box-shadow: 0 2px 12px 0 rgba(255,255,255,.1);
    }
    .text{
        font-size: 14px;
        font-family: Poppins-Medium, Poppins;
        font-weight: 500;
        color: #FFFFFF;
        margin-top: .3rem;
        height: 1.5rem;
        text-align: right;
    }
}
</style>