import { App, PageOptions, PluginFunction } from "vuepress";
import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)
export interface Live2DAssistOptions {
  subPageHidden: boolean;
}
const live2DAssistPlugin = (options?: Live2DAssistOptions): PluginFunction => {
  return (app) => {
    return {
      name: "vuepress-plugin-live2d-assist",
      define: {
        omlOptions: options,
      },
      multiple: false,
      clientConfigFile:path.resolve(__dirname, './live2d-assist-client-config.ts'),
    };
  };
};
export { live2DAssistPlugin };
