<template>
  <div class="text">
    <div class="list" v-for="(item,index) in report" :key="index">
        <div class="title"><div class="color"></div>{{ index }}:</div>
        <template v-if="(typeof item != 'object')">
            <div class="cont">{{ item }}</div>
        </template>
        <template v-else>
            <div class="slist" v-for="(m,n) in item" :key="n">
                <div class="stitle">{{ n }}:</div>
                <div class="scont">{{ m }}</div>
            </div>
        </template>
    </div>
    <div class="Disclaimer">
        <div class="t">{{ $t('Disclaimer') }}</div>
        <div class="c">
            {{ $t('DisclaimerText') }}
        </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'

export default {
  name: '',
  props:{
    report:{
        type: Object,
        default: null
    }
  },
  setup(props) {
    const report = ref(props.report)
    return {
        report
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
.text{
    width: 100%;
    background: #1C1E1F;
    border-radius: 0.37rem;
    padding: 0.4rem;
    font-size: 014px;
    .color{
        width: 8px;
        height: 8px;
        border-radius: 3px;
        background: #00FF66;
        margin-right: 4px;
    }
    .title{
        font-size: .296rem;
        font-weight: bold;
        margin-top: .5rem;
        color:#00FF66;
        display: flex;
        align-items: center;
    }
    .cont{
        margin-top: .3rem;
        text-indent: 2em;
    }
    .slist{
        padding-left: 2em;
        .stitle{
            font-size: 14px;
            margin-top: .4rem;
            color: #FF8A00;
        }
        .scont{
            font-size: 12px;
            text-indent: 2em;
            margin-top: .2rem;
        }
    }
}
.Disclaimer{
    color: #727272;
    margin-top: .5rem;
    font-size: 12px;
    .c{
        margin-top: .1rem;
    }
}
</style>