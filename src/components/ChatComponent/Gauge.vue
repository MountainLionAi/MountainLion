<template>
      <div ref="chartContainer" style="width: 100%; height: 3.5rem" />
</template>

<script>
import { ref, shallowRef, computed,onMounted } from 'vue';
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
    const data = props.data
    onMounted(() => {
        const initChart = () => {
                    chart.value = echarts.init(chartContainer.value);
                    const option = {
                        tooltip : {
                            formatter: "{a} <br/>{b} : {c}%"
                        },
                        series: [
                            {
                                type: 'gauge',
                                startAngle: 180,
                                endAngle: 0,
                                center: ['50%', '65%'],    // 默认全局居中
                                radius: 60,
                                axisLine: {
                                    lineStyle: {
                                        // 这里的0.5代表50%，也就是说，从0%到50%的区间颜色是红色，从50%到100%的区间颜色是绿色
                                        color: data.color,
                                        width: 10
                                    }
                                },
                                title: {
                                    color: '#ffffff',
                                    show: true,
                                    offsetCenter: [0, '30%'], // 调整位置，根据需求进行微调
                                    fontSize: 14,  // 调整字体大小
                                },
                                pointer: { // 这里隐藏指针
                                    show: false
                                },
                                axisTick: {            // 坐标轴小标记
                                    show: false
                                },
                                splitLine: {           // 分隔线
                                    show: false
                                },
                                axisLabel: {           // 坐标轴文本标签
                                    show: false,
                                    color: '#ffffff',
                                    fontSize: 13,
                                },
                                detail: {
                                    fontSize: 20,
                                    color: '#ffffff',
                                    formatter:'{value}%',
                                    offsetCenter: [0, '-10%'], 
                                },
                                data: [{value: data.data[0].value, name: t(data.data[0].name)}]
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

</style>