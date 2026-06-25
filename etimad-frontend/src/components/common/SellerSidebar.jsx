import { NavLink } from 'react-router-dom';

export default function SellerSidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-mark">E</div>
        <div className="brand-text">
          <span class="name">Etimad</span>
          <span class="role">Seller Panel</span>
        </div>
        <button className="sidebar-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Overview</div>
        <NavLink 
          to="/seller" 
          end 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="9" rx="1.5" />
            <rect x="14" y="3" width="7" height="5" rx="1.5" />
            <rect x="14" y="12" width="7" height="9" rx="1.5" />
            <rect x="3" y="16" width="7" height="5" rx="1.5" />
          </svg>
          Dashboard
        </NavLink>
        <NavLink 
          to="/seller/orders" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 7h18l-1.5 12.5a2 2 0 0 1-2 1.5h-11a2 2 0 0 1-2-1.5L3 7Z" />
            <path d="M8 7V5a4 4 0 0 1 8 0v2" />
          </svg>
          Orders
        </NavLink>

        <div className="sidebar-section-label">Catalog</div>
        <NavLink 
          to="/seller/products" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2M3 8l1.5 11a1.5 1.5 0 0 0 1.5 1.3h12a1.5 1.5 0 0 0 1.5-1.3L21 8M3 8h18" />
            <path d="M9 12h6" />
          </svg>
          Manage Products
        </NavLink>

        <div className="sidebar-section-label">Performance</div>
        <NavLink 
          to="/seller/earnings" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v10M9.5 9.5c0-1.4 1.2-2.3 2.5-2.3 1.6 0 2.5 1 2.5 2 0 2.5-5 1.7-5 4.3 0 1 .9 2 2.5 2 1.3 0 2.5-.9 2.5-2.3" />
          </svg>
          Earnings
        </NavLink>

        <div className="sidebar-section-label">Account</div>
        <NavLink 
          to="/seller/profile" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
          </svg>
          Profile
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="upgrade-card">
          <div className="t">Need help?</div>
          <div className="d">Our support team replies in under 10 minutes, every day.</div>
          <button onClick={() => alert("Support is available at support@etimad.com")}>Contact Support</button>
        </div>
      </div>
    </aside>
  );
}