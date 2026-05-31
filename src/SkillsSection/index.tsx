import { SectionTitle } from "../utils/SectionTitle/SectionTitle"
import { SkillSection } from "./SkillSection"

export const SkillSectionComp = () => {
  return (
    <>
        <SectionTitle ghost="Skills" eyebrow="What I work with" title="Skills" align="center"/>
        <SkillSection />
    </>
  )
}