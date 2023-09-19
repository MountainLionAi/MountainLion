<!-- 技术分析 -->
<template>
    <div class="TechnicalAnalysis">
      <div class="info">
         <div class="left">
          <img :src="presetData.coinImageUrl" alt="">
          {{ $t('TechnicalAnalysis',{coin: presetData.coinName}) }}
         </div>
      </div>
      <div class="TechnicalAnalysis-mian" :class="screenWidth > 900 ? '' : 'mb'">
        <div class="list">
            <div class="s-title">
                {{ $t('OscillatorIndicator') }}
            </div>
            <div class="c">
                <div class="chart">
                    <GaugeMain :presetData="presetData" :data="data1"/>
                </div>
                <div class="table">
                    <div class="header">
                        <div class="th left">{{$t('Name')}}</div>
                        <div class="th right">{{$t('Value')}}</div>
                        <div class="th right">{{$t('Action')}}</div>
                    </div>
                    <div class="tbody" v-for="(item,index) in presetData.analyze[analysisType].tech_index.details" :key='index'>
                        <div class="td left">{{item.name}}</div>
                        <div class="td right">{{ item.num }}</div>
                        <div class="td right" :class="[item.val == 1 ? 'green':'' , item.val == -1 ? 'red':'']">{{ item.val == 1 ? $t('Buy') :  item.val == 0 ? $t('Neutral') : $t('Sell') }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="list">
             <div class="s-title">
                {{ $t('MovingAverage') }}
             </div>
             <div class="c">
                <div class="chart">
                    <GaugeMain :presetData="presetData" :data="data2"/>
                </div>
                <div class="table">
                    <div class="header">
                        <div class="th left">{{$t('Name')}}</div>
                        <div class="th right">{{$t('Value')}}</div>
                        <div class="th right">{{$t('Action')}}</div>
                    </div>
                    <div class="tbody" v-for="(item,index) in presetData.analyze[analysisType].ma.details" :key='index'>
                        <div class="td left">{{item.name}}</div>
                        <div class="td right">{{ item.num }}</div>
                        <div class="td right" :class="[item.val == 1 ? 'green':'' , item.val == -1 ? 'red':'']">{{ item.val == 1 ? $t('Buy') :  item.val == 0 ? $t('Neutral') : $t('Sell') }}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, watch } from 'vue';
  import { useStore} from 'vuex'
  import GaugeMain from './GaugeMain.vue'
  import { useI18n } from 'vue-i18n'

  export default {
    name: 'TechnicalAnalysis',
    props:{
      presetData:{
          type: Object,
          default: null
      },
  },
    setup(props) {
        const { t } = useI18n();
        //适配
        const store = useStore()
        const screenWidth = computed( () => {
            return store.state.screenWidth
        })
        const list = ref([])
        const analysisType = computed( () => {
            if(store.state.analysisType == 'trend_15m'){
                return 'tec_analysis_15m'
            }
            if(store.state.analysisType == 'trend_1h'){
                return 'tec_analysis_1h'
            }
            if(store.state.analysisType == 'trend_4h'){
                return 'tec_analysis_4h'
            }
            if(store.state.analysisType == 'trend_1d'){
                return 'tec_analysis_1d'
            }
            if(store.state.analysisType == 'trend_7d'){
                return 'tec_analysis_7d'
            }


        })
        const presetData = ref(props.presetData)
        const data1 = ref([])
        const data2 = ref([])
        const getData = () => {
            if(presetData.value.analyze[analysisType.value].tech_index.val == -2){
                data1.value = [
                    {
                        value: 0.25,
                        name: t('Sell'),
                        date: new Date().getTime()
                    }
                ]
            }else if(presetData.value.analyze[analysisType.value].tech_index.val == -3){
                data1.value = [
                    {
                        value: 0.1,
                        name: t('StrongSell'),
                        date: new Date().getTime()
                    }
                ]
            }else if(presetData.value.analyze[analysisType.value].tech_index.val == 2){
                data1.value = [
                    {
                        value: 0.65,
                        name: t('Buy'),
                        date: new Date().getTime()
                    }
                ]
            }else if(presetData.value.analyze[analysisType.value].tech_index.vall == 3){
                data1.value = [
                    {
                        value: 0.9,
                        name: t('StrongBuy'),
                        date: new Date().getTime()
                    }
                ]
            }else{
                data1.value = [
                    {
                        value: 0.5,
                        name: t('Neutral'),
                        date: new Date().getTime()
                    }
                ]
            }
            if(presetData.value.analyze[analysisType.value].ma.val == -3 || presetData.value.analyze[analysisType.value].ma.val == -4 || presetData.value.analyze[analysisType.value].ma.val == -5){
                data2.value = [
                    {
                        value: 0.25,
                        name: t('Sell')
                    }
                ]
            }else if(presetData.value.analyze[analysisType.value].ma.val == -6||presetData.value.analyze[analysisType.value].ma.val == -7||presetData.value.analyze[analysisType.value].ma.val == -8){
                data2.value = [
                    {
                        value: 0.1,
                        name: t('StrongSell')
                    }
                ]
            }else if(presetData.value.analyze[analysisType.value].ma.val == 3 || presetData.value.analyze[analysisType.value].ma.val == 4 ||presetData.value.analyze[analysisType.value].ma.val == 5){
                data2.value = [
                    {
                        value: 0.65,
                        name: t('Buy')
                    }
                ]
            }else if(presetData.value.analyze[analysisType.value].ma.vall == 6 || presetData.value.analyze[analysisType.value].ma.vall == 7 || presetData.value.analyze[analysisType.value].ma.vall == 8){
                data2.value = [
                    {
                        value: 0.9,
                        name: t('StrongBuy')
                    }
                ]
            }else{
                data2.value = [
                    {
                        value: 0.5,
                        name: t('Neutral')
                    }
                ]
            }
        }
        getData()
        watch(() => analysisType.value,()=> {
            getData()
        })
        return {
            list,
            screenWidth,
            presetData,
            analysisType,
            data1,
            data2
        } 
    },
    components: {
        GaugeMain
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
  .TechnicalAnalysis{
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
      .TechnicalAnalysis-mian{
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
            padding: 0 .8rem;
        }
      }
      .table{
            width: 100%;
            .header{
                display: flex;
                margin-top: .3rem;
                .th{
                    flex: 1;
                    font-size: 12px;
                    font-family: Poppins-Regular, Poppins;
                    font-weight: 400;
                    color: #777777;
                    height: .4rem;
                    line-height: .4rem;
                    text-align: center;
                    &.right{
                        text-align: right;
                    }
                    &.left{
                        text-align: left;
                    }
                }
            }
            .tbody{
                display: flex;
                .td{
                    flex: 1;
                    font-size: 12px;
                    font-family: Poppins-Regular, Poppins;
                    font-weight: 400;
                    color: #FFFFFF;
                    height: .7rem;
                    line-height: .7rem;
                    text-align: center;
                    &.right{
                        text-align: right;
                    }
                    &.left{
                        text-align: left;
                    }
                }
            }
        }
  }
.green{
    color: #00FF66!important;
}
.red{
    color: #FA2256!important;
}
  </style>