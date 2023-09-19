<template>
  <div class="header" v-if="screenWidth > 900">
    <div class="left" @click="goIndex">
        <img src="/@/assets/imgs/MountainLion-logo.svg" alt="" class="logo">
    </div>
    <div class="right">
        <el-popover
            placement="top-end"
            popper-class="Editionpopper"
            width="300"
            trigger="hover"
        >
            <template #reference>
                <div class="Upgrade" :class="Edition">
                    {{ $t(Edition) }}
                </div>
            </template>
            <div class="popper-content">
                <div class="list" @click="changeEdition('BasicEdition')" :class="Edition == 'BasicEdition' ? 'BasicEdition' : ''">
                   <div class="info-content">
                        <img v-if="Edition == 'PLUSEdition'" src="/@/assets/imgs/choose.svg" alt="">
                        <img v-else src="/@/assets/imgs/choose-active.svg" alt="">
                        <span>
                            {{ $t('BasicEdition') }}
                        </span>
                        <div class="xsmf">
                            {{ $t('limitFree1') }}
                        </div>
                   </div>
                </div>
                <div class="list" @click="changeEdition('PLUSEdition')" :class="Edition == 'PLUSEdition' ? 'PLUSEdition' : ''">
                    <div class="info-content">
                        <img v-if="Edition == 'BasicEdition'" src="/@/assets/imgs/choose.svg" alt="">
                        <img v-else src="/@/assets/imgs/choose-active.svg" alt="">
                        <span>
                            {{ $t('PLUSEdition') }}
                        </span>
                    </div>
                    <div class="plus-info" v-if="Edition == 'PLUSEdition' && userInfo">
                       <div class="info" v-if="!userInfo.user_account || (userInfo.user_account && !userInfo.user_account.terminable_time && !userInfo.user_account.un_terminable_time)">
                            <div class="left">
                                <el-tooltip :content="$t('plus2Free')" placement="top">
                                    <div class="sbutton">
                                    {{ $t('limitFree',{
                                        num: userInfo.allowance_num
                                        }) }}
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="right">
                                
                            </div>
                       </div>
                       <div class="info" v-if="userInfo.user_account && userInfo.user_account.un_terminable_time">
                            <div class="left">
                                <div class="plus-number">
                                    <span class="big"> {{ userInfo.user_account.un_terminable_time }} </span>/ <span class="small">{{ userInfo.user_account.un_terminable_time_history_total }}</span>
                                </div>
                            </div>
                            <div class="right" v-if="userInfo.user_account">
                                {{ $t('Noexpiration') }}
                            </div>
                       </div>
                       <div class="info" v-if="userInfo.user_account && userInfo.user_account.terminable_time">
                            <div class="left">
                                <div class="plus-number">
                                    <span class="big">{{ userInfo.user_account.terminable_time || 0 }}
                                        <el-tooltip :content="$t('plus2Free')" placement="top">
                                            <span class="ew" v-if="userInfo.allowance_num > 0">+{{ userInfo.allowance_num }}</span>
                                        </el-tooltip>
                                    </span>/ <span class="small">{{ userInfo.user_account.terminable_time_history_total || 0 }}</span>
                                </div>
                            </div>
                            <div class="right" v-if="userInfo.user_account">
                                {{ $t('Expired') }}: <br><span v-if=" userInfo.user_account.due_date">{{ userInfo.user_account.due_date }}</span><span v-else>{{ todayTime() }}</span>
                            </div>
                       </div>
                       <div class="button" @click="subscribeDialog = true" v-if="!userInfo.user_account">
                            {{ $t('Subscribe') }}
                       </div>
                       <div class="button" @click="subscribeDialog = true" v-if="userInfo.user_account">
                        {{ $t('Renewal') }}
                       </div>
                    </div>
                </div>
            </div>
        </el-popover>
        <div class="func-icon" v-if="loginStatus">
            <img @click="logout" src="/@/assets/imgs/logout.svg" alt="">
        </div>
        <div class="func-icon" @click="login" v-if="!loginStatus">
            {{ $t('signIn') }}
        </div>
        <!-- <div class="func-icon">
            <img src="/@/assets/imgs/notice.svg" alt="">
        </div> -->
        <div class="func-icon">
            <el-popover
                v-model:visible="languagePopover"
                placement="bottom"
                trigger="click"
                :show-arrow="false"
                popper-class="language-popover"
            >
                <template #reference>
                    <img src="/@/assets/imgs/language.svg" alt="">
                </template>
                <template #default>
                    <div @click="changeLanguage('zh')" class="list" :class="lang == 'zh' ? 'active' : ''">简体中文</div>
                    <div @click="changeLanguage('en')" class="list" :class="lang == 'en' ? 'active' : ''">English</div>
                </template>
            </el-popover>
        </div>
        <template  v-if="loginStatus">
            <div class="line"></div>
            <div class="user-info">
                <div class="img"></div>
                <div class="text">
                    {{ account }}
                </div>
            </div>
        </template>
    </div>
  </div>
  <div class="mbheader" v-else>
        <div class="menu">
            <img @click="drawer = true" src="/@/assets/imgs/left-menu.svg" alt="">
        </div>
        <div class="logo">
            <img @click="goIndex" src="/@/assets/imgs/logo.svg" alt="" class="logo">
        </div>
        <div class="menu">
                <el-popover
                    placement="top-end"
                    popper-class="Editionpopper"
                    width="300"
                    trigger="hover"
                >
                    <template #reference>
                        <div class="Upgrade" :class="Edition">
                            {{ $t(Edition) }}
                        </div>
                    </template>
                    <div class="popper-content">
                        <div class="list" @click="changeEdition('BasicEdition')" :class="Edition == 'BasicEdition' ? 'BasicEdition' : ''">
                        <div class="info-content">
                                <img v-if="Edition == 'PLUSEdition'" src="/@/assets/imgs/choose.svg" alt="">
                                <img v-else src="/@/assets/imgs/choose-active.svg" alt="">
                                <span>
                                    {{ $t('BasicEdition') }}
                                </span>
                        </div>
                        </div>
                        <div class="list" @click="changeEdition('PLUSEdition')" :class="Edition == 'PLUSEdition' ? 'PLUSEdition' : ''">
                            <div class="info-content">
                                <img v-if="Edition == 'BasicEdition'" src="/@/assets/imgs/choose.svg" alt="">
                                <img v-else src="/@/assets/imgs/choose-active.svg" alt="">
                                <span>
                                    {{ $t('PLUSEdition') }}
                                </span>
                            </div>
                            <div class="plus-info" v-if="Edition == 'PLUSEdition' && userInfo">
                            <div class="info" v-if="!userInfo.user_account">
                                    <div class="left">
                                        <div class="sbutton">
                                            {{ $t('limitFree',{
                                                num: userInfo.allowance_num
                                            }) }}
                                        </div>
                                    </div>
                                    <div class="right">
                                        <!-- {{ $t('Expired') }}: 2024.09.23 -->
                                    </div>
                            </div>
                            <div class="info">
                                    <div class="left">
                                        <div class="plus-number">
                                            <span class="big">
                                                {{ canUseTime }}<span class="ew" v-if="userInfo.allowance_num > 0">+{{ userInfo.allowance_num }}</span>
                                            </span>/ <span class="small">{{ canUseTotal }}</span>
                                        </div>
                                    </div>
                                    <div class="right" v-if="userInfo.user_account && userInfo.user_account.due_date">
                                        {{ $t('Expired') }}: <br>{{ userInfo.user_account.due_date }}
                                    </div>
                            </div>
                            <div class="button" @click="subscribeDialog = true" v-if="!userInfo.user_account">
                                    {{ $t('Subscribe') }}
                            </div>
                            <div class="button" @click="subscribeDialog = true" v-if="userInfo.user_account">
                                {{ $t('Renewal') }}
                            </div>
                            </div>
                        </div>
                    </div>
                </el-popover>
                <el-popover
                    v-model:visible="languagePopover"
                    placement="bottom"
                    trigger="click"
                    :show-arrow="false"
                    popper-class="language-popover"
                >
                    <template #reference>
                        <img src="/@/assets/imgs/language.svg" alt="">
                    </template>
                    <template #default>
                        <div @click="changeLanguage('zh')" class="list" :class="lang == 'zh' ? 'active' : ''">简体中文</div>
                        <div @click="changeLanguage('en')" class="list" :class="lang == 'en' ? 'active' : ''">English</div>
                    </template>
                </el-popover>
                <span class="right-menu" @click="login" v-if="!loginStatus">
                    {{ $t('signIn') }}
                </span>
                <img v-if="loginStatus" class="right-menu" @click="logout" src="/@/assets/imgs/logout.svg" alt="">
                
        </div>
  </div>
  <el-drawer
    v-model="drawer"
    direction="ltr"
    :before-close="handleClose"
    :show-close="false"
    :with-header="false"
    class="menu-drawer"
    size="85%"
  >
   <TypeTab/>
  </el-drawer>
  <SubscribeType :subscribeDialog="subscribeDialog" @closeSubscribeDialog="subscribeDialog = false"/>
