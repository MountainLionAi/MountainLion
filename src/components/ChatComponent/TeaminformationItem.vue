<template>
  <div class="item">
    <div class="top">
      <el-image  class="profile_image" :src="item.profile_image" fit="cover">
        <template #error>
          <div class="image-slot">
            <svg t="1692870826790" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9906"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#EFEFEF" p-id="9907"></path><path d="M186.026667 843.264c0 7.253333 6.101333 13.184 13.610666 13.184h624.341334a13.397333 13.397333 0 0 0 13.568-13.226667v-15.701333c0.298667-4.736 0.938667-28.416-14.677334-54.613333a128.512 128.512 0 0 0-42.453333-42.368c-22.186667-14.08-50.389333-24.234667-84.48-30.378667-0.298667 0-25.6-3.413333-51.498667-10.026667-45.141333-11.52-49.066667-21.717333-49.109333-21.802666a12.970667 12.970667 0 0 0-1.152-2.901334c-0.384-1.92-1.28-9.088 0.426667-28.245333 4.48-48.768 30.592-77.568 51.626666-100.693333 6.613333-7.338667 12.885333-14.208 17.706667-20.992a132.352 132.352 0 0 0 22.784-64.384 34.304 34.304 0 0 0-1.493333-10.752c-2.048-6.4-5.888-10.325333-8.661334-13.226667a49.237333 49.237333 0 0 1-1.962666-2.048c-0.213333-0.256-0.768-0.853333-0.256-4.181333 1.834667-12.074667 2.986667-22.186667 3.498666-31.829334 0.938667-17.194667 1.706667-42.88-2.773333-67.882666a103.168 103.168 0 0 0-2.944-14.165334 111.274667 111.274667 0 0 0-22.613333-44.074666c-1.834667-1.962667-45.525333-48-172.373334-57.429334a412.885333 412.885333 0 0 0-51.925333 0.256 75.264 75.264 0 0 0-15.018667 1.877334c-13.098667 3.370667-16.597333 11.690667-17.493333 16.298666-1.536 7.68 1.152 13.696 2.901333 17.664 0.256 0.554667 0.554667 1.28 0 3.114667a59.648 59.648 0 0 1-12.288 12.586667c-1.365333 1.152-33.152 28.586667-34.901333 64.426666-4.693333 27.221333-4.352 69.674667 1.194667 98.986667 0.341333 1.664 0.853333 4.053333 0 5.674667-5.973333 5.376-12.757333 11.477333-12.757334 25.386666 0.085333 1.365333 2.005333 34.56 22.826667 63.701334 4.778667 6.784 11.050667 13.653333 17.664 20.949333 21.034667 23.168 47.189333 51.968 51.626667 100.693333 1.706667 19.2 0.853333 26.368 0.426666 28.288a13.013333 13.013333 0 0 0-1.109333 2.901334c-0.042667 0.085333-3.968 10.24-48.896 21.76-25.941333 6.656-51.456 10.026667-52.224 10.154666-33.152 5.546667-61.184 15.530667-83.328 29.482667-18.261333 11.52-32.554667 25.813333-42.538667 42.453333a102.741333 102.741333 0 0 0-15.232 55.210667v15.872z" fill="#AAAAAA" p-id="9908"></path></svg>
          </div>
        </template>
      </el-image>
      <div class="info">
        <div class="name">{{ item.name }}</div>
        <div class="position">{{ item.position }}</div>
      </div>
    </div>
    <div class="bottom">
      <img src="/@/assets/imgs/tw.svg" v-if="item.twitter_link != ''" @click="goPage(item.twitter_link)" alt="">
      <img src="/@/assets/imgs/in.svg" v-if="item.linkedin_link != ''" @click="goPage(item.linkedin_link)" alt="">
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'

export default {
  name: '',
  props: {
    item: {
      type:Object,
      default: null
    }
  },
  setup(props) {
    const item = ref( props.item)
    const goPage = (url) => {
      if(url == '') return 
      window.open(url)
    }
    return {
      item,
      goPage
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
.item{
  margin-left: .5rem;
  margin-top: .4rem;
  width: 5rem;
  background: #1C1E1F;
  border-radius: .37rem;
  padding: .3rem;
  display: flex;
  flex-direction: column;
  &:hover{
      box-shadow: 0 2px 12px 0 rgba(255,255,255,.1);
    }
    .top{
      flex: 1;
      .profile_image,.icon{
        width: 1rem;
        height: 1rem;
        border-radius: 1rem;
      }
      display: flex;
      .info{
        flex: 1;
        width: 0;
        padding-left: .2rem;
        padding-top: .1rem;
        .name{
          font-size: 14px;
          font-family: Inter-Medium, Inter;
          font-weight: 500;
          color: #FFFFFF;
        }
        .position{
          font-size: 14px;
          font-family: Inter-Medium, Inter;
          font-weight: 500;
          color: #777777;
          margin-top: .1rem;
        }
      }
    }
    .bottom{
      text-align: right;
      img{
        width: .4rem;
        height: .4rem;
        cursor: pointer;
        margin-right: .3rem;
      }
    }
}
</style>