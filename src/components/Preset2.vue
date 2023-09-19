<!-- 预设2 -->
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
    <div class="chat-list" v-if="presetData && presetData.info">
        <div class="answer">
             <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <ProjectInformation :info="presetData.info" :coinImageUrl="presetData.coinImageUrl" :coinName="presetData.coinName"/>
              </div>
          </div>
    </div>
    <div class="chat-list" v-if="presetData && presetData.holdAddress">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <HoldingAddress :top="presetData.holdAddress.top" :holdcoin="presetData.holdAddress.holdcoin" :coinImageUrl="presetData.coinImageUrl" :coinName="presetData.coinName"/>
              </div>
          </div>
    </div>
    <div class="chat-list"  v-if="presetData && presetData.transfer && presetData.transfer.flows.length > 0 && presetData.transfer.toplist.length > 0 ">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <Top10Transfer :flows="presetData.transfer.flows" :toplist="presetData.transfer.toplist" :coinImageUrl="presetData.coinImageUrl" :coinName="presetData.coinName"/>
              </div>
          </div>
    </div>
    <div class="chat-list" v-if="presetData && presetData.markets">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <Marketsituation :markets="presetData.markets" :coinImageUrl="presetData.coinImageUrl" :coinName="presetData.coinName"/>
              </div>
          </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'
import ProjectInformation from '/@/components/ChatComponent/ProjectInformation.vue'
import HoldingAddress from '/@/components/ChatComponent/HoldingAddress.vue'
import Top10Transfer from '/@/components/ChatComponent/Top10Transfer.vue'
import Marketsituation from '/@/components/ChatComponent/Marketsituation.vue'
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
    // watch(() => presetData.value, (newValue, oldValue) => {
    //     if(newValue){
    //         // 构建图标
    //     }
    // })
    presetData.value = props.presetData
    return {
        presetData
    } 
  },
  components: {
    ProjectInformation,
    HoldingAddress,
    Top10Transfer,
    Marketsituation,
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