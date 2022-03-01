<template>
  <div class="home">
    <div class="header">
      <img src="https://cn.vuejs.org/images/logo.svg">
      <div>Project Name</div>
    </div>
    <div>
      <van-grid>
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
      <van-button @click="test">change</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    test () {

    }
  }

}
</script>
<style lang="less" scoped>
.header{
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img{
    width: 54px;
    margin-bottom: 12px;
  }
}
</style>
