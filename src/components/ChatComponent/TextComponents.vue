<template>
  <div>
    <div class="text" ref="text">{{ displayText }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      displayText: "",
      intervalId: null,
      stopStatus: false
    };
  },
  props:['text'],
  mounted() {
    this.startDisplayText();
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    stop(){
        this.stopStatus = true
    },
    startDisplayText() {
      this.intervalId = setInterval(() => {
        if (this.index < this.text.length && !this.stopStatus) {
          this.displayText += this.text.charAt(this.index);
          this.index++;
        } else {
          clearInterval(this.intervalId);
          this.$emit('onComplete',this.displayText)
        }
      }, 30);
    }
  }
};
</script>

<style lang="scss" scoped>
.text{
    font-size: 12px;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
}
</style>