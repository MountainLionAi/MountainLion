<template>
  <div class="index">
      <div class="normal-box" :class="screenWidth > 800 ? '' : 'mb'">
        <div class="list" v-for="(item,index) in list" :key="index" @click="cryptoInfo(item)">
          <PresetItem :item="item" />
        </div>
      </div>
      <div class="line" v-if="vipList.length > 0">
        Plus User Prompts
      </div>
      <div class="vip-box" :class="screenWidth > 800 ? '' : 'mb'">
        <div class="list" v-for="(item,index) in vipList" :key="index">
          <PresettVip :text="item.text"/>
        </div>
      </div>
  </div>
</template>

<script>
import PresetItem from '/@/components/PresetItem.vue'
import PresettVip from '/@/components/PresettVip.vue'
import { getTopics } from '/@/api/api'
import { ref, computed, watch,onMounted } from 'vue';
import { useStore} from 'vuex'
import EventBus from '/@/utils/EventBus.js'
import { useRouter } from 'vue-router'

export default {
  name: '',
  setup() {
    const router = useRouter()
    const store = useStore()
    const lang = computed(() => store.state.lang)
    const list = ref(null)
    //适配
    const screenWidth = computed( () => {
      return store.state.screenWidth
    })
    const getTopicsHandle = async() => {
      const res = await getTopics({
        type:'default',
        isPlus: '0'
      })
      if(res.code == 200){
        list.value = res.data.filter( item => item.type == 'default')
      }
    }
    const cryptoInfo = (item)=> {
      const time = new Date().getTime() + localStorage.getItem('userId')
      router.push({ 
            path: `/chat/${time}`,
            query:{
                type: 'newChat'
            }
      })
      setTimeout(() => {
        EventBus.$emit('sendMessage', lang.value == 'zh' ? item.topicDesc : item.topicDescEN)
      },500)
    }
    onMounted(() => {
      getTopicsHandle() 
    })
    return {
        list,
        vipList: [],
        cryptoInfo,
        screenWidth
    } 
  },
  components: {
    PresetItem,
    PresettVip
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
  text-align: center;
  padding: .8rem 0;
}
</style>