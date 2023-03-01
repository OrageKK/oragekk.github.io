import {
    Popper,
    // PopperShape,
    // type PopperConfig,
    // MAX_Z_INDEX,
    // type CanvasOptions,
 } from '@moefy-canvas/theme-popper'
 
//  const themeConfig: PopperConfig = {
//     shape: PopperShape.Star,
//     size: 1.75,
//     numParticles: 10,
//  }
 
//  const canvasOptions: CanvasOptions = {
//     opacity: 1,
//     zIndex: MAX_Z_INDEX,
//  }
 
 const el = document.getElementById('moefy-canvas')
 const popper = new Popper()
 popper.mount(el as HTMLCanvasElement)