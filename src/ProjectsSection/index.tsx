import { useTranslation } from "react-i18next"
import { SectionTitle } from "../utils/SectionTitle/SectionTitle"
import { ProjectsSection } from "./ProjectsSection"

export const ProjectsSectionComp = () => {
  const { t } = useTranslation()

  return (
    <>
      <SectionTitle
        ghost={t('sections.projects.title')}
        eyebrow={t('sections.projects.eyebrow')}
        title={t('sections.projects.title')}
        align="center"
      />
      <ProjectsSection />
    </>
  )
}
