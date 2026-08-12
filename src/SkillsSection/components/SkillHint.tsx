import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

export const SkillHint = forwardRef<HTMLSpanElement>((_, ref) => {
  const { t } = useTranslation()

  return (
    <div className="sn-sw-head">
      <span className="sn-sw-hint" ref={ref}>{t('skills.hint')}</span>
    </div>
  )
})

SkillHint.displayName = 'SkillHint'
