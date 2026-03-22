export interface OptionsEmberCursor{
  size?: number;           // tamaño base de la brasa (px)
  glowColor?: string;      // color del glow
  coreColor?: string;      // color del centro
  intensityZones?: number; // cuánto varía la intensidad según posición Y (0 = nada)
}

export interface Project {
  title: string;
  description: string;
  img: string;
  url: string;
}

export interface Ember {
  id: number;
  left: string;
  size: number;
  dur: number;
  delay: number;
  x1: number;
  x2: number;
}

export interface Options {
  pullStrength?: number;
  smoothing?: number;
  sizeInfluence?: number;
}

export interface Ripple {
  id: number;
  rd: string;
  rdelay: string;
}