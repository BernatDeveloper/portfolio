import { SectionTitle } from "../utils/SectionTitle/SectionTitle"
import { ProjectsSection } from "./ProjectsSection"

export const ProjectsSectionComp = () => {
  return (
    <>
      <SectionTitle ghost="Projects" eyebrow="Selected work" title="Projects" align="center" />
      <ProjectsSection />
    </>
  )
}
