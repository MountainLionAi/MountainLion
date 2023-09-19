<!-- 预设问答模块 -->
<template>
  <div class="preset-item">
    <img :src="item.imageUrl" alt="">
    <div class="text">
        {{ lang == 'zh' ? item.topicDesc : item.topicDescEN }}
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'

export default {
  name: 'presetItem',
  props:{
    item:{
        type: Object,
        default: null
    },
   
  },
  setup(props) {
    const store = useStore()
    const lang = computed(() => store.state.lang)

    const item = ref(props.item)
   return {
    lang,
    item
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
.preset-item{
    width: 100%;
    height: 100%;
    background: #1C1E1F;
    border-radius: .37rem;
    text-align: center;
    cursor: pointer;
    padding: .6rem .3rem;
    &:hover{
      box-shadow: 0 2px 12px 0 rgba(255,255,255,.1);
    }
    img{
        width: .9259rem;
        height: .9259rem;
        border-radius: 100px;
    }
    .text{
        font-size: 14px;
        font-family: Poppins-Medium, Poppins;
        font-weight: 500;
        color: #FFFFFF;
        margin-top: .3rem;
    }
}
</style>