import { App, PageOptions, PluginFunction } from "vuepress";
import { getDirname, path } from "@vuepress/utils";

const __dirname = getDirname(import.meta.url);

interface RibbonOptions {
  zIndex?: number;
  alpha?: number;
  size?: number;
}

enum VuepressPluginBgType {
  /**
   * 几何图形
   */
  Figure,
  /**
   * 彩虹飘带
   */
  Ribbon,
}

interface BackgroundOptions {
  type: VuepressPluginBgType;
  ribbonOption?: RibbonOptions;
}

const backgroundPlugin = (options?: BackgroundOptions): PluginFunction => {
  return (app) => {
    return {
      name: "vuepress-plugin-bg",
      define: {
        backgroundOptions: options,
      },
      multiple: false,
      clientConfigFile: path.resolve(__dirname, "./ribbon-client-config.ts"),
    };
  };
};
export {
  backgroundPlugin,
  BackgroundOptions,
  VuepressPluginBgType,
  RibbonOptions,
};
