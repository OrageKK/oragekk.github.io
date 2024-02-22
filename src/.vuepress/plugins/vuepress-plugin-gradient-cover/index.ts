import { App, PageOptions, PluginFunction } from "vuepress";
import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);

interface GradientCoverOptions {
  zIndex?: number;
  alpha?: number;
  size?: number;
}

const gradientCoverPlugin = (
  options?: GradientCoverOptions
): PluginFunction => {
  return (app) => {
    return {
      name: "vuepress-plugin-gradient-cover",
      define: {
        coverOptions: options,
      },
      multiple: false,
      clientConfigFile: path.resolve(
        __dirname,
        "./client/cover-client-config.ts"
      ),
    };
  };
};
export { gradientCoverPlugin };
export type { GradientCoverOptions };
