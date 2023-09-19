<!-- 历史记录 -->
<template>
    <div class="fundsmonitoring">
      <div class="info">
         <div class="left">
          <img :src="presetData.coinImageUrl" alt="">
          {{ $t('Highvalue',{coin: presetData.coinName}) }}
         </div>
      </div>
      <div class="fundsmonitoring-mian" :class="screenWidth > 900 ? '' : 'mb'">
        <div class="list" v-if="presetData.trade[analysisType].order_flow.length > 0">
            <div class="title">
                {{ $t('TransactionFlow') }}
                <div class="pd">
                    {{ $t('Buy') }}
                </div>
            </div>
            <PieFundflow1 :presetData="presetData.trade"/>
        </div>
        <div class="list" v-if="list.length > 0">
            <div class="title">
                {{ $t('OnchainMonitoring') }}
                <div class="table">
                    <div class="header">
                        <div class="th left">{{$t('time')}}</div>
                        <div class="th left">{{$t('Name')}}</div>
                        <div class="th right">{{$t('content')}}</div>
                        <div class="th right">{{$t('Signal')}}</div>
                    </div>
                    <div class="tbody" v-for="(item,index) in list" :key="index">
                        <div class="td left">{{ formatDate(new Date(item.order_time*1000)) }}</div>
                        <div class="td left">{{ item.symbol }}</div>
                        <div class="td right">{{ item.direction_desc }}</div>
                        <div class="td right">{{ item.message }}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, watch } from 'vue';
  import { useStore} from 'vuex'
  import PieFundflow1 from './PieFundflow1.vue'

  export default {
    name: 'fundsmonitoring',
    props:{
      presetData:{
          type: Object,
          default: null
      },
  },
    setup(props) {
        //适配
        const store = useStore()
        const screenWidth = computed( () => {
            return store.state.screenWidth
        })
        const presetData = ref(props.presetData)
        const analysisType = computed( () => {
            if(store.state.analysisType == 'trend_15m'){
                return 'big_transfer_15m'
            }
            if(store.state.analysisType == 'trend_1h'){
                return 'big_transfer_1h'
            }
            if(store.state.analysisType == 'trend_4h'){
                return 'big_transfer_4h'
            }
            if(store.state.analysisType == 'trend_1d'){
                return 'big_transfer_1d'
            }
            if(store.state.analysisType == 'trend_7d'){
                return 'big_transfer_7d'
            }
        })
        const list = ref([])
        list.value = presetData.value.trade[analysisType.value].list
        watch(() => analysisType.value, (val) => {
            list.value = presetData.value.trade[analysisType.value].list
        })
        const formatDate = (d) => {
            const year = d.getFullYear();
            const month = ("0" + (d.getMonth() + 1)).slice(-2); // 月份是从0开始的，所以要+1
            const day = ("0" + d.getDate()).slice(-2);
            const hours = ("0" + d.getHours()).slice(-2);
            const minutes = ("0" + d.getMinutes()).slice(-2);
            const seconds = ("0" + d.getSeconds()).slice(-2);
            
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
        return {
            presetData,
            screenWidth,
            list,
            formatDate,
            analysisType
        } 
    },
    components: {
        PieFundflow1,
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
  .fundsmonitoring{
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
                  img{
                      width: .51rem;
                      margin-right: .2rem;
                  }
              }
             
      }
      .fundsmonitoring-mian{
        display: flex;
        &.mb{
            display: block;
            .list{
                width: 100%;
                &:last-child{
                    margin-top: .3rem;
                }
            }
        }
        .list{
            flex: 1;
            padding: 0 .3rem;
        }
      }
  }
  .table{
            width: 100%;
            .header{
                display: flex;
                margin-top: .3rem;
                .th{
                    flex: 1;
                    font-size: 12px;
                    font-family: Poppins-Regular, Poppins;
                    font-weight: 400;
                    color: #777777;
                    height: .4rem;
                    line-height: .4rem;
                    text-align: center;
                    &.right{
                        text-align: right;
                    }
                    &.left{
                        text-align: left;
                    }
                }
            }
            .tbody{
                display: flex;
                .td{
                    flex: 1;
                    font-size: 12px;
                    font-family: Poppins-Regular, Poppins;
                    font-weight: 400;
                    color: #FFFFFF;
                    padding: .2rem 0;
                    text-align: center;
                    &.right{
                        text-align: right;
                    }
                    &.left{
                        text-align: left;
                    }
                }
            }
        }
  </style>