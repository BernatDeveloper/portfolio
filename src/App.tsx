import ExperienceTimeline from "./ExperienceTimeline/ExperienceTimeline";
import { useEmberCursor } from "./hooks/useEmberCursor";
import { useLenis } from "./hooks/useLenis";
import { IntroPreloader } from "./IntroPreloader/IntroPreloader"

export function App() {
  useEmberCursor();
  useLenis()
  return (
    <>
      <IntroPreloader />
      <ExperienceTimeline />
    </>
  )
}