import { useCallback, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { HeroSection } from '../HeroSection/HeroSection';
import ExperienceTimeline from '../ExperienceTimeline/ExperienceTimeline';
import { useEmberCursor } from '../hooks/useEmberCursor';
import { useLenis } from '../hooks/useLenis';

export function AppLayout() {

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [loaderGone, setLoaderGone] = useState(false);
  
  useEmberCursor();
  useLenis();

  const handleProgress = useCallback((pct: number) => {
    setLoadProgress(pct);
  }, []);

  const handleLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleExitStart = useCallback(() => {
    setHeroVisible(true);
  }, []);

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
  );
}