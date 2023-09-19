<template>
  <div class="chat" ref="chatContent" :class="screenWidth > 900 ? '' : 'mb'">
    <template v-for="(item,index) in chatList" :key="index">
        <!-- 文字对话 -->
        <template v-if="item.type  == 'text' || item.role == 'user'">
            <div class="chat-list" :class="item.role == 'user' ? 'right-content' : ''">
                <el-checkbox v-model="item.choose" size="large" style="margin-right: .2rem;" v-if="editChat == 'delete' || editChat == 'share'"/>
                <div v-if="item.role == 'user'" class="question">
                    <div class="text-content" :class="editChat == 'delete' || editChat == 'share' || checkShow(index) ? 'noshowmenu' : ''">
                            <div class="inner">
                                <el-popover
                                :show-arrow="false"
                                popper-class="chatPopper"
                                placement="bottom"
                                :width="100"
                                trigger="hover"
                            >
                                <template #reference>
                                    <div class="editChat">
                                        <div class="c">
                                            <img class="editChat1" v-if="showMenuCode == index + 1" src="/@/assets/imgs/editChat.svg" alt="">
                                            <img class="editChat2" @click="showMenuCode = index + 1" src="/@/assets/imgs/editChat.svg" alt="">
                                        </div>
                                    </div>
                                </template>
                                <div class="content-menu">
                                    <div class="list" @click="copyHandle(item)">
                                        <img src="/@/assets/imgs/copy-icon.svg" alt=""> {{ $t('copy') }}
                                    </div>
                                    <div class="list" @click="setEditChat('share',item,index)">
                                        <img src="/@/assets/imgs/share-icon.svg" alt=""> {{ $t('share') }}
                                    </div>
                                    <div class="list" @click="setEditChat('delete',item)">
                                        <img src="/@/assets/imgs/delete-icon.svg" alt=""> {{ $t('delete') }}
                                    </div>
                                </div>

                                </el-popover>
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
                                <div class="setting" v-if="item.showTextCode">
                                    <div class="item" @click="setEditChat('share',item,index)">
                                        <img src="/@/assets/imgs/share.svg" alt="">
                                    </div>
                                    <div class="item" v-if="item.like != -1">
                                        <img v-if="item.like == 1" src="/@/assets/imgs/like-active.svg" alt="">
                                        <img v-if="item.like == 0" @click="userRateHandle(item,'1')" src="/@/assets/imgs/like.svg" alt="">
                                    </div>
                                    <div class="item" v-if="item.like != 1">
                                        <img  v-if="item.like == -1" src="/@/assets/imgs/disLike-active.svg" alt="">
                                        <img v-if="item.like == 0" @click="userRateHandle(item,'-1')" src="/@/assets/imgs/Dislike.svg" alt="">
                                    </div>
                                </div>
                                <el-popover
                                    :show-arrow="false"
                                    popper-class="chatPopper"
                                    placement="bottom"
                                    :width="100"
                                    trigger="hover"
                                >
                                    <template #reference>
                                        <div class="editChat">
                                            <div class="c">
                                                <img class="editChat1" v-if="showMenuCode == index + 1" src="/@/assets/imgs/editChat.svg" alt="">
                                                <img class="editChat2" @click="showMenuCode = index + 1" src="/@/assets/imgs/editChat.svg" alt="">
                                            </div>
                                        </div>
                                    </template>
                                    <div class="content-menu">
                                        <div class="list" @click="copyHandle(item)">
                                            <img src="/@/assets/imgs/copy-icon.svg" alt=""> {{ $t('copy') }}
                                        </div>
                                        <div class="list" @click="setEditChat('share',item,index)">
                                            <img src="/@/assets/imgs/share-icon.svg" alt=""> {{ $t('share') }}
                                        </div>
                                        <div class="list" @click="setEditChat('delete',item)">
                                            <img src="/@/assets/imgs/delete-icon.svg" alt=""> {{ $t('delete') }}
                                        </div>
                                    </div>
                                </el-popover>
                            </div>
                           
                        </div>
                </div>
            </div>
        </template>
        <!-- 预设一 -->
        <template v-if="item.type  == 'preset1'">
            <Preset1 :presetData="item.content"/>
        </template>
        <!-- 预设二-->
        <template v-if="item.type  == 'preset2'">
            <Preset2 :presetData="item.content"/>
        </template>
        <!-- 预设三-->
        <template v-if="item.type  == 'preset3'">
            <Preset3 :presetData="item.content"/>
        </template>
        <!-- 预设四 币价预测 -->
        <template v-if="item.type  == 'preset4'">
            <Preset4 :presetData="item.content"/>
        </template>
        <!-- coin_rate 类型 -->
        <template v-if="item.type  == 'coin_rate'">
            <CoinRate  :presetData="item.content"/>
        </template>
         <!-- coin_swap 类型 -->
         <template v-if="item.type  == 'coin_swap'">
            <div class="coin_swap">
                <el-checkbox v-model="item.choose" size="large" style="margin-right: .2rem;" v-if="editChat == 'delete' || editChat == 'share'"/>
                <CoinSwap  :presetData="item.content"/>
                <el-popover
                    :show-arrow="false"
                    popper-class="chatPopper"
                    placement="bottom"
                    :width="100"
                    trigger="hover"
                >
                    <template #reference>
                        <div class="editChat">
                            <div class="c">
                                <img class="editChat1" v-if="showMenuCode == index + 1" src="/@/assets/imgs/editChat.svg" alt="">
                                <img class="editChat2" @click="showMenuCode = index + 1" src="/@/assets/imgs/editChat.svg" alt="">
                            </div>
                        </div>
                    </template>
                    <div class="content-menu">
                        <div class="list" @click="copyHandle(item)">
                            <img src="/@/assets/imgs/copy-icon.svg" alt=""> {{ $t('copy') }}
                        </div>
                        <div class="list" @click="setEditChat('share',item,index)">
                            <img src="/@/assets/imgs/share-icon.svg" alt=""> {{ $t('share') }}
                        </div>
                        <div class="list" @click="setEditChat('delete',item)">
                            <img src="/@/assets/imgs/delete-icon.svg" alt=""> {{ $t('delete') }}
                        </div>
                    </div>

                    </el-popover>
            </div>
        </template>
         <!-- 相关问题 -->
        <!-- <div class="chat-list">
            <div class="answer">
                <div class="img"></div>
                <div class="record-content">
                        <RelatedQuestions/>
                </div>
            </div>
        </div> -->
    </template>
    <div class="chat-list" v-if="loading">
        <div class="answer">
            <img src="/@/assets/imgs/logo.svg" alt="">
            <div class="text-content">
                <div class="inner">
                    <div v-if="step == 1" class="three-bounce"><div class="one"></div><div class="two"></div><div class="three"></div></div>
                   <span class="innerText"> {{ showText }}</span>
                    <span class="cursor" v-if="showText != ''"></span>
                    <!-- <TextComponents ref="TextComponents" @onComplete="onComplete"  v-if="step == 2 && chatType.value  == 'text'" :text="showText" /> -->
                </div>
            </div>
        </div>
    </div>
    <div class="bottom-input" v-if="editChat != 'delete' && editChat != 'share'">
        <button class="stop" v-if="loading && step == 2" @click="stop">
            <img src="/@/assets/imgs/stop.svg" alt="">
            {{ $t('stopGenerating') }}
        </button>
        <button class="regenerateResponse" v-if="!loading && step == 3" @click="regenerateResponse">
            <img src="/@/assets/imgs/repeat.svg" alt="">
            {{ $t('regenerateResponse') }}
        </button>
    </div>
  </div>
  <el-dialog v-model="centerDialogVisible" :title="$t('dontLike')" width="30%" center custom-class="dialog-ai">
    <div class="content">
        <div class="list" @click="submitDiaLike(editItem,$t('Inaccurate'))">
            <img src="/@/assets/imgs/bzq.svg" alt="">
            <div class="text">{{ $t('Inaccurate') }}</div>
        </div>
        <div class="list" @click="submitDiaLike(editItem,$t('Unbeneficial'))">
            <img src="/@/assets/imgs/wy.svg" alt="">
            <div class="text">{{ $t('Unbeneficial') }}</div>
        </div>
        <div class="list" @click="submitDiaLike(editItem,$t('Offensive'))">
            <img src="/@/assets/imgs/gjx.svg" alt="">
            <div class="text">{{ $t('Offensive') }}</div>
        </div>
        <div class="list" @click="innerDialogVisible =  true">
            <img src="/@/assets/imgs/qt.svg" alt="">
            <div class="text">{{ $t('Other') }}</div>
        </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button class="RemoveDislike" @click="centerDialogVisible = false">{{ $t('RemoveDislike') }}</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="innerDialogVisible" :title="$t('dontLike')" width="30%" center custom-class="dialog-ai">
    <div class="content">
        <el-input
            v-model="feedBack"
            :rows="3"
            type="textarea"
            :placeholder="$t('Otherdetails')"
        />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button :loading="submitLoading" class="RemoveDislike" @click="submitDiaLike(editItem,feedBack)">{{ $t('SubmitFeedback') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, computed, watch,onUnmounted,onMounted } from 'vue';
import { useStore} from 'vuex'
import TextComponents from '/@/components/ChatComponent/TextComponents.vue'

import RelatedQuestions from '/@/components/ChatComponent/RelatedQuestions.vue'


import Preset1 from '/@/components/Preset1.vue'
import Preset2 from '/@/components/Preset2.vue'
import Preset3 from '/@/components/Preset3.vue'
import Preset4 from '/@/components/Preset4.vue'
import CoinSwap from '/@/components/CoinSwap.vue'

import EventBus from '/@/utils/EventBus.js'
import { sendchat , getPresetTwo, getKlineInfo, getPresetThree,getMessageList, getPredictInfo, userRate} from '/@/api/api'
import { useRouter,useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const baseUrl = import.meta.env.VITE_APP_BASE_API
import useClipboard from 'vue-clipboard3'

export default {
  name: 'Chat',
  setup() {
    const { t } = useI18n();
    const route = useRoute()
    const store = useStore()
    // const chatList = ref([])
    const chatList = computed({
      get: () => store.state.chatList,
      set: (newValue) => {
        store.commit('seChatList', newValue)
      }
    })
    let timer = null
    const lang = computed(() => store.state.lang)
    //适配
    const screenWidth = computed( () => {
      return store.state.screenWidth
    })
    const editChat = computed( () => {
      return store.state.editChat
    })

    const showMenuCode = ref('')
    let chatId = route.params.id
    const loading = ref(false) //加载状态
    const chatType = ref('') // 接口返回的 对话类型
    const step =  ref('1') //加载过程中的状态， 1 代表正在跟后台请求中， 2 代表 正在显示文字中 3 代表文字显示完毕或者用户中断回答
    const showText = ref('') // 回答的文本
    const showTextCode = ref('') // 回答的文本是否有点赞功能
    const comment = ref('') //用户反馈意见
    const chatContent = ref(null)
    const centerDialogVisible = ref(false)
    const innerDialogVisible = ref(false)
    const feedBack = ref('')
    const submitLoading = ref(false)
    const scrollToBottom = ()=> { // 保持滚动条在最底部
        var element = chatContent.value
        element.scrollTop = element.scrollHeight
    }
    const saveQuestion = ref('')
    const eventSource= ref(null)
    const scrollStatus = ref(false)
    const isAtBottom = () => {
        var element = chatContent.value
        return element.scrollHeight - element.scrollTop - element.clientHeight < 1;
    }

    //监听showText的变化
    watch(() => showText.value, (val)=>{
        if(scrollStatus.value){
            scrollToBottom()
        }
    })
    const Edition = computed( () => {
      return store.state.Edition
    })
    const model = computed(() => {
        if(Edition.value == 'BasicEdition'){
            return 'ml'
        }else{
            return 'ml-plus'
        }
    })
    const sendMessage = async (questionText,queryData) => {
        saveQuestion.value = questionText
        // 监听对话的回调 目前分为预设1,2,3 以及文本对话
        if(loading.value || questionText == ''){
                return
        }
        const chat = {
            role: 'user',
            content:questionText,
            choose: false,
            code: new Date().getTime() + Math.floor(Math.random() * 10) + 1
        }
        chatList.value.push(chat)
        loading.value = true
        step.value = 1

        setTimeout(() => {
            scrollToBottom() 
            store.commit('setQuestion', '')
        },50)



        if(!queryData){
            const messages = []
            chatList.value.forEach( item => {
                if(item.type != 'preset1' && item.type != 'preset2' && item.type != 'preset3' && item.type != 'preset4' && item.type != 'coin_swap' && item.role != 'gptfunc'){
                    messages.push({
                        role: item.role,
                        content: item.content,
                        code: item.code

                    })
                }
                if(item.role == 'gptfunc'){
                    messages.push(item)
                }
            })
            const parames = {
                content: questionText,
                msggroup: chatId,
                language: lang.value == 'zh' ? 'cn' : 'en',
                messages:messages,
                device_no: localStorage.getItem('device_no'),
                code: chatList.value[chatList.value.length - 1].code,
                model: model.value
            }
            try{
                eventSource.value.close()
            }catch(error){

            }
            eventSource.value = new SSE(baseUrl + '/v1/api/sendStremChat', {
              headers: {
                'Content-Type': 'application/json', 
                'Authorization': localStorage.getItem('MountainLion-token'),
              },
              payload: JSON.stringify(parames),
              method: "POST"
            });
            eventSource.value.onopen = () => {
                step.value = 2
            }
            
            eventSource.value.onmessage = function(event) {
                if(event.data == '[DATA]'){
                    chatType.value = 'DATA'
                }else if(event.data == '[GPT]'){
                    chatType.value = 'GPT'
                }else if(event.data == '[GPTFUNC]'){
                    chatType.value = 'GPTFUNC'
                }else if(event.data == '[DONE]'){
                    // 请求停止
                    if(chatType.value == 'GPT'){ //  这里要插入内容
                        const chat = {
                            role: 'assistant',
                            content:showText.value,
                            type:'text',
                            showTextCode: showTextCode.value,
                            like: 0,
                            choose: false,
                            code: showTextCode.value
                        }
                        chatList.value.push(chat)
                    }
                    chatType.value = ''
                    showText.value = ''
                    showTextCode.value = ''
                    loading.value = false
                    step.value = 3
                    setTimeout( () => {
                        EventBus.$emit('refreshChatList', '')
                    },500)
                    eventSource.value.close()
                }else{
                    // 这里插入内容
                    if(chatType.value == 'GPT'){
                        if(JSON.parse(event.data).code){
                            showTextCode.value = JSON.parse(event.data).code
                            return
                        }
                        showText.value += JSON.parse(event.data).text
                    }else if(chatType.value == 'GPTFUNC'){
                        chatList.value.push(JSON.parse(event.data))
                    }else{
                        const data = JSON.parse(event.data)
                        if(!data.presetContent){
                            showTextCode.value = data.code
                            const obj = {
                                role: 'assistant',
                                content: data.content,
                                type: data.type == 'lack_information' || data.type == 'Answer' || data.type == 'gpt' ? 'text' : data.type,
                                showTextCode: showTextCode.value,
                                like: 0,
                                choose: false,
                                code: showTextCode.value
                            }
                            chatList.value.push(obj)
                        }else{
                            if(data.type == 'multi_coin_predict'){
                                data.presetContent.contentList.forEach( list => {
                                    const obj = {
                                        role: 'assistant',
                                        content: list,
                                        type:  'preset4',
                                    }
                                    chatList.value.push(obj)
                                })
                            if(data.content != ''){
                                const chat = {
                                    role: 'assistant',
                                    content:data.content,
                                    type:'text',
                                    choose: false,
                                    code: showTextCode.value
                                }
                                chatList.value.push(chat)
                            }
                                return
                            }
                            if(data.type == 'multi_coin_price'){
                                data.presetContent.contentList.forEach( list => {
                                        const obj = {
                                            role: 'assistant',
                                            content: list,
                                            type:  'preset1',
                                        }
                                        chatList.value.push(obj)
                                    })
                                    if(data.content != ''){
                                        const chat = {
                                            role: 'assistant',
                                            content:data.content,
                                            type:'text',
                                            choose: false,
                                            code: showTextCode.value

                                        }
                                        chatList.value.push(chat)
                                    }
                                return
                            }
                            if(data.type == 'lack_information' || data.type == 'Answer' || data.type == 'gpt'){
                                const chat = {
                                        role: 'assistant',
                                        content: data.content,
                                        type:'text',
                                        choose: false,
                                        code: showTextCode.value

                                    }
                                chatList.value.push(chat)
                            }else if(data.type == 'coin_swap'){
                                const obj = {
                                    role: 'assistant',
                                    content: data,
                                    type: 'coin_swap',
                                    choose: false,
                                    code: showTextCode.value

                                }
                                chatList.value.push(obj)
                            }else{
                                data.presetContent.gptcontent = data.content
                                const obj = {
                                    role: 'assistant',
                                    content: data.presetContent,
                                    type: data.type == 'lack_information' || data.type == 'Answer' || data.type == 'gpt' ? 'text' : data.type,
                                    choose: false,
                                    code: showTextCode.value

                                }
                                chatList.value.push(obj)
                            }
                         }
                    }
                }
            };

            eventSource.value.onerror = (error) => {
                chatType.value = ''
                showText.value = ''
                loading.value = false
                step.value = 3
                eventSource.value.close()
            };

            eventSource.value.stream();

         }else if(queryData.type == 'preset1'){
            try{
                const result = await getKlineInfo({
                    code: queryData.code,
                    msggroup:chatId,
                    language: lang.value == 'zh' ? 'cn' : 'en',

                })
                if(result.code == 200){
                    const chat = {
                        role: 'assistant',
                        content:result.data.presetContent,
                        type:'preset1',
                    }
                    chatList.value.push(chat)
                }
                loading.value = false
            }catch(error){
            }
            EventBus.$emit('refreshChatList', '')
         }else if(queryData.type == 'preset2'){
            try{
                const result = await getPresetTwo({
                    code: queryData.code,
                    msggroup:chatId,
                    language: lang.value == 'zh' ? 'cn' : 'en',
                })
                if(result.code == 200){
                    const chat = {
                        role: 'assistant',
                        content:result.data.presetContent,
                        type:'preset2',
                    }
                    chatList.value.push(chat)
                }
                loading.value = false
            }catch(error){

            }
            EventBus.$emit('refreshChatList', '')
         }else if(queryData.type == 'preset3'){
            try{
                const result = await getPresetThree({
                    code:  queryData.code,
                    msggroup:chatId,
                    language: lang.value == 'zh' ? 'cn' : 'en',
                })
                if(result.code == 200){
                    const chat = {
                        role: 'assistant',
                        content:result.data.presetContent,
                        type:'preset3',
                    }
                    chatList.value.push(chat)
                }
                loading.value = false
            }catch(error){

            }
            EventBus.$emit('refreshChatList', '')
         }else if(queryData.type == 'preset4'){
            try{
                const result = await getPredictInfo({
                    code: queryData.code,
                    msggroup:chatId,
                    language: lang.value == 'zh' ? 'cn' : 'en',
                })
                if(result.code == 200){
                    const chat = {
                        role: 'assistant',
                        content:result.data.presetContent,
                        type:'preset4',
                    }
                    chatList.value.push(chat)
                }
                loading.value = false
            }catch(error){

            }
            EventBus.$emit('refreshChatList', '')
         }
    }
    const editItem = ref(null)
    const loginStatus = computed( () => {
      return store.state.loginStatus
    }) // 登录状态
    const userRateHandle = async(item,type) => {
        //判断登录状态
        if(!loginStatus.value){
            ElMessage({
                message: t('loginFirst'),
                type: 'warning',
            })
            return
        }
        if(type == -1){
            centerDialogVisible.value = true
            editItem.value = item
            return
        }
        submitLoading.value = true
        const res = await userRate({
            code: Number(item.showTextCode),
            rate: Number(type),
            comment: comment.value,

        })
        if(res.code == 200){
            item.like = type
            ElMessage({
                message: t('likeSuccess'),
                type: 'success',
            })
        }
        submitLoading.value = false
    }
    const submitDiaLike = async(item,comment) => {
        submitLoading.value = true
        const res = await userRate({
            code: Number(item.showTextCode),
            rate: -1,
            comment: comment,

        })
        if(res.code == 200){
            item.like = -1
            ElMessage({
                message: t('feedSuccess'),
                type: 'success',
            })
        }
        editItem.value = null
        centerDialogVisible.value = false
        innerDialogVisible.value = false
        feedBack.value = ''
        submitLoading.value = false
    }
    const stop = () => {
        eventSource.value.close()
        // 请求停止
        if(chatType.value == 'GPT'){ //  这里要插入内容
                const chat = {
                    role: 'assistant',
                    content:showText.value,
                    type:'text',
                    choose: false,
                    code: showTextCode.value

                }
                chatList.value.push(chat)
            }
            chatType.value = ''
            showText.value = ''
            loading.value = false
            step.value = 3
    }
    EventBus.$on('sendMessage', sendMessage)


    //新旧对话框 判断并获取记录

    const getChatHistory = async(id) =>{
        chatList.value = []

       if(route.query.type == 'newChat'){
          setTimeout(() => {
              //对话记录增加一条数据
              const chatListObj = {
                "content": t('addChat'),
                "type": "user",
                "msggroup": route.params.id,
                "type":'newChat'
            }
            saveQuestion.value = ''
            EventBus.$emit('addChatList', chatListObj)
          },400)
       }
        const res = await getMessageList({
            msggroup: id
        })
        const list = res.data.messageList
        list.forEach(item => {
            if(!item.content.presetContent){
                const obj = {
                    role: item.type == 'user' ? 'user' : 'assistant',
                    content: item.content.content ? item.content.content : item.content,
                    type: item.type == 'lack_information' || item.type == 'Answer' || item.type == 'gpt' ? 'text' : item.type,
                    choose: false,
                    code: item.code
                }
                chatList.value.push(obj)
            }else{
                if(item.content.presetContent.contentList && item.type  == 'multi_coin_predict'){

                    item.content.presetContent.contentList.forEach( list =>{
                        const obj = {
                            role: 'assistant',
                            content: list,
                            type:  'preset4',
                        }
                        chatList.value.push(obj)
                    })
                    if(item.content.content != ''){
                        const chat = {
                            role: 'assistant',
                            content:item.content.content,
                            type:'text',
                            choose: false,
                            code: item.code

                        }
                        chatList.value.push(chat)
                    }
                }else if(item.content.presetContent.contentList && item.type  == 'multi_coin_price'){

                    item.content.presetContent.contentList.forEach( list =>{
                        const obj = {
                            role: 'assistant',
                            content: list,
                            type:  'preset1',
                        }
                        chatList.value.push(obj)
                    })
                    if(item.content.content != ''){
                        const chat = {
                            role: 'assistant',
                            content:item.content.content,
                            type:'text',
                            choose: false,
                            code: item.code

                        }
                        chatList.value.push(chat)
                    }
                }else if(item.type == 'coin_swap'){
                    const obj = {
                        role: 'assistant',
                        content: item.content,
                        type: 'coin_swap',
                        code: item.code
                    }
                    chatList.value.push(obj)
                }else{
        item.content.presetContent.gptcontent = item.content.content
        const obj = {
            role: item.type == 'user' ? 'user' : 'assistant',
            content: item.content.presetContent,
            type: item.type == 'lack_information' || item.type == 'Answer' || item.type == 'gpt' ? 'text' : item.type,
            choose: false,
            code: item.code
        }
        chatList.value.push(obj)
                }
            }
        });
    }

    watch(() => route.params.id, (val, oldCoinCode) => {
        chatId = val
        step.value = '1'
        getChatHistory(val)
    })
    const copyHandle = async(item) => {
        const { toClipboard } = useClipboard()
            try {
              // 复制
              await toClipboard(item.content.content ? item.content.content : item.content)
              ElMessage({
                message: t('copySuccess'),
                type: 'success',
              })
            } catch (e) {

            }
    }
    onMounted(() =>{
      getChatHistory(chatId)
      chatContent.value.addEventListener('scroll', function() {
        if (isAtBottom()) {
            scrollStatus.value = true
            // 设置变量或标记，指示用户已经滚动到了底部
        } else {
            scrollStatus.value = false
            // 设置变量或标记，指示用户没有滚动到底部
        }
    })
    })
    const setEditChat = (val,item,index) => {
        //判断登录状态
        if(!loginStatus.value){
            ElMessage({
                message: t('loginFirst'),
                type: 'warning',
            })
            return
        }
        if(val == 'share'){
            if(item.role == 'user'){
               if( chatList.value[index + 1].role != 'user'){
                    chatList.value[index + 1].choose = true
               }
            }else{
                if( chatList.value[index - 1].role == 'user'){
                    chatList.value[index - 1].choose = true
                }
            }
        }
        item.choose = true
        store.commit('setEditChat',val)
    }
    const checkShow = (index) => {
        if(index +1 <= chatList.value.length && chatList.value[index+1]){
            return (chatList.value[index + 1].type == 'preset1' || chatList.value[index + 1].type == 'preset2' || chatList.value[index + 1].type == 'preset3' || chatList.value[index + 1].type == 'preset4')
        }else {
            return true
        }
    }
    const userInfo = computed( () => {
      return store.state.userInfo
    })
    const userUseTime = computed( () => {
        if(!userInfo.value) return 0
        let number = 0
        if(userInfo.value.user_account){
            number = userInfo.value.allowance_num + (userInfo.value.user_account.terminable_time ? userInfo.value.user_account.terminable_time : 0) + (userInfo.value.user_account.un_terminable_time ? userInfo.value.user_account.un_terminable_time : 0)
        }else{
            number = userInfo.value.allowance_num
        }
        return number
    })
    onUnmounted(() => {
      EventBus.$off('sendMessage', sendMessage)
    })
    return {
      checkShow,
      chatList,
      loading,
      step,
      showText,
      chatContent,
      sendMessage,
      scrollToBottom,
      chatType,
      RelatedQuestions,
      screenWidth,
      stop,
      userRateHandle,
      centerDialogVisible,
      editItem,
      submitDiaLike,
      innerDialogVisible,
      feedBack,
      submitLoading,
      showMenuCode,
      copyHandle,
      editChat,
      setEditChat,
      userUseTime,
      Edition
    } 
  },
  components: {
    TextComponents,
    Preset1,
    Preset2,
    Preset3,
    Preset4,
    CoinSwap
  },
  methods: {
    
   
    //文字展示完成的回调
    onComplete(text){
      const self = this
      const chat = {
          role: 'assistant',
          content:text,
          type:'text',
      }
      self.chatList.push(chat)
      self.loading = false
      setTimeout(() => {
          self.step = 3
      },500)
  },
  // 重新响应
  regenerateResponse(){
    if(this.userUseTime ==  0 && this.Edition == 'PLUSEdition'){
        ElMessage({
          message: this.$t('noChatNumber'),
          type: 'error',
        })
        return
    }
    const userList = this.chatList.filter( item => item.role == 'user')
    this.sendMessage(userList[userList.length - 1].content)
    const self = this
    setTimeout(() => {
        self.scrollToBottom() 
    },500)
  },
//   //停止响应
//   stop(){
//       this.$refs.TextComponents.stop()
//   },
  },
  mounted() {
    
  },
 
}
</script>

<style scoped lang='scss'>
.chat{
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    padding: 0 .4rem 0 0;
    padding-bottom: 1.8rem;
    &.mb{
        padding: 0 0 1.2rem 0;
    }
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
.bottom-input{
        position: absolute;
        bottom: .3rem; 
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        display: flex;
        justify-content: center;
        .stop,.regenerateResponse{
            border: 1px solid #ffffff;
            border-radius: .1rem;
            background: #161819;
            cursor: pointer;
            display: flex;
            align-items: center;
            height: .7rem;
            font-size: .26rem;
            font-family: Poppins-Regular, Poppins;
            font-weight: 400;
            color: #ffffff;
           img{
                width: .4rem;
                height: .4rem;
                margin-right: .1rem;
            }
        }
    }
</style>
<style lang="scss">
.three-bounce {
    text-align: left;
    display: flex;
    align-items: center;
}
.three-bounce .one {
    -webkit-animation-delay: -.32s;
    animation-delay: -.32s;
}
.three-bounce .two {
    -webkit-animation-delay: -.16s;
    animation-delay: -.16s;
}
.three-bounce>div {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 100%;
    top: 50%;
    background: #aeadba;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

@keyframes bouncedelay {
    0%,100%,80% {
        transform: scale(0);
        -webkit-transform: scale(0)
    }

    40% {
        transform: scale(1);
        -webkit-transform: scale(1)
    }
}
.cursor {
  display: inline-block;
  width: 6px;
  height: 1em;
  background-color: #ffffff;
  animation: blink 1s infinite;
  vertical-align: middle;
}

@keyframes blink {
  0%, 40% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
.dialog-ai{
    background: #1C1E1F;
    border-radius: .37rem;
    .el-dialog__title{
        font-size: .256rem;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: #FFFFFF;
    }
    .RemoveDislike{
        background: #3F3F3F;
        border-radius: .5rem;
        font-size: .256rem;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: #FFFFFF;
        width: 100%;
        border: none;
        padding: .37rem .3rem;
    }
    .content{
        display: flex;
        justify-content: space-between;
        .list{
            text-align: center;
            width: 24%;
            border-radius: .37rem;
            opacity: 1;
            border: 1px solid #3F3F3F;
            padding: .2rem .1rem;
            cursor: pointer;
            .text{
                margin-top: .2rem;
                font-size: 13px;
                color: #FFFFFF;
            }
            img{
                height: .6rem;
            }
        }
        .el-textarea__inner{
            border-radius: .1777rem;
            border: 1px solid #3F3F3F;
            background: #1C1E1F;
            outline: none;
            color: #ffffff
        }
    }
}
.coin_swap{
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    &:hover{
        .editChat2{
            display: block;
        }
        
    }
    .editChat{
        top: .3rem;
        right: 0;
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
}
</style>