<!-- 饼图 -->
<template>
    <div class="pie">
      <div class="info">
         <div>
            <img class="coin-img" :src="presetData.coinImageUrl" alt="">
            {{ $t('LargeTransactionDistributionChart',{coin:presetData.coinName}) }}
         </div>
         <div class="list">
            <span style="display:inline-block;width:8px;height:8px;background:#00FF66;border-radius:10px;margin-right:4px"></span>
            {{ $t('buyOrder') }}
            <span style="display:inline-block;width:8px;height:8px;background:#FA2256;border-radius:10px;margin-right:4px"></span>
            {{ $t('sellOrder') }}
         </div>
      </div>
      <div ref="chartContainer" style="width: 100%; height: 7.4rem" />
    </div>
  </template>
  
  <script>
  import { ref, shallowRef, onMounted, watch, computed } from 'vue';
  import { useStore} from 'vuex'
  import * as echarts from 'echarts';
  import { useI18n } from 'vue-i18n'
  
  export default {
    name: '',
    props:{
      presetData:{
          type: Object,
          default: null
      },
    },
    setup(props) {
      const { t } = useI18n();
      const store = useStore()
      //适配
      const screenWidth = computed( () => {
          return store.state.screenWidth
      })
      const analysisType = computed( () => {
        if(store.state.analysisType == 'trend_15m'){
                return 'big_order_15m'
            }
            if(store.state.analysisType == 'trend_1h'){
                return 'big_order_1h'
            }
            if(store.state.analysisType == 'trend_4h'){
                return 'big_order_4h'
            }
            if(store.state.analysisType == 'trend_1d'){
                return 'big_order_1d'
            }
            if(store.state.analysisType == 'trend_7d'){
                return 'big_order_7d'
            }
    })
      const chartContainer = ref(null);
      const chart = shallowRef(null);
      const presetData = ref(null)
      watch(() => props.presetData, (newValue, oldValue) => {
          presetData.value = newValue
      })
      presetData.value = props.presetData
      const formatDate = (d) => {
        const year = d.getFullYear();
        const month = ("0" + (d.getMonth() + 1)).slice(-2); // 月份是从0开始的，所以要+1
        const day = ("0" + d.getDate()).slice(-2);
        const hours = ("0" + d.getHours()).slice(-2);
        const minutes = ("0" + d.getMinutes()).slice(-2);
        const seconds = ("0" + d.getSeconds()).slice(-2);
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    const formateNumber = (value) => {
        if (value >= 1e9) {
            return (value / 1e9).toFixed(4) - 0 + 'B';
        } else if (value >= 1e6) {
            return (value / 1e6).toFixed(4) - 0 + 'M';
        } else if (value >= 1e3) {
            return (value / 1e3).toFixed(4) - 0 + 'K';
        } else {
            return value;
        }
    }
      onMounted(() => {
          const initChart = () => {
                    chart.value = echarts.init(chartContainer.value);
                    const chartData = presetData.value.order[analysisType.value].slice(0,100)

                    let data = []
                    chartData.forEach(element => {
                        var date = formatDate(new Date(element.deal_time * 1000))
                        var volume = element.volume
                        var amount = element.amount
                        var type = element.direction == 1 ? 1 : -1; // 随机选择买单或卖单
                        var price = element.price
                        data.push([echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', date), amount, volume,  type,price]);
                    });
                    var option = {
                        tooltip: {
                            trigger: 'item',
                            backgroundColor: 'rgba(29,31,37,0.9)', // 设置背景颜色
                            borderColor: '#3C3C3C', // 设置边框颜色
                            borderWidth: 1, // 设置边框宽度
                            textStyle: {
                                color: '#FFFFFF' // 设置文本颜色
                            },
                            formatter: function(params) {
                                var dataItem = params.data;
                                return dataItem[0] + '<br>'
                                    + t('echartsPrice') + ': ' + formateNumber(dataItem[1]) + '<br>'
                                    + t('echartsvolume') + ': ' + formateNumber(dataItem[2]) + '<br>'
                                    + t('echartsamount') + ': ' + formateNumber(dataItem[4]) + '<br>'
                            }
                        },
                        xAxis: {
                            type: 'time',
                            splitLine: {
                                show: false
                            }
                        },
                        yAxis: {
                            type: 'value',
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed', // 设置为虚线
                                    width: 0.3,
                                }
                            },
                            axisLabel: {
                                formatter: function(value) {
                                    if (value >= 1e9) {
                                        return value / 1e9 + 'B';
                                    } else if (value >= 1e6) {
                                        return value / 1e6 + 'M';
                                    } else if (value >= 1e3) {
                                        return value / 1e3 + 'K';
                                    } else {
                                        return value;
                                    }
                                }
                            }
                        },
                        visualMap: [{
                            show: false,
                            dimension: 2, // 交易额来定义大小
                            min: 0,
                            max: 5000,
                            seriesIndex: 0,
                            inRange: {
                                symbolSize: [8, 20]
                            }
                        }, {
                            show: false,
                            dimension: 3, // 使用第四个维度 (买/卖标志) 来定义颜色
                            seriesIndex: 0,
                            min: -1,
                            max: 1,
                            inRange: {
                                color: ['#00FF66', '#FA2256']
                            }
                        }],
                        series: [{
                            data: data,
                            type: 'scatter',
                            encode: {
                                x: 0,  // 第一列是x轴 (日期)
                                y: 1   // 第二列是y轴 (交易量)
                            },
                            emphasis: { // 高亮状态，也就是鼠标悬停时的状态
                               
                            }
                        }]
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
          watch(() => analysisType.value, (val) => {
            initChart()
          })
  
      });
      return {
          chartContainer,
          screenWidth,
          analysisType
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
  .pie{
      width: 100%;
      background: #1C1E1F;
      border-radius: .37rem;
      padding: 0.25rem 0.4rem;
      .info{
          display: flex;
          align-items: center;
          font-size: 014px;
          justify-content: space-between;
          img{
              width: .51rem;
              margin-right: .2rem;
          }
      }
  }
  </style>