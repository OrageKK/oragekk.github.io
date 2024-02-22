import type { CanvasOptions } from "@moefy-canvas/core";
import type { VNode } from "vue";
import { defineComponent, h, onBeforeUnmount, onMounted } from "vue";
import { PopperOption } from "../../type";
import { Popper, PopperConfig, PopperShape } from "@moefy-canvas/theme-popper";
declare const popperOptions: PopperOption;
const MAX_Z_INDEX = 2147483647;
export const DenaroMoefyCanvas = defineComponent({
  name: "DenaroMoefyCanvas",
  setup() {
    let moefyCanvas: Popper | null = null;
    const id = "moefy-canvas";
    const getCanvas = (): HTMLCanvasElement => {
      const canvas: HTMLCanvasElement = document.getElementById(
        id
      ) as HTMLCanvasElement;

      return canvas;
    };
    const themeConfig: PopperConfig = {
      shape: popperOptions.config.shape
        ? popperOptions.config.shape
        : PopperShape.Star,
      size: popperOptions.config.size ? popperOptions.config.size : 1.75,
      numParticles: popperOptions.config.numParticles
        ? popperOptions.config.numParticles
        : 10,
    };
    const canvasOptions: CanvasOptions = {
      opacity: 1,
      zIndex: MAX_Z_INDEX,
    };
    onMounted(() => {
      if (window.screen.availWidth < 719) {
        //移动端
        return;
      }
      moefyCanvas = new Popper(themeConfig, canvasOptions);
      moefyCanvas && moefyCanvas.mount(getCanvas());
    });

    onBeforeUnmount(() => {
      moefyCanvas && moefyCanvas.unmount();
    });

    return (): VNode =>
      !__VUEPRESS_SSR__ && window.screen.availWidth > 719 ? h("div", { class: id }, h("canvas", { id })) : h("");
  },
});
