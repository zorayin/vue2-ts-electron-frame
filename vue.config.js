const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const fs = require("fs");
const WorkerPlugin = require("worker-plugin");
__webpack_public_path__ = path;
// 头部引入
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { options } = require("less");

function resolve(dir) {
  return path.join(__dirname, dir);
}

function addStyleResource(rule) {
  // console.log("rule", rule);
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, "./src/less/mixin.less"),
        path.resolve(__dirname, "./src/less/demins.less"),
        path.resolve(__dirname, "./src/themes/default.less")
      ]
    });
}

module.exports = defineConfig({
  transpileDependencies: true,
  // 基本路径
  publicPath: "./",
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,

  devServer: {
    host: "0.0.0.0",
    port: 2222,
    proxy: {
      "/api": {
        target: "http://192.168.11.247:8090",
        pathRewrite: { "^/api": "" },
        ws: true,
        changeOrigin: true
      },
    }
  },
  chainWebpack: (config) => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) => addStyleResource(config.module.rule("less").oneOf(type)));

    config.resolve.alias.set("@", resolve("src")).set("@imgs", resolve("src/assets/imgs"));

    // 减少图片转为base64格式
    config.module
      .rule("images")
      .test(/\.(jpg|png|gif)$/)
      .type('javascript/auto')
      .use("url-loader")
      .loader("url-loader")
      .tap(options => ({
        name: 'img/[name].[hash:8].[ext]',
        limit: 500,
        esModule: false,
    }))

     // 重写音频资源输出的目录
     const mediaRule = config.module.rule("media");
     mediaRule
       .use("url-loader")
       .loader("url-loader")
       .tap((options) => {
        if(options){
          options.fallback.options.name = "medias/[name].[hash:8].[ext]";
        }
         return options;
       });
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: "./src/electron/app/index.ts",
      // Use this to change the entry point of your app's render process. default src/[main|index].[js|ts]
      rendererProcessFile: "./src/main.ts",
      preload: "./src/electron/app/preload.ts",
      outputDir: "./src/electron/dist",
      // List native deps here if they don't work
      externals: ["lodash.zip", "clipboard", "ffi-napi"],
      // If you are using Yarn Workspaces, you may have multiple node_modules folders
      // List them all here so that VCP Electron Builder can find them
      nodeModulesPath: ["./node_modules"],
      nodeIntegration: true, // 系统默认不支持node，需要将node集成进来
      builderOptions: {
        appId: "",
        productName: "", //项目名，也是生成的安装文件名，即aDemo.exe
        win: {
          //win相关配置
          icon: "./public/favicon.ico", //图标，当前图标在根目录下，注意这里有两个坑
          target: [
            {
              target: "nsis", //利用nsis制作安装程序
              arch: [
                "x64" //64位
              ]
            }
          ]
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: "./public/favicon.ico", // 安装图标
          uninstallerIcon: "./public/favicon.ico", //卸载图标
          installerHeaderIcon: "./public/favicon.ico", // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: "Mtv" // 图标名称
        },
        linux: {
          desktop: {
            StartupNotify: "false",
            Encoding: "UTF-8",
            MimeType: "x-scheme-handler/deeplink"
          },
          target: ["rpm", "deb"]
        },
        deb: {
          priority: "optional",
          afterInstall: "installer/linux/after-install.tpl"
        }
      }
    }
  },
  configureWebpack: {
    devtool: "source-map",
    plugins: [new NodePolyfillPlugin(), new WorkerPlugin()]
  }
});
