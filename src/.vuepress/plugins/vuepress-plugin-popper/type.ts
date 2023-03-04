import type { CanvasOptions } from '@moefy-canvas/core'
import type {PopperConfig} from '@moefy-canvas/theme-popper'

export interface PopperOption {
   config:PopperConfig;
   canvasOptions?:CanvasOptions
}