<!-- 币种信息组件 -->
<template>
    <div class="FollowingTrendJudgment">
        <div class="info">
            <div class="left">
                <img :src="presetData.coinImageUrl" alt="">
                {{ $t('Longterm',{coin: presetData.coinName}) }}
            </div>
        </div>
        <div class="yc">
            {{$t('headingTips')}}{{ presetData.heading }}
        </div>
        <div class="yc-right">
            <div></div>
            <div class="tab">
                  <div class="list" @click="searchType = 'yigeyue'" :class="searchType == 'yigeyue' ? 'active' : ''">
                      1{{$t('month')}}<br>
                      {{ data_chart[0].price }}
                      <img v-if="data_chart[0].direction == 'down'" src="/@/assets/imgs/down-icon.svg" alt="">
                      <img v-if="data_chart[0].direction == 'up'" src="/@/assets/imgs/up-icon.svg" alt="">
                  </div>
                  <div class="list" @click="searchType = 'liugeyue'" :class="searchType == 'liugeyue' ? 'active' : ''">
                    6{{$t('months')}}<br>
                    {{ data_chart[1].price }}
                    <img v-if="data_chart[1].direction == 'down'" src="/@/assets/imgs/down-icon.svg" alt="">
                    <img v-if="data_chart[1].direction == 'up'" src="/@/assets/imgs/up-icon.svg" alt="">
                  </div>
                  <div class="list" @click="searchType = 'yinian'" :class="searchType == 'yinian' ? 'active' : ''">
                      1{{$t('year')}}<br>
                      {{ data_chart[2].price }}
                      <img v-if="data_chart[2].direction == 'down'" src="/@/assets/imgs/down-icon.svg" alt="">
                      <img v-if="data_chart[2].direction == 'up'" src="/@/assets/imgs/up-icon.svg" alt="">
                  </div>
                  <div class="list" @click="searchType = 'sannian'" :class="searchType == 'sannian' ? 'active' : ''">
                    3{{$t('years')}}<br>
                    {{ data_chart[3].price }}
                    <img v-if="data_chart[3].direction == 'down'" src="/@/assets/imgs/down-icon.svg" alt="">
                    <img v-if="data_chart[3].direction == 'up'" src="/@/assets/imgs/up-icon.svg" alt="">
                  </div>
                  <div class="list" @click="searchType = 'wunian'" :class="searchType == 'wunian' ? 'active' : ''">
                    5{{$t('years')}}<br>
                    {{ data_chart[4].price }}
                    <img v-if="data_chart[4].direction == 'down'" src="/@/assets/imgs/down-icon.svg" alt="">
                    <img v-if="data_chart[4].direction == 'up'" src="/@/assets/imgs/up-icon.svg" alt="">
                  </div>
              </div>
        </div>
        <div class="chart">
            <div ref="chartContainer" style="width: 100%; height: 7.4rem" />
        </div>
        <div class="point">
        <div>
                <span class="green"></span>
                {{ $t('Marketprice') }}
        </div>
            <div>
                <span class="red"></span>
                {{ $t('predictedprice') }}
            </div>
        </div>
        <div class="table">
            <div class="header">
                <div class="th left">{{$t('year')}}</div>
                <div class="th right">{{$t('Low')}}</div>
                <div class="th right">{{$t('High')}}</div>
            </div>
            <div class="tbody" v-for="(item,index) in year_predict" :key="index">
                <div class="td left">{{ item[0] }}</div>
                <div class="td right">{{ item[1] }}</div>
                <div class="td right">{{ item[2] }}</div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import { ref, shallowRef, onMounted ,computed, watch} from 'vue';
  import * as echarts from 'echarts';
  import { useStore} from 'vuex'
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
      //适配
      const screenWidth = computed( () => {
        return store.state.screenWidth
      })
      const searchType = ref('yigeyue')
      const chartContainer = ref(null);
      const chart = shallowRef(null);
      const kline_for_trad = ref(presetData.value.kline_for_trad)
      const oldList = []
      kline_for_trad.value.forEach( item => {
        oldList.push(
            [
                item.time*1000,
                item.close,
            ]
        )
      })
      const year_predict = ref(presetData.value.year_predict)
      const data_chart = ref(JSON.parse(presetData.value.data_chart))
      const data_list = ref(presetData.value.data_list)
      const data_listArr = data_list.value.split(';')
      const filterData = (data,type) => {
            // 获取第一条数据的时间戳（代表明天）
            const startingTimestamp = data[0][0];

            // 定义时间范围的毫秒值
            const ONE_DAY = 24 * 60 * 60 * 1000;
            const ONE_MONTH = 30 * ONE_DAY;
            const SIX_MONTHS = 6 * ONE_MONTH;
            const ONE_YEAR = 12 * ONE_MONTH;
            const THREE_YEARS = 3 * ONE_YEAR;
            const FIVE_YEARS = 5 * ONE_YEAR;

            // 根据时间范围筛选数据
            const filterDataByRange = (range) => {
            const endTimestamp = startingTimestamp + range;
            return data.filter(item => item[0] >= startingTimestamp && item[0] <= endTimestamp);
            };

            if(type == 'yigeyue'){
                return filterDataByRange(ONE_MONTH)
            }
            if(type == 'liugeyue'){
                return filterDataByRange(SIX_MONTHS)
            }
            if(type == 'yinian'){
                return filterDataByRange(ONE_YEAR)
            }
            if(type == 'sannian'){
                return filterDataByRange(THREE_YEARS)
            }
            if(type == 'wunian'){
                return filterDataByRange(FIVE_YEARS)
            }
      }
      onMounted(() => {
        const initChart = () => {
            const list = []
            data_listArr.forEach( item => {
                let data = item.split(',')
                data[0] = data[0]*1000
                list.push(data)
            })
            const newList = filterData(list,searchType.value)
            let today = new Date().toISOString().split('T')[0]; // 获取今天的日期，格式为"YYYY-MM-DD"
            chart.value = echarts.init(chartContainer.value);
            const option = {
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                    return [pt[0], '10%'];
                    }
                },
                xAxis: {
                    type: 'time',
                    boundaryGap: false
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    backgroundColor: 'rgba(29,31,37,0.9)', // 设置背景颜色
                    borderColor: '#3C3C3C', // 设置边框颜色
                    borderWidth: 1, // 设置边框宽度
                    textStyle: {
                        color: '#FFFFFF' // 设置文本颜色
                    },
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            type: 'dashed', // 设置为虚线
                            color: '#34384C' // 设置为红色
                        }
                    },
                },
                dataZoom: [
                    {
                    type: 'inside',
                    start: 0,
                    end: 100
                    },
                    {
                    start: 0,
                    end: 100
                    }
                ],
                series: [
                    {
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#30E0A1' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#1C1E1F' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        markLine: {
                            silent: true, // 这使得标记线只是一个视觉上的标记，不会触发任何鼠标事件
                            symbol: 'none',
                            data: [{
                                xAxis: today, // 这将在今天的日期上添加一条垂直线
                            }],
                            lineStyle: {
                                    color: '#777777',  // 线的颜色
                                    type: 'bold',    // 线的类型，这里设置为虚线
                                    width: 1           // 线的宽度
                                },
                                label: {
                                    position: 'middle',  // 修改为在线的中间
                                    formatter: 'Today',
                                    color: '#FFFFFF',    // 设置字体颜色为黑色
                                    fontSize: 14,        // 设置字体大小为14
                                    fontWeight: 'bold',  // 设置字体为粗体
                                    padding: 5   
                                }
                        },
                        data: oldList,
                        lineStyle: {
                            color: '#30E0A1' // 今天之前的颜色
                        }
                    },
                    {
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#695CFB' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#1C1E1F' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        data: newList,
                        lineStyle: {
                            color: '#695CFB' // 今天之后的颜色
                        }
                    },
                ]
            };

            chart.value.setOption(option);
                window.addEventListener('resize', resizeChart);
            }
            const resizeChart = () => {
                if (chart.value) {
                    chart.value.dispose()
                    setTimeout( () => {
                        initChart()
                    },500)
                }
            }
            watch(() => searchType.value, (val) => {
                chart.value.dispose()
                initChart()
            })
            initChart()

        });

      return {
          chartContainer,
          presetData,
          screenWidth,
          searchType,
          year_predict,
          data_chart
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
                 
              }
      }
    .yc{
        padding-left: .71rem;
        font-size: 12px;
    }
    .yc-right{
        font-size: 12px;
        text-align: right;
        display: flex;
        justify-content: space-between;
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
                text-align: center;
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
.point{
    display: flex;
    justify-content: center;
    margin-top: .3rem;
    .green{
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 8px;
        background: #00FF66;
    }
    .red{
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 8px;
        background: #695CFB;
        margin-left: .3rem;
    }
}
  </style>