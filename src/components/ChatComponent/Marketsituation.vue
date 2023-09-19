<!-- 代币市场状况 -->
<template>
  <div class="Marketsituation">
    <div class="info">
        <img :src="coinImageUrl" alt="">
       {{ $t('Marketsituation',{coin:coinName}) }}
    </div>
    <div class="table">
        <div class="table-content">
            <div class="c">
                <div class="header">
                    <el-row>
                        <el-col :span="4">
                            <div class="th text-left">{{ $t('ExchangePlatform') }}</div>
                        </el-col>
                        <el-col :span="5">
                            <div class="th">{{ $t('ExRank') }}</div>
                        </el-col>
                        <el-col :span="3">
                            <div class="th">{{ $t('newPrice') }}($)</div>
                        </el-col>
                        <el-col :span="3">
                            <div class="th">{{ $t('Tradingvolume') }}</div>
                        </el-col>
                        <el-col :span="3">
                            <div class="th">{{ $t('hourvolume') }}($)</div>
                        </el-col>
                        <el-col :span="3">
                            <div class="th text-right">{{ $t('Percentage') }}</div>
                        </el-col>
                        <el-col :span="3">
                            <div class="th text-right">{{ $t('UpdateTime') }}</div>
                        </el-col>
                    </el-row>
                </div>
                <div class="tbody">
                    <el-row v-for="(item,index) in markets" :key="index">
                        <el-col :span="4">
                            <div class="td text-left">
                                <img src="" alt="">
                                <div class="left">
                                    <div class="title">{{ lang == 'zh' && item.name_zh != '' ? item.name_zh : item.name}}</div>
                                    <div class="text">{{ item.symbol_pair }}</div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="td">
                                <div class="bg">
                                    <div class="green" :style="{width: item.exrank/10*100 + '%'}"></div>
                                </div>
                                {{ item.exrank }}
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="td">
                                {{ $formatNumber(item.price_usd) }}
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="td">
                                {{ $formatNumber(item.vol.toFixed(2) - 0) }}
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="td">
                                {{formatterNumber(item.volume)}}
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="td text-right">
                                {{item.accounting}}%
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="td text-right">
                                {{ item.update_time }}
                            </div>
                        </el-col>
                    </el-row>
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
  name: '',
  props: {
    markets: {
        type: Object,
        default: null
    },
    coinImageUrl: {
        type: String,
        default: ''
    },
    coinName: {
        type: String,
        default: ''
    },
  },
  setup(props) {
    const store = useStore()
    const coinImageUrl = ref(props.coinImageUrl)
    const coinName = ref(props.coinName)
    const markets = ref(props.markets)
    const lang = computed(() => store.state.lang)
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
    return {
        coinImageUrl,
        coinName,
        markets,
        lang,
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
.Marketsituation{
    width: 100%;
    background: #1C1E1F;
    border-radius: .37rem;
    padding: 0.25rem 0.4rem;
    .info{
        display: flex;
        align-items: center;
        font-size: 14px;

        img{
            width: .51rem;
            margin-right: .2rem;
        }
    }
    .table{
        width: 100%;
        position: relative;
        height: 10rem;
        .table-content{
            position: absolute;
            top: 0;
            left: 0;
            right:  0;
            padding: 0.4rem;
            overflow: hidden;
            overflow-x: auto;
            z-index: 1000;
            background: #1C1E1F;
            .c{
                width: 100%;
                min-width: 1000px;
            }
        }
        .header{
            margin-top: .3rem;
            .th{
                width: 100%;
                font-size: 12px;
                font-family: Poppins-Regular, Poppins;
                font-weight: 400;
                color: #777777;
                height: .8rem;
                line-height: .8rem;
                padding: 0 .2rem;
                text-align: center;
                &.text-left{
                    text-align: left;
                }
                &.text-right{
                    text-align: right;
                }
            }
        }
        .tbody{
            .td{
                font-size: 12px;
                font-family: Poppins-Regular, Poppins;
                font-weight: 400;
                color: #FFFFFF;
                height: .8rem;
                line-height: .8rem;
                padding: 0 .2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                &.text-right{
                    justify-content: flex-end;
                }
                &.text-left{
                    justify-content: flex-start;
                }
                .left{
                    line-height: .3rem;
                    .text{
                        margin-top: .07rem;
                        font-size: 12px;
                        color: #777777;
                    }
                }
                .bg{
                    width: 1.4rem;
                    height: .15rem;
                    margin-right: .2rem;
                    border-radius: .2222rem;
                    background: #161819;
                    display: inline-block;
                }
                .green{
                    height: .15rem;
                    background: #00FF66;
                    border-radius: .2222rem;
                }
            }
        }
    }
}
</style>