<template>
      <div ref="chartContainer" style="width: 100%; height: 6rem" />
</template>

<script>
import { ref, shallowRef, computed,onMounted,watch,toRefs } from 'vue';
import { useStore} from 'vuex'
import * as echarts from 'echarts';
import { useI18n } from 'vue-i18n'

export default {
  name: '',
  props:{
    data:{
        type: Object,
        default: null
    }
  },
  setup(props) {
    const { t } = useI18n();
    const chartContainer = ref(null);
    const chart = shallowRef(null);
    const data = ref(props.data)
    //适配
    const store = useStore()
    const screenWidth = computed( () => {
        return store.state.screenWidth
    })
   
    onMounted(() => {
        const initChart = () => {
                    chart.value = echarts.init(chartContainer.value);
                    const option = {
                        series: [
                            {
                            type: 'gauge',
                            startAngle: 180,
                            endAngle: 0,
                            center: ['50%', '65%'],
                            radius: screenWidth.value > 900 ? '70%' : '60%',
                            min: 0,
                            max: 1,
                            splitNumber: 8,
                            axisLine: {
                                lineStyle: {
                                    width: 6,
                                    color: [
                                        [0.2, '#FA2256'],
                                        [0.4, '#E8839B'],
                                        [0.6, '#3F3F3F'],
                                        [0.8, '#8EF3B7'],
                                        [1, '#00FF66']
                                    ]
                                }
                            },
                            axisTick: {            // 坐标轴小标记
                                show: false
                            },
                            splitLine: {           // 分隔线
                                show: false
                            },
                            axisLabel: {           // 坐标轴文本标签
                                show: false,
                            },
                            axisLabel: {
                                color: '#FFFFFF',
                                fontSize: 13,
                                distance: -50,
                                rotate: 'tangential',
                                formatter: function (value) {
                                    if (value === 0.125) {
                                        return t('StrongSell');
                                    } else if (value ===0.25) {
                                        return t('Sell');
                                    } else if (value === 0.5) {
                                        return t('Neutral');
                                    } else if (value === 0.75) {
                                        return t('Buy');
                                    }else if (value === 0.875) {
                                        return t('StrongBuy');
                                    }
                                    return '';
                                }
                            },
                            title: {
                                color: '#FFFFFF',
                                offsetCenter: [0, '35%'],
                                fontSize: 14,
                            },
                            detail: {
                                show: false,
                            },
                            data: data.value
                            }
                        ]
                    };
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
        watch(() => props.data,(val)=>{
            data.value = val
            initChart()
        })
    })
    return {
        chartContainer,
        data
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