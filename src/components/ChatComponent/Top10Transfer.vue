<!-- 前十转账 -->
<template>
  <div class="Top10Transfer">
    <div class="info">
       <div class="left">
            <img :src="coinImageUrl" alt="">
            {{ $t('top10Transfer',{coin:coinName}) }}
        </div>
        <div class="right">
            <div class="tab">
                <div class="list" v-if="flows.length > 0" @click="showType = 'Transfer'" :class="showType == 'Transfer' ? 'active' : ''">
                    {{ $t('Transfer') }}
                </div>
                <div class="list" v-if="toplist.length > 0" @click="showType = 'Holding'" :class="showType == 'Holding' ? 'active' : ''">
                    {{ $t('Holding') }}
                </div>
            </div>
        </div>
    </div>
    <div class="table">
        <div class="table-content">
            <div class="c">
                <div class="header">
                    <el-row>
                        <el-col :span="1">
                            <div class="th">#</div>
                        </el-col>
                        <el-col :span="14">
                            <div class="th">{{ $t('Address') }}</div>
                        </el-col>
                        <el-col :span="3">
                            <div class="th">{{ $t('Amount') }}</div>
                        </el-col>
                        <el-col :span="3">
                            <div class="th">{{ $t('Percentage') }}%</div>
                        </el-col>
                        <el-col :span="3">
                            <div class="th">{{ $t('change7d') }}</div>
                        </el-col>
                    </el-row>
                </div>
                <div class="tbody">
                <el-row v-for="(item,index) in showType == 'Transfer' ? flows : toplist" :key="index">
                    <el-col :span="1">
                        <div class="td">{{ index + 1 }}</div>
                    </el-col>
                    <el-col :span="14">
                        <div class="td">
                            <span class="address" @click="goBlockurl(item.blockurl)">{{ item.address }}</span> &nbsp;&nbsp;
                            <span class="green">{{ item.platform }}</span> 
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="td">{{ $formatNumber(item.quantity) }}</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="td">{{item.percentage}}%</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="td">
                            <span class="green" v-if="item.change > 0">+{{ $formatNumber(item.change) }}</span>
                            <span class="red" v-else>{{ $formatNumber(item.change) }}</span>
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
    flows: {
        type: Object,
        default: null
    },
    toplist:{
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
    const flows = ref(props.flows)
    const toplist = ref(props.toplist)
    const coinImageUrl = ref(props.coinImageUrl)
    const coinName = ref(props.coinName)
    const goBlockurl = (url) => {
        window.open(url)
    }
    // 展示类型
    const showType = ref('Transfer')
    if(flows.value.length == 0){
        showType.value = 'Holding'
    }
    return {
        showType,
        flows,
        toplist,
        goBlockurl,
        coinImageUrl,
        coinName
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
.Top10Transfer{
    width: 100%;
    background: #1C1E1F;
    border-radius: .37rem;
    padding: 0.25rem 0.4rem;
    .info{
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            flex-wrap: wrap;
            .left{
                margin-top: .2rem;
                display: flex;
                align-items: center;
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
                    background: #181A1C;
                    box-shadow: 0px 4px 20px -6px rgba(0,0,0,0.15);
                    border-radius: .2222rem;
                    padding: .1rem 0;
                    .list{
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
                .address{
                    cursor: pointer;
                }
                .green{
                    color: #00FF66;
                }
                .red{
                    color: #FA2256;
                }
            }
        }
    }
}
</style>