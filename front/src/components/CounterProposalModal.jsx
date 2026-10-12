/**
 * CounterProposalModal.jsx
 *
 * Modal for sellers (or buyers responding to counters) to propose
 * an alternate meetup location/date/time using the exact same constraints:
 * - Next 1 to 3 days (Asia/Manila)
 * - 8:00 AM to 5:00 PM (30-min slots)
 * - Free-text campus location (3-100 chars) with live counter
 * - Optional notes (max 300 chars) with live counter
 */

import { useState, useEffect, useRef } from 'react';
import { X, Calendar, Clock, MapPin, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { getMeetupOptions, counterTradeRequest } from '../lib/api';

export default function CounterProposalModal({ request, onClose, onSuccess }) {
  const [meetupLocation, setMeetupLocation] = useState(request?.meetupLocation || '');
  const [meetupDate, setMeetupDate] = useState('');
  const [meetupTime, setMeetupTime] = useState('');
  const [notes, setNotes] = useState('');

  const [loadingOptions, setLoadingOptions] = useState(true);
  const [allowedDates, setAllowedDates] = useState([]);
  const [allowedTimeSlots, setAllowedTimeSlots] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const locRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    getMeetupOptions()
      .then((opts) => {
        if (!isMounted) return;
        if (opts?.allowedDates?.length) {
          setAllowedDates(opts.allowedDates);
          // Preselect current date if in allowed range or first allowed
          const exists = opts.allowedDates.some((d) => d.date === request?.meetupDate);
          setMeetupDate(exists ? request.meetupDate : opts.allowedDates[0].date);
        }
        if (opts?.allowedTimeSlots?.length) {
          setAllowedTimeSlots(opts.allowedTimeSlots);
          const exists = opts.allowedTimeSlots.some((s) => s.value === request?.meetupTime);
          setMeetupTime(exists ? request.meetupTime : opts.allowedTimeSlots[0].value);
        }
      })
      .catch((err) => {
        console.error('Failed to load meetup options:', err);
        setErrorMsg('Failed to load meetup options.');
      })
      .finally(() => {
        if (isMounted) setLoadingOptions(false);
      });

    return () => {
      isMounted = false;
    };
  }, [request]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    if (locRef.current) locRef.current.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const validate = () => {
    const errors = {};
    const loc = meetupLocation.trim();
    if (!loc) {
      errors.meetupLocation = 'Meetup location is required.';
    } else if (loc.length < 3) {
      errors.meetupLocation = 'Location must be at least 3 characters.';
    } else if (loc.length > 100) {
      errors.meetupLocation = 'Location cannot exceed 100 characters.';
    }

    if (!meetupDate) {
      errors.meetupDate = 'Please select a meetup date.';
    }
    if (!meetupTime) {
      errors.meetupTime = 'Please select a meetup time.';
    }
    if (notes && notes.length > 300) {
      errors.notes = 'Notes cannot exceed 300 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await counterTradeRequest(request.id, {
        meetupLocation: meetupLocation.trim(),
        meetupDate,
        meetupTime,
        notes: notes.trim(),
      });
      onSuccess(res);
      onClose();
    } catch (err) {
      console.error('Counter request failed:', err);
      const apiErr = err.message || 'Failed to submit counter-proposal.';
      setErrorMsg(apiErr);
      if (err.field) {
        setFieldErrors((prev) => ({ ...prev, [err.field]: apiErr }));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid =
    meetupLocation.trim().length >= 3 &&
    meetupLocation.trim().length <= 100 &&
    Boolean(meetupDate) &&
    Boolean(meetupTime);

  return (
    <div className="modal-backdrop tr-sheet-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="cp-modal-title">
      <div className="modal-card tr-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header tr-modal-header">
          <div>
            <span className="campus-badge">COUNTER-PROPOSAL</span>
            <h3 id="cp-modal-title">Propose Another Time / Place</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {loadingOptions ? (
          <div className="tr-loading-box">
            <Loader2 size={28} className="animate-spin maroon" />
            <p>Loading available scheduling slots...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="modal-body tr-modal-body">
              {errorMsg && (
                <div className="tr-form-alert" role="alert">
                  <AlertCircle size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Location */}
              <div className="form-field-group">
                <div className="tr-field-label-row">
                  <label htmlFor="cp-location">
                    <MapPin size={15} className="inline-icon" /> Proposed Location <span className="req-star">*</span>
                  </label>
                  <span className="tr-char-counter">{meetupLocation.length}/100</span>
                </div>
                <input
                  ref={locRef}
                  id="cp-location"
                  type="text"
                  className={fieldErrors.meetupLocation ? 'input-error' : ''}
                  value={meetupLocation}
                  onChange={(e) => setMeetupLocation(e.target.value.slice(0, 100))}
                  placeholder="e.g. Meneses Gazebo"
                  required
                />
                {fieldErrors.meetupLocation && (
                  <span className="tr-field-error-text">{fieldErrors.meetupLocation}</span>
                )}
                <div className="tr-safety-note">
                  <ShieldCheck size={14} color="#15803d" />
                  <span>All trades are conducted on-campus for student safety and verification.</span>
                </div>
              </div>

              {/* Date */}
              <div className="form-field-group">
                <div className="tr-field-label-row">
                  <label>
                    <Calendar size={15} className="inline-icon" /> Proposed Date <span className="req-star">*</span>
                  </label>
                  <small className="tr-sub-hint">Available dates (Asia/Manila)</small>
                </div>
                <div className="tr-date-chips-grid" role="radiogroup">
                  {allowedDates.map((dateObj) => {
                    const isSelected = meetupDate === dateObj.date;
                    return (
                      <button
                        key={dateObj.date}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        className={`tr-date-chip ${isSelected ? 'selected' : ''}`}
                        onClick={() => setMeetupDate(dateObj.date)}
                      >
                        <span className="tr-chip-weekday">{dateObj.weekday}</span>
                        <span className="tr-chip-day">{dateObj.label}</span>
                      </button>
                    );
                  })}
                </div>
                {fieldErrors.meetupDate && (
                  <span className="tr-field-error-text">{fieldErrors.meetupDate}</span>
                )}
              </div>

              {/* Time */}
              <div className="form-field-group">
                <div className="tr-field-label-row">
                  <label htmlFor="cp-time">
                    <Clock size={15} className="inline-icon" /> Proposed Time <span className="req-star">*</span>
                  </label>
                  <small className="tr-sub-hint">8:00 AM – 5:00 PM (30-min slots)</small>
                </div>
                <select
                  id="cp-time"
                  className={fieldErrors.meetupTime ? 'input-error' : ''}
                  value={meetupTime}
                  onChange={(e) => setMeetupTime(e.target.value)}
                  required
                >
                  <option value="" disabled>Choose time slot...</option>
                  {allowedTimeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
                {fieldErrors.meetupTime && (
                  <span className="tr-field-error-text">{fieldErrors.meetupTime}</span>
                )}
              </div>

              {/* Notes */}
              <div className="form-field-group">
                <div className="tr-field-label-row">
                  <label htmlFor="cp-notes">Reason / Notes for Counter-Proposal (Optional)</label>
                  <span className="tr-char-counter">{notes.length}/300</span>
                </div>
                <textarea
                  id="cp-notes"
                  rows="3"
                  className={fieldErrors.notes ? 'input-error' : ''}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value.slice(0, 300))}
                  placeholder="e.g. I have classes during your proposed slot. How about this time instead?"
                />
                {fieldErrors.notes && (
                  <span className="tr-field-error-text">{fieldErrors.notes}</span>
                )}
              </div>
            </div>

            <div className="modal-footer tr-modal-footer">
              <button type="button" className="btn-outline" onClick={onClose} disabled={submitting}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary tr-submit-btn"
                disabled={!isFormValid || submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending Counter-Offer...</span>
                  </>
                ) : (
                  'Send Counter-Proposal'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
