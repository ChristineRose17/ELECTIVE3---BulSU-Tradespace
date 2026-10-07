import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SquarePen, Plus, ClipboardList, Handshake } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getListings, getClaims } from '../lib/api';
import { CAMPUSES, COLLEGES } from '../lib/listing';
import Avatar from '../components/Avatar';

const YEAR_LEVELS = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];
const FACULTY_POSITIONS = [
  'Instructor I', 'Instructor II', 'Instructor III',
  'Assistant Professor I', 'Assistant Professor II', 'Assistant Professor III', 'Assistant Professor IV',
  'Associate Professor I', 'Associate Professor II', 'Associate Professor III', 'Associate Professor IV', 'Associate Professor V',
  'Professor I', 'Professor II', 'Professor III', 'Professor IV', 'Professor V', 'Professor VI',
];
const STAFF_POSITIONS = [
  'Administrative Officer', 'Administrative Aide', 'Registrar Staff',
  'Librarian', 'Guidance Counselor', 'Nurse', 'Security Guard',
  'Utility Worker', 'Cashier', 'IT Staff', 'Other',
];

// Role badge styles
const ROLE_BADGE = {
  student: { label: 'Student', cls: 'badge-student' },
  faculty: { label: 'Teacher', cls: 'badge-faculty' },
  staff:   { label: 'Personnel', cls: 'badge-staff' },
};

// Helper — shows real value or "Not set" placeholder
const Val = ({ v }) => v ? <>{v}</> : <span className="not-set">Not set</span>;

