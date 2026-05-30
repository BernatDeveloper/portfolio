import type { FieldConfig } from '../types';

export const FIELDS: FieldConfig[] = [
  {
    id:          'name',
    rune:        'ᚾ',
    label:       'Your Name',
    placeholder: 'Who are you?',
    type:        'text',
    validate:    (v) => v.trim().length > 0,
  },
  {
    id:          'email',
    rune:        'ᛗ',
    label:       'Your Email',
    placeholder: 'your@email.com',
    type:        'email',
    validate:    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  },
  {
    id:          'message',
    rune:        'ᛊ',
    label:       'Your Message',
    placeholder: 'Tell me what you need…',
    type:        'textarea',
    validate:    (v) => v.trim().length > 0,
  },
];
