<!-- OKX 当季 -->
<template>
     <div class="trendassessment">
        <div class="info">
         <div class="left">
          <div class="box">
            <img :src="presetData.coinImageUrl" alt="">
            <div class="text">
               {{  presetData.coinName }}
               <div class="b">
                {{  presetData.coinName }}/USD {{ $t('CurrentQuarter') }}
               </div>
            </div>
          </div>
         </div>
         <div class="right">
              <div class="tab">
                  <div class="list" @click="changeSearchType('comprehensive')" :class="searchType == 'comprehensive' ? 'active' : ''">
                      {{$t('comprehensive')}}
                  </div>
                  <div class="list" @click="changeSearchType('MACD')" :class="searchType == 'MACD' ? 'active' : ''">
                    MACD
                  </div>
                  <div class="list" @click="changeSearchType('RSI')" :class="searchType == 'RSI' ? 'active' : ''">
                    RSI
                  </div>
                  <div class="list" @click="changeSearchType('StochRSI')" :class="searchType == 'StochRSI' ? 'active' : ''">
                    StochRSI
                  </div>
                  <div class="list" @click="changeSearchType('KDJ')" :class="searchType == 'KDJ' ? 'active' : ''">
                    KDJ
                  </div>
              </div>
         </div>
      </div>
      <div class="price-info">

      </div>
    </div>
 </template>
 
 <script>
 import { ref, computed, watch } from 'vue';
 import { useStore} from 'vuex'
 import { useI18n } from 'vue-i18n'

 export default {
   name: '',
   props:{
     presetData:{
         type: Object,
         default: null
     },
   },
   setup(props) {
    const { t } = useI18n();
    const store = useStore()
    const searchType = ref('comprehensive')
    const changeSearchType = (val) => {
        searchType.value = val
    }
     const presetData = ref(props.presetData)
     const data = ref(null)
     data.value = presetData.value.investment_advice.filter( item => item.type == searchType.value)
     watch(() => searchType.value,(val) => {
        data.value = presetData.value.investment_advice.filter( item => item.type == searchType.value)
     })
     //适配
     const screenWidth = computed( () => {
       return store.state.screenWidth
     })
     return {
         presetData,
         screenWidth,
         changeSearchType,
         searchType
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
   .trendassessment{
      width: 100%;
      background: #1C1E1F;
      border-radius: .37rem;
      padding: 0.25rem 0.4rem;
      .info{
              display: flex;
              justify-content: space-between;
              margin-bottom: .5rem;
              font-size: 14px;
              flex-wrap: wrap;
              .left{
                  display: flex;
                  align-items: center;
                  margin-top: .2rem;
                  .box{
                    display: flex;
                    align-items: center;
                    img{
                        width: .9rem;
                        margin-right: .2rem;
                    }
                    .b{
                        font-size: .37rem;
                    }
                  }
                  
              }
              .right{
                  .tab{
                      display: flex;
                      flex-wrap: wrap;
                      align-items: center;
                      box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
                      border-radius: .2222rem;
                      padding: .2rem 0;
                      .list{
                          background: #181A1C;
                          margin: 0 .3rem;
                          margin-top: .2rem;
                          font-size: 14px;
                          font-family: Poppins-Medium, Poppins;
                          font-weight: 500;
                          color: #A3A3A3;
                          cursor: pointer;
                          padding: .1rem .3rem;
                          border-radius: .2222rem;
                          &.active{
                              color: #ffffff;
                              background: #3F3F3F;
                          }
                      }
                  }
              }
      }
  }
 </style>