<template>
   <div class="top-info" v-if="presetData.info.concept.list.length > 0">
    <div class="list">
        <div class="left">
            <img class="coin-img" :src="presetData.coinImageUrl" alt="">
        </div>
        <div class="right">
            <div class="title">
                <span class="coinName">{{ presetData.coinName }}</span> {{ presetData.coinFullName }}
            </div>
            <div class="text">
                <template v-for="(item,index) in presetData.info.concept.list" :key="index">
                    {{ index != 0 ? "/" : '' }}{{ item.name }}</template>
            </div>
        </div>
    </div>
  </div>
  <div class="price-info" :class="screenWidth > 1200 ? '' : 'mb'" v-if="presetData.info.detial">
    <div class="item">
       <div class="coin-text">
        <div class="price">
            $ <span class="green">{{ formatterNumber(presetData.info.detial.legal_currency_price_display) }}</span>
            <div class="persent" :class="presetData.info.detial.percent_change_24h > 0 ? 'up' : 'down'">{{ presetData.info.detial.percent_change_24h }}% (${{ (Number(presetData.info.detial.increment_price_24h)).toFixed(6) - 0 }})</div>
        </div>
       </div>
       <div class="content" :class="screenWidth > 1200 ? '' : 'mb'">
            <div class="list">
                <div class="title-info">
                    {{ $t('MarketCap') }}($)
                    <div class="text">{{ formatterNumber(presetData.info.detial.market_cap_display) }}</div>
                </div>
                <Gauge :data="list[0]" />
            </div>
            <div class="list">
                <div class="title-info">
                    {{ $t('CirculatingSupply') }}(BTC)
                    <div class="text">{{ formatterNumber(presetData.info.detial.available_supply) }}</div>
                </div>
                <Gauge :data="list[1]"/>
            </div>
            <div class="list">
                <div class="title-info">
                    {{ $t('Tradingvolume') }}($)
                    <div class="text">{{ formatterNumber(presetData.info.detial.volume_24h) }}</div>
                </div>
                <Gauge :data="list[2]" />
            </div>
        </div>
    </div>
    <div class="item item-right">
       <div class="info-right-title">
        {{ $t('MarketCap') }} ${{ formatterNumber(presetData.info.detial.market_cap_display) }}
       </div>
       <div class="r-content" :class="screenWidth > 800 ? '' : 'mb'">
        <div class="c">
           <div class="l">
                <div class="title">{{ $t('high24')}}</div>
                <div class="text">${{formatterNumber(presetData.info.detial.high_24h.toFixed(6) - 0)}}</div>
           </div>
           <div class="l">
                <div class="title">{{ $t('low24')}}</div>
                <div class="text">${{formatterNumber(presetData.info.detial.low_24h.toFixed(6) - 0)}}</div>
           </div>
           <div class="l">
                <div class="title">{{ $t('change24')}}</div>
                <div class="text" :class="presetData.info.detial.percent_change_24h > 0 ? 'up' :'down'">{{presetData.info.detial.percent_change_24h}}%</div>
           </div>
           <div class="l">
                <div class="title">{{ $t('Marketcapitalization')}}</div>
                <div class="text">${{formatterNumber(presetData.info.detial.market_cap_display)}}</div>
           </div>
           <div class="l">
                <div class="title">{{ $t('Historicalhighest')}}</div>
                <div class="text">${{formatterNumber(presetData.info.detial.history_high_price.toFixed(6) - 0)}}</div>
           </div>
           <div class="l">
                <div class="title">{{ $t('Historicallowest')}}</div>
                <div class="text">${{formatterNumber(presetData.info.detial.history_low_price.toFixed(6) - 0)}}</div>
           </div>
           
        </div>
        <div class="c">
            <div class="l">
                <div class="title">{{$t('Tradingvolume')}}</div>
                <div class="text">${{formatterNumber(presetData.info.detial.volume_24h_from.toFixed(6) - 0)}}</div>
           </div>
           <div class="l">
                <div class="title">{{$t('hourvolume')}}</div>
                <div class="text">${{formatterNumber(presetData.info.detial.volume_24h.toFixed(6) - 0)}}</div>
           </div>
           <!-- <div class="l">
                <div class="title">{{$t('VolumeRatio')}}</div>
                <div class="text">${{$formatNumber(presetData.detial.high_24h.toFixed(6) - 0)}}</div>
           </div>
           <div class="l">
                <div class="title">{{$t('Correlation')}}</div>
                <div class="text">${{$formatNumber(presetData.detial.high_24h.toFixed(6) - 0)}}</div>
           </div> -->
           <div class="l">
                <div class="title">{{$t('InvestmentReturn')}}</div>
                <div class="text" :class="presetData.info.detial.percent_rate_of_return > 0 ? 'up' :'down'">{{presetData.info.detial.percent_rate_of_return}}</div>
           </div>
          
        </div>
       </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'
