<!-- 预设1 -->
<template>
     <div class="chat-list" v-if="presetData.gptcontent && presetData.gptcontent != ''">
        <div class="answer">
            <img src="/@/assets/imgs/logo.svg" alt="">
            <div class="text-content">
                <div class="inner">
                    <span class="innerText">{{presetData.gptcontent}}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="chat-list" v-if="presetData.info">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <CoinPriceInfo :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list" v-if="presetData.trend">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <TrendAssessment :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list" v-if="presetData.analyze">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <TechnicalAnalysis :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list" v-if="presetData.flow">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <FundsMonitoring :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list" v-if="presetData.flow">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <ScatterPlot :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list" v-if="presetData.trade">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <LargeTransferMonitoring :presetData="presetData"/>
              </div>
          </div>
    </div>

     

    








      <div class="chat-list" v-if="presetData.historyOneDay">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <CoinInfo :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list" v-if="presetData.historyOneDay">
        <div class="answer" style="overflow: inherit;">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <Bar :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list" v-if="presetData.historyHighPrice">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <AnnualHistoricalHigh :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list" v-if="presetData.tradeRatio">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <Pie :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list" v-if="presetData.tradeHistory">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <HistoricalData :presetData="presetData"/>
              </div>
          </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'
import CoinInfo from '/@/components/ChatComponent/CoinInfo.vue'
import Bar from '/@/components/ChatComponent/Bar.vue'
import AnnualHistoricalHigh from '/@/components/ChatComponent/AnnualHistoricalHigh.vue'
import Pie from '/@/components/ChatComponent/Pie.vue'
import HistoricalData from '/@/components/ChatComponent/HistoricalData.vue'
import CoinPriceInfo from '/@/components/ChatComponent/CoinPriceInfo.vue'
import TrendAssessment from '/@/components/ChatComponent/TrendAssessment.vue'
import TechnicalAnalysis from '/@/components/ChatComponent/TechnicalAnalysis.vue'
import FundsMonitoring from '/@/components/ChatComponent/FundsMonitoring.vue'
import ScatterPlot from '/@/components/ChatComponent/ScatterPlot.vue'
import LargeTransferMonitoring from '/@/components/ChatComponent/LargeTransferMonitoring.vue'

export default {
  name: '',
  props:{
    presetData:{
        type: Object,
        default: null
    },
  },
  setup(props) {
    const presetData = ref(null)
    watch(() => props.presetData, (newValue, oldValue) => {
        presetData.value = newValue
    })
    presetData.value = props.presetData
    const store = useStore()
    const analysisType = computed( () => {
        return store.state.analysisType
    })
    return {
        presetData,
        analysisType
    } 
  },
  components: {
    CoinInfo,
    Bar,
    AnnualHistoricalHigh,
    Pie,
    HistoricalData,
    CoinPriceInfo,
    TrendAssessment,
    TechnicalAnalysis,
    FundsMonitoring,
    ScatterPlot,
    LargeTransferMonitoring
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
    .chat-list{
            text-align: left;
            display: flex;
            margin-top: .3rem;
           &.right-content{
            justify-content: flex-end;
           }
            .question,.answer{
                display: flex;
                width: 100%;
                padding-right: 1rem;
                overflow: hidden;
                img,.img{
                    width: .8rem;
                    height: .8rem;
                }
               .text-content{
                    flex: 1;
                    min-height: 1rem;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    .inner{
                        word-break: break-all;
                        padding: .25rem .4rem;
                        font-size: 0.256rem;
                        line-height: .37rem;
                        font-family: Poppins-Regular, Poppins;
                        font-weight: 400;
                        .innerText{
                            white-space:pre-line
                        }
                    }
                }
                .record-content{
                    width: 100%;
                    margin-left: .1rem;
                }
            }
            .question{
                padding-right: 0;
                padding-left: 1rem;

                .text-content{
                    justify-content: flex-end;
                    .inner{
                        word-break: break-all;
                        margin-right: .1rem;
                        background: #00FF66;
                        border-radius: .25rem .1rem  .25rem  .25rem;
                        color: #000000;
                        overflow: hidden;
                    }
                }
               
            }
            .answer{
                .text-content{
                   .inner{
                    word-break: break-all;
                    margin-left: .1rem;
                    background: #1C1E1F;
                    color: #ffffff;
                    border-radius:  .1rem  .25rem  .25rem .25rem;
                   }
                }
            }
    }
</style>