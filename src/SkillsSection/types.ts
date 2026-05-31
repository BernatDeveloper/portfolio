export type Category = 'frontend' | 'backend' | 'database' | 'tools'

export interface NodeData {
  id:  string
  n:   string
  x:   number
  y:   number
  r:   number
  cat: Category
}

export interface LayoutNode {
  id: string
  x:  number
  y:  number
  r:  number
}

export interface Layout {
  vbW:   number
  vbH:   number
  nodes: LayoutNode[]
}

export interface LineData {
  el:  SVGLineElement
  a:   string
  b:   string
  x1:  number
  y1:  number
  x2:  number
  y2:  number
  len: number
}

export interface NodeEls {
  g:   SVGGElement
  bg:  SVGCircleElement
  ir:  SVGCircleElement
  gl1: SVGCircleElement
  gl2: SVGCircleElement
  hr:  SVGCircleElement
  dot: SVGCircleElement
  lbl: SVGTextElement
}
