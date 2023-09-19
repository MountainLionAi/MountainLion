<!-- 币种信息组件 -->
<template>
  <div class="top-info" :class="screenWidth > 1400 ? '' : 'mb'">
    <div class="list">
        <div class="left">
            <img class="coin-img" :src="presetData.coinImageUrl" alt="">
        </div>
        <div class="right">
            <div class="title">
               {{ presetData.coinFullName }}
            </div>
            <div class="text">
                {{ presetData.coinName }}/USD
            </div>
        </div>
    </div>
    <div class="list">
        <div class="left">
            <div class="title">
                {{ $t('change24') }}
            </div>
            <div class="text" v-if="presetData.historyOneDay.change_rate_24h > 0">
                <img class="zs" src="/@/assets/imgs/increase.svg" alt="">
                <span class="color">{{ (presetData.historyOneDay.change_rate_24h).toFixed(6) - 0 }}%</span>
            </div>
            <div class="text" v-else>
                <img class="zs" src="/@/assets/imgs/decrease.svg" alt="">
                <span class="red">{{ (presetData.historyOneDay.change_rate_24h).toFixed(6) - 0 }}%</span>
            </div>
        </div>
        <div class="right">
            
        </div>
    </div>
    <div class="list">
        <div class="right">
            <div class="title">
                {{ $t('lastPrice') }}
            </div>
            <div class="text">
                {{ $formatNumber(presetData.historyOneDay.now_price) }} USD
            </div>
        </div>
    </div>
    <div class="list">
        <div class="right">
            <div class="title">
                {{ $t('low24') }}
            </div>
            <div class="text">
                {{ $formatNumber(presetData.historyOneDay.low_price_in_24) }} USD
            </div>
        </div>
    </div>
  </div>
  <div class="k-line">
    <div class="echarts-content">
        <div class="info">
            <div class="coin-name">{{ presetData.coinName }}/ USD</div>
            <div class="item">
                <div class="title">
                    {{ $t('Open') }}:
                </div>
                <div class="text">
                    {{ $formatNumber(presetData.historyOneDay.last_day.open) }}
                </div>
            </div>
            <div class="item">
                <div class="title">
                    {{ $t('High') }}:
                </div>
                <div class="text">
                    {{ $formatNumber(presetData.historyOneDay.last_day.high) }}
                </div>
            </div>
            <div class="item">
                <div class="title">
                    {{ $t('Low') }}:
                </div>
                <div class="text">
                    {{ $formatNumber(presetData.historyOneDay.last_day.low) }}
                </div>
            </div>
            <div class="item">
                <div class="title">
                    {{ $t('Close') }}:
                </div>
                <div class="text">
                    {{ $formatNumber(presetData.historyOneDay.last_day.close) }}
                </div>
            </div>
        </div>
        <Kline :kline="kline"/>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'
import Kline from './Kline.vue'
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
    const kline = ref(null)
    kline.value = JSON.parse(presetData.value.historyOneDay.kline)
    //适配
    const screenWidth = computed( () => {
      return store.state.screenWidth
    })
    return {
        presetData,
        kline,
        screenWidth
    } 
  },
  components: {
    Kline
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
    &.mb{
        justify-content: space-between;
        .list{
        width: 48%;
        }
    }
    .list{
        display: flex;
        width: 24%;
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
        }
        .text{
            margin-top: .1rem;
            font-size: .37rem;
            font-family: Poppins-SemiBold, Poppins;
            font-weight: 600;
            color: #FFFFFF;
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
.k-line{
    margin-top: .3rem;
    width: 100%;
    background: #1C1E1F;
    border-radius: .37rem;
    padding: .6rem .5rem;
    overflow: hidden;
    overflow-x: auto;
    box-sizing: border-box;
    .echarts-content{
        width: 100%;
    }
    .info{
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 0 .6rem;
        flex-wrap: wrap;
        .coin-name{
            font-size: .4rem;
            font-weight: bold;
            color: #FFFFFF;
            margin-right: .6rem;
            margin-top: .2rem;
        }
        .item{
            display: flex;
            margin-right: .4rem;
            margin-top: .2rem;
            .title{
                font-size: 14px;
                font-weight: 400;
                color: #5D6588;
            }
            .text{
                font-size: 14px;
                font-weight: 400;
                color: #00FF66;
                margin-left: .2rem;
            }
        }
    }

}
</style>