import Gauge from './Gauge.vue'
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
    //适配
    const screenWidth = computed( () => {
      return store.state.screenWidth
    })
    const list = ref([])
    const listValue1 = presetData.value.info.detial.market_cap_share.replace('%','')
    const listValue2 = presetData.value.info.detial.available_supply_ratio.replace('%','')
    const listValue3 = presetData.value.info.detial.turnover_rate.replace('%','')
    list.value = [
        {
            data:[{value:listValue1, name: 'ofglobalmarketcap'}],
            color:[[listValue1/100, '#00FF60'], [1, '#343434']]
        },
        {
            data:[{value: listValue2, name: 'circulationrate'}],
            color:[[listValue2/100, '#1673FF'], [1, '#343434']]
        },
        {
            data:[{value: listValue3, name: 'turnoverrate'}],
            color:[[listValue3/100, '#FB6747'], [1, '#343434']]
        }
    ]
    const formatterNumber = (num) => {
        const value = Math.abs(num)
        let number = ''
        if (value <= 999) {
            number = value.toFixed(2 - 0);
        } else if (value <= 999999) {
            number = (value / 1000).toFixed(2 - 0) + "K";
        } else if (value <= 999999999) {
            number = (value / 1000000).toFixed(2 - 0) + "M";
        } else {
            number =  (value / 1000000000).toFixed(2 - 0) + "B";
        }
        return num > 0 ? number : '-' + number
    }
    return {
        presetData,
        screenWidth,
        list,
        formatterNumber
    } 
  },
  components: {
    Gauge
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
.top-info{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    .list{
        display: flex;
        width: 100%;
        padding: .5rem .3rem;
        background: #1C1E1F;
        border-radius: .37rem;
        opacity: 1;
        margin-bottom: .3rem;
        &:hover{
            box-shadow: 0 2px 12px 0 rgba(255,255,255,.1);
        }
        .coin-img{
            width: .9rem;
        }
        .title{
            font-size: .296rem;
            font-family: Poppins-Regular, Poppins;
            font-weight: 400;
            color: #5D6588;
            .coinName{
                font-size: .37rem;
                color: #FFFFFF;
            }
        }
        .text{
            margin-top: .1rem;
            font-size: .296rem;
            font-family: Poppins-SemiBold, Poppins;
            font-weight: 600;
            color: #777777;
            display: flex;
            align-items: center;
            .color{
                color: #00FF66;
            }
            .red{
                color: #FA2256;
            }
            .zs{
                width: .24rem;
                margin-right: .15rem;
            }
        }
        .left{
            margin-right: .3rem;
        }
    }
}
.price-info{
    display: flex;
    justify-content: space-between;
    &.mb{
        flex-wrap: wrap;
        justify-content: center;
        .item{
            width: 100%;
        }
    }
    .item{
        width: 48%;
        background: #1C1E1F;
        margin-top: .2rem;
        padding: .3rem;
        border-radius: 0.37rem;
        .coin-text{
            .price{
                font-size: .296rem;
                .green{
                    font-size: .7rem;
                    font-family: Poppins-Bold, Poppins;
                    font-weight: bold;
                    color: #00FF66;
                }
                .persent{
                    font-size: 14px;
                    font-family: Poppins-Regular, Poppins;
                    font-weight: 400;
                   
                }
            }
        }
        .content{
            display: flex;
            &.mb{
                display: block;
                .title-info{
                    text-align: center;
                }
            }
            .list{
                margin-top: .3rem;
                flex: 1;
                padding: 0 .2rem;
                .title-info{
                    font-size: 14px;
                    font-family: Poppins-Regular, Poppins;
                    font-weight: 400;
                    color: #777777;
                    .text{
                        margin-top: .1rem;
                        font-size: 14px;
                        font-family: Poppins-Regular, Poppins;
                        font-weight: 400;
                        color: #FFFFFF;
                    }
                }
            }
        }
        &.item-right{
            .info-right-title{
                font-size: .3333rem;
                font-family: Poppins-Regular, Poppins;
                font-weight: 400;
                color: #FFFFFF;
            }
            .r-content{
                display: flex;
                &.mb{
                    flex-wrap: wrap;
                    .c{
                        width: 100%;
                        padding: .2rem;
                        &:last-child{
                            margin-top: 0;
                            padding-top: 0;
                        }
                        &:first-child{
                            padding-bottom: 0;
                        }
                    }
                }
                .c{
                    width: 50%;
                    padding: .8rem .2rem;
                    margin-top: .2rem;
                    .l{
                        height: .6rem;
                        line-height: .6rem;
                        display: flex;
                        justify-content: space-between;
                        .title{
                            font-size: 14px;
                            font-family: Poppins-Regular, Poppins;
                            font-weight: 400;
                            color: #777777;
                        }
                        .text{
                            font-size: 14px;
                            font-family: Poppins-Regular, Poppins;
                            font-weight: 400;
                            color: #FFFFFF;
                        }
                    }
                }
            }
        }
    }
}
.up{
    color: #00FF66!important;
}
.down{
    color: #FA2256!important;
}
</style>