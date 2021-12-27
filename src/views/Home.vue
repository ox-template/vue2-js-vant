<template>
  <div class="home">
    <div class="header">
      <img src="https://cn.vuejs.org/images/logo.svg">
      <div>Project Name</div>
    </div>
    <div>
      <van-grid>
        <van-grid-item icon="photo-o" text="login" @click="onLogin()" />
        <van-grid-item icon="photo-o" text="获取数据" @click="getData()" />
        <van-grid-item icon="photo-o" text="节流" @click="onThrottle()" />
        <van-grid-item icon="photo-o" text="防抖" @click="onDebounce" />
        <van-grid-item icon="photo-o" :text="'num:'+text.a" @click="countPlus" />
        <van-grid-item icon="photo-o" :text="'textArr:'+textArray[0].a" @click="countPlusArr" />
        <van-grid-item icon="photo-o" :text="'num:'+num" @click="countPlusNum" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
      <van-button @click="test">change</van-button>
    </div>
  </div>
</template>

<script>
import { login, getData } from 'api/modules/apiModule'
import { throttle, deBounce } from 'utils/tools'
export default {
  data () {
    return {
      deep: [{ a: 1, b: 2 }],
      num: 1,
      text: { a: 1 },
      textArray: [{ a: 1 }],
      textArrayString: ''
    }
  },
  watch: {
    textArray: {
      deep: true,
      handler: (value) => { console.log('textArray changed') }
    },
    text (value) {
      console.log(value)
    },
    num (value) {
      console.log(value)
    },
    textArrayString (value) {
      console.log('textArrayString changed')
    }
  },
  mounted () {
    this.textArrayString = JSON.stringify(this.textArray)
  },
  methods: {
    async onLogin () {
      const params = {
        email: 'ljdhxd@qq.com',
        password: 'Lj416720'
      }
      const res = await login(params).catch(e => { console.log('featch') })
      console.log(res)
    },
    async getData () {
      const res = await getData()
      console.log(res)
    },
    onThrottle () {
      throttle(() => { this.$toast({ message: 'handle', duration: 200 }) })
    },
    onDebounce () {
      deBounce(() => { this.$toast({ message: 'handle' }) })
    },
    countPlus () {
      this.text.a = this.text.a + 1
    },
    countPlusArr () {
      console.log(this.textArrayString)
      this.textArray[0].a = this.textArray[0].a + 1
    },
    countPlusNum () {
      this.num++
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
