<template>
  <div class="detail">
    <div class="top">
       {{ $t('Shareconversation') }}
       <div class="Trynow" @click="addChat">{{$t('Trynow')}}</div>
    </div>
    <div class="chat">
        <template v-for="(item,index) in chatList" :key="index">
            <!-- 文字对话 -->
            <template v-if="item.type  == 'text' || item.role == 'user'">
                <div class="chat-list" :class="item.role == 'user' ? 'right-content' : ''">
                    <div v-if="item.role == 'user'" class="question">
                        <div class="text-content" :class="editChat == 'delete' || editChat == 'share' ? 'noshowmenu' : ''">
                                <div class="inner">
                                    {{item.content}}
                                </div>
                        </div>
                        <img src="/@/assets/imgs/user.png" alt="">
                    </div>
                    <div v-if="item.role == 'assistant'" class="answer">
                            <img src="/@/assets/imgs/logo.svg" alt="">
                            <div class="text-content" :class="editChat == 'delete' || editChat == 'share' ? 'noshowmenu' : ''">
                                <div class="inner">
                                    <span class="innerText">
                                        {{item.content}}
                                    </span>
                                </div>
                            </div>
                    </div>
                </div>
            </template>

        </template>
    </div>
    <div class="bottom">
        <div class="addChat" @click="addChat">{{$t('addChat')}}</div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'
import { getShareMessages } from '/@/api/api.js'
import { useRouter,useRoute } from 'vue-router'
import EventBus from '/@/utils/EventBus.js'

export default {
  name: '',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const chatList = ref([])
    const code = route.params.code
    if(!code){
        return router.push({
            path: '/'
        })
    }
    const getList = async() => {
        const res = await getShareMessages({
            code: code 
        })
        chatList.value = res.data.messages
    }
    const createStatus = ref(false)
    getList()
    const addChat = () => {
        if(createStatus.value) return
        createStatus.value = true
        const time = new Date().getTime() + localStorage.getItem('userId')
        EventBus.$emit('closeDrawer', '')
        setTimeout( () => {
            createStatus.value = false
        },1000)
        router.push({ 
            path: `/chat/${time}`,
            query:{
                type: 'newChat'
            }
        })
    }
    return {
        chatList,
        addChat
    } 
  },
  components: {
    
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
.detail{
    width: 100%;
    margin: 0 auto;
    max-width: 1000px;
    background: #000000;
    height: 100%;
    border-radius: .4rem;
    display: flex;
    flex-direction: column;
    padding: .4rem;
}
.top{
    height: .8rem;
    border-bottom: 1px solid #ffffff;
    margin-bottom: .2rem;
    line-height: .8rem;
    display: flex;
    justify-content: space-between;
    font-size: .296rem;
    font-weight: bold;
    .Trynow{
        height: .6rem;
        line-height: .6rem;
        padding: 0 .3rem;
        border-radius: .2rem;
        cursor: pointer;
        background: #00FF66;
        color: #000;
        font-weight: bold;
        font-size: .259rem;
    }
}
.bottom{
    border-top: 1px solid #ffffff;
    padding-top: .4rem;
    .addChat{
        height: 1rem;
        line-height: 1rem;
        padding: 0 .3rem;
        border-radius: .4rem;
        cursor: pointer;
        background: #00FF66;
        color: #000;
        font-size: .296rem;
        text-align: center;
        font-weight: bold;
    }
}
.chat{
    width: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    padding: .4rem 0;
    &::-webkit-scrollbar {
        width: 2px; /* 滚动条的宽度 */
        height: 5px; /* 滚动条的高度 */
    }

    &::-webkit-scrollbar-track {
        background-color: #333333; /* 滚动条轨道的背景颜色 */
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888; /* 滚动条拇指的颜色 */
        border-radius: 2px; /* 拇指的边框半径 */
    }
    .chat-list{
            text-align: left;
            display: flex;
            margin-top: .3rem;
           &.right-content{
            justify-content: flex-end;
            .text-content{
                .editChat{
                        top: 0;
                        left: -.8rem;
                        position: absolute;
                        width: .5rem;
                    }
                    .editChat1{
                        width: .5rem;
                    }
                    .editChat2{
                        width: .5rem;
                        display: none;
                    }
            }
           }
            .question,.answer{
                display: flex;
                overflow: hidden;
                overflow: hidden;
                width: 100%;
                padding-right: 1rem;
                &:hover{
                    .text-content{
                        .inner{
                            .editChat2{
                                display: block;
                            }
                        }
                    }
                   
                }
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
                    width: 0;
                    cursor: pointer;
                    &.noshowmenu{
                        .editChat{
                            display: none!important;
                        }
                    }
                    .inner{
                        position: relative;
                        word-break: break-all;
                        padding: .25rem .4rem;
                        font-size: .256rem;
                        line-height: .37rem;
                        font-family: Poppins-Regular, Poppins;
                        font-weight: 400;
                        .editChat{
                            top: 0;
                            right: -.8rem;
                            position: absolute;
                            width: .5rem;
                            .c{
                               position: relative;
                               width: 100%;
                               height: .6rem;
                            }
                        }
                        .editChat1{
                            position: absolute;
                            left: 0;
                            width: .5rem;
                        }
                        .editChat2{
                            width: .5rem;
                            position: absolute;
                            left: 0;
                            display: none;
                        }
                        .innerText{
                            white-space:pre-line
                        }
                        .setting{
                            margin-top: .3rem;
                            display: flex;
                            .item{
                                background: #161819;
                                border-radius: 31px 31px 31px 31px;
                                padding: .1rem .3rem;
                                margin-right: .2rem;
                                img{
                                    width: .3rem;
                                    height: .3rem;
                                    cursor: pointer;
                                }
                            }
                            
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
                        .innerText{
                            white-space:pre-line
                        }
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
                    .innerText{
                            white-space:pre-line
                        }
                   }
                }
            }
    }
}
</style>