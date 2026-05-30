import type { MutableRefObject, RefObject } from 'react';

export type BurstFn = (count: number) => void;

export interface FieldConfig {
  id:          string;
  rune:        string;
  label:       string;
  placeholder: string;
  type:        'text' | 'email' | 'textarea';
  validate:    (v: string) => boolean;
}

export interface OrbConfig {
  id:    string;
  href:  string;
  label: string;
  paths: string[];
}

export interface FieldRefs {
  inp:   MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  totem: RefObject<HTMLDivElement | null>;
  dot:   RefObject<HTMLDivElement | null>;
  line:  RefObject<SVGLineElement | null>;
  config: FieldConfig;
}
