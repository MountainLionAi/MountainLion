<template>
  <div class="bar">
    <div class="line">
        <div class="price">
            {{ $t('HistoricalLow') }} ${{ $formatNumber(presetData.historyOneDay.his[1]) }}
        </div>
        <div class="proess">
            <div class="color" :style="{width: presetData.historyOneDay.now_price/presetData.historyOneDay.his_max*100 + '%'}">
                <div class="info">
                    <span>{{$t('Currentprice')}} <strong>${{ $formatNumber(presetData.historyOneDay.now_price) }}</strong></span>
                </div>
            </div>
        </div>
        <div class="price">
            {{$t('HistoricalHigh')}} ${{ $formatNumber(presetData.historyOneDay.his[0]) }}
        </div>
         
    </div>
    <div class="price-info">
        <div class="list">
           <div class="item">
                <div class="title">
                     {{ $t('YesterdayOpen') }}
                </div>
                <div class="text">
                    ${{ $formatNumber(presetData.historyOneDay.last_day.open) }}
                </div>
           </div>
           <div class="item">
                <div class="title">
                    {{ $t('Yesterdayclosing') }}
                </div>
                <div class="text">
                    ${{ $formatNumber(presetData.historyOneDay.last_day.close) }}
                </div>
           </div>
           <div class="item">
                <div class="title">
                    {{ $t('Yesterdaytrading') }}
                </div>
                <div class="text">
                    ${{ formatterNumber(presetData.historyOneDay.last_day.volume) }}
                </div>
           </div>
           <div class="item">
                <div class="title">
                    {{ $t('YesterdayChange') }}
                </div>
                <div class="text">
                    <span class="color" v-if="presetData.historyOneDay.last_day.ratio > 0">{{ (presetData.historyOneDay.last_day.ratio).toFixed(4) - 0 }}%</span>
                    <span class="red" v-else>{{ (presetData.historyOneDay.last_day.ratio).toFixed(4) - 0 }}%</span>
                    (
                        ${{presetData.historyOneDay.change > 0 ? '+' : ''}}{{ (presetData.historyOneDay.last_day.change).toFixed(4) - 0 }}
                    )
                </div>
           </div>
        </div>
        <div class="list">
           <div class="item">
                <div class="title">
                    {{ $t('Yesterdayhighest') }}
                </div>
                <div class="text">
                    ${{ $formatNumber(presetData.historyOneDay.last_day.high) }}
                </div>
           </div>
           <div class="item">
                <div class="title">
                    {{ $t('Yesterdaylowest') }}
                </div>
                <div class="text">
                    ${{ $formatNumber(presetData.historyOneDay.last_day.low) }}
                </div>
           </div>
           <div class="item">
                <div class="title">
                    {{ $t('highest7') }}
                </div>
                <div class="text">
                    ${{ $formatNumber(presetData.historyOneDay.data_7d[0]) }}
                </div>
           </div>
           <div class="item">
                <div class="title">
                    {{ $t('lowest7') }}
                </div>
                <div class="text">
                    ${{ $formatNumber(presetData.historyOneDay.data_7d[1]) }}
                </div>
           </div>
        </div>
        <div class="list">
           <div class="item">
                <div class="title">
                    {{ $t('highest30') }}
                </div>
                <div class="text">
                    ${{ $formatNumber(presetData.historyOneDay.data_30d[0]) }}
                </div>
           </div>
           <div class="item">
                <div class="title">
                    {{ $t('lowest30') }}
                </div>
                <div class="text">
                    ${{ $formatNumber(presetData.historyOneDay.data_30d[1]) }}
                </div>
           </div>
           <div class="item">
                <div class="title">
                    {{ $t('highest90') }}
                </div>
                <div class="text">
                    ${{ $formatNumber(presetData.historyOneDay.data_90d[0]) }}
                </div>
           </div>
           <div class="item">
                <div class="title">
                    {{ $t('lowest90') }}
                </div>
                <div class="text">
                    ${{ $formatNumber(presetData.historyOneDay.data_90d[1]) }}
                </div>
           </div>
        </div>
        <div class="list">
           <div class="item">
                <div class="title">
                    {{ $t('Historicalhighest') }}
                </div>
                <div class="text">
                    ${{ $formatNumber(presetData.historyOneDay.his[0]) }} <span class="time">({{ formatTime(presetData.historyOneDay.time[1]) }})</span>
                </div>
           </div>
           <div class="item">
                <div class="title">
                    {{ $t('Historicallowest') }}
                </div>
                <div class="text">
                    ${{ $formatNumber(presetData.historyOneDay.his[1]) }} <span class="time">({{formatTime(presetData.historyOneDay.time[0]) }})</span>
                </div>
           </div>
           <div class="item">
                <div class="title">
                    {{ $t('ATHdecline') }}
                </div>
                <div class="text">
                    <span class="color" v-if="presetData.historyOneDay.ATH > 0">{{ (presetData.historyOneDay.ATH).toFixed(6) - 0 }}%</span>
                    <span class="red" v-else>{{ (presetData.historyOneDay.ATH).toFixed(2) - 0 }}%</span>
                </div>
           </div>
        </div>
    </div>
    <div class="chart">
        <div class="bar-info">
            <div class="left">
                <img :src="presetData.coinImageUrl" alt="">
                {{ $t('Growthdataof',{coin: presetData.coinName}) }}
            </div>
            <div class="right">
                <span style="display:inline-block;width:8px;height:8px;background:#00FF66;border-radius:10px;margin-right:4px"></span>
                {{ $t('Increase') }}
                <span style="display:inline-block;width:8px;height:8px;background:#FA2256;border-radius:10px;margin-right:4px"></span>
                {{ $t('Decline') }}
            </div>
        </div>
        <div ref="chartContainer" style="width: 100%; height: 7.4rem" />
    </div>
  </div>
