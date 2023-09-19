<!-- 币种信息组件 -->
<template>
    <div class="FollowingTrendJudgment">
        <div class="info">
            <img :src="presetData.coinImageUrl" alt="">
            {{ $t('GlobalCapital',{coin:coinName}) }}
        </div>
        <div class="yc">
            {{$t('GlobalCapitalTitle')}} <br> <br>
            {{$t('M0')}} <br>
            {{$t('M1')}} <br>
            {{$t('M2')}} <br>
        </div>
      <div ref="chartContainer" style="width: 100%; height: 5rem;margin-top: .4rem;" />
      <div class="point">
        <div>
          <span class="m2"></span>
          M2
        </div>
        <div>
          <span class="m1"></span>
          M1
        </div>
        <div>
          <span class="m0"></span>
          M0
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, shallowRef, watch,onMounted,computed } from 'vue';
  import { useStore} from 'vuex'
  import * as echarts from 'echarts';
  import { useI18n } from 'vue-i18n'
    export default {
  name: '',
  props:{
  presetData:{
        type: Object,
        default: null
    }
  },
  setup(props) {
      const { t } = useI18n();
      const chartContainer = ref(null);
      const chart = shallowRef(null);
      const presetData = ref(null)
      const store = useStore()
      const screenWidth = computed( () => {
          return store.state.screenWidth
      })
      watch(() => props.presetData, (newValue, oldValue) => {
          presetData.value = newValue
      })
      presetData.value = props.presetData
      onMounted(() => {
          const initChart = () => {
                      chart.value = echarts.init(chartContainer.value);
                      const data_predicted = presetData.value.data_predicted
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
                          formatter: function(params) {
                            let html = ''
                            params.forEach( item => {
                              html += item.marker + ' ' + item.seriesName + ' ' + ((item.value[0]).toFixed(2) - 0) + '%<br>'
                            })
                            return html
                          },
                        },
                        xAxis: {
                            type: 'value', // 使用value类型以适应不均匀的x轴数据
                            axisLabel: {
                                formatter: '{value}%',
                            },
                            splitLine: {
                              show: false,
                          },
                        },
                        yAxis: {
                            type: 'value',
                            axisTick: {
                                show: false , // 隐藏Y轴的刻度线
                                lineStyle: {
                                  type: 'dashed', // 设置为虚线
                                  color: '#34384C' // 设置为红色
                              }
                            },
                            splitLine: {
                              lineStyle: {
                                  type: 'dashed', // 设置为虚线
                                  color: '#34384C' // 设置为红色
                              }
                          },
                        },
                        series: [
                            {
                                name: 'M0',
                                type: 'line',
                                data:data_predicted.M0,
                                lineStyle: {
                                    color: '#FBC62F'  // 设置折线颜色为橙色
                                },
                                areaStyle: {
                                    color: '#FBC62F'  // 设置填充颜色为淡蓝色
                                },
                                z: 3
                            },
                            {
                                name: 'M1',
                                type: 'line',
                                data:data_predicted.M1,
                                lineStyle: {
                                    color: '#0FCA7A'  // 设置折线颜色为橙色
                                },
                                areaStyle: {
                                    color: '#0FCA7A'  // 设置填充颜色为淡蓝色
                                },
                                z: 2
                            },
                            {
                                name: 'M2',
                                type: 'line',
                                data:data_predicted.M2,
                                lineStyle: {
                                    color: '#1673FF'  // 设置折线颜色为橙色
                                },
                                areaStyle: {
                                    color: '#1673FF'  // 设置填充颜色为淡蓝色
                                },
                                z: 1
                            }
                        ]
                      };

                      // const option = {
                      //   tooltip: {
                      //     trigger: 'axis',
                      //     axisPointer: {
                      //       type: 'cross',
                      //       label: {
                      //         backgroundColor: '#6a7985'
                      //       }
                      //     }
                      //   },
                      //   grid: {
                      //     left: '3%',
                      //     right: '4%',
                      //     bottom: '3%',
                      //     containLabel: true
                      //   },
                      //   xAxis: [
                      //     {
                      //       type: 'value', // 使用value类型以适应不均匀的x轴数据
                      //       boundaryGap: false,
                      //     }
                      //   ],
                      //   yAxis: [
                      //     {
                      //       type: 'value',
                      //       position: 'right',
                      //       splitLine: {
                      //           lineStyle: {
                      //               type: 'dashed', // 设置为虚线
                      //               color: '#34384C'
                      //           }
                      //       }
                      //     }
                      //   ],
                      //   series: [
                      //     {
                      //       name: 'M2',
                      //       type: 'line',
                      //       stack: 'Total',
                      //       areaStyle: {},
                      //       emphasis: {
                      //         focus: 'series'
                      //       },
                      //       data: data_predicted.M0
                      //     },
                      //     {
                      //       name: 'M1',
                      //       type: 'line',
                      //       stack: 'Total',
                      //       areaStyle: {},
                      //       emphasis: {
                      //         focus: 'series'
                      //       },
                      //       data: data_predicted.M1
                      //     },
                      //     {
                      //       name: 'M0',
                      //       type: 'line',
                      //       stack: 'Total',
                      //       areaStyle: {},
                      //       emphasis: {
                      //         focus: 'series'
                      //       },
                      //       data: data_predicted.M2
                      //     },
                      //   ]
                      // };
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
      })
      return {
          chartContainer
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
        align-items: center;
        font-size: 14px;

        img{
            width: .51rem;
            margin-right: .2rem;
        }
    }
    .yc{
        padding-left: .71rem;
        font-size: 12px;
    }
    .yc-right{
        font-size: 12px;
        text-align: right;
    }
}
.point{
  display: flex;
  justify-content: center;
  span{
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    margin-left: .2rem;
    &.m2{
      background: #695CFB;
    }
    &.m1{
      background: #0FCA7A;
    }
    &.m0{
      background: #FBC62F;
    }
  }
}
  </style>