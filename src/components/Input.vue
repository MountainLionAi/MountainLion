<!-- 用户输入框 -->
<template>
  <div class="input" v-if="editChat == 'chat'" @click.stop="showTips(userUseTime ==  0 && Edition== 'PLUSEdition')">
    <input type="text" :title= "userUseTime ==  0 && Edition== 'PLUSEdition' ? $t('noChatNumber') : ''" v-model="question" :class="userUseTime ==  0 && Edition== 'PLUSEdition' ? 'disabled' : ''" :disabled="userUseTime ==  0 && Edition== 'PLUSEdition'" :placeholder="$t('sendAMessage')" v-on:keyup.enter="sendMessage">
    <div class="send" @click="sendMessage" :class="userUseTime ==  0 && Edition== 'PLUSEdition' ? 'disabled' : ''">
        {{ $t('senfMessage') }}
    </div>
  </div>
  <div class="input" v-if="editChat == 'share'">
    <div class="content">
      <div class="cancle" @click="setEditChat">{{ $t('cancel')}}</div>
      <div class="confrim" @click="confrim('copyLink')">{{ $t('copyLink') }}</div>
      <div class="img-list">
        <img @click="confrim('twitter')" src="/@/assets/imgs/share-tw.png" alt="">
        <img @click="confrim('facebook')" src="/@/assets/imgs/share-facebook.png" alt="">
        <img @click="confrim('sina')" src="/@/assets/imgs/share-sina.png" alt="">
        <img @click="confrim('qq')" src="/@/assets/imgs/share-qq.png" alt="">
      </div>
    </div>
  </div>
  <div class="input" v-if="editChat == 'delete'">
     <div class="content">
      <div class="cancle" @click="setEditChat">{{ $t('cancel')}}</div>
      <div class="confrim" @click="confrim('delete')">{{ $t('delete') }}</div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'
import EventBus from '/@/utils/EventBus.js'
import { useRouter,useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { delMessages,shareMessages } from '/@/api/api.js'
import useClipboard from 'vue-clipboard3'

export default {
  name: '',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const { t } = useI18n();
    const question = computed({
      get: () => store.state.question,
      set: (newValue) => {
        store.commit('setQuestion', newValue)
      }
    })
    const editChat = computed( () => {
      return store.state.editChat
    })
    const chatList = computed( () => {
      return store.state.chatList
    })
    const Edition = computed( () => {
      return store.state.Edition
    })
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
    const sendMessage = () => {
      if(route.name != 'chat'){
        const time = new Date().getTime() + localStorage.getItem('userId')
        router.push({ 
            path: `/chat/${time}`,
            query:{
                type: 'newChat'
            }
        })
        setTimeout(() => {
          EventBus.$emit('sendMessage', question.value)
        },500)
      }else{
        EventBus.$emit('sendMessage', question.value)
      }
    }
    const setEditChat = () => {
      store.commit('setEditChat', 'chat')
    }
    const confrim = async(type) => {
      const list = chatList.value.filter( item => item.choose)
      if(list.length == 0){
        ElMessage({
              message: t('chooseChat'),
              type: 'error',
          })
        return 
      }
      // delete
      if(type == 'delete'){
        let code = []
        list.forEach(item => {
          code.push(item.code)
        });
        const res = await delMessages({
          code: code
        })
        if(res.code == 200){
          store.commit('setEditChat','chat')
          const newList = chatList.value.filter(item1 => !list.some(item2 => item1.code === item2.code));
          store.commit('seChatList',newList)
          ElMessage({
              message: t('delSuccess'),
              type: 'success',
          })
        }
        return
      }
      const code = new Date().getTime() + Math.floor(Math.random() * 10) + 1
      const result = await shareMessages({
        messages: list,
        code: code
      })
      const u = encodeURIComponent(location.origin + '/#/chatDetail')
      const shareTitle = encodeURIComponent(t('shareText'))
      if(type == 'copyLink'){
        const { toClipboard } = useClipboard()
        try {
          // 复制
          await toClipboard(location.origin + '/#/' + 'chatDetail/' + code)
          ElMessage({
            message: t('copySuccess'),
            type: 'success',
          })
        } catch (e) {

        }
        return
      }

      if(type == 'twitter'){
        window.open(`https://twitter.com/intent/tweet?text=${shareTitle}&url=${u}/${code}`)
      }
      if(type == 'facebook'){
        window.open(`https://www.facebook.com/sharer/sharer.php?quote=${shareTitle}&u=${u}/${code}`)
      }
      if(type=='qq'){
        window.open(`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=${shareTitle}&url=${u}/${code}`)
      }
      if(type=='sina'){
        window.open(`https://service.weibo.com/share/share.php?title=${shareTitle}&url=${u}/${code}`)
      }
    }
    const showTips = (b) => {
      if(b){
        ElMessage({
          message: t('noChatNumber'),
          type: 'error',
        })
      }
    }
    return {
        question,
        sendMessage,
        editChat,
        setEditChat,
        chatList,
        confrim,
        userUseTime,
        Edition,
        showTips
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
.input{
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    input{
        flex: 1;
        height: 1rem;
        background: #1C1E1F;
        box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
        border-radius: .37rem;
        border: none;
        outline: none;
        font-size: .296rem;
        font-weight: 400;
        color: #FFFFFF;
        outline: none;
        box-sizing: border-box;
        padding: 0 .3rem;
        &.disabled{
          cursor: not-allowed;
          pointer-events: none;
        }
    }
    .content{
        flex: 1;
        height: 1rem;
        display: flex;
        justify-content: center;
        .cancle{
          width: 2.5rem;
          height: 1rem;
          line-height: 1rem;
          font-size: .296rem;
          box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
          text-align: center;
          border-radius: .37rem;
          margin-right: .3rem;
          background: #1C1E1F;
          cursor: pointer;
        }
        .img-list{
          line-height: 1rem;
          img{
            width: .8rem;
            border-radius: 100px;
            margin-left: .2rem;
            cursor: pointer;
          }
        }
        .confrim{
          flex: 1;
          height: 1rem;
          line-height: 1rem;
          font-size: .296rem;
          box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
          background: #FFFFFF;
          color: #000000;
          text-align: center;
          border-radius: .37rem;
          cursor: pointer;
        }

    }
    .send{
        margin-left: .4rem;
        cursor: pointer;
        width: 2.5rem;
        height: 1rem;
        background: #FFFFFF;
        box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
        border-radius: .37rem;
        font-size: .296rem;
        line-height: 1rem;
        text-align: center;
        color: #000000;
        &.disabled{
          cursor: not-allowed;
        }
    }
}
</style>