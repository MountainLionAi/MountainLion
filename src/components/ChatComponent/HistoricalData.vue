<!-- 历史记录 -->
<template>
  <div class="HistoricalData">
    <div class="info">
       <div class="left">
        <img :src="presetData.coinImageUrl" alt="">
        {{ $t('HistoricalData',{coin: presetData.coinName}) }}
       </div>
       <div class="right">
            <div class="tab">
                <div class="list" @click="searchType = '7d'" :class="searchType == '7d' ? 'active' : ''">
                    {{$t('d7')}}
                </div>
                <div class="list" @click="searchType = '30d'" :class="searchType == '30d' ? 'active' : ''">
                    {{$t('d30')}}
                </div>
                <div class="list" @click="searchType = '12m'" :class="searchType == '12m' ? 'active' : ''">
                    {{$t('m12')}}
                </div>
            </div>
       </div>
    </div>
    <div class="table">
        <div class="table-content">
            <div class="c">
                <div class="header">
                    <div class="th left">{{$t('date')}}</div>
                    <div class="th">{{$t('Open')}}($)</div>
                    <div class="th">{{$t('High')}}($)</div>
                    <div class="th">{{$t('Low')}}($)</div>
                    <div class="th">{{$t('Close')}}($)</div>
                    <div class="th right">{{$t('hourvolume')}}($)</div>
                    <div class="th right">{{$t('Marketcapitalization')}}($)</div>
                </div>
                <div class="tbody" v-for="(item,index) in list" :key="index">
                    <div class="td left">{{ (new Date(item.tickertime).toLocaleDateString()).replace(/\//g,'-') }}</div>
                    <div class="td">{{$formatNumber(item.openprice)}}</div>
                    <div class="td">{{$formatNumber(item.high)}}</div>
                    <div class="td">{{$formatNumber(item.low)}}</div>
                    <div class="td">{{$formatNumber(item.closeprice)}}</div>
                    <div class="td right">{{formatterNumber(item.vol)}}</div>
                    <div class="td right">{{ formatterNumber(item.marketcap) }}</div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'

export default {
  name: 'HistoricalData',
  props:{
    presetData:{
        type: Object,
        default: null
    },
},
  setup(props) {
    const searchType = ref('7d')
    const presetData = ref(props.presetData)
    const kline_sorted = ref(presetData.value.tradeHistory.kline_sorted)
    const formatterNumber = (value) => {
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
        return number
    }
    const list = computed( ()=> {
        if(searchType.value == '7d'){
            return kline_sorted.value.slice(0,6)
        }
        else if(searchType.value == '30d'){
            return kline_sorted.value.slice(0,29)
        }else{
            return kline_sorted.value
        }
    })
    return {
        searchType,
        list,
        formatterNumber
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
.HistoricalData{
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
                margin-top: .2rem;
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
    .table{
        width: 100%;
        position: relative;
        height: 5rem;
        .table-content{
            position: absolute;
            top: 0;
            left: -.4rem;
            right:  -.4rem;
            padding: 0.4rem;
            overflow: auto;
            z-index: 1000;
            background: #1C1E1F;
            height: 5rem;
            .c{
                width: 100%;
                min-width: 1000px;
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
}
</style>