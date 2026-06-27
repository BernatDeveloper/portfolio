export interface NavItem {
  label:    string;
  selector: string | null;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home',       selector: null },
  { label: 'Experience', selector: '.timeline-section' },
  { label: 'Projects',   selector: '.proj-section' },
  { label: 'Skills',     selector: '.sn-skills-section' },
  { label: 'Contact',    selector: '.cs' },
];
