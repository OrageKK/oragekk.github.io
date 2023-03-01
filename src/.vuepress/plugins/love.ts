import { App, PageOptions, PluginFunction } from "vuepress";
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)
export interface Options {
  a: string;
}
const lovePlugin = (options?: Options): PluginFunction => {
  return (app) => {
    return {
      name: "vuepress-plugin-love",
      define: {
        omlOptions: options,
      },
      multiple: false,
      clientConfigFile:path.resolve(__dirname, './clientConfig.ts'),
    };
  };
};
export { lovePlugin };
