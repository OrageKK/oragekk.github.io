import { App, PageOptions, PluginFunction } from "vuepress";
import { getDirname, path } from "vuepress/utils";
import { BackgroundOptions,CanvasPluginType } from "./type";

const __dirname = getDirname(import.meta.url);

const canvasPlugin = (options?: BackgroundOptions): PluginFunction => {
  return (app) => {
    return {
      name: "vuepress-plugin-canvas",
      define: {
        backgroundOptions: options,
      },
      multiple: false,
      clientConfigFile: path.resolve(__dirname, "./client/canvas-client-config.ts"),
    };
  };
};
export { canvasPlugin, CanvasPluginType, };
