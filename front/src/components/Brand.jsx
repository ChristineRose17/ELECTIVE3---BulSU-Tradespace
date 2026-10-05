import { Link } from 'react-router-dom';
import { LOGO } from '../lib/listing';

export default function Brand() {
  return (
    <>
      <Link to="/" className="brand_logo" aria-label="BulSU TradeSpace Home">
        <img src={LOGO} alt="BulSU Logo" className="brand-logo-img" />
      </Link>
      <div className="brand-text">
        <div className="brand-title-row">
          <span className="brand-name">BulSU TradeSpace</span>
          <span className="badge-campus">MENESES</span>
        </div>
        <span className="brand-sub">Bulacan State University</span>
      </div>
    </>
  );
}
