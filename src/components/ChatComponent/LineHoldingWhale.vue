<!-- 持有者趋势 -->
<template>
    <div class="title">{{ $t('HoldingWhaleTitle') }}</div>
    <div ref="chartContainer" style="width: 100%; height: 6rem" />
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
                // 定义堆叠折线图的数据
                let data = []
                let xAxisData= []
                const data1 = []
                const data2 = []
                const data3 = []
                const data4 = []
                holdcoin.value.forEach( item => {
                  xAxisData.push(formatTime(item.updatedate.toString()))
                  data1.push(item.top10rate)
                  data2.push(item.top20rate)
                  data3.push(item.top50rate)
                  data4.push(item.top100rate)
                })
                data = [data1,data2,data3,data4]
                const option = {
                  tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(29,31,37,0.9)', // 设置背景颜色
                    borderColor: '#3C3C3C', // 设置边框颜色
                    borderWidth: 1, // 设置边框宽度
                    textStyle: {
                        color: '#FFFFFF' // 设置文本颜色
                    },
                    formatter: function(params) {
                      const title = `<div style="font-size:14px">${params[0].name}<br>`
                      let list = ''
                      params.forEach( item => {
                        list += `<span style="display:inline-block;background:${item.color};width:8px;height:8px;border-radius:8px;margin-right: 4px"></span><span>`+item.seriesName+`</span> <span>`+item.value+`%</span> <br>`
                      })
                        return title + list
                    },
                  },
                  grid:{
                      left: '15%',
                      top: '22%',
                      right: '8%'
                  },
                  legend: {
                    data: [
                    {
                      name: 'Top 10',
                      itemStyle: {
                        color: '#00FF66' // 设置图例圆点的颜色为红色
                      }
                    },
                    {
                      name: 'Top 20',
                      itemStyle: {
                        color: '#FF00E5' // 设置图例圆点的颜色为红色
                      }
                    },
                    {
                      name: 'Top 50',
                      itemStyle: {
                        color: '#FFA800' // 设置图例圆点的颜色为红色
                      }
                    },
                    {
                      name: 'Top 100',
                      itemStyle: {
                        color: '#246CF9' // 设置图例圆点的颜色为红色
                      }
                    }],
                    textStyle: {
                      color: '#777777', 
                    },
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
                    axisLabel: {
                      formatter: '{value}%', // 将刻度标签格式化为百分比形式
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed', // 设置为虚线
                            color: '#34384C'
                        }
                    }
                  },
                  series: [
                    {
                      name: 'Top 10',
                      type: 'line',
                      stack: '总量',
                      data: data[0],
                      symbol: 'none', // 设置 symbol 为 'none'
                      lineStyle: {
                        color: '#00FF66' // 设置线条颜色为红色
                      }
                        
                    },
                    {
                      name: 'Top 20',
                      type: 'line',
                      stack: '总量',
                      data: data[1],
                      symbol: 'none', // 设置 symbol 为 'none'
                      lineStyle: {
                          color: '#FF00E5' // 设置线条颜色为红色
                        }

                    },
                    {
                      name: 'Top 50',
                      type: 'line',
                      stack: '总量',
                      data: data[2],
                      symbol: 'none', // 设置 symbol 为 'none'
                      lineStyle: {
                          color: '#FFA800' // 设置线条颜色为红色
                        }

                    },
                    {
                      name: 'Top 100',
                      type: 'line',
                      stack: '总量',
                      data: data[3],
                      symbol: 'none', // 设置 symbol 为 'none'
                      lineStyle: {
                          color: '#246CF9' // 设置线条颜色为红色
                        }

                    },
                    
                  ],
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