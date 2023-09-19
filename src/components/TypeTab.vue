<template>
  <div class="chatType">
        <div class="tab">
            <div class="item" @click="chatType = 'Cryptos'" :class="chatType == 'Cryptos' ? 'active' : ''">{{ $t('Cryptos') }}</div>
            <div class="item" @click="chatType = 'Chats'" :class="chatType == 'Chats' ? 'active' : ''">{{ $t('Chats') }}</div>
        </div>
        <div class="serach-content">
            <input v-model="searchText" type="text" :placeholder="$t('search')">
            <img class="search-icon" src="/@/assets/imgs/search.svg" alt="">
        </div>
        <template v-if="chatType == 'Cryptos'">
            <ul class="coin-list">
                <li @click="cryptoHandle(item)" v-for="(item,index) in showCoinList" :key="index">
                    <img :src="item.coinImageUrl" alt="">
                    <div class="mid">
                        <div class="coin-name">
                            {{ item.coinAbbr }}
                        </div>
                        <div class="coin-text">
                            {{ item.coinName }}
                        </div>
                    </div>
                    <div class="right">
                        <div class="price">${{ $formatNumber(item.lastPrice) }}</div>
                        <div class="persent" :class="FloatingNumber(item.change) ? 'up' : 'down'">
                            <img v-if="FloatingNumber(item.change)" src="/@/assets/imgs/increase.svg" alt="">
                            <img v-else src="/@/assets/imgs/decrease.svg" alt="">
                            {{ item.change}}
                        </div>
                    </div>
                </li>
                <!-- <li @click="cryptoHandle">
                    <img src="https://transfer.swft.pro/swft-v3/images/coins/BTC.png" alt="">
                    <div class="mid">
                        <div class="coin-name">
                            BTC
                        </div>
                        <div class="coin-text">
                            Bitcoin
                        </div>
                    </div>
                    <div class="right">
                        <div class="price">$30,664.03</div>
                        <div class="persent up">
                            <img src="/@/assets/imgs/increase.svg" alt="">
                            1.80%
                        </div>
                    </div>
                </li> -->
            </ul>
        </template>
        <template v-if="chatType == 'Chats'">
            <div class="chat-list">
                <div class="setting">
                        <div>
                            <div v-if="edit" style="padding-left: .2rem;cursor:pointer">
                                <div v-if="!selectAll" @click="selectAllHandle('all')" class="check"></div>
                                <div v-else @click="selectAllHandle('clear')" class="check select">✓</div>
                            </div>
                        </div>
                        <div>
                            <img v-if="checkIsDelete && edit" @click="deleteHandle" src="/@/assets/imgs/delete.svg" alt="">
                            <img @click="edit = false" v-if="edit" src="/@/assets/imgs/close.svg" alt="">
                            <img @click="editHandle" v-if="!edit" src="/@/assets/imgs/edit.svg" alt="">
                        </div>
                </div>
                <ul>
                    <li v-for="(item,index) in showChatList" :key="index" @click="chooseList(item)" :class="item.msggroup == queryId ? 'active' : ''">
                        <template v-if="edit">
                            <div v-if="!item.choose" class="check"></div>
                            <div v-else class="check select">✓</div>
                        </template>
                        <div class="text">
                            {{item.content}}
                        </div>
                          <!-- <img src="/@/assets/imgs/star.svg" alt=""> -->
                    </li>
                </ul>
            </div>
        </template>
        <div class="add-chat" @click="addChat">
            {{ $t('addChat') }}
        </div>
  </div>
</template>

<script>
import { ref, computed, watch,onUnmounted } from 'vue';
import { useStore} from 'vuex'
import { useRouter ,useRoute} from 'vue-router'
import { getCoinList,getMsgGroupList,delMsgGroupList } from  '/@/api/api.js'
import EventBus from '/@/utils/EventBus.js'
import { useI18n } from 'vue-i18n'