export default function Profile() {
  const nav = useNavigate();
  const { user, updateProfile } = useAuth();

  const [listingsCount, setListingsCount]           = useState(0);
  const [activeCount, setActiveCount]               = useState(0);
  const [completedTradesCount, setCompletedTradesCount] = useState(0);
  const [isEditing, setIsEditing]                   = useState(false);
  const [errors, setErrors]                         = useState({});
  const [toast, setToast]                           = useState('');

  // Edit form — mirrors the actual user object with no hardcoded fallbacks
  const makeForm = (u) => ({
    name:       u?.name       || '',
    role:       u?.role       || '',
    campus:     u?.campus     || '',
    college:    u?.college    || '',
    phone:      u?.phone      || '',
    bio:        u?.bio        || '',
    // Student
    studentId:  u?.studentId  || '',
    course:     u?.course     || '',
    year:       u?.year       || '',
    // Faculty / Staff
    employeeId: u?.employeeId || '',
    position:   u?.position   || '',
    office:     u?.office     || '',
  });

  const [form, setForm] = useState(() => makeForm(user));

  // Keep form in sync if user object changes (e.g. after profile update)
  useEffect(() => {
    setForm(makeForm(user));
  }, [user]);

  // Fetch real stats from the backend
  useEffect(() => {
    if (!user?.id) return;

    getListings().then((all) => {
      const mine = all.filter((p) => p.sellerId === user.id);
      setListingsCount(mine.length);
      setActiveCount(mine.filter((p) => p.status === 'active').length);
    });

    getClaims().then((claims) => {
      setCompletedTradesCount(claims.filter((c) => c.status === 'completed').length);
    });
  }, [user]);

  const say = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const validate = () => {
    const errs = {};

    // Validate Student ID only if filled in
    if (form.studentId && form.studentId.trim()) {
      if (!/^\d{4}-\d{6}$/.test(form.studentId.trim())) {
        errs.studentId = 'Student ID must be in YYYY-XXXXXX format (e.g. 2022-108249).';
      }
    }

    // Validate phone only if filled in
    if (form.phone && form.phone.trim()) {
      const cleanPhone = form.phone.trim().replace(/[\s-]/g, '');
      if (!/^(\+639\d{9}|09\d{9})$/.test(cleanPhone)) {
        errs.phone = 'Please enter a valid phone number (e.g. 0917-123-4567).';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await updateProfile(form);
    if (res?.error) {
      say(res.error);
      if (res.field) setErrors({ [res.field]: res.error });
      return;
    }
    setIsEditing(false);
    setErrors({});
    say('Profile updated successfully!');
  };

  const role      = user?.role;
  const roleMeta  = ROLE_BADGE[role] || null;
  // Show verified badge only when: email domain is BulSU AND email is actually confirmed
  const isBulSU   = user?.emailVerified && user?.email?.endsWith('@bulsu.edu.ph');

  return (
    <div className="page-container">
      {/* Profile Card */}
      <div className="profile-card-main">
        <div className="profile-cover">
          {isBulSU && (
            <span className="campus-badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', backdropFilter: 'blur(4px)' }}>
              BULSU VERIFIED ACCOUNT
            </span>
          )}
        </div>

        <div className="profile-card-content">
          <div className="profile-avatar-row">
            <Avatar name={user?.name || '?'} size="xl" className="profile-big-avatar" style={{ border: '4px solid #ffffff' }} />
            <button type="button" className="btn-primary" onClick={() => { setErrors({}); setIsEditing(true); }}>
              <SquarePen size={16} />
              <span>Edit Profile</span>
            </button>
          </div>

          <div className="profile-identity">
            <h2>
              {user?.name || <span className="not-set">Not set</span>}
              {roleMeta && (
                <span className={`role-badge-inline ${roleMeta.cls}`}>{roleMeta.label}</span>
              )}
              {isBulSU && (
                <span className="verified-student-badge">
                  <i className="fa-solid fa-circle-check"></i> Verified BulSUan
                </span>
              )}
            </h2>
            <p>
              {role === 'student' ? (
                <><Val v={user?.course} /> &middot; <Val v={user?.year} /> &middot; <Val v={user?.college} /></>
              ) : role === 'faculty' ? (
                <><Val v={user?.position} /> &middot; <Val v={user?.college} /></>
              ) : role === 'staff' ? (
                <><Val v={user?.position} /> &middot; <Val v={user?.office} /></>
              ) : (
                <span className="not-set">Not set</span>
              )}
            </p>
          </div>

          <div className="profile-bio-text">
            <strong>About:</strong>{' '}
            {user?.bio ? user.bio : <span className="not-set">No bio yet</span>}
          </div>

          {/* Info Grid */}
          <div className="profile-info-grid">
            {/* Student ID / Employee ID */}
            <div className="profile-info-box">
              <i className="fa-solid fa-id-card"></i>
              <div>
                <span>{role === 'student' ? 'Student ID Number' : (role === 'faculty' || role === 'staff') ? 'Employee ID' : 'ID Number'}</span>
                <strong>
                  {role === 'student'
                    ? <Val v={user?.studentId} />
                    : (role === 'faculty' || role === 'staff')
                      ? <Val v={user?.employeeId} />
                      : <Val v={user?.studentId || user?.employeeId} />}
                </strong>
              </div>
            </div>

            <div className="profile-info-box">
              <i className="fa-solid fa-building-columns"></i>
              <div>
                <span>Campus</span>
                <strong><Val v={user?.campus} /></strong>
              </div>
            </div>

            <div className="profile-info-box">
              <i className="fa-regular fa-envelope"></i>
              <div>
                <span>Email</span>
                <strong><Val v={user?.email} /></strong>
              </div>
            </div>

            <div className="profile-info-box">
              <i className="fa-solid fa-phone"></i>
              <div>
                <span>Contact Number</span>
                <strong><Val v={user?.phone} /></strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => nav('/my-listings')} style={{ cursor: 'pointer' }} title="View your listings">
          <div className="stat-icon maroon"><i className="fa-solid fa-boxes-stacked"></i></div>
          <div className="stat-details">
            <span>Total Listings</span>
            <strong>{listingsCount}</strong>
          </div>
        </div>
        <div className="stat-card" onClick={() => nav('/my-listings')} style={{ cursor: 'pointer' }} title="View active listings">
          <div className="stat-icon green"><i className="fa-solid fa-circle-check"></i></div>
          <div className="stat-details">
            <span>Active Listings</span>
            <strong>{activeCount}</strong>
          </div>
        </div>
        <div className="stat-card" onClick={() => nav('/my-claims')} style={{ cursor: 'pointer' }} title="View completed trades">
          <div className="stat-icon gold"><i className="fa-solid fa-handshake-simple"></i></div>
          <div className="stat-details">
            <span>Completed Trades</span>
            <strong>{completedTradesCount}</strong>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button type="button" className="btn-primary" onClick={() => nav('/create-listing')}>
          <Plus size={16} /><span>Create Listing</span>
        </button>
        <button type="button" className="btn-outline" onClick={() => nav('/my-listings')}>
          <ClipboardList size={16} /><span>Manage My Listings</span>
        </button>
        <button type="button" className="btn-outline" onClick={() => nav('/my-claims')}>
          <Handshake size={16} /><span>Check My Claims</span>
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="modal-backdrop" onClick={() => setIsEditing(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="campus-badge">PROFILE SETTINGS</span>
                <h3>Edit Profile</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsEditing(false)}>&times;</button>
            </div>

            <form onSubmit={handleSaveProfile} noValidate>
              <div className="modal-body">
                {/* Role dropdown — "I am a..." */}
                <div className="form-field-group">
                  <label htmlFor="edit-role">I am a...</label>
                  <select
                    id="edit-role"
                    value={form.role}
                    onChange={(e) => {
                      setForm({ ...form, role: e.target.value });
                      setErrors((prev) => ({ ...prev, role: undefined }));
                    }}
                  >
                    <option value="">— Select (Optional) —</option>
                    <option value="student">Student</option>
                    <option value="faculty">Teacher</option>
                    <option value="staff">Personnel</option>
                  </select>
                </div>

                {/* Name + Campus */}
                <div className="form-row-2">
                  <div className="form-field-group">
                    <label htmlFor="edit-name">Full Name</label>
                    <input
                      id="edit-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="form-field-group">
                    <label htmlFor="edit-campus">Campus</label>
                    <select
                      id="edit-campus"
                      value={form.campus}
                      onChange={(e) => setForm({ ...form, campus: e.target.value })}
                    >
                      <option value="">— Select Campus —</option>
                      {CAMPUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* College / Department */}
                <div className="form-field-group">
                  <label htmlFor="edit-college">College / Department</label>
                  <select
                    id="edit-college"
                    value={form.college}
                    onChange={(e) => setForm({ ...form, college: e.target.value })}
                  >
                    <option value="">— Select College / Department —</option>
                    {COLLEGES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Student-specific fields */}
                {form.role === 'student' && (
                  <>
                    <div className="form-row-2">
                      <div className="form-field-group">
                        <label htmlFor="edit-student-id">Student ID Number</label>
                        <input
                          id="edit-student-id"
                          type="text"
                          value={form.studentId}
                          placeholder="e.g. 2022-108249"
                          onChange={(e) => {
                            setForm({ ...form, studentId: e.target.value });
                            setErrors((prev) => ({ ...prev, studentId: undefined }));
                          }}
                        />
                        {errors.studentId && (
                          <span className="field-error" style={{ color: '#dc2626', fontSize: 12, marginTop: 4, display: 'block' }}>
                            {errors.studentId}
                          </span>
                        )}
                      </div>
                      <div className="form-field-group">
                        <label htmlFor="edit-year">Year Level</label>
                        <select
                          id="edit-year"
                          value={form.year}
                          onChange={(e) => setForm({ ...form, year: e.target.value })}
                        >
                          <option value="">— Select Year Level —</option>
                          {YEAR_LEVELS.map((y) => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="form-field-group">
                      <label htmlFor="edit-course">Program / Course</label>
                      <input
                        id="edit-course"
                        type="text"
                        value={form.course}
                        placeholder="e.g. BS Information Technology"
                        onChange={(e) => setForm({ ...form, course: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {/* Faculty / Staff shared fields */}
                {(form.role === 'faculty' || form.role === 'staff') && (
                  <div className="form-row-2">
                    <div className="form-field-group">
                      <label htmlFor="edit-emp-id">Employee ID</label>
                      <input
                        id="edit-emp-id"
                        type="text"
                        value={form.employeeId}
                        placeholder="e.g. EMP-2024-001"
                        onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
                      />
                    </div>
                    <div className="form-field-group">
                      <label htmlFor="edit-position">Position / Rank</label>
                      <select
                        id="edit-position"
                        value={form.position}
                        onChange={(e) => setForm({ ...form, position: e.target.value })}
                      >
                        <option value="">— Select Position —</option>
                        {(form.role === 'faculty' ? FACULTY_POSITIONS : STAFF_POSITIONS).map((p) =>
                          <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                {form.role === 'staff' && (
                  <div className="form-field-group">
                    <label htmlFor="edit-office">Office / Unit</label>
                    <input
                      id="edit-office"
                      type="text"
                      value={form.office}
                      placeholder="e.g. Office of the Registrar"
                      onChange={(e) => setForm({ ...form, office: e.target.value })}
                    />
                  </div>
                )}

                {/* Contact + Bio */}
                <div className="form-row-2">
                  <div className="form-field-group">
                    <label htmlFor="edit-email">Email (read-only)</label>
                    <input id="edit-email" type="email" value={user?.email || ''} readOnly className="input-readonly" />
                  </div>
                  <div className="form-field-group">
                    <label htmlFor="edit-phone">Contact Number</label>
                    <input
                      id="edit-phone"
                      type="text"
                      value={form.phone}
                      placeholder="e.g. 0917-123-4567"
                      onChange={(e) => {
                        setForm({ ...form, phone: e.target.value });
                        setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                    />
                    {errors.phone && (
                      <span className="field-error" style={{ color: '#dc2626', fontSize: 12, marginTop: 4, display: 'block' }}>
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-field-group">
                  <label htmlFor="edit-bio">Bio / About</label>
                  <textarea
                    id="edit-bio"
                    rows="3"
                    value={form.bio}
                    placeholder="Tell fellow BulSUans a little about yourself..."
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={'cp-toast' + (toast ? ' show' : '')}>{toast}</div>
    </div>
  );
}
