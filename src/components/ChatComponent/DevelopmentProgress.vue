<!-- 持有者地址趋势 -->
<template>
    <div class="title">{{ $t('DevelopmentProgress',{coin:presetData.coinName}) }}</div>
    <div ref="chartContainer" style="width: 100%; height: 6rem;" />
</template>

<script>
import { ref, computed, onMounted,shallowRef } from 'vue';
import { useStore} from 'vuex'
import * as echarts from 'echarts';

export default {
  name: '',
  props:{
    presetData:{
        type: Object,
        default: null
    }
  },
  setup(props) {
    const chartContainer = ref(null);
    const chart = shallowRef(null);
    const presetData = ref(props.presetData)
    function formatDate(inputStr) {
        inputStr = inputStr.toString()
        return inputStr.substring(0, 4) + '-' + 
            inputStr.substring(4, 6) + '-' + 
            inputStr.substring(6, 8);
    }
    onMounted(() => {
        const initChart = () => {
                chart.value = echarts.init(chartContainer.value);
                const list = presetData.value.socialMedia.Project.reverse()
                const xAxisData = []
                const seriesData = []
                list.forEach( item => {
                    xAxisData.push(formatDate(item.ymd))
                    seriesData.push(item.Total_Commits)
                })
                const option = {
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
                    grid:{
                        left: '15%',
                        top: '6%',
                        right: '8%',
                        bottom: '8%'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxisData,
                        showMaxLabel: true,
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
                        }
                    },
                    series: [
                        {
                            name:'Commit',
                            data: seriesData,
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

<style scoped lang='scss'>
.title{
  font-size: 14px;
  font-family: Inter-Medium, Inter;
  font-weight: 500;
  color: #FFFFFF;
  margin-bottom: .3rem;
}
</style>