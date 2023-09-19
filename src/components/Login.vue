<!-- 登录模块 -->
<template>
  <div class="login-main">
    <template v-if="status == 'step1'">
      <div class="left" :class="[loginStatus == 'sign-in' ? 'flex' : '',screenWidth > 900 ? '' : 'nb']">
          <div v-if="loginStatus == 'sign-in'" class="sign">
              <div class="logo">
                <img src="/@/assets/imgs/logo.svg" alt="">
              </div>
              <div class="title">{{ $t('signIn') }} MountainLion</div>
              <div class="input-content">
                <el-form :model="formData" :rules="formRules" ref="form">
                  <el-form-item prop="email">
                    <el-input
                      v-model="formData.email"
                      class="input"
                      :placeholder="$t('email')"
                      clearable
                      :prefix-icon="Message"
                      @input="onInput"
                    />
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      v-model="formData.password"
                      type="password"
                      class="input mt"
                      :placeholder="$t('password')"
                      clearable
                      :prefix-icon="Lock"
                      show-password
                    />
                  </el-form-item>
                  <div class="Forgotpassword" v-if="screenWidth > 900">
                    <span @click="loginStatus = 'forgot-password'" class="text">{{ $t('Forgotpassword') }}</span>
                  </div>
                  <div class="mb-login-sign-choose f" v-if="screenWidth <= 900">
                    <div class="Forgotpassword">
                      <span @click="loginStatus = 'forgot-password'" class="text">{{ $t('Forgotpassword') }}</span>
                    </div>
                    <span>{{ $t('noaccount') }} <span class="td" @click="loginStatus = 'sign-up'">{{ $t('btnsign') }}</span></span>
                  </div>
                  <el-form-item class="btn-group">
                    <el-button :loading="loading" class="submit" type="primary" @click="submitForm('login')">{{ $t('btnLogin')}}</el-button>
                  </el-form-item>
                </el-form>
              </div>
          </div>
          <div class="set-content"  v-if="(loginStatus == 'sign-up' || loginStatus == 'forgot-password') && screenWidth > 900">
            <div class="bar-title">
                <div class="t1">{{ $t('haveaccount') }}</div>
                <div class="t2" @click="loginStatus = 'sign-in'">{{ $t('btnLogin') }}</div>
              </div>
          </div>
      </div>
      <div class="right" :class="[loginStatus == 'sign-up' || loginStatus == 'forgot-password' ? 'flex' : '',screenWidth > 900 ? '' : 'nb']">
          <div v-if="loginStatus == 'sign-up'"  class="sign">
            <template v-if="hcaptchaStatus">
              <div class="logo">
                <img src="/@/assets/imgs/logo.svg" alt="">
              </div>
              <div class="title">{{ $t('signUp') }} MountainLion</div>
              <div class="input-content">
                <el-form :model="formData" :rules="formRules" ref="form">
                  <el-form-item prop="email">
                    <el-input
                      v-model="formData.email"
                      class="input"
                      :placeholder="$t('email')"
                      clearable
                      :prefix-icon="Message"
                      @input="onInput"
                    />
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      v-model="formData.password"
                      type="password"
                      class="input mt"
                      :placeholder="$t('password')"
                      clearable
                      :prefix-icon="Lock"
                      show-password
                    />
                  </el-form-item>
                  <el-form-item prop="password2">
                    <el-input
                      v-model="formData.password2"
                      type="password"
                      class="input mt"
                      :placeholder="$t('password2')"
                      clearable
                      :prefix-icon="Lock"
                      show-password
                    />
                  </el-form-item>
                  <!-- <el-form-item prop="captchaCode" class="captchaCode">
                    <el-input
                      v-model="formData.captchaCode"
                      type="text"
                      class="input mt"
                      :placeholder="$t('captchaCode')"
                      clearable
                      :prefix-icon="Aim"
                    />
                    <img @click="getCaptchaHandle" class="captcha-img" :src="getCaptchaImg" />
                  </el-form-item> -->
                  <div class="mb-login-sign-choose" v-if="screenWidth <= 900">{{ $t('haveaccount') }} <span class="td" @click="loginStatus = 'sign-in'">{{ $t('btnLogin') }}</span></div>
                  <el-form-item class="btn-group">
                    <el-button :loading="loading" class="submit" type="primary" @click="submitForm('sign')">{{ $t('signUp')}}</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </template>
            <template v-else>
              <vue-hcaptcha sitekey="" style="width: 303px;margin:0 auto" theme="dark" @verify="verifySuccess"></vue-hcaptcha>
              <div class="mb-login-sign-choose"  v-if="screenWidth <= 900">{{ $t('haveaccount') }} <span class="td" @click="loginStatus = 'sign-in'">{{ $t('btnLogin') }}</span></div>
            </template>
          </div>
          <div v-if="loginStatus == 'forgot-password'"  class="sign">
            <template v-if="hcaptchaStatus">
              <div class="logo">
                <img src="/@/assets/imgs/logo.svg" alt="">
              </div>
              <div class="title">{{ $t('Forgotpassword') }}</div>
              <div class="input-content">
                <el-form v-if="resetPassword == 1" :model="formData" :rules="formRules" ref="form">
                  <el-form-item prop="email">
                    <el-input
                      v-model="formData.email"
                      class="input"
                      :placeholder="$t('email')"
                      clearable
                      :prefix-icon="Message"
                      @input="onInput"
                    />
                  </el-form-item>
                  <div class="mb-login-sign-choose" v-if="screenWidth <= 900">{{ $t('haveaccount') }} <span class="td" @click="loginStatus = 'sign-in'">{{ $t('btnLogin') }}</span></div>
                  <el-form-item class="btn-group">
                    <el-button :loading="loading" class="submit" type="primary" @click="submitForm('forget')">{{ $t('next')}}</el-button>
                  </el-form-item>
                </el-form>
                <el-form v-if="resetPassword == 2" :model="formData" :rules="formRules" ref="form">
                  <el-form-item prop="password">
                    <el-input
                      v-model="formData.password"
                      type="password"
                      class="input mt"
                      :placeholder="$t('password')"
                      clearable
                      :prefix-icon="Lock"
                      show-password
                    />
                  </el-form-item>
                  <el-form-item prop="password2">
                    <el-input
                      v-model="formData.password2"
                      type="password"
                      class="input mt"
                      :placeholder="$t('password2')"
                      clearable
                      :prefix-icon="Lock"
                      show-password
                    />
                  </el-form-item>
                  <div class="mb-login-sign-choose" v-if="screenWidth <= 900">{{ $t('haveaccount') }} <span class="td" @click="loginStatus = 'sign-in'">{{ $t('btnLogin') }}</span></div>
                  <el-form-item class="btn-group">
                    <el-button :loading="loading" class="submit" type="primary" @click="resetPasswordHandle">{{ $t('next')}}</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </template>
            <template v-else>
              <vue-hcaptcha sitekey="" style="width: 303px;margin:0 auto" theme="dark" @verify="verifySuccess"></vue-hcaptcha>
              <div class="mb-login-sign-choose"  v-if="screenWidth <= 900">{{ $t('haveaccount') }} <span class="td" @click="loginStatus = 'sign-in'">{{ $t('btnLogin') }}</span></div>
            </template>
          </div>
          <div class="set-content"   v-if="loginStatus == 'sign-in' && screenWidth > 900">
            <div class="bar-title">
              <div class="t1">{{ $t('noaccount') }}</div>
              <div class="t2" @click="loginStatus = 'sign-up'">{{ $t('btnsign') }}</div>
            </div>
          </div>
      </div>
    </template>
    <template v-if="status == 'step2'">
        <div class="code">
          <img class="back" @click="status = 'step1'" src="/@/assets/imgs/back.svg" alt="">
          <div class="box">
            <div class="title">{{ $t('VerificationCode') }}</div>
            <div class="email-content">
               {{ $t('sentCode',{email:formData.email}) }}
            </div>
            <div class="input-box">
              <el-input
                      v-model="verifyCode"
                      class="input mt"
                      :placeholder="$t('VerificationCode')"
                      clearable
                    />
            </div>
            <div class="info">
              <div class="resend">
                 <span @click="signnHandle" class="text">{{ $t('Resendcode') }}</span>
                 <span v-if="!sendAgain && time != 0">({{ time }})s</span>
                 
              </div>
            </div>
            <el-button :loading="sendLoading" class="submit" type="primary" @click="confirm">{{ $t('Confirm')}}</el-button>
          </div>
        </div>
    </template>
    <div class="close-cion">
      <svg @click="closeLogin" t="1693445178732" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6612" width="200" height="200"><path d="M873.6 150.4c-198.4-198.4-524.8-198.4-723.2 0-198.4 198.4-198.4 524.8 0 723.2 198.4 198.4 524.8 198.4 723.2 0 201.6-198.4 201.6-524.8 0-723.2z m-67.2 566.4l-89.6 89.6-204.8-204.8-204.8 204.8-89.6-89.6 204.8-204.8-204.8-204.8 89.6-89.6 204.8 204.8 204.8-204.8 89.6 89.6-204.8 204.8 204.8 204.8z" p-id="6613" fill="#FFFFFF"></path></svg>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, reactive,onMounted } from 'vue';
