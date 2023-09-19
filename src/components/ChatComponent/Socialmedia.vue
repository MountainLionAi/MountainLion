<!-- 币种信息 -->
<template>
    <div class="Socialmedia">
        <div class="info">
            <div class="left">
                <img class="coin-img" :src="presetData.coinImageUrl" alt="">
                {{ $t('Socialmedia',{coin: presetData.coinName}) }}
            </div>
           
        </div>
        <div class="content">
            <div class="media">
                <div class="list">
                    {{ $t('SocialmediaText') }}
                    <img src="/@/assets/imgs/comp.svg" alt="" v-if="presetData.socialMedia.Url.Reddit && presetData.socialMedia.Url.Reddit != ''"  @click="openWindow(presetData.socialMedia.Url.Reddit )">
                    <img src="/@/assets/imgs/blog.svg" alt="" v-if="presetData.socialMedia.Url.Blog && presetData.socialMedia.Url.Blog != ''"  @click="openWindow(presetData.socialMedia.Url.Blog )">
                    <img src="/@/assets/imgs/tw.svg" alt="" v-if="presetData.socialMedia.Url.Twitter && presetData.socialMedia.Url.Twitter != ''"  @click="openWindow(presetData.socialMedia.Url.Twitter )">
                    <img src="/@/assets/imgs/facebook.svg" alt="" v-if="presetData.socialMedia.Url.Facebook && presetData.socialMedia.Url.Facebook != ''"  @click="openWindow(presetData.socialMedia.Url.Facebook )">
                </div>
                <div class="list" v-if="presetData.socialMedia.Url.Official_website && presetData.socialMedia.Url.Official_website != ''">
                    {{ $t('Website') }}
                    <img src="/@/assets/imgs/website.svg" alt="" @click="openWindow(presetData.socialMedia.Url.Official_website )">
                </div>
                <div class="list" v-if="presetData.socialMedia.Url.Official_website && presetData.socialMedia.Url.Official_website != ''">
                    {{ $t('weburl') }}
                    <img src="/@/assets/imgs/weburl.svg" alt="" @click="openWindow(presetData.socialMedia.Url.Web_url )">
                </div>
                <div class="list" v-if="presetData.socialMedia.Url.GitHub && presetData.socialMedia.Url.GitHub != ''">
                    GitHub
                    <img src="/@/assets/imgs/GitHub.svg" alt="" @click="openWindow(presetData.socialMedia.Url.GitHub )">
                </div>
            </div>
            <div class="media-info">
                <div class="list">
                    <div class="title">
                        GitHub{{ $t('LastUpdate') }}
                    </div>
                    <div class="text">
                        {{ presetData.socialMedia.GitHub['Last Updated Time'] }}
                    </div>
                </div>
                <div class="list">
                    <div class="title">
                        GitHub{{ $t('TotalCommits') }}
                    </div>
                    <div class="text">
                        {{ $formatNumber(presetData.socialMedia.GitHub['Total Commits']) }}
                    </div>
                </div>
                <div class="list">
                    <div class="title">
                        Star{{ $t('times') }}
                    </div>
                    <div class="text">
                        {{ $formatNumber(presetData.socialMedia.GitHub['Stars']) }}
                    </div>
                </div>
                <div class="list">
                    <div class="title">
                        Fork{{ $t('times') }}
                    </div>
                    <div class="text">
                        {{ $formatNumber(presetData.socialMedia.GitHub['Total Forks']) }}
                    </div>
                </div>
                <div class="list">
                    <div class="title">
                        {{ $t('Contributors') }}
                    </div>
                    <div class="text">
                        {{ $formatNumber( presetData.socialMedia.GitHub['Contributors']) }}
                    </div>
                </div>
                <div class="list">
                    <div class="title">
                        Twitter{{ $t('Followers') }}
                    </div>
                    <div class="text">
                        {{ $formatNumber(presetData.socialMedia.Twitter.today) }} 
                        <span class="sm">{{ presetData.socialMedia.Twitter.today - presetData.socialMedia.Twitter.yesterday > 0 ? '+' : ''  }} {{ presetData.socialMedia.Twitter.today - presetData.socialMedia.Twitter.yesterday }} </span>
                    </div>
                </div>
                <div class="list">
                    <div class="title">
                        Reddit{{ $t('Followers') }}
                    </div>
                    <div class="text">
                        {{ $formatNumber(presetData.socialMedia.Reddit.today) }} 
                       <span class="sm"> {{ presetData.socialMedia.Reddit.today - presetData.socialMedia.Reddit.yesterday > 0 ? '+' : ''  }} {{ $formatNumber(presetData.socialMedia.Reddit.today - presetData.socialMedia.Reddit.yesterday) }} </span>
                    </div>
                </div>
                <!-- <div class="list">
                    <div class="title">
                        Facebook{{ $t('Followers') }}
                    </div>
                    <div class="text">
                        19.60万
                    </div>
                </div>
                <div class="list">
                    <div class="title">
                        GitHub{{ $t('Followers') }}
                    </div>
                    <div class="text">
                        --
                    </div>
                </div> -->
            </div>
            <div class="line-chat" :class="screenWidth > 900 ? '' : 'mb'">
                <div class="chart" v-if="presetData.socialMedia.Project">
                    <DevelopmentProgress :presetData="presetData"/>
                </div>
                <div class="chart" v-if="presetData.socialMedia.Media_scale">
                    <ScaleOfSocialMedia :presetData="presetData"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'
import DevelopmentProgress from './DevelopmentProgress.vue'
import ScaleOfSocialMedia from './ScaleOfSocialMedia.vue'
export default {
  name: 'Socialmedia',
  props:{
    presetData:{
            type: Object,
            default: null
        },
    },
  setup(props) {
    //适配
    const store = useStore()
    const screenWidth = computed( () => {
      return store.state.screenWidth
    })
    const presetData = ref(props.presetData)
    const openWindow = (url) => {
        window.open(url)
    }
    return {
        presetData,
        openWindow,
        screenWidth
    } 
  },
  components: {
    DevelopmentProgress,
    ScaleOfSocialMedia
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
.Socialmedia{
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
    .content{
        margin-top: .3rem;
        .media{
            display: flex;
            flex-wrap: wrap;
            .list{
                margin-top: .3rem;
                font-size: 14px;
                font-family: Poppins-Regular, Poppins;
                font-weight: 400;
                color: #FFFFFF;
                margin-right: 2rem;
                img{
                    width: .7rem;
                    margin-left: .2rem;
                    cursor: pointer;
                }
            }
        }
        .media-info{
            display: flex;
            flex-wrap: wrap;
            padding-bottom: .2rem;
            .list{
                width: 40%;
                max-width: 3.6rem;
                margin-top: .3rem;
                .title{
                    font-size: 14px;
                    font-family: Poppins-Medium, Poppins;
                    font-weight: 500;
                    color: #777777;
                }
                .text{
                    margin-top: .14rem;
                    font-size: 14px;
                    font-family: Poppins-Medium, Poppins;
                    font-weight: 500;
                    color: #FFFFFF;
                    .sm{
                        color: #777777;
                        font-size: 12px;
                    }
                }
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

}
</style>