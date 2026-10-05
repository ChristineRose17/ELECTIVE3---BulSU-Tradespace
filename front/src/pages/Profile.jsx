import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SquarePen, Plus, ClipboardList, Handshake } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getListings, getClaims } from '../lib/api';
import { CAMPUSES, COLLEGES } from '../lib/listing';
import Avatar from '../components/Avatar';

export default function Profile() {
  const nav = useNavigate();
  const { user, updateProfile } = useAuth();

  const [listingsCount, setListingsCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [completedTradesCount, setCompletedTradesCount] = useState(0);

  // Edit Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState('');

  const [form, setForm] = useState({
    name: user?.name || 'Juan Dela Cruz',
    email: user?.email || 'student@bulsu.edu.ph',
    studentId: user?.studentId || '2022-108249',
    college: user?.college || 'CIT / Engineering',
    course: user?.course || 'BS Information Technology',
    year: user?.year || '3rd Year',
    campus: user?.campus || 'Meneses Campus',
    phone: user?.phone || '0917-123-4567',
    bio: user?.bio || 'BulSU Meneses IT student. Selling past semester textbooks, engineering calculators, and uniform items.'
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || 'Juan Dela Cruz',
        email: user.email || 'student@bulsu.edu.ph',
        studentId: user.studentId || '2022-108249',
        college: user.college || 'CIT / Engineering',
        course: user.course || 'BS Information Technology',
        year: user.year || '3rd Year',
        campus: user.campus || 'Meneses Campus',
        phone: user.phone || '0917-123-4567',
        bio: user.bio || 'BulSU Meneses IT student. Selling past semester textbooks, engineering calculators, and uniform items.'
      });
    }
  }, [user]);

  useEffect(() => {
    const currentName = user?.name || 'Juan Dela Cruz';
    getListings().then((all) => {
      const mine = all.filter((p) => p.seller === currentName);
      setListingsCount(mine.length);
      setActiveCount(mine.filter((p) => p.status === 'active').length);
    });

    getClaims().then((claims) => {
      const done = claims.filter((c) => c.status === 'completed');
      setCompletedTradesCount(done.length);
    });
  }, [user]);

  const say = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await updateProfile(form);
    setIsEditing(false);
    say('Student profile updated successfully!');
  };

  return (
    <div className="page-container">
      {/* Profile Card Main */}
      <div className="profile-card-main">
        {/* Cover banner */}
        <div className="profile-cover">
          <span className="campus-badge" style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', backdropFilter: 'blur(4px)' }}>
            BULSU VERIFIED ACCOUNT
          </span>
        </div>

        <div className="profile-card-content">
          {/* Avatar and Edit button row */}
          <div className="profile-avatar-row">
            <Avatar name={form.name} size="xl" className="profile-big-avatar" style={{ border: '4px solid #ffffff' }} />
            <button
              type="button"
              className="btn-primary"
              onClick={() => setIsEditing(true)}
            >
              <SquarePen size={16} />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Identity details */}
          <div className="profile-identity">
            <h2>
              {form.name}
              <span className="verified-student-badge">
                <i className="fa-solid fa-circle-check"></i> Verified BulSUan
              </span>
            </h2>
            <p>
              {form.course} &middot; {form.year} &middot; {form.college}
            </p>
          </div>

          {/* Bio text */}
          <div className="profile-bio-text">
            <strong>About:</strong> {form.bio}
          </div>

          {/* Key Student Info Grid */}
          <div className="profile-info-grid">
            <div className="profile-info-box">
              <i className="fa-solid fa-id-card"></i>
              <div>
                <span>Student ID Number</span>
                <strong>{form.studentId}</strong>
              </div>
            </div>

            <div className="profile-info-box">
              <i className="fa-solid fa-building-columns"></i>
              <div>
                <span>Campus</span>
                <strong>{form.campus}</strong>
              </div>
            </div>

            <div className="profile-info-box">
              <i className="fa-regular fa-envelope"></i>
              <div>
                <span>BulSU GSuite Email</span>
                <strong>{form.email}</strong>
              </div>
            </div>

            <div className="profile-info-box">
              <i className="fa-solid fa-phone"></i>
              <div>
                <span>Campus Contact</span>
                <strong>{form.phone}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity and Statistics Counters */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => nav('/my-listings')} style={{ cursor: 'pointer' }} title="View your listings">
          <div className="stat-icon maroon">
            <i className="fa-solid fa-boxes-stacked"></i>
          </div>
          <div className="stat-details">
            <span>Total Listings</span>
            <strong>{listingsCount}</strong>
          </div>
        </div>

        <div className="stat-card" onClick={() => nav('/my-listings')} style={{ cursor: 'pointer' }} title="View active listings">
          <div className="stat-icon green">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <div className="stat-details">
            <span>Active Listings</span>
            <strong>{activeCount}</strong>
          </div>
        </div>

        <div className="stat-card" onClick={() => nav('/my-claims')} style={{ cursor: 'pointer' }} title="View completed claims">
          <div className="stat-icon gold">
            <i className="fa-solid fa-handshake-simple"></i>
          </div>
          <div className="stat-details">
            <span>Completed Trades</span>
            <strong>{completedTradesCount}</strong>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          type="button"
          className="btn-primary"
          onClick={() => nav('/create-listing')}
        >
          <Plus size={16} />
          <span>Create Listing</span>
        </button>
        <button
          type="button"
          className="btn-outline"
          onClick={() => nav('/my-listings')}
        >
          <ClipboardList size={16} />
          <span>Manage My Listings</span>
        </button>
        <button
          type="button"
          className="btn-outline"
          onClick={() => nav('/my-claims')}
        >
          <Handshake size={16} />
          <span>Check My Claims</span>
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="modal-backdrop" onClick={() => setIsEditing(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="campus-badge">LOCAL PROFILE SETTINGS</span>
                <h3>Edit Student Profile</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsEditing(false)}>&times;</button>
            </div>

            <form onSubmit={handleSaveProfile}>
              <div className="modal-body">
                <div className="form-row-2">
                  <div className="form-field-group">
                    <label htmlFor="edit-name">Full Name *</label>
                    <input
                      id="edit-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-field-group">
                    <label htmlFor="edit-id">Student Number *</label>
                    <input
                      id="edit-id"
                      type="text"
                      value={form.studentId}
                      onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-field-group">
                    <label htmlFor="edit-college">College / Dept</label>
                    <select
                      id="edit-college"
                      value={form.college}
                      onChange={(e) => setForm({ ...form, college: e.target.value })}
                    >
                      {COLLEGES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-field-group">
                    <label htmlFor="edit-campus">Campus</label>
                    <select
                      id="edit-campus"
                      value={form.campus}
                      onChange={(e) => setForm({ ...form, campus: e.target.value })}
                    >
                      {CAMPUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-field-group">
                    <label htmlFor="edit-course">Course / Degree Program</label>
                    <input
                      id="edit-course"
                      type="text"
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                    />
                  </div>
                  <div className="form-field-group">
                    <label htmlFor="edit-year">Year Level</label>
                    <input
                      id="edit-year"
                      type="text"
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-field-group">
                    <label htmlFor="edit-email">Email</label>
                    <input
                      id="edit-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className="form-field-group">
                    <label htmlFor="edit-phone">Contact Number</label>
                    <input
                      id="edit-phone"
                      type="text"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-field-group">
                  <label htmlFor="edit-bio">Bio / Student Description</label>
                  <textarea
                    id="edit-bio"
                    rows="3"
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Alert */}
      <div className={'cp-toast' + (toast ? ' show' : '')}>{toast}</div>
    </div>
  );
}
