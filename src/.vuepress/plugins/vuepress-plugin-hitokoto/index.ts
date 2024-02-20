import { App, PageOptions, PluginFunction } from "vuepress";
import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);
interface HitokotoOption {}
const hitokotoPlugin = (options?: HitokotoOption): PluginFunction => {
  return (app) => {
    return {
      name: "vuepress-plugin-hitokoto",
      define: {
        hitokotoOptions: options,
      },
      multiple: false,
      clientConfigFile: path.resolve(
        __dirname,
        "./client/hitokoto-client-config.ts"
      ),
    };
  };
};
export { hitokotoPlugin };
export type { HitokotoOption };
