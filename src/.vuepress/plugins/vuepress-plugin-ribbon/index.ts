import { App, PageOptions, PluginFunction } from "vuepress";
import { getDirname, path } from "@vuepress/utils";

const __dirname = getDirname(import.meta.url);

interface RibbonOptions {
  zIndex?: number;
  alpha?: number;
  size?: number;
}

const ribbonPlugin = (options?: RibbonOptions): PluginFunction => {
  return (app) => {
    return {
      name: "vuepress-plugin-ribbon",
      define: {
        ribbonOptions: options,
      },
      multiple: false,
      clientConfigFile: path.resolve(__dirname, "./ribbon-client-config.ts"),
    };
  };
};
export { ribbonPlugin, RibbonOptions };
