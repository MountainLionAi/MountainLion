<!-- 持有者地址趋势 -->
<template>
    <div class="title">{{ $t('HoldingAddressTitle') }}</div>
    <div ref="chartContainer" style="width: 100%; height: 6rem;" />
</template>

<script>
import { ref, computed, onMounted, shallowRef } from 'vue';
import { useStore} from 'vuex'
import * as echarts from 'echarts';

export default {
  name: '',
  props: {
    holdcoin: {
        type: Object,
        default: null
    }
  },
  setup(props) {
    const chartContainer = ref(null);
    const chart = shallowRef(null);
    const holdcoin = ref(props.holdcoin)
    const formatTime = (time) => {
        const year = time.slice(0, 4)
        const month = time.slice(4, 6)
        const day = time.slice(6, 8)
        const formattedDate = `${year}-${month}-${day}`
        return formattedDate
    }
    onMounted(() => {
        const initChart = () => {
                chart.value = echarts.init(chartContainer.value);
                let xAxisData= []
                let YAxisData= []
                holdcoin.value.forEach( item => {
                  xAxisData.push(formatTime(item.updatedate.toString()))
                  YAxisData.push(item.addrcount)
                })
                const option = {
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(29,31,37,0.9)', // 设置背景颜色
                        borderColor: '#3C3C3C', // 设置边框颜色
                        borderWidth: 1, // 设置边框宽度
                        textStyle: {
                            color: '#FFFFFF' // 设置文本颜色
                        },
                    },
                    grid:{
                        left: '15%',
                        top: '5%',
                        right: '8%'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        showMaxLabel: true,
                        data: xAxisData,
                        axisLabel: {
                            interval: function(index, value) {
                                return index === 0 || index === option.xAxis.data.length - 1;
                            },
                            formatter: function (value, index) {
                                return value.split('-')[1] +'-' + value.split('-')[2];
                            }
                        },
                        
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed', // 设置为虚线
                                color: '#34384C'
                            }
                        },
                        axisLabel: {
                            color: '#333', // 标签文字颜色
                            fontSize: 12, // 标签文字大小
                            formatter: function(value) {
                                if (value <= 999) {
                                    return value.toString();
                                } else if (value <= 999999) {
                                    return (value / 1000) + "K";
                                } else if (value <= 999999999) {
                                    return (value / 1000000) + "M";
                                } else {
                                    return (value / 1000000000) + "B";
                                }
                            }
                        }
                    },
                    series: [
                        {
                            data: YAxisData,
                            type: 'line',
                            color: '#00FF66',
                            areaStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                    { offset: 0, color: 'rgba(36,249,83,0.5)' },   // 渐变起始颜色为红色
                                    { offset: 1, color: 'rgba(36,249,57,0)' },  // 渐变结束颜色为蓝色
                                    ],
                                },
                            },
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
.title{
  font-size: 14px;
  font-family: Inter-Medium, Inter;
  font-weight: 500;
  color: #FFFFFF;
  margin-bottom: .3rem;
}
</style>