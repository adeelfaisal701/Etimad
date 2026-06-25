import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import BuyerSidebar from '../components/common/BuyerSidebar';
import SellerSidebar from '../components/common/SellerSidebar';
import AdminSidebar from '../components/common/AdminSidebar';
import { useAuth } from '../context/AuthContext';
import '../dashboard.css';

export default function DashboardLayout({ role = 'buyer' }) {
  const { logout, user, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setDropdownOpen(false);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSwitchAccount = async (targetRole) => {
    if (user?.role === targetRole) return;
    try {
      const updatedUser = await switchRole();
      if (updatedUser.role === 'buyer') {
        navigate('/buyer-dashboard');
      } else if (updatedUser.role === 'seller') {
        navigate('/seller');
      }
    } catch (err) {
      alert("Failed to switch account");
    }
  };

  const getInitials = (name) => {
    if (!name) return "AH";
    const parts = name.split(" ");
    return parts.map(p => p[0]).join("").substring(0, 2).toUpperCase();
  };

  // Dynamic Page Title and Breadcrumb
  const getPageMeta = () => {
    const path = location.pathname;
    const panel = role === 'seller' ? 'Seller Panel' : role === 'admin' ? 'Admin Panel' : 'Buyer Panel';
    
    if (path === '/buyer-dashboard' || path === '/buyer-dashboard/' || path === '/seller' || path === '/seller/' || path === '/admin' || path === '/admin/') {
      return { title: 'Dashboard', breadcrumb: `${panel} / Overview` };
    }
    if (path.includes('/orders')) {
      return { title: role === 'buyer' ? 'My Orders' : 'Orders', breadcrumb: `${panel} / Orders` };
    }
    if (path.includes('/earnings')) {
      return { title: 'Earnings', breadcrumb: `${panel} / Earnings` };
    }
    if (path.includes('/products')) {
      return { title: 'Products', breadcrumb: `${panel} / Products` };
    }
    if (path.includes('/profile')) {
      return { title: 'Profile', breadcrumb: `${panel} / Profile` };
    }
    if (path.includes('/chat')) {
      return { title: 'Messages', breadcrumb: `${panel} / Messages` };
    }
    if (path.includes('/add-product')) {
      return { title: 'Add Product', breadcrumb: `${panel} / Add Product` };
    }
    return { title: 'Dashboard', breadcrumb: `${panel} / Overview` };
  };

  const { title, breadcrumb } = getPageMeta();

  const sidebarMap = {
    buyer: <BuyerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />,
    seller: <SellerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />,
    admin: <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
  };

  return (
    <div className="dashboard-root">
      {/* Mobile Sidebar backdrop scrim */}
      <div 
        className={`scrim ${sidebarOpen ? 'show' : ''}`} 
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div className="app-shell">
        {/* Sidebar */}
        {sidebarMap[role]}

        {/* Main Column */}
        <div className="main">
          {/* Top Bar */}
          <header className="topbar">
            <div className="topbar-left">
              <button 
                className="menu-toggle" 
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(true);
                }}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </button>
              <div>
                <div className="page-title">{title}</div>
                <div className="breadcrumb">{breadcrumb}</div>
              </div>
            </div>

            <div className="search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input type="text" placeholder="Search orders, products, buyers..." />
            </div>

            <div className="topbar-right">
              <div className="role-pill">
                <span className="dot"></span>
                <span>{role === 'seller' ? 'Seller Mode' : role === 'admin' ? 'Admin Mode' : 'Buyer Mode'}</span>
              </div>

              <button className="icon-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                </svg>
                <span className="icon-dot"></span>
              </button>

              <button className="icon-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 11.5a8.5 8.5 0 1 1-3.8-7.1L21 3l-1 4.3a8.5 8.5 0 0 1 1 4.2Z" />
                </svg>
                <span className="icon-dot"></span>
              </button>

              {/* Account Dropdown wrap */}
              <div className="account-wrap" onClick={(e) => e.stopPropagation()}>
                <button 
                  className={`account-trigger ${dropdownOpen ? 'open' : ''}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="avatar">{getInitials(user?.name)}</div>
                  <div className="account-meta">
                    <span className="nm">{user?.name || 'Ahmed Hassan'}</span>
                    <span className="rl">{role === 'seller' ? 'Seller Account' : role === 'admin' ? 'Admin Account' : 'Buyer Account'}</span>
                  </div>
                  <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <div className={`account-dropdown ${dropdownOpen ? 'show' : ''}`}>
                  <div className="dropdown-head">
                    <div className="avatar">{getInitials(user?.name)}</div>
                    <div>
                      <div className="nm">{user?.name || 'Ahmed Hassan'}</div>
                      <div className="em">{user?.email || 'ahmed.hassan@etimad.pk'}</div>
                    </div>
                  </div>

                  {user && user.role !== 'admin' && (
                    <>
                      <div className="dropdown-section-label">Switch account</div>
                      <div 
                        className={`dropdown-item ${role === 'seller' ? 'current' : ''}`} 
                        onClick={() => {
                          setDropdownOpen(false);
                          handleSwitchAccount('seller');
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M3 7h18l-1.5 12.5a2 2 0 0 1-2 1.5h-11a2 2 0 0 1-2-1.5L3 7Z" />
                          <path d="M8 7V5a4 4 0 0 1 8 0v2" />
                        </svg>
                        Seller Dashboard
                        {role === 'seller' && (
                          <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                      <div 
                        className={`dropdown-item ${role === 'buyer' ? 'current' : ''}`} 
                        onClick={() => {
                          setDropdownOpen(false);
                          handleSwitchAccount('buyer');
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="9" cy="20" r="1.4" />
                          <circle cx="18" cy="20" r="1.4" />
                          <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 8H6" />
                        </svg>
                        Buyer Dashboard
                        {role === 'buyer' && (
                          <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                      <div className="dropdown-divider"></div>
                    </>
                  )}

                  <div className="dropdown-section-label">Account</div>
                  <div 
                    className="dropdown-item" 
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate(role === 'seller' ? '/seller/profile' : '/buyer-dashboard/profile');
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                    </svg>
                    View Profile
                  </div>
                  <div className="dropdown-divider"></div>
                  <div 
                    className="dropdown-item danger" 
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <path d="M16 17l5-5-5-5" />
                      <path d="M21 12H9" />
                    </svg>
                    Log Out
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}