export default {
  name: '',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const loading = ref(false)
    const { t } = useI18n();

    const cryptoHandle = (item) => {
        chatType.value = 'Chats'
        EventBus.$emit('closeDrawer', '')
        router.push({ path: `/crypto/${item.coinCode}` })
    }
    const chooseList = (item) =>{
        if(edit.value){
            item.choose = !item.choose
        }else{
            EventBus.$emit('closeDrawer', '')
            router.push({ path: `/chat/${item.msggroup}` })
        }
    }
    const queryId = ref(route.params.id)
    watch(() => route.params.id, (val, oldCoinCode) => {
        queryId.value = val
    })
    const addChatList = (obj) => {
        chatType.value = 'Chats'
        chatList.value.unshift(obj)
    }
    EventBus.$on('addChatList', addChatList)
    onUnmounted(() => {
      EventBus.$off('addChatList', addChatList)
    })
    const chatType = ref('Cryptos')
    const searchText = ref('')
    const edit = ref(false)
    const chatList = ref([])
    const checkIsDelete =  computed(() => {
        const list = chatList.value
        let _b = false
        list.forEach(item => {
            if(item.choose){
                 _b = true
            }
        })
        return _b
    })
    const createStatus = ref(false)
    const coinList = ref([])
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
    //删除聊天记录列表
    const deleteHandle = async() => {
        const deletaList = chatList.value.filter( item => item.choose)
        if(deletaList.length == 0) return
        const id = []
        deletaList.forEach(item => {
            id.push(item.msggroup)
        })
        ElMessageBox.confirm(
            t('deleteSure'),
            '',
            {
                confirmButtonText: t('sure'),
                cancelButtonText: t('cancel'),
                type: 'warning',
                cancelButtonClass: 'cancel',
                confirmButtonClass:'ok'
            }
        )
        .then(async() => {
            const result = await delMsgGroupList({
                msggroup: id
            })
            chatList.value =  chatList.value.filter(item => !item.choose)
            edit.value = false
            // 判断当前聊天页面是否被删除
            const ishave = chatList.value.filter( item => item.msggroup == queryId.value)
            if(ishave.length == 0){
                //当前路由被删除
                router.push({ path: `/chat/${chatList.value[0].msggroup}` })
            }
        })
        .catch(() => {
           
        })
    }
    //搜索
    watch(() => chatType.value,(val) => {
        searchText.value = ''
    })
    const showCoinList = computed(() => {
        if(searchText.value == ''){
            return coinList.value
        }else{
            const list = coinList.value.filter(item => item.coinName.toLowerCase().indexOf((searchText.value.toLowerCase())) != -1 || item.coinAbbr.toLowerCase().indexOf((searchText.value.toLowerCase())) != -1)
            return list
        }
    })
    const showChatList = computed(() => {
        if(searchText.value == ''){
            return chatList.value
        }else{
            const list = chatList.value.filter(item => item.content.indexOf((searchText.value)) != -1 )
            return list
        }
    })
    // 聊天记录全选
    const selectAll = computed( () => {
        let status = true
        chatList.value.forEach( item => {
            if(!item.choose){
                status = false
            }
        })
        return status
    })
    const selectAllHandle  = (type) => {
        if(type == 'all'){ // 全选
            chatList.value.forEach( item => {
                item.choose = true
            })
        }else{
            chatList.value.forEach( item => {
                item.choose = false
            })
        }
    }
    return {
        selectAllHandle,
        selectAll,
        showChatList,
        showCoinList,
        chatType,
        searchText,
        cryptoHandle,
        edit,
        chatList,
        checkIsDelete,
        chooseList,
        coinList,
        queryId,
        addChat,
        loading,
        deleteHandle
    } 
  },
  components: {
    
  },
  methods: {
    
    FloatingNumber(str){
        if(str.indexOf('-') == -1){
            return true
        }else{
            return false
        }
    },
    editHandle(){
        this.edit = true
        this.chatList.forEach( item => {
            item.choose = false
        })
    },
    async getCoinList(){
        const res = await getCoinList()
        if(res.code == 200){
            this.coinList = res.data
        }
    },
    async getMsgGroupList(){
        this.loading = true
        const res = await getMsgGroupList()
        if(res.code == 200){
            if(this.chatList.length == 1){
                const msggroup = this.chatList[0].msggroup
                const isHave = res.data.messageList.filter(item => item.msggroup == msggroup)
                if(isHave.length == 0){
                    this.chatList = [...this.chatList,...res.data.messageList.reverse()]
                }else{
                    this.chatList = res.data.messageList.reverse()
                }
            }else{
                this.chatList = res.data.messageList.reverse()
            }
        }
        this.loading = false

    }
  },
  mounted() {

    this.getCoinList()
    this.getMsgGroupList()
    EventBus.$on('refreshChatList', this.getMsgGroupList)

  },
  unmounted() {
    
  },
}
</script>

