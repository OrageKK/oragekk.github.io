import { defineClientConfig, usePageData, useSiteData } from "vuepress/client";
import {DenaroMoefyCanvas} from "../client/components/DenaroMoefyCanvas"


export default defineClientConfig({
  rootComponents: [DenaroMoefyCanvas],
});