import { useStore} from 'vuex'
import { Message,Lock,Aim,Back } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import {getCaptcha,userLogin,register,sendVerifyCode,sendEmailCode,modifyPassword} from '/@/api/api'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
export default {
  name: '',
  setup() {
    const { t } = useI18n();
    const store = useStore()
    //适配
    const screenWidth = computed( () => {
      return store.state.screenWidth
    })
    const status = ref('step1') // 状态区分 登录注册和发送验证码
    const formData = ref({
      email: '',
      password: '',
      password2:'',
      captchaCode:'',
    });
    const lang = computed(() => {
      return store.state.lang
    })
    const verifyCode = ref('')
    const formRules = ref({
      email: [
        { required: true, message: t('enterEmail'), trigger: 'blur' },
        { type: 'email', message: t('sureEmail'), trigger: 'blur' },
      ],
      password: [
        { required: true, message: t('enterpassword'), trigger: 'blur' },
        { min: 6, max: 20, message: t('passwordLength'), trigger: 'blur' },
      ],
      password2: [
        { required: true, message: t('enterpassword2'), trigger: 'blur' },
      ],
      captchaCode: [
        { required: true, message: t('captchaCode2'), trigger: 'blur' },
      ],
    });
    watch(() => store.state.lang,(val) => {
      formRules.value = {
        email: [
          { required: true, message: t('enterEmail'), trigger: 'blur' },
          { type: 'email', message: t('sureEmail'), trigger: 'blur' },
        ],
        password: [
          { required: true, message: t('enterpassword'), trigger: 'blur' },
          { min: 6, max: 20, message: t('passwordLength'), trigger: 'blur' },
        ],
        password2: [
          { required: true, message: t('enterpassword2'), trigger: 'blur' },
        ],
        captchaCode: [
        { required: true, message: t('captchaCode2'), trigger: 'blur' },
      ],
      }
    })
    const loginStatus = ref('sign-in')
    const password = ref('')
    //获取图形验证码
    const getCaptchaImg = ref('')
    const getCaptchaHandle = async() => {
      const res = await getCaptcha()
      getCaptchaImg.value = 'data:image/png;base64,' + res.data
    }
    // 请求状态
    const loading = ref(false)
    const sendLoading = ref(false)
    
    // 重新发送验证码倒计时
    const timer = ref(null)
    const time = ref(60)
    const sendAgain = ref(true)

    onMounted( () => {
      // getCaptchaHandle()
    })
    //人机校验
    const hcaptchaStatus = ref(false)
    const hcaptchaToken = ref('')
    const verifySuccess = (token, eKey) => {
      hcaptchaToken.value = token
      hcaptchaStatus.value = true
    }
    // 忘记密码步骤 第一步输入邮箱， 第二步， 邮箱验证码， 四散步修改密码
    const resetPassword = ref('1')
    watch(loginStatus,(val)=>{
        hcaptchaStatus.value = false
        resetPassword.value = 1
        status.value = 'step1'
        verifyCode.value = ''
        formData.value.email = ''
        formData.value.password = ''
        formData.value.password2 = ''

    })
    const closeLogin = () => {
      store.commit('setShowLogin',false)
    }
    return {
      formData,
      formRules,
      loginStatus,
      password,
      Message,
      Lock,
      Aim,
      Back,
      getCaptchaImg,
      getCaptchaHandle,
      status,
      verifyCode,
      loading,
      sendLoading,
      timer,
      time,
      sendAgain,
      verifySuccess,
      hcaptchaStatus,
      hcaptchaToken,
      lang,
      screenWidth,
      resetPassword,
      closeLogin
    } 
  },
  components: {
    VueHcaptcha
  },
  methods: {
    resetPasswordHandle(){
      const form = this.$refs.form;
      form.validate(async (valid) => {
        if (valid) {
          //校验第二次呼入密码是否正确
          if(this.formData.password != this.formData.password2){
            ElMessage({
              message: this.$t('passwordNosame'),
              type: 'error',
            })
            return
          }
          this.loading = true
          const res = await modifyPassword({
            email: this.formData.email,
            verifyCode: this.verifyCode,
            password: this.formData.password,
          })
          this.loading = false
          if(res.code != 200){
            this.resetPassword = '1'
            this.status = 'step1'
            this.loginStatus = 'forgot-password'
          }
          if(res.code == 2006){
            ElMessage({
              message: this.$t('codeError'),
              type: 'error',
            })
            return 
          }

          if(res.code == 200 && res.data){
            ElMessage({
              message: this.$t('resetSuccess'),
              type: 'success',
            })
            this.resetPassword = '1'
            this.status = 'step1'
            this.loginStatus = 'sign-in'
            this.verifyCode = ''
            this.formData.email = ''
            this.formData.password = ''
            this.formData.password2 = ''
          }
        } 
      })
    },
    async forgetHandle(){
      // 发送邮箱验证码
      this.loading = true
      const res = await sendEmailCode({
        email: this.formData.email,
        'g-recaptcha-response': this.hcaptchaToken,
        language: this.lang,
        "scene":"FORGET_PASSWORD"
      })
      this.loading = false
      clearInterval(this.timer)
      this.time = 60
      this.Countdown()
      if(res.code == 200){
          this.sendAgain = false
          this.status = 'step2'
          ElMessage({
            message: this.$t('sendSuccess'),
            type: 'success',
          })
      }else if(res.code == 2001){
        ElMessage({
          message: this.$t('accountError'),
          type: 'error',
        })
      }else{
        ElMessage({
            message: this.$t(res.code),
            type: 'error',
          })
      }
    },
    Countdown(){
      const self = this
      clearInterval(self.timer)
      self.timer = setInterval( ()=> {
        if(self.time == 0){
          clearInterval(self.timer)
          this.sendAgain = true
          return
        }
        self.time --
      },1000)
    },
    onInput() {
      // Replace all spaces with an empty string as the user types
      this.formData.email = this.formData.email.replace(/\s/g, '');
    },
    //提交注册
    async confirm(){
      if(this.verifyCode == ''){
        ElMessage({
          message: this.$t('VerificationCode'),
          type: 'error',
        })
        return 
      }
      if(this.loginStatus == 'forgot-password'){
        this.resetPassword = 2
        this.status = 'step1'
        return
      }
      this.sendLoading = true
      const res = await register({
        email: this.formData.email,
        verifyCode: this.verifyCode,
        password: this.formData.password,
      })
      this.sendLoading = false
      if(res.code == 2006){
        ElMessage({
          message: this.$t('codeError'),
          type: 'error',
        })
        return 
      }
      if(res.code == 200 && res.data){
        ElMessage({
          message: this.$t('signSuccess'),
          type: 'success',
        })
        this.status = 'step1'
        this.loginStatus = 'sign-in'
        this.verifyCode = ''
        this.formData.email = ''
        this.formData.password = ''
        this.formData.password2 = ''
      }
    },
    submitForm(type){
      const form = this.$refs.form;
      form.validate((valid) => {
        if (valid) {
          //登录
          if(type =='login'){
            this.loginHandle()
          }else if(type == 'sign'){
            this.signnHandle()
          }else if(type == 'forget'){
            this.forgetHandle()
          }
        } 
      })
    },
    async loginHandle(){
      this.loading = true
      const res = await userLogin({
        email: this.formData.email,
        password: this.formData.password,
      })
      this.loading = false
      if(res.code == 200 && res.data){
          localStorage.setItem('MountainLion-token',res.data.user_token)
          this.$emit('loginSuccess',res.data.account)
          this.$store.commit('setShowLogin',false)
          localStorage.setItem('userId',res.data.user_id)
      }
      else if(res.code == 2002){
        ElMessage({
          message: this.$t('IncorrectLogin'),
          type: 'error',
        })
      }else if(res.code == 2001){
        ElMessage({
          message: this.$t('accountError'),
          type: 'error',
        })
      }
    },
    async signnHandle(){
      if(!this.sendAgain || this.loading){
        return
      }
      if(this.loginStatus == 'forgot-password'){
        this.forgetHandle()
        return
      }
      //校验第二次呼入密码是否正确
      if(this.formData.password != this.formData.password2){
        ElMessage({
          message: this.$t('passwordNosame'),
          type: 'error',
        })
        return
      }
      // 发送邮箱验证码
      this.loading = true
      const res = await sendEmailCode({
        email: this.formData.email,
        'g-recaptcha-response': this.hcaptchaToken,
        language: this.lang
      })
      this.loading = false
      clearInterval(this.timer)
      this.time = 60
      this.Countdown()
      if(res.code == 200){
          this.sendAgain = false
          this.status = 'step2'
          ElMessage({
            message: this.$t('sendSuccess'),
            type: 'success',
          })
      }else{
        ElMessage({
            message: this.$t(res.code),
            type: 'error',
          })
      }
    },
    resetForm(){
      const form = this.$refs.form;
      form.resetFields();
    }
  },
  mounted() {
    
  },
  unmounted() {
    
  },
}
</script>

