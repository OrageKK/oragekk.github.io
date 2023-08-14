interface RibbonOptions {
  zIndex?: number;
  alpha?: number;
  size?: number;
}

enum CanvasPluginType {
  /**
   * 几何图形
   */
  Figure = "figure",
  /**
   * 彩虹飘带
   */
  Ribbon = "ribbon",
}

interface BackgroundOptions {
  type: CanvasPluginType;
  ribbonOption?: RibbonOptions;
}

export { CanvasPluginType };
export type { BackgroundOptions, RibbonOptions };
