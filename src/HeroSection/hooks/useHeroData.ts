import { useRef } from 'react';
import type { Ember, Ripple } from '../../types/index';

export function useHeroData() {
  const embersRef = useRef<Ember[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);

  if (embersRef.current.length === 0) {
    embersRef.current = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 5 + 2,
      dur: Math.random() * 6 + 5,
      delay: Math.random() * 8,
      x1: (Math.random() - 0.5) * 80,
      x2: (Math.random() - 0.5) * 120,
    }));

    ripplesRef.current = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      rd: `${3 + i * 0.8}s`,
      rdelay: `${i * 0.7}s`,
    }));
  }

  return {
    embers: embersRef.current,
    ripples: ripplesRef.current,
  };
}