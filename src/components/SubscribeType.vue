<template>
    <div class="subscribe-box" :class="screenWidth<=800 ? 'mb-login-box' : ''">
      <el-dialog
        v-model="show"
        :show-close="false"
        :before-close="handleClose"
        :width="screenWidth<=800 ? '80%' :'430px'"
        center
        >
        <div class="cont">
          <div class="text">{{$t('Selectsubscriptiontype')}}</div>
          <div class="contBox">
            <div class="advantages">
              <div v-html="$t('yearBuy',{
                num: '16%'
              })"></div>
            </div>
            <ul class="advantagesBox">
              <li>
                <img src="/@/assets/imgs/sure.svg" alt="">
                {{$t('buytips1')}}
              </li>
              <li>
                <img src="/@/assets/imgs/sure.svg" alt="">
                {{$t('buytips2')}}
              </li>
              <li>
                <img src="/@/assets/imgs/sure.svg" alt="">
                {{$t('buytips3')}}
              </li>
            </ul>
            <ul class="type_ul">
              <li class="ci" v-for="(item, index) in paylist.slice(0, 2)" :key="index" @click="chooseCardTypeHandle(item)" :class="user_card_type.card_type == item.card_type ? 'active' : ''">
                <div class="left">
                  {{ item.time }} {{ $t(item.time > 1 ? 'moreTime' : 'oneTime') }} {{$t('Indefinitely')}}
                  <span class="fontYellow">{{ item.real_price }} </span> 
                  <span class="originalPrice">￥{{ item.display_price }}</span>
                </div>
                <div class="right" v-if="index==1">
                  {{$t('free3')}}
                </div>
              </li>
            </ul>
            <ul class="cycleType_ul">
              <li class="cycle" v-for="(item1, index1) in paylist.slice(2, 5)" :key="index1" @click="chooseCardTypeHandle(item1)" :class="user_card_type.card_type == item1.card_type ? 'active' : ''">
                <div class="topbox">
                  <div class="card">{{ $t('cardType' + item1.card_type) }}</div>
                  <div class="cishu">{{item1.time}} {{ $t(item1.time > 1 ? 'moreTime' : 'oneTime') }}</div>
                </div>
                <div class="price">￥{{ item1.real_price }} <span class="originalPrice">￥{{ item1.display_price }}</span></div>
              </li>
            </ul> 
          </div>
          <div class="bottom">
            <el-button class="closeBtn" @click="PaymentMethod" :loading="loading">
              {{$t('Subscribe')}}
            </el-button>
          </div>
        </div>

      </el-dialog>
    </div>

  </template>
  
  <script>
  import { ref, computed, watch } from 'vue';
  import { useStore} from 'vuex'
  import { useI18n } from 'vue-i18n'
  // import express from 'express'
  import stripe from 'stripe';
  import EventBus from '/@/utils/EventBus.js'
  import { payCardInfo } from  '/@/api/api.js'
  import BigNumber from 'bignumber.js'
  
  export default {
    name: 'Login',
    props:['subscribeDialog'],
    setup(props) {
      const store = useStore()
      const { t } = useI18n();
      const show = ref(props.subscribeDialog)
      const loading = ref(false)
      //适配
      const screenWidth = computed( () => {
        return store.state.screenWidth
      })
      const lang = computed(() => {
        return store.state.lang
      })
      const user_card_type = ref({})
      const chooseCardTypeHandle = (item)=>{
        user_card_type.value = item
      }
      const paylist = ref([])
      const account =  computed( () => {
        return store.state.account
      })
     return {
      show: show,
      screenWidth,
      paylist,
      user_card_type,
      chooseCardTypeHandle,
      loading,
      account,
     } 
    },
    components: {
    },
    watch: {
      'subscribeDialog'(a){
        this.show = a  
      },
    },
    methods: {
      handleClose(done){
        this.show = false
        this.$emit('closeSubscribeDialog','closeSubscribeDialog')
      },
      async PaymentMethod (){
          this.loading = true
          const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
          const halfHourLaterTimestampInSeconds = currentTimestampInSeconds + 30 * 60;
          let url = location.protocol + '//' + location.host
          const stripeInstance = stripe('');
          const session = await stripeInstance.checkout.sessions.create({
              payment_method_types: ['card'],
              expires_at: halfHourLaterTimestampInSeconds,
              customer_email: this.account,
              payment_intent_data: {
                  metadata: {
                      'source': 'stripe',
                      'email': this.account,
                      'productCats': this.user_card_type.card_type, 
                      'platform': 'mountainlion',
                      'userId': localStorage.getItem('userId'),
                  }
              },
              line_items: [{
                price_data: {
                  currency: 'cny',
                  product_data: {
                    name: this.user_card_type.card_name,
                  },
                  unit_amount: BigNumber(this.user_card_type.real_price ).multipliedBy(100).toNumber(),//this.user_card_type.real_price 
                },
                quantity: 1,
              }],
              mode: 'payment',
              success_url: url + '/#/?status=success',
              cancel_url: url + '/#/?status=faild',
            });
          this.loading = false
          localStorage.setItem('payStatus','1')
          this.$emit('closeSubscribeDialog','closeSubscribeDialog')
          window.open(session.url)
      },
      async getPayCardInfoList(){
        const result = await payCardInfo({}) 
        if(result.code == 200){
          this.paylist = result.data
          this.user_card_type =  this.paylist[0]
      }
      }
    },
    mounted() {
     this.getPayCardInfoList()
    },
    unmounted() {
      
    },
  }
  </script>
  
  <style scoped lang='scss'>
  
  .subscribe-box{
    font-family: Poppins-Regular, Poppins;
    color: #000000;
    :deep(.el-dialog) {
      background: linear-gradient(180deg, #FFFAF3 0%, #FFF0D9 100%)!important;
      box-shadow: none;
      border-radius: 10px;
    }
    :deep(.el-overlay-dialog)  {
      backdrop-filter: blur(5px);
    }
    :deep(.el-dialog__header ){
      padding: 0.2rem 0; 
      padding-bottom: 0; 
      margin-right: 0; 
      height: 0;
      position: relative;
    }
    // :deep( .el-dialog--center .el-dialog__body ){ 
    //   padding-top: 0px;
    // }
      .close{
        width: .5rem;
        height: .5rem;
        z-index: 1114;
        position: absolute;
        right: 15px;
        // top: 60px;
        cursor: pointer;
        img{
          width: 100%;
        }
      }
      .cont{
        .text{
          text-align: left;
          font-size: .44rem;
          color: #000000;
        }
        .contBox{
          margin-top: .4rem;
          color: #000000;
          
          .advantages{
            font-family: Roboto-Medium, Roboto;
            font-weight: 500;
            font-size: .32rem;
            margin-bottom: .2rem;
          }
          .advantagesBox{
            li{
              font-family: Roboto-Medium, Roboto;
              font-weight: 500;
              font-size: .32rem;
              margin-bottom: .2rem;
            }
          }
          .type_ul{
            .ci{
              background: #FFF7EC;
              border-radius: .74rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: .2rem;
              font-size: .35rem;
              margin-bottom: .15rem;
              border: 1px solid #FFFFFF;
              cursor: pointer;
              .left{
                flex: 1;
              }
              .right{
                background: #FF5C00;
                padding: 0 .3rem;
                font-family: Roboto-Bold, Roboto;
                font-weight: bold;
                color: #FFFFFF;
                height: .6rem;
                line-height: .6rem;
                border-radius: .4rem;
                text-align: center;
                font-size: 12px;
              }
              .originalPrice{
                font-family: Roboto-Medium, Roboto;
                font-weight: 500;
                color: #352000;
                text-decoration-line: line-through;
                font-size: .24rem;
                margin-left: .1rem;
              }
              &.active{
                border: 1px solid #FF5C00;
                background: #ffffff;
              }
            } 
          }
          .cycleType_ul{
            
            .cycle{
              background: #FFF7EC;
              padding: .2rem;
              border-radius: .3rem;
              width: 100%;
              border: 1px solid #FFFFFF;
              cursor: pointer;
              &.active{
                border: 1px solid #FF5C00;
                background: #ffffff;
              }
              .topbox{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: .2rem;
                .card{
                  font-size: .32rem;
                }
                .cishu{
                  color: #878787;
                }
              }
            }
            .price{
              font-size: .3rem;
              display: flex;
                align-items: center;
                justify-content:flex-start;
              span{
                color: #878787;
                text-decoration-line: line-through;
                font-size: .24rem;
                margin-left: .1rem;
              }
            }
          }
        }
      }
      .bottom{
        margin-top: .2rem;
        .closeBtn{
          background: linear-gradient(87deg, #FFC56C 0%, #FFD38E 100%);
          text-align: center;
          border-radius:.3rem ;
          font-size: .35rem;
          font-weight: bold;
          color: #5D441D;
          cursor: pointer;
          width: 100%;
          height: 1rem;
        }
      }

    &.mb-login-box{
      font-size: .22rem;
      :deep(.el-dialog) {
      }
      .close{
        // width: .54rem;
        // height: .54rem;
        position: absolute;
        right: 15px;
        // top: 35px;
        cursor: pointer;
      }

    }
  }
  </style>
