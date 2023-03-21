import Components from "unplugin-vue-components/webpack"
import path from "path"

const NutUIResolver = () => {
  return (name) => {
    if (name.startsWith("Nut")) {
      const partialName = name.slice(3)
      return {
        name: partialName,
        from: "@nutui/nutui-taro",
        sideEffects: `@nutui/nutui-taro/dist/packages/${partialName.toLowerCase()}/style`
      }
    }
  }
}

const config = {
  projectName: "mini",
  date: "2023-3-21",
  designWidth (input) {
    if (input?.file?.replace(/\\+/g, "/").indexOf("@nutui") > -1) {
      return 375
    }
    return 750
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: "src",
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [
    "@tarojs/plugin-html"
  ],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  alias: {
    "@/store": path.resolve(__dirname, "..", "src/store"),
    "@/components": path.resolve(__dirname, "..", "src/components"),
    "@/utils": path.resolve(__dirname, "..", "src/utils"),
    "@/assets": path.resolve(__dirname, "..", "src/assets"),
    "@/api": path.resolve(__dirname, "..", "src/api")
  },
  terser: {
    enable: true,
    config: {

    }
  },
  esbuild: {
    minify: {
      enable: true,
      config: {
        // 配置项同 https://github.com/privatenumber/esbuild-loader#minifyplugin
        target: "es5", // target 默认值为 es5
      },
    },
  },
  framework: "vue3",
  compiler: {
    type: "webpack5",
    prebundle: { enable: false }
  },
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  sass:{
    resource: [
      "src/styles/custom_theme.scss"
    ],
    projectDirectory: path.resolve(__dirname, ".."),
    data: "@import \"@nutui/nutui-taro/dist/styles/variables.scss\";",
  },
  mini: {
    webpackChain(chain) {
      chain.plugin("unplugin-vue-components").use(Components({
        resolvers: [ NutUIResolver() ]
      }))
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          onePxTransform: true,
          unitPrecision: 5,
          propList: [ "*" ],
          // selectorBlackList: [ "nut-" ],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  },
  h5: {
    webpackChain(chain) {
      chain.plugin("unplugin-vue-components").use(Components({
        resolvers: [ NutUIResolver() ]
      }))
    },
    publicPath: "/",
    staticDirectory: "static",
    esnextModules: [ "nutui-taro", "icons-vue-taro" ],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"))
  }
  return merge({}, config, require("./prod"))
}
