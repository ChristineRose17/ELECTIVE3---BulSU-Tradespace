/**
 * TradeRequestModal.jsx
 *
 * Structured meetup scheduling modal for buyers:
 * - Real item summary (maroon branding)
 * - 3 selectable date chips fetched from backend
 * - 30-min time slot picker (8AM - 5PM) fetched from backend
 * - Location free-text with live counter (3-100 chars)
 * - Notes with live counter (max 300 chars)
 * - Checks for own item, active duplicate request, sold/reserved state
 * - Mobile bottom sheet responsive design
 * - Keyboard accessibility (Esc to close, focus management)
 */

import { useState, useEffect, useRef } from 'react';
import { X, Calendar, Clock, MapPin, ShieldCheck, AlertCircle, CheckCircle2, Loader2, PackageOpen } from 'lucide-react';
import { getListingAvailability, createTradeRequest, getMyRequestOnItem } from '../lib/api';
import { priceText } from '../lib/listing';
import { formatMeetupDateTime } from '../lib/dateTime';
import { notifyClaimsUpdated } from '../lib/claimSeenStorage';

export default function TradeRequestModal({ item, user, onClose, onSuccess }) {
  const modalRef = useRef(null);
  const locationInputRef = useRef(null);

  // Form states
  const [meetupLocation, setMeetupLocation] = useState('');
  const [meetupDate, setMeetupDate] = useState('');
  const [meetupTime, setMeetupTime] = useState('');
  const [notes, setNotes] = useState('');
  const [customTime, setCustomTime] = useState(false);

  // Async states
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [availData, setAvailData] = useState(null);
  const [activeRequest, setActiveRequest] = useState(null);
  const [checkingActive, setCheckingActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const isOwnItem = Boolean(
    (item?.sellerId && user?.id && item.sellerId === user.id) ||
    (item?.seller?.id && user?.id && item.seller.id === user.id) ||
    (item?.seller?.email && user?.email && item.seller.email === user.email)
  );
  const isUnavailable = item?.status === 'sold' || item?.status === 'reserved';

  // Derive seller display name safely — item.seller is an object from the backend
  const sellerName = (typeof item?.seller === 'object' ? item?.seller?.name : item?.seller) || 'BulSU Student';

  // Load allowed meetup options from backend & check active request
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoadingOptions(true);
        const [avail, myReq] = await Promise.all([
          getListingAvailability(item.id),
          user ? getMyRequestOnItem(item.id) : Promise.resolve(null),
        ]);

        if (!isMounted) return;

        if (avail) {
          setAvailData(avail);
          if (avail.preferredLocation) {
            setMeetupLocation(avail.preferredLocation);
          }
          const matchingDays = avail.matchingDays || [];
          if (matchingDays.length > 0) {
            const firstDate = matchingDays[0].date;
            setMeetupDate(firstDate);
            const daySlots = avail.slotsByDate?.[firstDate] || [];
            const firstAvailableSlot = daySlots.find((s) => !s.booked);
            if (firstAvailableSlot) {
              setMeetupTime(firstAvailableSlot.time);
            }
          } else if (!avail.hasSellerSchedule && avail.defaultDates?.length > 0) {
            const firstDate = avail.defaultDates[0].date;
            setMeetupDate(firstDate);
            const daySlots = avail.slotsByDate?.[firstDate] || avail.standardSlots || [];
            const firstAvailableSlot = daySlots.find((s) => !s.booked);
            if (firstAvailableSlot) {
              setMeetupTime(firstAvailableSlot.time);
            }
          }
        }

        if (myReq) {
          setActiveRequest(myReq);
        }
      } catch (err) {
        console.error('Failed to load meetup options:', err);
        setErrorMsg('Unable to load meetup scheduling options. Please try again.');
      } finally {
        if (isMounted) {
          setLoadingOptions(false);
          setCheckingActive(false);
        }
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [item?.id, user]);

  // Focus trap / Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    if (locationInputRef.current && !activeRequest && !isOwnItem && !isUnavailable) {
      locationInputRef.current.focus();
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeRequest, isOwnItem, isUnavailable, onClose]);

  const sellerDaysSet = new Set((availData?.weeklyRules || []).map((r) => r.dayOfWeek));
  const hasSellerSchedule = Boolean(availData?.hasSellerSchedule && sellerDaysSet.size > 0);

  const isDateAllowed = (dateStr) => {
    if (customTime || !hasSellerSchedule) return true;
    const [y, m, d] = dateStr.split('-').map(Number);
    const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
    return sellerDaysSet.has(dow);
  };

  const handleSelectDate = (dateVal) => {
    setMeetupDate(dateVal);
    if (fieldErrors.meetupDate) {
      setFieldErrors((prev) => ({ ...prev, meetupDate: null }));
    }
    const slots = customTime
      ? (availData?.slotsByDate?.[dateVal] || availData?.standardSlots || [])
      : (availData?.slotsByDate?.[dateVal] || []);
    
    const isValid = slots.some((s) => s.time === meetupTime && !s.booked);
    if (!isValid) {
      const firstAvail = slots.find((s) => !s.booked);
      setMeetupTime(firstAvail ? firstAvail.time : '');
    }
  };

  const handleEnableCustomTime = () => {
    setCustomTime(true);
    const dates = availData?.defaultDates || [];
    if (dates.length > 0) {
      const d = meetupDate || dates[0].date;
      setMeetupDate(d);
      const slots = availData?.slotsByDate?.[d] || availData?.standardSlots || [];
      const firstAvail = slots.find((s) => !s.booked);
      setMeetupTime(firstAvail ? firstAvail.time : (slots[0]?.time || ''));
    }
  };

  const handleDisableCustomTime = () => {
    setCustomTime(false);
    const matching = availData?.matchingDays || [];
    if (matching.length > 0) {
      const d = matching[0].date;
      setMeetupDate(d);
      const slots = availData?.slotsByDate?.[d] || [];
      const firstAvail = slots.find((s) => !s.booked);
      setMeetupTime(firstAvail ? firstAvail.time : '');
    }
  };

  const allUpcomingDates = (availData?.defaultDates || []).slice(0, 14);

  const availableSlots = customTime
    ? (availData?.standardSlots || []).map((s) => ({
        time: s.value,
        label: s.label,
        booked: false,
      }))
    : (availData?.slotsByDate?.[meetupDate] || []);

  const noSlotsMatch = !customTime && availData?.hasSellerSchedule && (!availData?.matchingDays || availData.matchingDays.length === 0);

  const validate = () => {
    const errors = {};
    const trimmedLoc = meetupLocation.trim();
    if (!trimmedLoc) {
      errors.meetupLocation = 'Meetup location is required.';
    } else if (trimmedLoc.length < 3) {
      errors.meetupLocation = 'Location must be at least 3 characters.';
    } else if (trimmedLoc.length > 100) {
      errors.meetupLocation = 'Location cannot exceed 100 characters.';
    }

    if (!meetupDate) {
      errors.meetupDate = 'Please select a meetup date.';
    } else if (!isDateAllowed(meetupDate)) {
      errors.meetupDate = 'The selected date is outside the seller’s available days. Please select an allowed date or request a custom time.';
    }

    if (!meetupTime) {
      errors.meetupTime = 'Please select a meetup time.';
    }

    if (customTime && !notes.trim()) {
      errors.notes = 'A short reason or note is required for custom schedule requests.';
    } else if (notes && notes.length > 300) {
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
      const res = await createTradeRequest({
        listingId: item.id,
        meetupLocation: meetupLocation.trim(),
        meetupDate,
        meetupTime,
        notes: notes.trim(),
        customTime,
      });

      notifyClaimsUpdated();
      onSuccess(res);
      onClose();
    } catch (err) {
      console.error('Submit trade request error:', err);
      const apiErr = err.message || 'Failed to send request. Please try again.';
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
    <div className="modal-backdrop tr-sheet-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="tr-modal-title">
      <div className="modal-card tr-modal-card" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header tr-modal-header">
          <div className="tr-header-title-wrap">
            <span className="campus-badge">CAMPUS TRADE REQUEST</span>
            <h3 id="tr-modal-title">
              {item.type === 'Giveaway' ? 'Claim Free Item' : 'Schedule Meetup & Request'}
            </h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Item Summary (Maroon themed, real item data) */}
        <div className="tr-item-summary">
          {item.images?.[0] ? (
            <img src={item.images[0]} alt={item.title} className="tr-item-thumb" />
          ) : (
            <div className="tr-item-thumb-placeholder">
              <PackageOpen size={24} color="#8b1023" />
            </div>
          )}
          <div className="tr-item-info">
            <h4 className="tr-item-title">{item.title}</h4>
            <div className="tr-item-price-row">
              <span className="tr-item-price">
                {item.type === 'Giveaway' ? 'Free Giveaway' : priceText(item.type, item.price)}
              </span>
              <span className="tr-item-type-chip">{item.type}</span>
            </div>
            <div className="tr-item-meta">
              <span>Seller: <strong>{sellerName}</strong></span>
              <span>&bull;</span>
              <span>{item.campus || 'Meneses Campus'}</span>
            </div>
          </div>
        </div>

        {/* Conditional States: Own Item, Unavailable, or Active Request Exists */}
        {isOwnItem ? (
          <div className="tr-warning-card">
            <AlertCircle size={24} className="tr-warn-icon" />
            <div>
              <h5>You own this listing</h5>
              <p>You cannot send a trade request to your own listing. You can manage this listing under <strong>My Listings</strong>.</p>
            </div>
          </div>
        ) : isUnavailable ? (
          <div className="tr-warning-card">
            <AlertCircle size={24} className="tr-warn-icon" />
            <div>
              <h5>Item is {item.status}</h5>
              <p>
                {item.status === 'reserved'
                  ? 'This item currently has a reserved meetup with another student.'
                  : 'This item has already been marked as sold.'}
              </p>
            </div>
          </div>
        ) : activeRequest ? (
          <div className="tr-active-request-card">
            <CheckCircle2 size={24} className="tr-success-icon" />
            <div>
              <h5>You have an active request on this item</h5>
              <p>
                Status: <span className={`req-status-badge ${activeRequest.status}`}>{activeRequest.status.toUpperCase()}</span>
              </p>
              <div className="tr-active-details">
                <div><strong>Location:</strong> {activeRequest.meetupLocation}</div>
                <div><strong>Schedule:</strong> {formatMeetupDateTime(activeRequest.meetupDate, activeRequest.meetupTime)}</div>
              </div>
              <p className="tr-active-note">Track or manage this request anytime under <strong>My Claims / Requests</strong>.</p>
            </div>
          </div>
        ) : loadingOptions ? (
          <div className="tr-loading-box">
            <Loader2 size={28} className="animate-spin maroon" />
            <p>Loading available on-campus meetup slots...</p>
          </div>
        ) : (
          /* Structured Form */
          <form onSubmit={handleSubmit} noValidate>
            <div className="modal-body tr-modal-body">
              {errorMsg && (
                <div className="tr-form-alert" role="alert">
                  <AlertCircle size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Meetup Location (Required text input, 3-100 chars, prefilled with seller preference) */}
              <div className="form-field-group">
                <div className="tr-field-label-row">
                  <label htmlFor="tr-meetup-location">
                    <MapPin size={15} className="inline-icon" /> Meetup Location <span className="req-star">*</span>
                  </label>
                  <span className="tr-char-counter" aria-live="polite">
                    {meetupLocation.length}/100
                  </span>
                </div>
                <input
                  ref={locationInputRef}
                  id="tr-meetup-location"
                  type="text"
                  className={fieldErrors.meetupLocation ? 'input-error' : ''}
                  value={meetupLocation}
                  onChange={(e) => {
                    setMeetupLocation(e.target.value.slice(0, 100));
                    if (fieldErrors.meetupLocation) {
                      setFieldErrors((prev) => ({ ...prev, meetupLocation: null }));
                    }
                  }}
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

              {/* Custom time banner if active */}
              {customTime && (
                <div className="tr-custom-time-badge">
                  <Clock size={14} />
                  <span>Schedule Change Request (outside seller's standard schedule)</span>
                  {availData?.matchingDays?.length > 0 && (
                    <button
                      type="button"
                      className="tr-link-btn"
                      onClick={handleDisableCustomTime}
                    >
                      Use seller schedule
                    </button>
                  )}
                </div>
              )}

              {/* If no slots match in upcoming schedule */}
              {noSlotsMatch ? (
                <div className="tr-no-slots-box">
                  <div className="tr-no-slots-text">
                    The seller has no available slots in the upcoming schedule.
                  </div>
                  <button
                    type="button"
                    className="tr-custom-time-toggle-btn"
                    onClick={handleEnableCustomTime}
                  >
                    <Clock size={14} />
                    Need a different schedule? Request a custom time
                  </button>
                </div>
              ) : (
                <>
                  {/* Meetup Date chips */}
                  <div className="form-field-group">
                    <div className="tr-field-label-row">
                      <label>
                        <Calendar size={15} className="inline-icon" /> Meetup Date <span className="req-star">*</span>
                      </label>
                      <small className="tr-sub-hint">Available dates (Asia/Manila)</small>
                    </div>
                    <div className="tr-date-chips-grid" role="radiogroup" aria-label="Select meetup date">
                      {allUpcomingDates.map((dateObj) => {
                        const isAllowed = isDateAllowed(dateObj.date);
                        const isSelected = meetupDate === dateObj.date;
                        return (
                          <button
                            key={dateObj.date}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            disabled={!isAllowed}
                            className={`tr-date-chip ${isSelected ? 'selected' : ''} ${!isAllowed ? 'disabled' : ''}`}
                            onClick={() => {
                              if (isAllowed) handleSelectDate(dateObj.date);
                            }}
                            title={!isAllowed ? 'Seller is not available on this day' : ''}
                          >
                            <span className="tr-chip-weekday">{dateObj.weekday}</span>
                            <span className="tr-chip-day">{dateObj.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <label htmlFor="tr-manual-date" style={{ fontSize: 12, color: '#64748b' }}>
                        Pick specific date:
                      </label>
                      <input
                        id="tr-manual-date"
                        type="date"
                        min={availData?.defaultDates?.[0]?.date}
                        value={meetupDate}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (!val) return;
                          if (!isDateAllowed(val)) {
                            setFieldErrors((prev) => ({
                              ...prev,
                              meetupDate: 'The seller is not available on this day of the week. Please select an allowed date or request a custom time.',
                            }));
                            return;
                          }
                          handleSelectDate(val);
                        }}
                        style={{
                          padding: '4px 8px',
                          fontSize: 12,
                          borderRadius: 6,
                          border: '1px solid #cbd5e1',
                          color: '#334155',
                        }}
                      />
                    </div>
                    {fieldErrors.meetupDate && (
                      <span className="tr-field-error-text">{fieldErrors.meetupDate}</span>
                    )}
                  </div>

                  {/* Meetup Time Slot Buttons */}
                  <div className="form-field-group">
                    <div className="tr-field-label-row">
                      <label>
                        <Clock size={15} className="inline-icon" /> Meetup Time Slot <span className="req-star">*</span>
                      </label>
                      <small className="tr-sub-hint">30-min intervals</small>
                    </div>
                    {availableSlots.length === 0 ? (
                      <p className="tr-sub-hint" style={{ fontStyle: 'italic', color: '#94a3b8' }}>
                        No time slots available for this date.
                      </p>
                    ) : (
                      <div className="tr-time-slots-grid" role="radiogroup" aria-label="Select meetup time">
                        {availableSlots.map((slot) => {
                          const isSelected = meetupTime === slot.time;
                          const isBooked = Boolean(slot.booked);
                          return (
                            <button
                              key={slot.time}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              disabled={isBooked}
                              className={`tr-time-slot-btn ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                              onClick={() => {
                                if (!isBooked) {
                                  setMeetupTime(slot.time);
                                  if (fieldErrors.meetupTime) {
                                    setFieldErrors((prev) => ({ ...prev, meetupTime: null }));
                                  }
                                }
                              }}
                            >
                              <span>{slot.label}</span>
                              {isBooked && <span className="tr-booked-subtext">Booked</span>}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {fieldErrors.meetupTime && (
                      <span className="tr-field-error-text">{fieldErrors.meetupTime}</span>
                    )}

                    {!customTime && (
                      <div style={{ marginTop: '10px' }}>
                        <button
                          type="button"
                          className="tr-link-btn"
                          onClick={handleEnableCustomTime}
                        >
                          Need a different schedule? Request a custom time
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Notes (Required if customTime, optional otherwise) */}
              <div className="form-field-group">
                <div className="tr-field-label-row">
                  <label htmlFor="tr-meetup-notes">
                    {customTime ? 'Reason for Custom Schedule' : 'Additional Notes (Optional)'} {customTime && <span className="req-star">*</span>}
                  </label>
                  <span className="tr-char-counter" aria-live="polite">
                    {notes.length}/300
                  </span>
                </div>
                <textarea
                  id="tr-meetup-notes"
                  rows="3"
                  className={fieldErrors.notes ? 'input-error' : ''}
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value.slice(0, 300));
                    if (fieldErrors.notes) {
                      setFieldErrors((prev) => ({ ...prev, notes: null }));
                    }
                  }}
                  placeholder={customTime ? 'Please provide a short reason or note for your custom schedule request...' : 'e.g. I will be wearing a maroon jacket near the cafeteria entrance...'}
                  required={customTime}
                />
                {fieldErrors.notes && (
                  <span className="tr-field-error-text">{fieldErrors.notes}</span>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer tr-modal-footer">
              <button
                type="button"
                className="btn-outline"
                onClick={onClose}
                disabled={submitting}
              >
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
                    <span>Sending Request...</span>
                  </>
                ) : (
                  'Confirm & Send Request'
                )}
              </button>
            </div>
          </form>
        )}

        {/* Footer for non-form states (Own item / Active request) */}
        {(isOwnItem || isUnavailable || activeRequest) && (
          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
