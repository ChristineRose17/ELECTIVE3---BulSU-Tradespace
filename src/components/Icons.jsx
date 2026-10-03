const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
export const Sparkle = ({ cls }) => (
  <svg className={cls} viewBox="0 0 24 24"><path d="M12 0 C12 6.63 17.37 12 24 12 C17.37 12 12 17.37 12 24 C12 17.37 6.63 12 0 12 C6.63 12 12 6.63 12 0 Z" /></svg>
);
export const Arrow = ({ cls = 'icon-arrow-right' }) => (
  <svg className={cls} viewBox="0 0 24 24" {...S} strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);
export const Back = () => (
  <svg viewBox="0 0 24 24" {...S} style={{ width: '1em', height: '1em', verticalAlign: '-0.125em' }}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);
export const Check = () => (
  <svg className="icon-check" viewBox="0 0 24 24" {...S} strokeWidth="3.5"><polyline points="20 6 9 17 4 12" /></svg>
);
export const User = ({ cls = 'icon-user' }) => (
  <svg className={cls} viewBox="0 0 24 24" {...S}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
export const Lock = ({ cls = 'icon-lock' }) => (
  <svg className={cls} viewBox="0 0 24 24" {...S}><path d="M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);
export const Mail = () => (
  <svg className="icon-mail" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
);
export const Cap = () => (
  <svg className="icon-grad-cap" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" /></svg>
);
