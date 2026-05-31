import { forwardRef } from 'react'

export const SkillHint = forwardRef<HTMLSpanElement>((_, ref) => (
  <div className="sn-sw-head">
    <span className="sn-sw-hint" ref={ref}>— hover a node —</span>
  </div>
))

SkillHint.displayName = 'SkillHint'
