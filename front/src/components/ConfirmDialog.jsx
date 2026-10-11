/**
 * ConfirmDialog.jsx
 *
 * Accessible confirmation dialog for decline / cancellation:
 * - Clear warning title and description
 * - Optional reason input when declining
 * - Loading indicator during action
 */

import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

export default function ConfirmDialog({
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loadingLabel,
  danger = true,
  withReason = false,
  reasonPlaceholder = 'Optional reason...',
  onConfirm,
  onClose,
}) {
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);

  const computedLoading = loadingLabel || (
    confirmLabel.toLowerCase().includes('cancel')
      ? 'Cancelling...'
      : confirmLabel.toLowerCase().includes('delete')
      ? 'Deleting...'
      : confirmLabel.toLowerCase().includes('decline')
      ? 'Declining...'
      : 'Processing...'
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !submitting) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    if (withReason && inputRef.current) inputRef.current.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, submitting, withReason]);

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      await onConfirm(reason.trim());
      onClose();
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => !submitting && onClose()} role="dialog" aria-modal="true">
      <div className="modal-card tr-confirm-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="tr-confirm-header-row">
            <div className={`tr-confirm-icon-wrap ${danger ? 'danger' : 'warning'}`}>
              <AlertTriangle size={20} />
            </div>
            <h4>{title}</h4>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="tr-confirm-desc">{description}</p>

          {withReason && (
            <div className="form-field-group" style={{ marginTop: 12 }}>
              <div className="tr-field-label-row">
                <label htmlFor="confirm-reason">Reason (Optional)</label>
                <span className="tr-char-counter">{reason.length}/300</span>
              </div>
              <textarea
                ref={inputRef}
                id="confirm-reason"
                rows="2"
                value={reason}
                onChange={(e) => setReason(e.target.value.slice(0, 300))}
                placeholder={reasonPlaceholder}
                disabled={submitting}
              />
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-outline"
            onClick={onClose}
            disabled={submitting}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={danger ? 'btn-danger' : 'btn-primary'}
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>{computedLoading}</span>
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
