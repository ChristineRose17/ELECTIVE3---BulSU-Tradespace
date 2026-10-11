/**
 * MeetupConfirmedCard.jsx
 *
 * Card presented to both buyer and seller once a trade request is accepted:
 * - Details: Item title, location, date, time, and other person's name
 * - "Mark as Completed" action enabled on or after the scheduled meetup date
 * - Clear explanation when the button is disabled before the meetup date
 */

import { useState } from 'react';
import { Handshake, MapPin, Calendar, Clock, User, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { formatMeetupDateTime, isMeetupDateReachedClient } from '../lib/dateTime';
import { completeTradeRequest } from '../lib/api';

export default function MeetupConfirmedCard({ request, currentUserId, onCompleted }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isBuyer = request.buyerId === currentUserId;
  const otherPersonName = isBuyer ? request.seller?.name : request.buyer?.name;
  const otherPersonRole = isBuyer ? 'Seller' : 'Buyer';
  const otherPersonPhone = isBuyer ? request.seller?.phone : request.buyer?.phone;

  const dateReached = isMeetupDateReachedClient(request.meetupDate);
  const formattedSchedule = formatMeetupDateTime(request.meetupDate, request.meetupTime);

  const handleMarkComplete = async () => {
    if (!dateReached || loading) return;
    setErrorMsg('');
    setLoading(true);
    try {
      const res = await completeTradeRequest(request.id);
      if (onCompleted) onCompleted(res);
    } catch (err) {
      console.error('Mark completed error:', err);
      setErrorMsg(err.message || 'Failed to complete meetup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tr-confirmed-meetup-card">
      <div className="tr-cmc-header">
        <div className="tr-cmc-badge">
          <Handshake size={16} />
          <span>MEETUP CONFIRMED</span>
        </div>
        <span className="tr-cmc-item-title">{request.listing?.title}</span>
      </div>

      <div className="tr-cmc-grid">
        <div className="tr-cmc-cell">
          <MapPin size={16} className="tr-cmc-icon maroon" />
          <div>
            <small>Meetup Location</small>
            <strong>{request.meetupLocation}</strong>
          </div>
        </div>

        <div className="tr-cmc-cell">
          <Calendar size={16} className="tr-cmc-icon maroon" />
          <div>
            <small>Schedule</small>
            <strong>{formattedSchedule}</strong>
          </div>
        </div>

        <div className="tr-cmc-cell">
          <User size={16} className="tr-cmc-icon maroon" />
          <div>
            <small>{otherPersonRole}</small>
            <strong>{otherPersonName || 'BulSU Student'}</strong>
            {otherPersonPhone && <span className="tr-cmc-phone">{otherPersonPhone}</span>}
          </div>
        </div>
      </div>

      {request.notes && (
        <div className="tr-cmc-notes">
          <small>Notes:</small> "{request.notes}"
        </div>
      )}

      {errorMsg && (
        <div className="tr-form-alert" style={{ marginTop: 12 }}>
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="tr-cmc-actions">
        {dateReached ? (
          <button
            type="button"
            className="btn-primary tr-complete-btn"
            onClick={handleMarkComplete}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Marking Completed...</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                <span>Mark as Completed</span>
              </>
            )}
          </button>
        ) : (
          <div className="tr-cmc-disabled-hint">
            <Clock size={15} />
            <span>
              "Mark as Completed" will be available on or after the scheduled meetup date ({request.meetupDate}).
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