</template>

<script>
import { ref, shallowRef, onMounted } from 'vue';
import { useStore} from 'vuex'
import * as echarts from 'echarts';
export default {
  name: '',
  props:{
    presetData:{
            type: Object,
            default: null
        },
    },
  setup(props) {
    const presetData = ref(props.presetData)
    const chartContainer = ref(null);
    const chart = shallowRef(null);
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
    const getRecentMonths = ()=> {
        const months = [];
        const currentDate = new Date();

        // 循环获取最近 16 个月的日期
        for (let i = 0; i < 16; i++) {
            // 获取当前日期的年份和月份
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // 注意月份是从 0 开始的，所以要加 1

            // 将年份和月份存储到数组中
            months.push(`${year}-${month}`);

            // 递减月份，以获取前一个月的日期
            currentDate.setMonth(currentDate.getMonth() - 1);
        }

        return months.reverse();
    }
    const formatTime = (time) => {
        const dateObj = new Date(time);

        const year = dateObj.getUTCFullYear();
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');  // 月份是从0开始的，所以我们加1
        const day = String(dateObj.getUTCDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }
    onMounted(() => {

        const initChart = () => {
                chart.value = echarts.init(chartContainer.value);
                const xAxisData = getRecentMonths()
                const seriesData = []
                presetData.value.historyOneDay.data_16mon.forEach(item => {
                    seriesData.push(
                        {
                            value: Math.abs(item).toFixed(2) - 0,
                            persent: item > 0 ? '+' +( (item).toFixed(2) - 0).toString() : ((item).toFixed(2) - 0).toString(),
                            itemStyle: {
                                color: item > 0 ? '#00FF66' : '#FA2256'
                            }
                        }
                    )
                });
                const option = {
                    grid: {
                        top: '1%',
                        left: '1%',
                        right: '8%',
                        bottom: '1%',
                        containLabel: true
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
                        formatter: function(params) {
                            const color = params[0].color
                            return `<div style="font-size:14px;mrigin-bottom: 8px">${params[0].name}<span style="color:${color};display: flex;align-items:center"><span style="display:inline-block;width:8px;height:8px;background:${color};border-radius:10px;margin-right:4px"></span>${params[0].data.persent}%</span></div>`;
                        },
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxisData,
                        showMaxLabel: true,
                        
                        axisLabel: {
                            interval: function(index, value) {
                                return index === 0 || index === option.xAxis.data.length - 1;
                            },
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
                        axisLabel: {
                            formatter: '{value}%',
                        },
                    },
                    series: [
                        {
                        itemStyle: {
                            borderRadius: [5, 5, 5, 5], // 设置圆角半径，顺时针方向：左上、右上、右下、左下
                        },
                        data: seriesData,
                        type: 'bar'
                        }
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
        initChart()

    });
    return {
        chartContainer,
        presetData,
        formatterNumber,
        formatTime
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
.bar{
    width: 100%;
    background: #1C1E1F;
    border-radius: .37rem;
    padding: 0.25rem 0.4rem;
    .line{
        width: 100%;
        display: flex;
        align-items: center;
        .proess{
            flex: 1;
            height: 15px;
            background: #343434;
            margin: 0 .4rem;
            display: flex;
            .info{
                white-space: nowrap;
                margin-left: -70px;                
                top: -40px;
                left: 100%;
                width: auto;
                position: absolute;
                background: #00FF66;
                color: #000000;
                font-size: 14px;
                font-family: Poppins-Medium, Poppins;
                font-weight: 500;
                padding: .1rem .3rem;
            }
            .color{
                height: 100%;
                width: 80%;
                background: #00FF66;
                position: relative;
            }
        }

    }
    .price-info{
        margin-top: .6rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
       
        .item{
            line-height: .5rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            font-family: Poppins-Medium, Poppins;
            font-weight: 500;
            color: #777777;
            .text{
                color: #ffffff;
                margin-left: .4rem;
                .color{
                color: #00FF66;
                }
                .red{
                    color: #FA2256;
                }
                .time{
                    font-size: 12px;
                }
            }
        }
    }
    .chart{
        margin-top: .5rem;
        .bar-info{
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
    }
}
</style>