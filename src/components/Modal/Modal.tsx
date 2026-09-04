import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useModalDialog } from '../../hooks/useModalDialog';
import { useEmberCursorHover } from '../../hooks/useEmberCursorHover';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleId: string;
  children: ReactNode;
  /** Extra class appended to .modal-panel, for a modal-specific look
   * (e.g. ProjectInfoModal's ember glow / watermark) without touching
   * the shared shell. */
  panelClassName?: string;
}

/** Accessible dialog shell (overlay, panel, close button) — Esc, click-outside,
 * focus trap, focus return and scroll lock are handled by useModalDialog. */
export function Modal({ isOpen, onClose, titleId, children, panelClassName }: ModalProps) {
  const { t } = useTranslation();
  const panelRef = useModalDialog(isOpen, onClose);
  const { onMouseEnter: emberEnter, onMouseLeave: emberLeave } = useEmberCursorHover();

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`modal-panel${panelClassName ? ` ${panelClassName}` : ''}`}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          onMouseEnter={emberEnter}
          onMouseLeave={emberLeave}
          aria-label={t('projectsModal.close')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}
