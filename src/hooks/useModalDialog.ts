import { useEffect, useRef } from 'react';
import { useScrollLock } from './useScrollLock';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Shared accessible-dialog behavior: locks background scroll, moves focus
 * into the panel on open, traps Tab/Shift+Tab inside it, closes on Escape,
 * and returns focus to whatever opened it on close. Returns the ref to
 * attach to the dialog panel element.
 */
export function useModalDialog(isOpen: boolean, onClose: () => void) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    // Whatever was hovered right before opening (e.g. the card behind this
    // modal) never gets a real mouseleave — the modal just appears on top
    // of a stationary cursor — so its ember-cursor hover state would stay
    // stuck "on" until the pointer happens to move. Clear it explicitly.
    window.dispatchEvent(new Event('ember:leave'));

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    const firstFocusable = panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    (firstFocusable ?? panel)?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;

      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  return panelRef;
}
