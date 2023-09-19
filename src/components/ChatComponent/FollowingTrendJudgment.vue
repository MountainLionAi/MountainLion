<!-- 币种信息组件 -->
<template>
    <div class="FollowingTrendJudgment">
        <div class="info">
           <div class="left">
                <img :src="presetData.coinImageUrl" alt="">
                {{ $t('FollowingTrendJudgment',{coin:coinName}) }}
           </div>
           <div class="right">
            <div class="tab">
                  <div class="list active">
                      {{$t('duokongshuangxiang')}}
                  </div>
            <el-tooltip
                class="box-item"
                effect="dark"
                :content="$t('duokongshuangxiangTips')"
                placement="bottom-end"
            >
            <svg t="1692867691615" class="iconTip" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6648" width="200" height="200"><path d="M512 65.983389c-245.952318 0-446.016611 200.064292-446.016611 446.016611S266.047682 958.016611 512 958.016611 958.016611 757.952318 958.016611 512 757.952318 65.983389 512 65.983389zM544.00086 736.00086c0 17.695686-14.303454 32.00086-32.00086 32.00086s-32.00086-14.303454-32.00086-32.00086L479.99914 448c0-17.695686 14.303454-32.00086 32.00086-32.00086 17.695686 0 32.00086 14.303454 32.00086 32.00086L544.00086 736.00086zM512 352.00086c-26.496224 0-48.00043-21.53689-48.00043-48.00043 0-26.527187 21.504206-48.00043 48.00043-48.00043s48.00043 21.471523 48.00043 48.00043C560.00043 330.46397 538.496224 352.00086 512 352.00086z" fill="#ffffff" p-id="6649"></path></svg>
            </el-tooltip>
            </div>
         </div>
        </div>
        <div class="yc">
            {{ forecast.action == 'buy' ? $t('actionBuy',{
                time: getTime(forecast.trigger_time),
                price: $formatNumber(forecast.price)
            }) : $t('actionSell',{
                time: getTime(forecast.trigger_time),
                price: $formatNumber(forecast.price)
            }) }}
            <br>
            {{$t('NextUpdateTime')}}：{{ getTime(forecast.next_update_time) }}
        </div>
        <div class="yc-right">
            {{ $t('RecentOperation') }} : {{ getTime(action.trading_at) }} <br>
            <span :class="action.action == 'sell' ? 'down' : 'up'"> {{ action.action == 'sell' ? $t('Sell') : $t('Buy') }}</span>: {{ $formatNumber(action.price) }} USDT
        </div>
        <div class="table">
            <div class="table-content">
                <div class="c">
                    <div class="header">
                        <div class="th left">{{$t('time')}}</div>
                        <div class="th">{{$t('Yield')}}($)</div>
                        <div class="th right">{{$t('BenchmarkReturn')}}</div>
                    </div>
                    <div class="tbody" v-for="(item,index) in list" :key="index">
                        <div class="td left">{{ item[0] }}</div>
                        <div class="td" :class="item[1] > 0 ? 'up' : 'down'">{{item[1] > 0 ? '+' : ''}}{{ item[1] }}%</div>
                        <div class="td right" :class="item[2] > 0 ? 'up' : 'down'">{{item[2] > 0 ? '+' : ''}}{{ item[2] }}%</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="kline">
            <KlineDollowing :kline="kline_for_trad" :presetData="presetData"/>
        </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, watch } from 'vue';
  import { useStore} from 'vuex'
  import KlineDollowing from './KlineDollowing.vue'
  export default {
    name: '',
    props:{
      presetData:{
          type: Object,
          default: null
      },
    },
    setup(props) {
      const store = useStore()
      const presetData = ref(props.presetData)
      const kline_for_trad = ref(props.presetData.kline_for_trad)
      //适配
      const screenWidth = computed( () => {
        return store.state.screenWidth
      })
      const list = ref([])
      for (var key in presetData.value.statistics.tag) {
            if (presetData.value.statistics.tag.hasOwnProperty(key)) {
                list.value.push([
                    presetData.value.statistics.tag[key],
                    presetData.value.statistics.strategy[key],
                    presetData.value.statistics.base[key],
                ])
            }
        }
      const forecast = ref(presetData.value.forecast)
      const action = ref(presetData.value.action)

      const getTime = (timestamp) => {
        let date = new Date(timestamp * 1000);  // JavaScript uses milliseconds, so multiply by 1000
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-based
        let day = String(date.getDate()).padStart(2, '0');
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');
        let seconds = String(date.getSeconds()).padStart(2, '0');

        let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return formattedDate
      }
      return {
          presetData,
          screenWidth,
          list,
          forecast,
          getTime,
          action,
          kline_for_trad
      } 
    },
    components: {
        KlineDollowing
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
.FollowingTrendJudgment{
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
    .yc{
        padding-left: .71rem;
        font-size: 12px;
    }
    .yc-right{
        font-size: 12px;
        text-align: right;
    }
}
.table{
        width: 100%;
        position: relative;
        height: 4rem;
        .table-content{
            position: absolute;
            top: 0;
            left: -.4rem;
            right:  -.4rem;
            padding: 0.4rem;
            overflow: auto;
            z-index: 1000;
            background: #1C1E1F;
            height: 4rem;
            .c{
                width: 100%;
            }
        }
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
                height: .7rem;
                line-height: .7rem;
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
    .up{
        color: #00FF66!important;
    }
    .down{
        color:#FA2256!important;
    }
    .iconTip{
        width: .3rem;
        height: .3rem;
        margin-top: .3rem;
        cursor: pointer;
    }
  </style>