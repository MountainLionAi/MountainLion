<!-- 币种历史记录 -->
<template>
    <div class="Investmentagency">
        <div class="info">
            <div class="left">
                <img class="coin-img" :src="presetData.coinImageUrl" alt="">
                {{ $t('Investmentagency',{coin: presetData.coinName}) }}
            </div>
           
        </div>
        <div class="box">
            <InvestmentagencyItem  v-for="(item,index) in Investors" :key="index" :item="item"/>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'
import InvestmentagencyItem from './InvestmentagencyItem.vue'
export default {
  name: 'Investmentagency',
  props:{
    presetData:{
            type: Object,
            default: null
        },
    },
  setup(props) {
    const presetData = ref(props.presetData)
    const Investors = ref(presetData.value.Investors)
    return {
        presetData,
        Investors
    } 
  },
  components: {
    InvestmentagencyItem
  },
  methods: {
    
  },
  mounted() {
    
  },
  unmounted() {
    
  },
}
</script>

<style lang="scss" scoped>
.Investmentagency{
    width: 100%;
    border-radius: .37rem;
    .info{
            border-radius: .37rem;
            background: #1C1E1F;
            padding: 0.25rem 0.4rem;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            .left{
                display: flex;
                align-items: center;
                img{
                    width: .51rem;
                    margin-right: .2rem;
                }
            }
    }
   
}
.box{
    display: flex;
    flex-wrap: wrap;
}
</style>