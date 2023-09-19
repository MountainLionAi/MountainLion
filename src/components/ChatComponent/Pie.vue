<!-- 饼图 -->
<template>
  <div class="pie">
    <div class="info">
        <img class="coin-img" :src="presetData.coinImageUrl" alt="">
       {{ $t('Ratiooftransactions',{coin:presetData.coinName}) }}
    </div>
    <div ref="chartContainer" style="width: 100%; height: 7.4rem" />
  </div>
</template>

<script>
import { ref, shallowRef, onMounted, watch, computed } from 'vue';
import { useStore} from 'vuex'
import * as echarts from 'echarts';

export default {
  name: '',
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
    const presetData = ref(null)
    watch(() => props.presetData, (newValue, oldValue) => {
        presetData.value = newValue
    })
    presetData.value = props.presetData
    const trade_ratio = presetData.value.tradeRatio.trade_ratio

    onMounted(() => {
        const initChart = () => {
                chart.value = echarts.init(chartContainer.value);
                const legendData = []
                const seriesData = []
                trade_ratio.forEach(item => {
                    legendData.push(item.name.toUpperCase())
                    seriesData.push({
                        name: item.name.toUpperCase(),
                        value: item.percent,
                        label: {  formatter: '{d}%',textStyle: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' } }
                    })
                });
                let legend = null
                let radius = null
                let center = null
                if(screenWidth.value > 900){
                    legend ={
                        orient: 'vertical',
                        left: 'right',
                        right:'center',
                        data: legendData,
                        textStyle: {
                            color: '#FFFFFF'
                        },
                        formatter: function(name) {
                            var item = trade_ratio.filter(item => item.name.toLowerCase() === name.toLowerCase());
                            var percentage = item[0].percent + '%';
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
                        data: legendData,
                        textStyle: {
                            color: '#FFFFFF'
                        },
                        formatter: function(name) {
                            var item = trade_ratio.filter(item => item.name.toLowerCase() === name.toLowerCase());
                            var percentage = (item[0].percent).toFixed(2) - 0 + '%';
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
                                fontSize: 40,
                                fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: seriesData,
                            itemStyle: {
                                color: function(params) {
                                    var colorList = ['#00FF66','#33F3FF','#1673FF','#FB47E9','#FB47A8','#FB9347','#C1FB47','#FBC947','#FB6747','#FA2256']; // 你的颜色数组
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

    });
    return {
        chartContainer,
        screenWidth
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
        font-size: 14px;

        font-size: 014px;
        img{
            width: .51rem;
            margin-right: .2rem;
        }
    }
}
</style>