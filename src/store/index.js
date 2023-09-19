import { createStore } from "vuex";

const store = createStore({
// state 提供唯一的公共数据源
  state() {
    return {
      lang: localStorage.getItem('lang'), // 语言
      question:'', // 用户 提出的问题 全局
      loginStatus: true, // 登录状态
      showLogin:false, // 是否显示登录框
      account:'', // 用户账号
      screenWidth: document.body.clientWidth, // 当前窗口的宽度
      analysisType:'trend_4h', // 趋势判断时间查询标识
      editChat: 'chat', // chat delete share
      chatList: [],
      Edition: localStorage.getItem('Edition') && localStorage.getItem('Edition') != '' ? localStorage.getItem('Edition') : 'BasicEdition', // 版本
      userInfo: null
    }
  },
  mutations: {
    setLang(state, lang) {
        state.lang = lang
    },
    setQuestion(state, question) {
      state.question = question
    },
    setLoginStatus(state,loginStatus){
      state.loginStatus = loginStatus
    },
    setShowLogin(state,showLogin){
      state.showLogin = showLogin
    },
    setAccount(state,account){
      state.account = account
    },
    setScreenWidth(state,val){
      state.screenWidth = val

    },
    setAnalysisType(state,val){
      state.analysisType = val

    },
    setEditChat(state,val){
      state.editChat = val

    },
    seChatList(state,val){
      state.chatList = val
    },
    setEdition(state,val){
      state.Edition = val
    },
    setUserInfo(state,val){
      state.userInfo = val
    },
  }
})

export default store