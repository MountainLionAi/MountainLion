<!-- K线图 -->
<template>
    <!-- <div class="top-tab">
        <div class="tab">
            <div class="list" @click="changeSearchType('yitian')" :class="SearchType == 'yitian' ? 'active' : ''">
                {{$t('yitian')}}
            </div>
            <div class="list" @click="changeSearchType('yizhou')" :class="SearchType == 'yizhou' ? 'active' : ''">
                {{$t('yizhou')}}
            </div>
            <div class="list" @click="changeSearchType('yigeyue')" :class="SearchType == 'yigeyue' ? 'active' : ''">
                {{$t('yigeyue')}}
            </div>
            <div class="list" @click="changeSearchType('liugeyue')" :class="SearchType == 'liugeyue' ? 'active' : ''">
                {{$t('liugeyue')}}
            </div>
            <div class="list" @click="changeSearchType('yinian')" :class="SearchType == 'yinian' ? 'active' : ''">
                {{$t('yinian')}}
            </div>
            <div class="list" @click="changeSearchType('sannian')" :class="SearchType == 'sannian' ? 'active' : ''">
                {{$t('sannian')}}
            </div>
            <div class="list" @click="changeSearchType('quanbu')" :class="SearchType == 'quanbu' ? 'active' : ''">
                {{$t('quanbu')}}
            </div>
        </div>
    </div> -->
    <div ref="chartContainer" style="width: 100%; height: 7.4rem" />
</template>

<script>
import { ref, shallowRef, computed,onMounted ,watch } from 'vue';
import { useStore} from 'vuex'
import * as echarts from 'echarts';
export default {
    name: 'KLine',
    props:{
        kline:{
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
        const SearchType = ref('liugeyue')
        const chartContainer = ref(null);
        const chart = shallowRef(null);
        const kline = ref(props.kline)
        const timestampToTime = (timestamp) => {
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
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
        const changeSearchType = (val) => {
            SearchType.value = val
        }
        const filterTimestamps = (timestamps, period) => {
            var now = new Date();
            var oneDay = 24 * 60 * 60 * 1000;
            var oneWeek = oneDay * 7;
            var oneMonth = oneDay * 30;
            var sixMonths = oneMonth * 6;
            var oneYear = oneDay * 365;
            var threeYears = oneYear * 3;

            var result = {};

            for (var key in timestamps) {
                var timestamp = timestamps[key];
                var date = new Date(timestamp);

                switch (period) {
                    case 'yitian':
                        if (date.setHours(0, 0, 0, 0) === now.setHours(0, 0, 0, 0)) {
                            result[key] = timestamp;
                        }
                        break;
                    case 'yizhou':
                        if (now - timestamp < oneWeek) {
                            result[key] = timestamp;
                        }
                        break;
                    case 'yigeyue':
                        if (now - timestamp < oneMonth) {
                            result[key] = timestamp;
                        }
                        break;
                    case 'liugeyue':
                        if (now - timestamp < sixMonths) {
                            result[key] = timestamp;
                        }
                        break;
                    case 'yinian':
                        if (now - timestamp < oneYear) {
                            result[key] = timestamp;
                        }
                        break;
                    case 'sannian':
                        if (now - timestamp < threeYears) {
                            result[key] = timestamp;
                        }
                        break;
                    default:
                        return timestamps
                }
            }

            return result;
        }
        onMounted(() => {
            const initChart = () => {
                    chart.value = echarts.init(chartContainer.value);
                    let xAxisData = []
                    const list = filterTimestamps(kline.value.open_time,SearchType.value)
                    for (let key in  list) {
                        if (kline.value.open_time.hasOwnProperty(key)) {
                            xAxisData.push(
                                [timestampToTime(kline.value.open_time[key]),
                                kline.value.open_price[key],
                                kline.value.close_price[key],
                                kline.value.low_price[key],
                                kline.value.high_price[key],
                                kline.value.volume[key]]
                            )
                        }
                    }
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
                                const data = params[0].data; // Assuming data for the candlestick chart is available in the first series
                                const open = ' $' + $formatNumber(data[1]);
                                const close = ' $' + $formatNumber(data[2]);
                                const lowest = ' $' + $formatNumber(data[3]);
                                const highest = ' $' +$formatNumber(data[4]);
                                const vol = params[1]
                                return `<div style="margin-bottom: 5px">${params[0].marker}Open: ${open}</div></div> <div style="margin-bottom: 5px">${params[0].marker}Close: ${close}</div><div style="margin-bottom: 5px">${params[0].marker}Lowest: ${lowest}</div>${params[0].marker}Highest: ${highest}<div style="margin-top: 10px">${vol.marker} ${vol.seriesName}: $${formatterNumber(vol.value[1])}</div> `
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
            watch(() => SearchType.value, () => {
                initChart()
            })
            initChart()

        });
        
        return {
            chartContainer,
            SearchType,
            changeSearchType
        };
  }
}
</script>

<style scoped lang='scss'>
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