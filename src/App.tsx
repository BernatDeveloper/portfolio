import { useEmberCursor } from "./hooks/useEmberCursor";
import { IntroPreloader } from "./IntroPreloader/IntroPreloader"

export function App() {
  useEmberCursor();
  return (
    <>
      <IntroPreloader />
    </>
  )
}