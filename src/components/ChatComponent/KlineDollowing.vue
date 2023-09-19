<!-- K线图 -->
<template>
      <div class="info">
            <div class="coin-name">{{ presetData.coinName }}/ USD
                <span class="tip">1d</span>
            </div>
            <div class="item">
                <div class="title">
                    {{ $t('Open') }}:
                </div>
                <div class="text">
                    {{ $formatNumber(presetData.last_day.open) }}
                </div>
            </div>
            <div class="item">
                <div class="title">
                    {{ $t('High') }}:
                </div>
                <div class="text">
                    {{ $formatNumber(presetData.last_day.high) }}
                </div>
            </div>
            <div class="item">
                <div class="title">
                    {{ $t('Low') }}:
                </div>
                <div class="text">
                    {{ $formatNumber(presetData.last_day.low) }}
                </div>
            </div>
            <div class="item">
                <div class="title">
                    {{ $t('Close') }}:
                </div>
                <div class="text">
                    {{ $formatNumber(presetData.last_day.close) }}
                </div>
            </div>
        </div>
    <div ref="chartContainer" style="width: 100%; height: 7.4rem" />
    <div class="point">
       <div>
            <span class="green"></span>
            {{ $t('BuyPoint') }}
       </div>
        <div>
            <span class="red"></span>
            {{ $t('SellPoint') }}
        </div>
    </div>
</template>

