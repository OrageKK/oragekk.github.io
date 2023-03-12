import { defineClientConfig, usePageData, useSiteData } from "@vuepress/client";
import { DenaroMoefyCanvas } from "../client/components/DenaroMoefyCanvas";

export default defineClientConfig({
  rootComponents: window.screen.availWidth < 719 ? [] : [DenaroMoefyCanvas],
});
