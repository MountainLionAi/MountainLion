<!-- VIP预设问答模块 -->
<template>
  <div class="preset-vip">
    <div class="plus">Plus</div>
    <div class="text">
        {{ text }}
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'

export default {
  name: 'presetVip',
  props:{
    text: {
        type: String,
        default: ''
    }
  },
  setup(props) {
    const text = ref(props.text)
    return {
      text
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
    padding: .8rem .3rem;
    position: relative;
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
        width: 74px;
    }
}
</style>