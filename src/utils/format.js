import Taro from "@tarojs/taro"
import { useCommonStore } from "@/store/modules/common"

const { setLoginRoute } = useCommonStore()

export function formatLoginRoute() {
  const pages = Taro.getCurrentPages()
  const currentPage = pages[pages.length - 1] // 获取当前页面的对象
  const currentRoute = currentPage.$taroPath.split("?")[0]
  const options = currentPage.$taroParams
  const optionsList = []
  for (const key in options) {
    if (key !== "$taroTimestamp") {
      optionsList.push(`${key}=${options[key]}`)
    }
  }
  const loginRoute = `/${currentRoute}?${optionsList.join("&")}`
	setLoginRoute(loginRoute)
}