<script>
import { ref, shallowRef, computed,onMounted } from 'vue';
import { useStore} from 'vuex'
import * as echarts from 'echarts';
import axios from 'axios'
export default {
    name: 'KLine',
    props:{
        kline:{
            type: Object,
            default: null
        },
        presetData: {
            type: Object,
            default: null
        }
    },
    setup(props) {
         const store = useStore()
        //适配
        const screenWidth = computed( () => {
            return store.state.screenWidth
        })
        const chartContainer = ref(null);
        const chart = shallowRef(null);
        const presetData = ref(props.presetData)
        const kline = ref(props.kline.reverse())
        const trad_his = presetData.value.trad_his
        const timestampToTime = (timestamp) => {
            const date = new Date(timestamp*1000);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${month}-${day}`;
        }
        const $formatNumber = (num) => {
            if(!num){
                return 0
            }
            num = Number(num).toFixed(6) - 0
            const parts = num.toString().split('.')
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            return parts.join('.')
        }
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
        onMounted(() => {
            const initChart = () => {
                    chart.value = echarts.init(chartContainer.value);
                    var buyData = trad_his.filter(item => item.action === 'buy').map(item => [timestampToTime(item.trading_at), parseFloat(item.price)]);
                    var sellData = trad_his.filter(item => item.action === 'sell').map(item => [timestampToTime(item.trading_at), parseFloat(item.price)]);
                    let xAxisData = []
                    kline.value.forEach( (item) => {
                        xAxisData.push(
                            [timestampToTime(item.time),
                            item.open,
                            item.close,
                            item.low,
                            item.high,
                            item.volumefrom]
                        )
                    })
                    const upColor = '#00FF66';
                    const downColor = '#FA2256';
                    function splitData(xAxisData) {
                        let categoryData = [];
                        let values = [];
                        let volumes = [];
                        for (let i = 0; i < xAxisData.length; i++) {
                            categoryData.push(xAxisData[i].splice(0, 1)[0]);
                            values.push(xAxisData[i]);
                            volumes.push([i, xAxisData[i][4], xAxisData[i][0] > xAxisData[i][1] ? 1 : -1]);
                        }
                        return {
                            categoryData: categoryData,
                            values: values,
                            volumes: volumes
                        };
                    }
                    let data = splitData(xAxisData);
                    let option = {
                        animation: false,
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
                            padding: 10,
                            position: function (pos, params, el, elRect, size) {
                                const obj = {
                                    top: 10
                                };
                                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                                return obj;
                            },
                            formatter: function(params) {
                                // const data = params[0].data; // Assuming data for the candlestick chart is available in the first series
                                // const open = ' $' + $formatNumber(data[1]);
                                // const close = ' $' + $formatNumber(data[2]);
                                // const lowest = ' $' + $formatNumber(data[3]);
                                // const highest = ' $' +$formatNumber(data[4]);
                                // const vol = params[1]
                                // return `<div style="margin-bottom: 5px">${params[0].marker}Open: ${open}</div></div> <div style="margin-bottom: 5px">${params[0].marker}Close: ${close}</div><div style="margin-bottom: 5px">${params[0].marker}Lowest: ${lowest}</div>${params[0].marker}Highest: ${highest}<div style="margin-top: 10px">${vol.marker} ${vol.seriesName}: $${formatterNumber(vol.value[1])}</div> `
                            }
                        },
                        axisPointer: {
                            link: [
                                {
                                    xAxisIndex: 'all'
                                }
                            ],
                            label: {
                                backgroundColor: '#777'
                            }
                        },
                        toolbox: {
                            show: false,
                        },
                        brush: {
                            xAxisIndex: 'all',
                            brushLink: 'all',
                            outOfBrush: {
                                colorAlpha: 0.1
                            }
                        },
                        visualMap: {
                            show: false,
                            seriesIndex: 5,
                            dimension: 2,
                            pieces: [
                                {
                                    value: 1,
                                    color: downColor
                                },
                                {
                                    value: -1,
                                    color: upColor
                                }
                            ]
                        },
                        grid: [
                            {
                            left: '5%',
                            right: '8%',
                            height: '60%'
                            },
                            {
                            left: '5%',
                            right: '8%',
                            top: '80%',
                            height: '16%'
                            }
                        ],
                        xAxis: [
                            {
                                type: 'category',
                                data: data.categoryData,
                                boundaryGap: false,
                                axisLine: { onZero: false },
                                splitLine: { show: false },
                                min: 'dataMin',
                                max: 'dataMax',
                                axisPointer: {
                                    z: 100
                                },
                                showMaxLabel: true,
                                
                                },
                            {
                                type: 'category',
                                gridIndex: 1,
                                data: data.categoryData,
                                boundaryGap: false,
                                axisLine: { onZero: false },
                                axisTick: { show: false },
                                splitLine: { show: false },
                                axisLabel: { show: false },
                                min: 'dataMin',
                                max: 'dataMax'
                            }
                        ],
                        yAxis: [
                            {
                                show: screenWidth.value > 900,
                                scale: true,
                                splitLine: {
                                    lineStyle: {
                                        type: 'dashed', // 设置为虚线
                                        color: '#34384C'
                                    }
                                }
                            },
                            {
                                scale: true,
                                gridIndex: 1,
                                splitNumber: 2,
                                axisLabel: { show: false },
                                axisLine: { show: false },
                                axisTick: { show: false },
                                splitLine: { show: false }
                            },
                        ],
                        dataZoom: [
                            {
                                type: 'inside',
                                xAxisIndex: [0, 1],
                                start: 0,
                                end: 100
                            },
                            {
                                show: false,
                                xAxisIndex: [0, 1],
                                type: 'slider',
                                top: '85%',
                                start: 0,
                                end: 100
                            }
                        ],
                        series: [
                            {
                            name: '',
                            type: 'candlestick',
                            data: data.values,
                            itemStyle: {
                                color: upColor,
                                color0: downColor,
                                borderColor: undefined,
                                borderColor0: undefined
                            }
                            },
                            {
                            name: 'Volume',
                            type: 'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data: data.volumes,
                            itemStyle: {
                                color: '#34384C'
                            }
                            },
                            {
                                type: 'scatter',
                                name: 'Buy Points',
                                data: buyData,
                                symbolSize: 10,
                                itemStyle: {
                                    color: '#00FF66'  // Green for buy points
                                }
                            },
                            {
                                type: 'scatter',
                                name: 'Sell Points',
                                data: sellData,
                                symbolSize: 10,
                                itemStyle: {
                                    color: '#FA2256'  // Red for sell points
                                }
                            }
                            ]
                        }
                        chart.value.setOption(option)
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
        chartContainer
        };
  }
}
</script>

<style scoped lang='scss'>
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
        background: #FA2256;
        margin-left: .3rem;
    }
}
.info{
        display: flex;
        align-items: center;
        padding: 0 0 .6rem;
        flex-wrap: wrap;
        .coin-name{
            font-size: .4rem;
            font-weight: bold;
            color: #FFFFFF;
            margin-right: .6rem;
            .tip{
                font-size: 12px;
                color: #777777;
            }
        }
        .item{
            margin-top: .2rem;
            display: flex;
            margin-right: .4rem;
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
    .top-tab{
    display: flex;
    justify-content: flex-end;
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
            &.active{
                color: #ffffff;
                background: #3F3F3F;
            }
        }
    }
}
</style>