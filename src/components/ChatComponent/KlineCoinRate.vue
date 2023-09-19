<!-- K线图 -->
<template>
  <div class="k-line">
    <div ref="chartContainer" style="width: 100%; height: 7.4rem" />
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
        presetData:{
            type: Object,
            default: null
        },
    },
    setup(props) {
        const store = useStore()
        //适配
        const screenWidth = computed( () => {
            return store.state.screenWidth
        })
        const chartContainer = ref(null);
        const chart = shallowRef(null);
        const kline = ref([])
        const presetData = ref(props.presetData)
        kline.value = presetData.value
        const timestampToTime = (timestamp) => {
            const date = new Date(timestamp);
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
                    let xAxisData = []
                    for (let key in  kline.value) {
                        if (kline.value.hasOwnProperty(key)) {
                            const obj = [
                                    timestampToTime(kline.value[key].open_time),
                                    kline.value[key].open_price,
                                    kline.value[key].close_price,
                                    kline.value[key].low_price,
                                    kline.value[key].high_price,
                            ]
                            xAxisData.push(obj)
                        }
                    }
                    const upColor = '#00FF66';
                    const downColor = '#FA2256';
                    function splitData(xAxisData) {
                        let categoryData = [];
                        let values = [];
                        // let volumes = [];
                        for (let i = 0; i < xAxisData.length; i++) {
                            categoryData.push(xAxisData[i].splice(0, 1)[0]);
                            values.push(xAxisData[i]);
                            // volumes.push([i, xAxisData[i][4], xAxisData[i][0] > xAxisData[i][1] ? 1 : -1]);
                        }
                        return {
                            categoryData: categoryData,
                            values: values,
                            // volumes: volumes
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
                                const data = params[0].data; // Assuming data for the candlestick chart is available in the first series
                                const open = ' $' + $formatNumber(data[1]);
                                const close = ' $' + $formatNumber(data[2]);
                                const lowest = ' $' + $formatNumber(data[3]);
                                const highest = ' $' +$formatNumber(data[4]);
                                const vol = params[1]
                                return `${params[0].marker}Open: ${open}</div></div> <div style="margin-bottom: 5px">${params[0].marker}Close: ${close}</div><div style="margin-bottom: 5px">${params[0].marker}Lowest: ${lowest}</div>${params[0].marker}Highest: ${highest}<div style="margin-top: 10px"></div> `
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
                            left: '8%',
                            right: '8%',
                            height: '70%'
                            },
                            {
                            left: '8%',
                            right: '8%',
                            top: '90%',
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
                                scale: true,
                                show: screenWidth.value > 900,
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
                            // {
                            // name: 'Volume',
                            // type: 'bar',
                            // xAxisIndex: 1,
                            // yAxisIndex: 1,
                            // data: data.volumes,
                            // itemStyle: {
                            //     color: '#34384C'
                            // }
                            // }
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
            chartContainer,
            presetData,
            screenWidth
        };
  }
}
</script>

<style scoped lang='scss'>
.top-info{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    .list{
        display: flex;
        width: 24%;
        padding: .5rem .3rem;
        background: #1C1E1F;
        border-radius: .37rem;
        opacity: 1;
        margin-bottom: .3rem;
        &:hover{
            box-shadow: 0 2px 12px 0 rgba(255,255,255,.1);
        }
        .coin-img{
            width: .9rem;
        }
        .title{
            font-size: .296rem;
            font-family: Poppins-Regular, Poppins;
            font-weight: 400;
            color: #5D6588;
        }
        .text{
            margin-top: .1rem;
            font-size: .37rem;
            font-family: Poppins-SemiBold, Poppins;
            font-weight: 600;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            .color{
                color: #00FF66;
            }
            .red{
                color: #FA2256;
            }
            .zs{
                width: .24rem;
                margin-right: .15rem;
            }
        }
        .left{
            margin-right: .3rem;
        }
    }
}
.k-line{
    margin-top: .3rem;
    width: 100%;
    background: #1C1E1F;
    border-radius: .37rem;
    padding: .6rem .5rem;
    .info{
        display: flex;
        align-items: center;
        font-size: 14px;

        padding: 0 0 .6rem;
        .coin-name{
            font-size: .4rem;
            font-weight: bold;
            color: #FFFFFF;
            margin-right: .6rem;
        }
        .item{
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

}
</style>