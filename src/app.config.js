export default defineAppConfig({
  pages: [
    "pages/index/index"
  ],
  subpackages: [
    {
      root: "",
      pages: [

      ]
    }
  ],
  tabBar: {
    color: "#999",
    selectedColor: "#ffbd27",
    backgroundColor: "#fff",
    borderStyle: "white",
    list: [

    ]
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",

  },
  style: "v2",
  lazyCodeLoading: "requiredComponents",
  networkTimeout: {
    request: 60000,
    connectSocket: 60000,
    uploadFile: 60000,
    downloadFile: 60000
  },
  permission: {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示"
    }
  }
})
