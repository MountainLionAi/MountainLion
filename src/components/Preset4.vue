<!-- 预设4 -->
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
     <div class="chat-list">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <FollowingTrendJudgment :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <KlinePredict :kline="kline" :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <PricePrediction :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <TechnicalDocumentation :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <GlobalCapital :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <NicheMarket :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <GrowthModel :presetData="presetData"/>
              </div>
          </div>
    </div>



    
     <div class="chat-list">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                    <TextPredict :report="report"/>
              </div>
          </div>
    </div>
     
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'
import KlinePredict from './ChatComponent/KlinePredict.vue'
import TextPredict from './ChatComponent/TextPredict.vue'
import FollowingTrendJudgment from '/@/components/ChatComponent/FollowingTrendJudgment.vue'
import PricePrediction from '/@/components/ChatComponent/PricePrediction.vue'
import GlobalCapital from '/@/components/ChatComponent/GlobalCapital.vue'
import GrowthModel from '/@/components/ChatComponent/GrowthModel.vue'
import NicheMarket from '/@/components/ChatComponent/NicheMarket.vue'
import TechnicalDocumentation from '/@/components/ChatComponent/TechnicalDocumentation.vue'


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
    const kline = JSON.parse(presetData.value.predict)

    const report = JSON.parse(presetData.value.report)

    return {
        presetData,
        kline,
        report,
        PricePrediction,
        GlobalCapital,
        GrowthModel,
        NicheMarket,
        TechnicalDocumentation
    } 
  },
  components: {
    KlinePredict,
    TextPredict,
    FollowingTrendJudgment,

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
                overflow: hidden;
                width: 100%;
                padding-right: 1rem;
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