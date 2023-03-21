<template>
  <view class="index-wrapper">
    这是首页
  </view>
</template>

<script setup>
import { reactive } from "vue"
import { Dongdong } from "@nutui/icons-vue-taro"
import { useDemoStore } from "@/store/modules/demo"
import { storeToRefs } from "pinia"

const { count } = storeToRefs(useDemoStore())

const { increment } = useDemoStore()

const state = reactive({
  msg: "欢迎使用 NutUI4.0 开发小程序",
  msg2: "你成功了～",
  type: "text",
  show: false,
  cover: false,
  text: "这里是input的内容"
})

const handleClick = (type, msg, cover = false) => {
  state.show = true
  state.msg2 = msg
  state.type = type
  state.cover = cover
}

</script>
<script>
export default {
  name: "Index"
}
</script>

<style lang="scss">
.index {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.test {
  color: var(--primary-color);
}
</style>
