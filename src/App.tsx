import ExperienceTimeline from './ExperienceTimeline/ExperienceTimeline'
import { useEmberCursor } from './hooks/useEmberCursor'
import { useLenis } from './hooks/useLenis'
import { HeroSection } from './HeroSection/HeroSection'
import { useCallback, useState } from 'react';
import { Loader } from './Loader/Loader';


export function App() {

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded,     setIsLoaded]     = useState(false);
  const [heroVisible,  setHeroVisible]  = useState(false);
  const [loaderGone,   setLoaderGone]   = useState(false);

  useEmberCursor()
  useLenis()

  const handleProgress = useCallback((pct: number) => {
    setLoadProgress(pct);
  }, []);
 
  const handleLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);
 
  /** El Loader llama esto cuando su animación de salida EMPIEZA */
  const handleExitStart = useCallback(() => {
    // El hero empieza a entrar mientras el loader todavía está saliendo
    setHeroVisible(true);
  }, []);
 
  /** El Loader llama esto cuando su animación de salida TERMINA */
  const handleExitComplete = useCallback(() => {
    setLoaderGone(true);
  }, []);

  return (
    <>
    {!loaderGone && (
        <Loader
          progress={loadProgress}
          isComplete={isLoaded}
          onExitStart={handleExitStart}
          onExitComplete={handleExitComplete}
        />
      )}
      
      <HeroSection shouldAnimate={heroVisible} />
 
      <ExperienceTimeline
        onProgress={handleProgress}
        onLoaded={handleLoaded}
      />
    </>

  )
}