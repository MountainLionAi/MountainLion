<!-- 持有地址 -->
<template>
  <div class="HoldingAddress">
    <div class="info">
        <img :src="coinImageUrl" alt="">
       {{ $t('HoldingAddress',{coin:coinName}) }}
    </div>
    <div class="holder-info">
        <div class="item">
            <div class="title">
                {{ $t('Holders') }}
            </div>
            <div class="text">
                {{ $formatNumber(top.addrcount)}}
            </div>
        </div>
        <div class="item">
            <div class="title">
                {{ $t('Top') }}10
            </div>
            <div class="text">
               {{top.top10rate}}%
            </div>
        </div>
        <div class="item">
            <div class="title">
                {{ $t('Top') }}20
            </div>
            <div class="text">
                {{top.top20rate}}%
            </div>
        </div>
        <div class="item">
            <div class="title">
                {{ $t('Top') }}50
            </div>
            <div class="text">
                {{top.top50rate}}%
            </div>
        </div>
        <div class="item">
            <div class="title">
                {{ $t('Top') }}100
            </div>
            <div class="text">
                {{top.top100rate}}%
            </div>
        </div>
    </div>
    <div class="line-chat" :class="screenWidth > 900 ? '' : 'mb'">
        <div class="chart">
            <LineHoldingWhale :holdcoin="holdcoin"/>
        </div>
        <div class="chart">
            <LineHoldingAddress :holdcoin="holdcoin"/>
        </div>
       
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'
import LineHoldingAddress from './LineHoldingAddress.vue'
import LineHoldingWhale from './LineHoldingWhale.vue'
export default {
  name: 'HoldingAddress',
  props: {
    top: {
        type: Object,
        default: null
    },
    holdcoin: {
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
    const top = ref(props.top)
    const holdcoin = ref(props.holdcoin)
    const coinImageUrl = ref(props.coinImageUrl)
    const coinName = ref(props.coinName)
    //适配
    const store = useStore()
    const screenWidth = computed( () => {
      return store.state.screenWidth
    })
    return {
        top,
        holdcoin,
        coinImageUrl,
        coinName,
        screenWidth
    } 
  },
  components: {
    LineHoldingAddress,
    LineHoldingWhale
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
.HoldingAddress{
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
    .holder-info{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: .5rem;
        .item{
                margin-top: .3rem;
        }
        .title{
            font-size: 14px;
            font-family: Poppins-Regular, Poppins;
            font-weight: 400;
            color: #777777;
        }
        .text{
            margin-top: .2rem;
            font-size: .296rem;
            font-family: Poppins-Regular, Poppins;
            font-weight: 400;
            color: #FFFFFF;
        }
    }
    .line-chat{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: .6rem;
        display: flex;
        justify-content: center;
        &.mb{
            .chart{
                width: 100%;
            }
        }
        .chart{
           width: 48%;
        }
    }
}   
</style>