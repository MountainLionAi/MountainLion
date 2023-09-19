<!-- 资金监控 -->
<template>
    <div class="fundsmonitoring">
      <div class="info">
         <div class="left">
          <img :src="presetData.coinImageUrl" alt="">
          {{ $t('fundsmonitoring',{coin: presetData.coinName}) }}
         </div>
      </div>
      <div class="title">
        {{ $t('fundflow') }}
        <div class="pd" :class="presetData.flow[analysisType].res == 2 ? 'out' : 'in'">
          {{ presetData.flow[analysisType].res == 2 ? $t('Sell') :  $t('Buy')}}
          <img v-if="presetData.flow[analysisType].res == 2" src="/@/assets/imgs/down-icon.svg" alt="">
          <img v-else src="/@/assets/imgs/up-icon.svg" alt="">
        </div>
      </div>
      <div class="fundsmonitoring-mian" :class="screenWidth > 900 ? '' : 'mb'">
        <div class="list">
            <PieFundflow :presetData="presetData.flow"/>
        </div>
        <div class="list">
            <BarPN :presetData="presetData.flow"/>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, watch } from 'vue';
  import { useStore} from 'vuex'
  import PieFundflow from './PieFundflow.vue'
  import BarPN from './BarPN.vue'
  export default {
    name: 'fundsmonitoring',
    props:{
      presetData:{
          type: Object,
          default: null
      },
  },
    setup(props) {
        //适配
        const store = useStore()
        const screenWidth = computed( () => {
            return store.state.screenWidth
        })
        const presetData = ref(props.presetData)
        const analysisType = computed( () => {
          if(store.state.analysisType == 'trend_15m'){
                return 'fund_tracker_15m'
            }
            if(store.state.analysisType == 'trend_1h'){
                return 'fund_tracker_1h'
            }
            if(store.state.analysisType == 'trend_4h'){
                return 'fund_tracker_4h'
            }
            if(store.state.analysisType == 'trend_1d'){
                return 'fund_tracker_1d'
            }
            if(store.state.analysisType == 'trend_7d'){
                return 'fund_tracker_7d'
            }
        })
        return {
            presetData,
            screenWidth,
            analysisType
        } 
    },
    components: {
        PieFundflow,
        BarPN
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
  .fundsmonitoring{
      width: 100%;
      background: #1C1E1F;
      border-radius: .37rem;
      padding: 0.25rem 0.4rem;
      .info{
              display: flex;
              justify-content: space-between;
              margin-bottom: .5rem;
              font-size: 14px;
              flex-wrap: wrap;
              .left{
                  display: flex;
                  align-items: center;
                  margin-top: .2rem;
                  img{
                      width: .51rem;
                      margin-right: .2rem;
                  }
              }
             
      }
      .fundsmonitoring-mian{
        display: flex;
        &.mb{
            display: block;
            .list{
                width: 100%;
                &:last-child{
                    margin-top: .3rem;
                }
            }
        }
        .list{
            width: 50%;
            padding: 0 .3rem;
        }
      }
  }
  .out{
    color: #FA2256;
  }
  .in{
    color: #00FF66;
  }
  </style>