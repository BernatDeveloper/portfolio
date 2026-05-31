import { forwardRef } from 'react'

interface Props {
  nameRef: React.RefObject<HTMLDivElement | null>
  catRef:  React.RefObject<HTMLDivElement | null>
}

export const SkillTooltip = forwardRef<HTMLDivElement, Props>(
  ({ nameRef, catRef }, ref) => (
    <div className="sn-sw-tt" ref={ref}>
      <div className="sn-tt-in">
        <div className="sn-tt-name" ref={nameRef} />
        <div className="sn-tt-cat"  ref={catRef}  />
      </div>
    </div>
  ),
)

SkillTooltip.displayName = 'SkillTooltip'
