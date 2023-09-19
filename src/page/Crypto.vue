<!-- 币种预测 页面显示预设 -->
<template>
  <div class="crypto">
    <div class="normal-box" :class="screenWidth > 800 ? '' : 'mb'">
        <div class="list" v-for="(item,index) in normalList" :key="index" @click="cryptoInfo(item)">
          <PresetItem :item="item" />
        </div>
    </div>
    <div class="line" v-if="vipList.length > 0">
        {{ $t('PLUSfunction') }}
    </div>
    <div class="vip-box" v-if="vipList.length > 0" :class="screenWidth > 800 ? '' : 'mb'">
        <div class="list" v-for="(item,index) in vipList" :key="index" @click="cryptoInfo(item)">
          <PresettVip :item="item"/>
        </div>
      </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { useStore} from 'vuex'
import PresetItem from '/@/components/PresetItem.vue'
import CryptoVip from '/@/components/CryptoVip.vue'
import EventBus from '/@/utils/EventBus.js'
import { useRouter,useRoute } from 'vue-router'
import { getTopics } from '/@/api/api'

export default {
  name: '',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const normalList = ref([])
    const vipList = ref([])
    let coinCode = route.params.coinCode
    const store = useStore()
    const lang = computed(() => store.state.lang)
    //适配
    const screenWidth = computed( () => {
      return store.state.screenWidth
    })
    const cryptoInfo = (item)=> {
      const time = new Date().getTime() + localStorage.getItem('userId')
      router.push({ 
            path: `/chat/${time}`,
            query:{
                type: 'newChat'
            }
        })
      const coin = coinCode
      setTimeout(() => {
        EventBus.$emit('sendMessage', lang.value == 'zh' ? item.topicDesc : item.topicDescEN,{type:item.toPage,code:coin})
      },500)
    }
    const getTopicsHandle = async(coin) => {
      normalList.value = []
      const res = await getTopics({
        type:'coin_page',
        coin: coin
      })
      if(res.code == 200){
        normalList.value = res.data.filter( item => !item.isPlus)
        vipList.value = res.data.filter( item => item.isPlus)
      }
    }
    watch(() => route.params.coinCode, (newCoinCode, oldCoinCode) => {
      getTopicsHandle(newCoinCode)
      coinCode = route.params.coinCode
    })
    onMounted(() =>{
      getTopicsHandle(coinCode)
    })
    return {
      cryptoInfo,
      normalList,
      vipList,
      screenWidth,
    } 
  },
  components: {
    PresetItem,
    CryptoVip
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
.crypto{
  padding-bottom: .4rem;
}
.normal-box,.vip-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &.mb{
    justify-content: center;
    .list{
      width: 100%;
    }
  }
  .list{
    width: 32%;
    margin-bottom: .3rem;
  }
}
.line{
  font-size: .3333rem;
  font-family: Poppins-Bold, Poppins;
  font-weight: bold;
  color: #FFFFFF;
  padding: .8rem 0;
}
</style>