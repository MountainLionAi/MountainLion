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
    <div class="chat-list" v-if="presetData.Team_info">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <teaminformation :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list" v-if="presetData.Investors">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <Investmentagency :presetData="presetData"/>
              </div>
          </div>
    </div>









    <div class="chat-list" v-if="presetData.AI_SUM">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <DevelopmentHistory :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list" v-if="presetData.News">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <Information :presetData="presetData"/>
              </div>
          </div>
    </div>
    <div class="chat-list" v-if="presetData.socialMedia">
        <div class="answer">
              <img src="/@/assets/imgs/logo.svg" alt="">
              <div class="record-content">
                     <Socialmedia :presetData="presetData"/>
              </div>
          </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'
import DevelopmentHistory from '/@/components/ChatComponent/DevelopmentHistory.vue'
import Information from '/@/components/ChatComponent/Information.vue'
import Socialmedia from '/@/components/ChatComponent/Socialmedia.vue'
import Investmentagency from '/@/components/ChatComponent/Investmentagency.vue'
import teaminformation from '/@/components/ChatComponent/teaminformation.vue'


export default {
  name: '',
  props:{
    presetData:{
            type: Object,
            default: null
        },
    },
  setup(props) {
    const presetData = ref(props.presetData)
    return {
        presetData
    } 
  },
  components: {
    DevelopmentHistory,
      Information,
      Socialmedia,
      teaminformation,
      Investmentagency
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