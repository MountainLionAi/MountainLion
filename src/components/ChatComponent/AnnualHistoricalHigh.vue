<!-- 年度历史高点） -->
<template>
  <div class="AnnualHistoricalHigh">
    <div class="info">
        <img :src="presetData.coinImageUrl" alt="">
        {{ $t('AnnualHistoricalHigh',{coin: presetData.coinName}) }} ($)
    </div>
    <div class="table" :class="screenWidth > 900 ? '' : 'mb'">
        <div class="table-content" >
            <div class="c">
                <div class="list" v-for="(item,index) in showList" :key="index">
                    <div class="item th">{{ item.year }}</div>
                    <div v-for="(m,n) in item.listData" class="item td" :key="n" :class="m.isBig ? 'active' : ''">
                    {{ m.number }}
                    </div>
                </div>
                <div class="list month">
                    <div class="item th"></div>
                    <div class="item ">1</div>
                    <div class="item ">2</div>
                    <div class="item ">3</div>
                    <div class="item ">4</div>
                    <div class="item ">5</div>
                    <div class="item ">6</div>
                    <div class="item ">7</div>
                    <div class="item ">8</div>
                    <div class="item ">9</div>
                    <div class="item ">10</div>
                    <div class="item ">11</div>
                    <div class="item ">12</div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch ,onMounted} from 'vue';
import { useStore} from 'vuex'

export default {
  name: 'AnnualHistoricalHigh',
  props:{
    presetData:{
            type: Object,
            default: null
        },
    },
  setup(props) {
    const showList = ref([])
    const presetData = ref(props.presetData)
    const store = useStore()
    //适配
    const screenWidth = computed( () => {
        return store.state.screenWidth
    })
    onMounted( () => {
        // let dataList = presetData.value.his_high_mon
        // dataList.reverse()
        // const findMaxNumber = (data) => {
        //     const maxNumber = Math.max(...data);
        //     const formattedData = data.map(number => ({
        //         number: number != 0 ? number.toFixed(2) : 0,
        //         isBig: number === maxNumber
        //     }));

        //     return formattedData;
        // };
        // const getPastMonthsData = (data) => {
        //     const today = new Date();
        //     const pastMonths = [];

        //     for (let i = 0; i < data.length; i++) {
        //         const year = today.getFullYear();
        //         const month = today.getMonth() + 1;

        //         if (!pastMonths.find(item => item.year === year)) {
        //         pastMonths.push({ year, data: Array(12).fill(0) });
        //         }

        //         const monthData = pastMonths.find(item => item.year === year);
        //         monthData.data[12 - month] = data[i];
        //         today.setMonth(today.getMonth() - 1);
        //     }
        //     pastMonths.forEach( item => {
        //         item.data = findMaxNumber(item.data)
        //         item.data.reverse()
        //     })
        //     return pastMonths;
        // };
        const findMaxNumber = (data) => {
            const maxNumber = Math.max(...data);
            const formattedData = data.map(number => ({
                number: number != 0 ? number.toFixed(6) - 0 : 0,
                isBig: number === maxNumber
            }));

            return formattedData;
        };
        let dataList = presetData.value.historyHighPrice.his_high_mon
        dataList.forEach(item => {
            item.listData = findMaxNumber(item.list)
        });
        if (dataList[0].listData.length != 12) {
            let difference = 12 - dataList[0].listData.length;
            for (let i = 0; i < difference; i++) {
                dataList[0].listData.push({
                    number: '',
                    isBig: false
                });
            }
        }
        if (dataList[dataList.length - 1].listData.length != 12) {
            let difference = 12 - dataList[0].listData.length;
            for (let i = 0; i < difference; i++) {
                dataList[dataList.length - 1].listData.unshift({
                    number: '',
                    isBig: false
                });
            }
        }
       
        const pastMonthsData = dataList;
        showList.value = pastMonthsData
    })
    return {
        presetData,
        showList
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
.AnnualHistoricalHigh{
    width: 100%;
    background: #1C1E1F;
    border-radius: .37rem;
    padding: 0.25rem 0.4rem;
    overflow: hidden;
    overflow-x: auto;
    .info{
        font-size: 14px;
        display: flex;
        align-items: center;
        img{
            width: .51rem;
            margin-right: .2rem;
        }
    }
    .table{
        width: 100%;
        margin-top: .4rem;
        position: relative;
        height: 6rem;
        .table-content{
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            z-index: 1000;
            .c{
                width: 100%;
                min-width: 1000px;
            }
        }
        .list{
            display: flex;
            margin: .2rem 0;
            position: relative;
            &:not(:last-child)::after{
                position: absolute;
                left: 0;
                bottom: -.1rem;
                content: '';
                width: 100%;
                height: 2px;
                border-bottom: 1px dotted #777777;
            }
            .item{
                flex: 1;
                padding: .2rem 0;
                font-size: 12px;
                text-align: center;
                &.td{
                    background: #161819;
                    margin: 0 2px;
                    &.active{
                        background: #00FF66;
                        color: #000000;
                    }
                }
                &th{

                }
            }
        }
    }
}
</style>