</template>

<script>
import { ref, computed, watch,onUnmounted } from 'vue';
import { useStore} from 'vuex'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { loginOut } from '/@/api/api'
import TypeTab from '/@/components/TypeTab.vue'
import EventBus from '/@/utils/EventBus.js'
import SubscribeType from './SubscribeType.vue'
export default {
  name: '',
  setup() {
    const { t } = useI18n();
    const router = useRouter()
    const subscribeDialog = ref(false)
    const goIndex = () => {
        router.push({ name: 'index' })
        store.commit('setShowLogin',false)
    }
    //适配
    const screenWidth = computed( () => {
      return store.state.screenWidth
    })
    //适配
    const userInfo = computed( () => {
      return store.state.userInfo
    })
    const Edition = computed( () => {
      return store.state.Edition
    })
    
    const drawer = ref(false)
    const store = useStore()
    const lang = computed(() => store.state.lang)
    const loginStatus = computed(() => store.state.loginStatus)
    const account = computed(() => store.state.account)
    const languagePopover = ref(false)
    const logout = () => {
        ElMessageBox.confirm(
            t('logoutUre'),
            '',
            {
                confirmButtonText: t('logout'),
                cancelButtonText: t('cancel'),
                type: 'warning',
                cancelButtonClass: 'cancel',
                confirmButtonClass:'ok'
            }
        )
        .then(() => {
            loginOut().then( res => {
                store.commit('setLoginStatus',false)
                store.commit('setAccount','')
                localStorage.setItem('MountainLion-token','')
            })
        })
        .catch(() => {
           
        })
    }
    const login = () => {
        store.commit('setShowLogin',true)
    }
    const handleClose = (done) => {
        done()
    }
    const closeDrawer = () => {
        drawer.value = false
    }
    EventBus.$on('closeDrawer', closeDrawer)
    onUnmounted(() => {
      EventBus.$off('closeDrawer', closeDrawer)
    })
    const changeEdition = (Edition) => {
        if(Edition == 'PLUSEdition' && !loginStatus.value){
            ElMessage({
                message: t('loginFirst'),
                type: 'warning',
            })
            return
        }
        store.commit('setEdition',Edition)
        localStorage.setItem('Edition',Edition)
    }
    const canUseTime = computed( () => {
        let number = 0
        if(userInfo.value.user_account){
            number = (userInfo.value.user_account.terminable_time ? userInfo.value.user_account.terminable_time : 0) + (userInfo.value.user_account.un_terminable_time ? userInfo.value.user_account.un_terminable_time : 0)
        }
        return number
    })
    const canUseTotal = computed( () => {
        let number = 0
        if(userInfo.value.user_account){
            number = (userInfo.value.user_account.terminable_time_history_total ? userInfo.value.user_account.terminable_time_history_total : 0) + (userInfo.value.user_account.un_terminable_time_history_total ? userInfo.value.user_account.un_terminable_time_history_total : 0)
        }
        return number
    })
    const todayTime = () =>{
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const formattedDate = `${tomorrow.getFullYear().toString()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;

        return formattedDate

    }
    return {
        todayTime,
        canUseTotal,
        canUseTime,
        goIndex,
        lang,
        languagePopover,
        account,
        loginStatus,
        logout,
        screenWidth,
        drawer,
        handleClose,
        login,
        Edition,
        changeEdition,
        userInfo,
        subscribeDialog
    } 
  },
  components: {
    TypeTab,
    SubscribeType
  },
  methods: {
    changeLanguage(lang){
        localStorage.setItem('lang',lang)
        this.$store.commit('setLang',lang)
        this.languagePopover = false
        this.$i18n.locale = lang
    }
  },
  mounted() {
    const lang = localStorage.getItem('lang')
    this.$store.commit('setLang',lang)
    this.$i18n.locale = lang
  },
  unmounted() {
    
  },
}
</script>
<style>
.menu-drawer{
    background: #161819;
}
</style>
<style scoped lang='scss'>
.mbheader{
    height: 1.48rem;
    background: #1C1E1F;
    box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
    opacity: 1;
    padding: 0 .4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo{
        img{
            width: 1rem;
        }
    }
    .menu{
        display: flex;
        img{
            width: .5rem;
        }
        .right-menu{
            margin-left: .2rem;
        }
    }
}
.header{
    height: 1.48rem;
    background: #1C1E1F;
    box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
    opacity: 1;
    padding: 0 .4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
        display: flex;
        align-items: center;
        cursor: pointer;
        .logo{
            width: 5rem;
            margin-right: .1rem;
        }
        .text{
            font-size: .5rem;
            font-weight: bold;
            color: #FFFFFF;
        }
    }
    .right{
        display: flex;
        align-items: center;

        .func-icon{
            margin-right: .4rem;
            cursor: pointer;
            font-size: .296rem;
            img{
                cursor: pointer;
                width: .4444rem;
            }
        }
        .line{
            margin-right: .4rem;
            width: 1px;
            height: .6rem;
            background: #FFFFFF;
        }
        .user-info{
            display: flex;
            align-items: center;
            .img{
                width: .6rem;
                height: .6rem;
                background: #f39c13;
                margin-right: .15rem;
                border-radius: 100px;
            }
            .text{
                font-size: .256rem;
                font-weight: 500;
                color: #FFFFFF;
                cursor: pointer;
            }
        }
    }
}
.Upgrade{
    cursor: pointer;
    padding: 0 .3rem;
    height: .8rem;
    line-height: .8rem;
    border-radius: .2222rem;
    font-size: .296rem;
    font-family: Poppins-Bold, Poppins;
    font-weight: bold;
    margin-right: .4rem;
    &.BasicEdition{
        background: #C0FFD1;
        opacity: 1;
        border: 1px solid #04BB00;
        color: #007636;
    }
    &.PLUSEdition{
        background: linear-gradient(270deg, #FFFBF5 0%, #FFE8C4 100%);
        opacity: 1;
        color: #C37600;
        border-image: linear-gradient(90deg, rgba(195, 118, 0, 1), rgba(195, 118, 0, 0.21)) 1 1;
    }
}
</style>