<style scoped lang='scss'>
.captchaCode{
  position: relative;
  .captcha-img{
    position: absolute;
    height: calc(100% - .2rem - 2px);
    right: 0;
    bottom: 2px;
    border-radius: 0 0.15rem 0.15rem 0;
    cursor: pointer;
  }
}
.login-main{
  width: 98%;
  height: 10rem;
  background: #212425;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 2rem;
  border-radius: .3rem;
  display: flex;
  position: relative;
  .close-cion{
    position: absolute;
    right: .3rem;
    top: .3rem;
    svg{
      width: .5rem;
      height: .5rem;
      cursor: pointer;
    }
  }
}
.code{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .back{
    position: absolute;
    width: .8rem;
    top: .2rem;
    left: .2rem;
    cursor: pointer;
  }
  .submit{
      display: block;
      margin: .4rem auto 0;
      height: 1rem;
      width: 8rem;
      background: rgba(0,255,102,0.11);
      box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
      border-radius: 20px 20px 20px 20px;
      opacity: 1;
      border: 1px solid rgba(0,255,102,0.11);
      font-size: .37rem;
      font-family: Poppins-Regular, Poppins;
      font-weight: 400;
      color: #00FF66;
    }
  .info{
    width: 8rem;
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
    margin-top: .2rem;
    .text{
      font-size: 14px;
      font-family: Poppins-Medium, Poppins;
      font-weight: 500;
      cursor: pointer;
    }
  }
  .box{
    width: 100%;
  }
  .title{
    font-size: .5rem;
    font-family: Poppins-Bold, Poppins;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
  }
  .email-content{
    text-align: center;
    margin-top: .4rem;
    font-size: .296rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    color: #FFFFFF;
  }
  .input-box{
    width: 8rem;
    margin: 0 auto;
    margin-top: .4rem;
  }
  .input{
      margin: 0 auto;
      height: .9259rem;
      border-radius: .37rem;
      :deep(.el-input__wrapper){
        width: 100%;
        background: #1C1E1F;
        box-shadow: none;
        border: 1px solid rgba(255,255,255,0.5);
        border-radius: .15rem;
        &.is-focus{
          box-shadow: none;
        }
        .el-input__inner{
          outline: none;
          font-size: 14px;
          color: #FFFFFF;
        }
        .el-icon {
          font-size: .4rem;
        }
      }
    }
}
.set-content{
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding:1rem;

  .t1{
    font-size: .37rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    color: #FFFFFF;
  }
  .t2{
    margin-top: .2rem;
    font-size: .5rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    color: #FFFFFF;
    cursor: pointer;
  }
}
.right{
  border-left: 3px solid #00FF66;

  .t1,.t2{
    text-align: right;
  }
}
.left,.right{
  display: flex;
  align-items: center;
  &.nb{
    border-left: none;
    padding: 0;
  }
  .mb-login-sign-choose{
    font-size: 14px;
    &.f{
      display: flex;
      justify-content: space-between;
    }
    .td{
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .sign{
    width: 100%;
    padding:1rem;
  }
  &.flex{
    flex: 1;
  }
  .logo{
    text-align: center;
    img{
      width: 2rem;
    }
  }
  .title{
    margin-top: .4rem;
    text-align: center;
    font-size: .5185rem;
    font-weight: bold;
  }
  .input-content{
    margin-top: .4rem;
    :deep(.btn-group){
      padding-top: .4rem;
      .submit{
        height: 1rem;
        width: 100%;
        background: rgba(0,255,102,0.11);
        box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
        border-radius: 20px 20px 20px 20px;
        opacity: 1;
        border: 1px solid rgba(0,255,102,0.11);
        font-size: .37rem;
        font-family: Poppins-Regular, Poppins;
        font-weight: 400;
        color: #00FF66;
      }
    }
    .input{
      height: .9259rem;
      background: #1C1E1F;
      box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
      border-radius: .37rem;
      &.mt{
        margin-top: .2rem;
      }
      :deep(.el-input__wrapper){
        background: #1C1E1F;
        box-shadow: none;
        border: 1px solid rgba(255,255,255,0.5);
        border-radius: .15rem;
        &.is-focus{
          box-shadow: none;
        }
        .el-input__inner{
          outline: none;
          font-size: 14px;
          color: #FFFFFF;
        }
        .el-icon {
          font-size: .4rem;
        }
      }
    }
  }
}
.Forgotpassword{
  text-align: right;
  cursor: pointer;
  font-size: 14px;
  .text:hover{
    text-decoration: underline;
  }
}
</style>