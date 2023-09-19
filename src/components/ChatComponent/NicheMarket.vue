<!-- 币种信息组件 -->
<template>
    <div class="FollowingTrendJudgment">
        <div class="info">
            <img :src="presetData.coinImageUrl" alt="">
            {{ $t('TechMarkets',{coin:presetData.coinName}) }}
        </div>
        <div class="yc">
            {{ $t('NicheMarketTips') }}
        </div>
        <div class="table">
        <div class="table-content">
            <div class="c">
                <div class="header">
                    <div class="th left">{{$t('compare')}}</div>
                    <div class="th">2024</div>
                    <div class="th">2025</div>
                    <div class="th">2026</div>
                    <div class="th">2027</div>
                    <div class="th">2028</div>
                    <div class="th">2029</div>
                </div>
                <div class="tbody" v-for="(item,index) in company_predict" :key="index">
                    <div class="td">{{item[0]}}</div>
                    <div class="td">{{item[1]}}</div>
                    <div class="td">{{item[2]}}</div>
                    <div class="td">{{item[3]}}</div>
                    <div class="td">{{item[4]}}</div>
                    <div class="td">{{item[5]}}</div>
                    <div class="td">{{item[6]}}</div>
                </div>
            </div>
        </div>
    </div>
    </div>
  </template>
  
  <script>
  import { ref, shallowRef, watch,onMounted,computed } from 'vue';
  import { useStore} from 'vuex'
  import { useI18n } from 'vue-i18n'
    export default {
  name: '',
  props:{
  presetData:{
        type: Object,
        default: null
    }
  },
  setup(props) {
      const { t } = useI18n();
      const presetData = ref(null)
      const store = useStore()
      const screenWidth = computed( () => {
          return store.state.screenWidth
      })
      watch(() => props.presetData, (newValue, oldValue) => {
          presetData.value = newValue
      })
      presetData.value = props.presetData
      const company_predict = ref(presetData.value.company_predict)
      onMounted(() => {
         
      })
      return {
        screenWidth,
        company_predict
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
.FollowingTrendJudgment{
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
        height: 7.3rem;
        .table-content{
            position: absolute;
            top: 0;
            left: -.4rem;
            right:  -.4rem;
            padding: 0.4rem;
            overflow: auto;
            z-index: 1000;
            background: #1C1E1F;
            height: 7.3rem;
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
                &.right{
                    text-align: right;
                }
                &.left{
                    text-align: left;
                }
            }
        }
    }
    .yc{
        padding-left: 0.71rem;
        font-size: 12px;
    }
  </style>