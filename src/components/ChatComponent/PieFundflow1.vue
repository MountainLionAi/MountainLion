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
                return 'big_transfer_15m'
            }
            if(store.state.analysisType == 'trend_1h'){
                return 'big_transfer_1h'
            }
            if(store.state.analysisType == 'trend_4h'){
                return 'big_transfer_4h'
            }
            if(store.state.analysisType == 'trend_1d'){
                return 'big_transfer_1d'
            }
            if(store.state.analysisType == 'trend_7d'){
                return 'big_transfer_7d'
            }
    })
    presetData.value = props.presetData
    onMounted(() => {
        const initChart = () => {
                    chart.value = echarts.init(chartContainer.value);
                    const seriesData = [
                        {
                            name: t('Deposit'),
                            value: presetData.value[analysisType.value].order_flow.amount_usd_in_percent,
                            label: {  formatter: '{d}%',textStyle: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' } }
                        },
                        {
                            name: t('Withdrawal'),
                            value: presetData.value[analysisType.value].order_flow.amount_usd_out_percent,
                            label: {  formatter: '{d}%',textStyle: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' } }
                        }
                    ]
                    let legend = null
                    let radius = null
                    let center = null
                    if(screenWidth.value > 900){
                        legend ={
                            orient: 'vertical',
                            left: 'right',
                            right:'center',
                            data: [t('Deposit'),t('Withdrawal')],
                            textStyle: {
                                color: '#FFFFFF'
                            },
                            formatter: function(name) {
                                var item = seriesData.filter(item => item.name.toLowerCase() === name.toLowerCase());
                                var percentage = (item[0].value).toFixed(2) - 0 + '%';
                                return `${name}: ${percentage}`;
                            }
                        }
                        radius = ['50%', '90%']
                        center = ['40%', '52%']
                    }else{
                        legend ={
                            orient: 'horizontal', // Set the orientation to horizontal
                            x: 'center', // Center align the legend
                            y: 'top', // Position the legend at the top
                            itemWidth: 10, // Set the width of legend items
                            itemHeight: 10, // Set the height of legend items
                            data: [t('Deposit'),t('Withdrawal')],
                            textStyle: {
                                color: '#FFFFFF'
                            },
                            formatter: function(name) {
                                var item = seriesData.filter(item => item.name.toLowerCase() === name.toLowerCase());
                                var percentage = item[0].value + '%';
                                return `${name}: ${percentage}`;
                            }
                        }
                        radius = ['60%', '70%']
                        center = ['50%', '70%']
                    }
                    const option = {
                        tooltip: {
                            trigger: 'item',
                            backgroundColor: 'rgba(29,31,37,0.9)', // 设置背景颜色
                            borderColor: '#3C3C3C', // 设置边框颜色
                            borderWidth: 1, // 设置边框宽度
                            textStyle: {
                                color: '#FFFFFF' // 设置文本颜色
                            },
                            formatter: '{b}: {c} ({d}%)' 
                        },
                        legend: legend,
                        series: [
                            {
                                type: 'pie',
                                radius: radius,
                                center: center,
                                label: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    label: {
                                    show: true,
                                    fontSize: 30,
                                    fontWeight: 'bold'
                                    }
                                },
                                labelLine: {
                                    show: false
                                },
                                data: seriesData,
                                itemStyle: {
                                    color: function(params) {
                                        var colorList = ['#00FF66','#FA2256']; // 你的颜色数组
                                        return colorList[params.dataIndex];
                                    }
                                }
                            },
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