<!-- 币种项目信息 -->
<template>
    <div class="ProjectInformation">
        <div class="info">
            <div class="left">
                <img :src="coinImageUrl" alt="">
                {{ $t('ProjectInformation',{coin: coinName}) }}
            </div>
            <div class="right">
                    <div class="tab">
                        <div class="list" v-if="info.basicInfo != ''" @click="searchType = 'BasicInfo'" :class="searchType == 'BasicInfo' ? 'active' : ''">
                            {{ $t('BasicInfo') }}
                        </div>
                        <div class="list" v-if="info.mechanism != ''" @click="searchType = 'Mechanism'" :class="searchType == 'Mechanism' ? 'active' : ''">
                            {{ $t('Mechanism') }}
                            
                        </div>
                        <div class="list" v-if="info.characteristic != ''" @click="searchType = 'Characteristic'" :class="searchType == 'Characteristic' ? 'active' : ''">
                            {{ $t('Characteristic') }}
                        </div>
                        <div class="list" v-if="info.competition != ''" @click="searchType = 'Competition'" :class="searchType == 'Competition' ? 'active' : ''">
                            {{ $t('Competition') }}
                        </div>
                        <div class="list" v-if="info.points != ''" @click="searchType = 'Points'" :class="searchType == 'Points' ? 'active' : ''">
                            {{ $t('Points') }}
                        </div>
                        <div class="list" v-if="info.valuesCn != ''" @click="searchType = 'Values'" :class="searchType == 'Values' ? 'active' : ''">
                            {{ $t('Values') }}
                        </div>
                    </div>
            </div>
        </div>
        <div class="text">
          <template v-if="searchType == 'BasicInfo'">
            <div v-html="lang == 'zh' ? info.basicInfo : info.basicInfoEn">
            </div>
          </template>
          <template v-if="searchType == 'Mechanism'">
            <div v-html="lang == 'zh' ? info.mechanism : info.mechanismEn">
            </div>
          </template>
          <template v-if="searchType == 'Characteristic'">
            <div v-html="lang == 'zh' ? info.characteristic : info.characteristicEn">
            </div>
          </template>
          <template v-if="searchType == 'Competition'">
            <div v-html="lang == 'zh' ? info.competition : info.competitionEn">
            </div>
          </template>
          <template v-if="searchType == 'Points'">
            <div v-html="lang == 'zh' ? info.points : info.pointsEn">
            </div>
          </template>
          <template v-if="searchType == 'Values'">
            <div v-html="lang == 'zh' ? info.valuesCn : info.valuesEn">
            </div>
          </template>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'

export default {
  name: 'ProjectInformation',
  props: {
    info: {
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
    const searchType = ref('BasicInfo')
    const info = ref(props.info)
    const coinImageUrl = ref(props.coinImageUrl)
    const coinName = ref(props.coinName)
    const lang = computed(() => store.state.lang)

    return {
        searchType,
        info,
        coinImageUrl,
        coinName,
        lang
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

<style lang="scss" scoped>
.ProjectInformation{
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
                    align-items: center;
                    box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
                    border-radius: .2222rem;
                    padding: .1rem 0;
                    flex-wrap: wrap;
                    .list{
                    background: #181A1C;
                        margin: 0 .2rem;
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
    .text{
        font-size: 14px;
        font-family: Poppins-Medium, Poppins;
        font-weight: 500;
        color: #FFFFFF;
        line-height: .4rem;
        .title{
           margin-bottom: .2rem;
        }
    }
}
</style>