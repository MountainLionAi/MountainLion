<!-- 币种历史记录 -->
<template>
    <div class="ProjectInformation">
        <div class="info">
            <div class="left">
                <img class="coin-img" :src="presetData.coinImageUrl" alt="">
                {{ $t('DevelopmentHistory',{coin: presetData.coinName}) }}
            </div>
           
        </div>
        <div class="text">
            <div class="list" v-for="(item,index) in presetData.AI_SUM" :key="index">
                <div class="time">
                    {{ item.ymd }}
                </div>
                <div class="content">
                    {{ item.AI_SUM }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'

export default {
  name: 'ProjectInformation',
  props:{
    presetData:{
            type: Object,
            default: null
        },
    },
  setup(props) {
    const presetData = ref(props.presetData)
    return {
        presetData
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
            .left{
                display: flex;
                align-items: center;
                img{
                    width: .51rem;
                    margin-right: .2rem;
                }
            }
    }
    .text{
        font-size: 14px;
        font-family: Poppins-Medium, Poppins;
        font-weight: 500;
        color: #FFFFFF;
        line-height: .4rem;
        max-height: 10rem;
        overflow: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar {
        width: 2px; /* 滚动条的宽度 */
        height: 5px; /* 滚动条的高度 */
        }

        &::-webkit-scrollbar-track {
            background-color: #333333; /* 滚动条轨道的背景颜色 */
        }

        &::-webkit-scrollbar-thumb {
            background-color: #888; /* 滚动条拇指的颜色 */
            border-radius: 2px; /* 拇指的边框半径 */
        }
        .list{
            margin-top: .3rem;
            .time{
                margin-bottom: .15rem;
            }
            .content{
                text-indent: 2em;
            }
        }
    }
}
</style>