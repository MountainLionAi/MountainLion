<!-- 历史记录 -->
<template>
    <div class="trendassessment">
      <div class="info">
         <div class="left">
          <img :src="presetData.coinImageUrl" alt="">
          {{ $t('trendassessment',{coin: presetData.coinName}) }}
         </div>
         <div class="right">
              <div class="tab">
                  <div class="list" @click="changeSearchType('trend_15m')" :class="analysisType == 'trend_15m' ? 'active' : ''">
                      {{$t('shiwufen')}}
                  </div>
                  <div class="list" @click="changeSearchType('trend_1h')" :class="analysisType == 'trend_1h' ? 'active' : ''">
                      {{$t('yixiaoshi')}}
                  </div>
                  <div class="list" @click="changeSearchType('trend_4h')" :class="analysisType == 'trend_4h' ? 'active' : ''">
                      {{$t('sixiaoshi')}}
                  </div>
                  <div class="list" @click="changeSearchType('trend_1d')" :class="analysisType == 'trend_1d' ? 'active' : ''">
                      {{$t('yitian')}}
                  </div>
                  <div class="list" @click="changeSearchType('trend_7d')" :class="analysisType == 'trend_7d' ? 'active' : ''">
                      {{$t('qitian')}}
                  </div>
              </div>
         </div>
      </div>
      <div class="Gauge-mian" :class="screenWidth > 900 ? '' : 'mb'">
        <div class="list">
            <GaugeMain :presetData="presetData" :data="data1"/>
        </div>
        <div class="list">
            <div class="text">
                {{ $t('TrendAssessmentText',{
                    time: getTimeText(),
                    name: getNameText(),
                    val1: val1 == 1 ? '>' : '<',
                }) }}
                <template v-if="val4.length > 0">
                    {{ $t('val3Text', {
                    val2: val2 == 1 ? '>' : '<',
                    val3: val1 == 1 ? $t('Ascending') : $t('Descending'),

                    }) }}
                </template>
                {{ $t('normalText') }}
                <br>
                <!-- 根据多项指标的结果综合，判定现在行情在4h级别下，为买入， 目前资金流入小于流出>流出， 技术面上看，目前大趋势方向暂未形成共识; 短期行情暂未形成共识，建议观望等待行情明朗; 目前行情力量较强，请注意合理控制风险。 -->
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
    name: 'trendassessment',
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
        const analysisType = computed( () => {
            return store.state.analysisType
        })
        const changeSearchType = (val) => {
            store.commit('setAnalysisType',val)
        }
        const presetData = ref(props.presetData)
        const showData = ref(presetData.value.trend[analysisType.value].name)
        const val1 = ref(presetData.value.trend[analysisType.value].flow_res)
        const val2 = ref(presetData.value.trend[analysisType.value]. trade_res)
        const val4 = ref(presetData.value.trend[analysisType.value].order_list)
        const data1 = ref([])

        const getDataText = () => {
            let value = null
            if(Number(showData.value) >= -4 &&  Number(showData.value) <= 4){
                value = [
                    {
                        value: 0.5,
                        name: t('Neutral'),
                        date: new Date().getTime()
                    }
                ]
            }else if(Number(showData.value) >= -8 && Number(showData.value) <= -5){
                value = [
                    {
                        value: 0.25,
                        name: t('Sell'),
                        date: new Date().getTime()
                    }
                ]
            }
            else if(Number(showData.value) >= -11 && Number(showData.value) <= -9){
                value = [
                    {
                        value: 0.1,
                        name: t('StrongSell'),
                        date: new Date().getTime()
                    }
                ]
            }
            else if(Number(showData.value) >= 5 && Number(showData.value) <= 8){
                value = [
                    {
                        value: 0.65,
                        name: t('Buy'),
                        date: new Date().getTime()
                    }
                ]
            }
            else if(Number(showData.value) >= 9 && Number(showData.value) <= 11){
                value = [
                    {
                        value: 0.9,
                        name: t('StrongBuy'),
                        date: new Date().getTime()
                    }
                ]
            }
            data1.value = value
        }
        watch(() => analysisType.value, (val) => {
            showData.value = presetData.value.trend[analysisType.value].name
            val1.value = presetData.value.trend[analysisType.value].flow_res
            val2.value = presetData.value.trend[analysisType.value]. trade_res
            val4.value = presetData.value.trend[analysisType.value].order_list
            getDataText()
        })
        getDataText()
        const getTimeText = () => {
            if(analysisType.value == 'trend_15m'){
                return t('shiwufen')
            }else if(analysisType.value == 'trend_1h'){
                return t('yixiaoshi')
            }else if(analysisType.value == 'trend_4h'){
                return t('sixiaoshi')
            }else if(analysisType.value == 'trend_1d'){
                return t('yitian')
            }else if(analysisType.value == 'trend_7d'){
                return t('qitian')
            }
        }
        const getNameText = () => {
            if(Number(showData.value) >= -4 &&  Number(showData.value) <= 4){
                return t('Neutral')
            }else if(Number(showData.value) >= -8 && Number(showData.value) <= -5){
                return t('Sell')
            }
            else if(Number(showData.value) >= -11 && Number(showData.value) <= -9){
                return t('StrongSell')
            }
            else if(Number(showData.value) >= 5 && Number(showData.value) <= 8){
                return t('Buy')
            }
            else if(Number(showData.value) >= 9 && Number(showData.value) <= 11){
                return t('StrongBuy')
            }
        }
       
        return {
            screenWidth,
            analysisType,
            changeSearchType,
            presetData,
            showData,
            getTimeText,
            getNameText,
            val1,
            val2,
            val4,
            data1
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
  .trendassessment{
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
              .right{
                  .tab{
                      display: flex;
                      flex-wrap: wrap;
                      align-items: center;
                      box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
                      border-radius: .2222rem;
                      padding: .2rem 0;
                      .list{
                          background: #181A1C;
                          margin: 0 .3rem;
                          margin-top: .2rem;
                          font-size: 14px;
                          font-family: Poppins-Medium, Poppins;
                          font-weight: 500;
                          color: #A3A3A3;
                          cursor: pointer;
                          padding: .1rem .3rem;
                          border-radius: .2222rem;
                          &.active{
                              color: #ffffff;
                              background: #3F3F3F;
                          }
                      }
                  }
              }
      }
      .Gauge-mian{
        display: flex;
        &.mb{
            display: block;
            .list{
                width: 100%;
            }
        }
        .list{
            width: 50%;
            display: flex;
            align-items: center;
            .text{
                font-size: .296rem;
                font-family: Poppins-Regular, Poppins;
                font-weight: 400;
                color: #FFFFFF;
                line-height: .4rem;
                padding: .4rem;
                text-indent: 2em;
            }
        }
      }
  }
  </style>