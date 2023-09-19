<template>
    <div ref="chartContainer" style="width: 100%; height: 5rem" />
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
    const analysisType = computed( () => {
        if(store.state.analysisType == 'trend_15m'){
                return 'fund_tracker_15m'
        }
        if(store.state.analysisType == 'trend_1h'){
            return 'fund_tracker_1h'
        }
        if(store.state.analysisType == 'trend_4h'){
            return 'fund_tracker_4h'
        }
        if(store.state.analysisType == 'trend_1d'){
            return 'fund_tracker_1d'
        }
        if(store.state.analysisType == 'trend_7d'){
            return 'fund_tracker_7d'
        }
    })
    watch(() => props.presetData, (newValue, oldValue) => {
        presetData.value = newValue
    })
    const formatterNumber = (num) => {
        const value = Math.abs(num)
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
        return num > 0 ? number : '-' + number
    }
    presetData.value = props.presetData
    onMounted(() => {
        const initChart = () => {
                    const data = presetData.value[analysisType.value]
                    chart.value = echarts.init(chartContainer.value);
                    const labelTop = {
                        position: 'top'
                    };

                    const option = {
                    grid: {
                        top: 20,
                        bottom: 30
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: false,
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                        axisTick: { show: false },
                        axisLabel: { show: false }
                    },
                    xAxis: {
                        type: 'category',
                        axisLine: { show: false },
                        axisLabel: { show: true },
                        axisTick: { show: false },
                        splitLine: { show: false },
                        data: [
                            t('Fundsinflow'),
                            t('Fundsoutflow'),
                            t('Mainforcenetinflow'),
                        ]
                    },
                    series: [
                        {
                        type: 'bar',
                        stack: 'Total',
                        barWidth: 40, 
                        itemStyle: {
                            borderRadius: 5 
                        },
                        label: {
                            show: true,
                            formatter: function(parames){
                                return '$' + formatterNumber(parames.data.value.toFixed(6)-0)
                            },
                            color: '#FFFFFF',             // 文字颜色
                            fontSize: 14,              // 文字大小
                            fontWeight: 'bold',        // 字体粗细
                        },
                        data: [
                            { value: data.ins, label: labelTop, itemStyle: { color: data.ins > 0 ? '#00FF66' : '#FA2256'} },
                            { value: data.outs, label: labelTop, itemStyle: { color: data.outs > 0 ? '#00FF66' : '#FA2256' } },
                            { value: data.total, label: labelTop, itemStyle: { color: data.total > 0 ? '#00FF66' : '#FA2256' } },
                        ]
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
            watch(() => analysisType.value, (val) => {
                initChart()
            })
    })
    return {
        chartContainer,
        presetData,
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

</style>