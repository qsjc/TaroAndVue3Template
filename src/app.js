import { createApp } from "vue"
import Taro from "@tarojs/taro"
import pinia from "@/store/index"
import "./styles/reset.scss"
import "./app.scss"

// Warn 这个行内转换似乎没生效啊
Taro.pxTransform({
  onePxTransform: true,
  unitPrecision: 5,
  propList: [ "*" ],
  selectorBlackList: [],
  replace: true,
  mediaQuery: false,
  minPixelValue: 0
})

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  onLaunch(options) {
    const updateManager = Taro.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })
  }
})

App.use(pinia)

export default App
