import Taro from "@tarojs/taro"
import { baseApi, code } from "./config"
import { formatLoginRoute } from "./format"
import { useCommonStore } from "@/store/modules/common"

const commonStore = useCommonStore()

function toastMsg(code, msg) {
 if (code === 999 || (code >= 500 && code < 600)) {
   return "活动太火爆, 请稍后重试"
 }
 return msg
}

export const request = {
  get(url, data = {}, config ={}) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: baseApi + url,
        method: "GET",
        ...config,
        header: {

        },
        data,
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  post(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: baseApi + url,
        method: "POST",
        ...config,
        header: {
          Authorization: Taro.getStorageSync("token")
            ? `Bearer ${Taro.getStorageSync("token")}`
            : ""
        },
        data,
        success(res) {
          const errorCodeList = [ 991, 992, 993, 995 ]
          const resCode = res.data.code
          if (errorCodeList.findIndex(errCode => errCode === resCode) > -1) {
            Taro.hideLoading()
            Taro.removeStorageSync("token")
            // NOTE 存储当前路径 以待登录后跳转
            if (commonStore.loginRoute.startsWith("/subPackagesUtils/pages/login/index")) {
              return false
            } else {
              formatLoginRoute()
              Taro.redirectTo({
                url: "/subPackagesUtils/pages/login/index"
              })
              return false
            }
          }
          if (resCode !== code && resCode !== 10403 && resCode !== 11301) {
            // NOTE 由于loading和toast不能同时显示 此处的toast添加个延时
            const timer = setTimeout(() => {
              Taro.showToast({
                icon: "none",
                duration: 3000,
                title: toastMsg(resCode, res.data.msg)
              }).then(() => {
                clearTimeout(timer)
              })
            }, 100)
          }
          resolve(res.data)
        },
        fail (err) {
          Taro.hideLoading()
          reject(err)
        }
      })
    })
  }
}
