import { App, PageOptions, PluginFunction } from "vuepress";
import { getDirname, path } from "vuepress/utils";
import { PopperOption } from "./type";

const __dirname = getDirname(import.meta.url);

const popperPlugin = (options?: PopperOption): PluginFunction => {
  return (app) => {
    return {
      name: "vuepress-plugin-popper",
      define: {
        popperOptions: options,
      },
      multiple: false,
      clientConfigFile: path.resolve(
        __dirname,
        "./client/popper-client-config.ts"
      ),
    };
  };
};
export { popperPlugin };
