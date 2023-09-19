<!-- 技术资料 -->
<template>
    <div class="c">
        <div class="info">
            <div class="left">
            <img :src="presetData.coinImageUrl" alt="">
            {{ $t('TechnicalDocumentation',{coin: presetData.coinName}) }}
            </div>
    </div>
    <div class="Gauge-mian" :class="screenWidth > 900 ? '' : 'mb'">
            <div class="list">
                <div class="text">
                    {{ $t('OscillatorIndicator') }}
                </div>
                <GaugeMainTechnicalDocumentation :presetData="presetData" :data="data1"/>
            </div>
            <div class="list">
                <div class="text">
                    {{ $t('overview') }}
                </div>
                <GaugeMainTechnicalDocumentation :presetData="presetData" :data="data2"/>
            </div>
            <div class="list">
                <div class="text">
                    {{ $t('MovingAverage') }}
                </div>
                <GaugeMainTechnicalDocumentation :presetData="presetData" :data="data3"/>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'
import GaugeMainTechnicalDocumentation from './GaugeMainTechnicalDocumentation.vue'
import { useI18n } from 'vue-i18n'

export default {
    name: '',
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
        const presetData = ref(props.presetData)
        const recommendation_sum = presetData.value.recommendation_sum
        const recommendation_oscillators = presetData.value.recommendation_oscillators
        const recommendation_mv_avg = presetData.value.recommendation_mv_avg
        const data1 = ref([])
        const data2 = ref([])
        const data3 = ref([])
        const getDataText = (RECOMMENDATION) => {
            let value = null
            if(RECOMMENDATION == 'NEUTRAL'){
                value = [
                    {
                        value: 0.5,
                        name: t('Neutral'),
                        date: new Date().getTime()
                    }
                ]
            }else if(RECOMMENDATION == 'SELL'){
                value = [
                    {
                        value: 0.25,
                        name: t('Sell'),
                        date: new Date().getTime()
                    }
                ]
            }
            else if(RECOMMENDATION == 'STRONG_SELL'){
                value = [
                    {
                        value: 0.1,
                        name: t('StrongSell'),
                        date: new Date().getTime()
                    }
                ]
            }
            else if(RECOMMENDATION == 'BUY'){
                value = [
                    {
                        value: 0.65,
                        name: t('Buy'),
                        date: new Date().getTime()
                    }
                ]
            }
            else if(RECOMMENDATION == 'STRONG_BUY'){
                value = [
                    {
                        value: 0.9,
                        name: t('StrongBuy'),
                        date: new Date().getTime()
                    }
                ]
            }
           return value
        }
        data1.value = getDataText(recommendation_oscillators.RECOMMENDATION)
        data2.value = getDataText(recommendation_sum.RECOMMENDATION)
        data3.value = getDataText(recommendation_mv_avg.RECOMMENDATION)

        return {
            presetData,
            screenWidth,
            data1,
            data2,
            data3,
        } 
    },
    components: {
        GaugeMainTechnicalDocumentation
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
.c{
    width: 100%;
      background: #1C1E1F;
      border-radius: .37rem;
      padding: 0.25rem 0.4rem;
}
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
        justify-content: space-between;
        &.mb{
            display: block;
            justify-content:center;
            .list{
                width: 90%;
            }
        }
        .list{
            width: 30%;
            .text{
                font-size: .296rem;
                font-family: Poppins-Regular, Poppins;
                font-weight: 400;
                color: #FFFFFF;
                line-height: .4rem;
            }
        }
      }
</style>