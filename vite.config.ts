import { defineConfig, loadEnv } from "vite";
import type { ConfigEnv } from "vite";
import path, { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@com": resolve(__dirname, "src/components"),
        "@assets": resolve(__dirname, "src/assets"),
      },
      extensions: [".js", ".json", ".ts"], // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    build: {
      target: "esnext", //浏览器兼容
      assetsInlineLimit: 10240, //10k文件转base64
    },
    server: {
      port: 9789,
      https: false,
      proxy: {
        // 使用 proxy 实例
        [env.VITE_BASE_API]: {
          // target: env.VITE_BASE_URL,
          target: "http://39.96.53.44:80/",
          changeOrigin: true,
          ws: true,
          rewrite: (path) =>
            path.replace(new RegExp(env.VITE_BASE_API, "g"), ""),
        },
      },
    },
    base: env.VITE_ROUTER_NAME,
    plugins: [
      vue({
        // 默认开启响应性语法糖
        reactivityTransform: true,
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icon")],
        symbolId: "[name]",
      }),
      AutoImport({
        resolvers: [ElementPlusResolver({})],
        // 自定引入 Vue VueRouter API,如果还需要其他的可以自行引入
        imports: ["vue", "vue-router"],
        // 调整自动引入的文件位置
        dts: "src/type/auto-import.d.ts",
        // 解决自动引入eslint报错问题 需要在eslintrc的extend选项中引入
        eslintrc: {
          enabled: true,
          // 配置文件的位置
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true,
        },
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: "src/type/components.d.ts",
      }),
      createHtmlPlugin({
        minify: true,
        /**
         * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
         * @default src/main.ts
         */
        entry: "/src/main.ts",
        /**
         * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
         * @default index.html
         */
        template: "index.html",
        /**
         * 需要注入 index.html ejs 模版的数据
         */
        inject: {
          data: {
            title: env.VITE_TITLE,
            injectScript: `<script src="./inject.js"></script>`,
          },
          tags: [
            {
              injectTo: "body-prepend",
              tag: "div",
              attrs: {
                id: "app",
              },
            },
          ],
        },
      }),
      viteMockServe({
        mockPath: "mock", //  mock位置
        localEnabled: true, // 是否开启开发环境
        prodEnabled: false, // 是否开启生产环境
      }),
    ],
  };
});