<style scoped lang='scss'>
.chatType{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.tab{
    width: 100%;
    display: flex;
    height: .8888rem;
    background: #181A1C;
    box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
    border-radius: .296rem;
    .item{
        font-size: .296rem;
        font-family: Poppins-Bold, Poppins;
        font-weight: bold;
        color: #FFFFFF;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &.active{
            background: #00FF66;
            box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
            border-radius: .296rem;
            color: #000000;

        }
    }
}
.serach-content{
    margin-top: .4rem;
    width: 100%;
    position: relative;
    input{
        border: none;
        width: 100%;
        height: 1rem;
        background: #1C1E1F;
        box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
        border-radius: .37rem;
        font-size: .296rem;
        font-weight: 400;
        color: #FFFFFF;
        outline: none;
        box-sizing: border-box;
        padding: 0 .3rem 0 .9rem;
    }
    .search-icon{
        position: absolute;
        left: .3rem;
        height: .38rem;
        width: .38rem;
        top: 50%;
        margin-top: -.19rem;
    }
}
.coin-list{
    flex: 1;
    margin-top: .4rem;
    padding: .3rem;
    background: #181a1c;
    box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
    border-radius: .37rem;
    padding-bottom: 1rem;
    overflow: hidden;
    overflow-y: auto;
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
    li{
        margin-top: .4rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: .2rem;
        border-radius: .37rem;
        position: relative;
        &:hover{
            background: #1C1E1F;
        }
        &:first-child{
            margin-top: 0;
        }
        // &:not(:last-child) {
            &:after{
                content: '';
                width: calc(100% - 1.2rem);
                height: 1px;
                background: #ffffff;
                position: absolute;
                bottom: -.2rem;
                right: .0rem;
                opacity: 0.1;
            }
        // }
       
        img{
            width: .8888rem;
            height: .8888rem;
        }
        .mid{
            flex: 1;
            margin-left: .4rem;
            .coin-name{
                font-size: 14px;
                font-weight: 500;
                color: #FFFFFF;
            }
            .coin-text{
                margin-top: .12rem;
                font-size: 12px;
                font-weight: 400;
                color: #a3adb1;
            }
        }
        .right{
            margin-left: .3rem;
            .price{
                font-size: 14px;
                font-weight: 500;
                color: #FFFFFF;
            }
            .persent{
                margin-top: .12rem;
                font-size: 14px;
                font-weight: 500;
                text-align: right;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                img{
                    width: .148rem;
                    height: .2222rem;
                    margin-right: .1rem;
                }
                &.down{
                    color: #FA2256;
                }
                &.up{
                    color: #00FF66;
                }
            }
        }
    }
}
.chat-list{
    flex: 1;
    margin-top: .4rem;
    padding: .3rem;
    background: #181a1c;
    box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
    border-radius: .37rem;
    padding-bottom: 1rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .setting{
        padding-bottom: .3rem;
        display: flex;
        justify-content: space-between;
        .check{
            width: .37rem;
            height: .37rem;
            border-radius: 100px;
            border: 1px solid rgba(255,255,255,.5);
            margin-right: .2rem;
            &.select{
                border: 1px solid #ffffff;
                color: #ffffff;
                font-size: 12px;
                text-align: center;
                line-height: calc(.37rem - 2px);
            }
        }
        img{
            width: .37rem;
            height: .37rem;
            cursor: pointer;
            margin-right: .3rem;
        }
    }
    ul{
        flex: 1;
        overflow: hidden;
        overflow-y: auto;
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
    }
    li{
        margin-top: .2rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: .2rem;
        border-radius: .1111rem;
        position: relative;
        font-size: .256rem;
        font-family: Inter-Medium, Inter;
        font-weight: 500;
        color: #FFFFFF;
        .text{
            width: 100%;
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行
        }
        &:hover,&.active{
            background: rgba(63,63,63,0.5);
        }
        .check{
            width: .37rem;
            height: .37rem;
            border-radius: 100px;
            border: 1px solid rgba(255,255,255,.5);
            margin-right: .2rem;
            &.select{
                border: 1px solid #ffffff;
                color: #ffffff;
                font-size: 12px;
                text-align: center;
                line-height: calc(.37rem - 2px);
            }
        }
        &:first-child{
            margin-top: 0;
        }
    }
}
.add-chat{
    cursor: pointer;
    margin-top: .3rem;
    width: 100%;
    height: .95rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    color: #FFFFFF;
    background: #1C1E1F;
    box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
    border-radius: .185rem;
    &:hover{
      box-shadow: 0 2px 12px 0 rgba(255,255,255,.1);
    }
}
</style>