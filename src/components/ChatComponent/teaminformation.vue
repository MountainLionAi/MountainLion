<!-- 币种历史记录 -->
<template>
    <div class="teaminformation">
        <div class="info">
            <div class="left">
                <img class="coin-img" :src="presetData.coinImageUrl" alt="">
                {{ $t('teaminformation',{coin: presetData.coinName}) }}
            </div>
           
        </div>
        <div class="box">
            <TeaminformationItem  v-for="(item,index) in Team_info" :key="index" :item="item"/>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'
import TeaminformationItem from './TeaminformationItem.vue'
export default {
  name: 'teaminformation',
  props:{
    presetData:{
            type: Object,
            default: null
        },
    },
  setup(props) {
    const presetData = ref(props.presetData)
    const Team_info = ref(presetData.value.Team_info)
    return {
        presetData,
        Team_info
    } 
  },
  components: {
    TeaminformationItem
  },
  methods: {
    
  },
  mounted() {
    
  },
  unmounted() {
    
  },
}
</script>

<style lang="scss" scoped>
.teaminformation{
    width: 100%;
    border-radius: .37rem;
    .info{
            border-radius: .37rem;
            background: #1C1E1F;
            padding: 0.25rem 0.4rem;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            .left{
                display: flex;
                align-items: center;
                img{
                    width: .51rem;
                    margin-right: .2rem;
                }
            }
    }
   
}
.box{
    display: flex;
    flex-wrap: wrap;

}
</style>