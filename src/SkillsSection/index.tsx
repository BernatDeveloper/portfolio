import { useTranslation } from "react-i18next"
import { SectionTitle } from "../utils/SectionTitle/SectionTitle"
import { SkillSection } from "./SkillSection"

export const SkillSectionComp = () => {
  const { t } = useTranslation()

  return (
    <>
        <SectionTitle
          ghost={t('sections.skills.title')}
          eyebrow={t('sections.skills.eyebrow')}
          title={t('sections.skills.title')}
          align="center"
        />
        <SkillSection />
    </>
  )
}