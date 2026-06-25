import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import BuyerSidebar from '../components/common/BuyerSidebar';
import SellerSidebar from '../components/common/SellerSidebar';
import AdminSidebar from '../components/common/AdminSidebar';
import { useAuth } from '../context/AuthContext';
import socket from '../socket';
import API from '../api/axios';
import '../dashboard.css';

export default function DashboardLayout({ role = 'buyer' }) {
  const { logout, user, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Notification system states
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activities, setActivities] = useState([]);
  const [activePanel, setActivePanel] = useState(null); // 'notifications', 'activities', or null

  // Fetch functions
  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to load notifications:", err);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const res = await API.get("/notifications/unread-count");
      setUnreadCount(res.data.unreadCount);
    } catch (err) {
      console.error("Failed to load unread count:", err);
    }
  };

  const fetchActivities = async () => {
    try {
      const res = await API.get("/activities");
      setActivities(res.data);
    } catch (err) {
      console.error("Failed to load activities:", err);
    }
  };

  // Notification action handlers
  const handleMarkAsRead = async (notifId, isRead) => {
    if (isRead) return;
    try {
      await API.put(`/notifications/${notifId}/read`);
      setNotifications(prev =>
        prev.map(n => (n._id === notifId ? { ...n, isRead: true } : n))
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await API.put("/notifications/mark-all-read");
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const handleDeleteNotification = async (notifId, isRead) => {
    try {
      await API.delete(`/notifications/${notifId}`);
      setNotifications(prev => prev.filter(n => n._id !== notifId));
      if (!isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setDropdownOpen(false);
      setActivePanel(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // Socket and initial count hook
  useEffect(() => {
    if (user?._id) {
      // Connect to personal socket room
      socket.emit("joinUser", user._id);

      // Listen for notifications
      socket.on("newNotification", (notif) => {
        setNotifications(prev => [notif, ...prev]);
        setUnreadCount(prev => prev + 1);
      });
    }

    fetchUnreadCount();

    return () => {
      socket.off("newNotification");
    };
  }, [user]);

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

  // Notification Icon selection
  const getNotificationIcon = (type) => {
    switch (type) {
      case "New Order":
        return {
          bg: "var(--success-bg)",
          color: "var(--success)",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
            </svg>
          )
        };
      case "Order Shipped":
        return {
          bg: "var(--info-bg)",
          color: "var(--info)",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          )
        };
      case "Order Delivered":
        return {
          bg: "var(--success-bg)",
          color: "var(--success)",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )
        };
      case "New Product Review":
        return {
          bg: "var(--gold-dim)",
          color: "var(--gold)",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          )
        };
      case "New Message":
        return {
          bg: "var(--info-bg)",
          color: "var(--info)",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )
        };
      case "Account Updates":
        return {
          bg: "var(--warn-bg)",
          color: "var(--warn)",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )
        };
      default:
        return {
          bg: "var(--danger-bg)",
          color: "var(--danger)",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )
        };
    }
  };

  // Activity Icon selection
  const getActivityIcon = (type) => {
    switch (type) {
      case "Login":
        return {
          bg: "var(--info-bg)",
          color: "var(--info)",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          )
        };
      case "Product Update":
        return {
          bg: "var(--gold-dim)",
          color: "var(--gold)",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          )
        };
      case "Order Activity":
        return {
          bg: "var(--success-bg)",
          color: "var(--success)",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          )
        };
      case "Profile Update":
        return {
          bg: "var(--warn-bg)",
          color: "var(--warn)",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          )
        };
      default:
        return {
          bg: "var(--danger-bg)",
          color: "var(--danger)",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M12 6v6l4 2" />
            </svg>
          )
        };
    }
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

            <div className="topbar-right" style={{ position: "relative" }}>
              <div className="role-pill">
                <span className="dot"></span>
                <span>{role === 'seller' ? 'Seller Mode' : role === 'admin' ? 'Admin Mode' : 'Buyer Mode'}</span>
              </div>

              {/* Notification Bell Icon */}
              <button 
                className="icon-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(false);
                  setActivePanel(activePanel === 'notifications' ? null : 'notifications');
                  fetchNotifications();
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                </svg>
                {unreadCount > 0 && <span className="icon-badge">{unreadCount}</span>}
              </button>

              {/* Activity Circle Loop Icon */}
              <button 
                className="icon-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(false);
                  setActivePanel(activePanel === 'activities' ? null : 'activities');
                  fetchActivities();
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
                <span className="icon-dot"></span>
              </button>

              {/* Dropdown 1: Notifications Dropdown Panel */}
              <div 
                className={`dropdown-panel ${activePanel === 'notifications' ? 'show' : ''}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="dropdown-panel-header">
                  <span className="dropdown-panel-title">Notifications</span>
                  {notifications.some(n => !n.isRead) && (
                    <span 
                      className="dropdown-panel-action"
                      onClick={handleMarkAllAsRead}
                    >
                      Mark All Read
                    </span>
                  )}
                </div>
                <div className="dropdown-panel-body">
                  {notifications.length === 0 ? (
                    <div className="dropdown-empty">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                      </svg>
                      <div className="t">No new notifications</div>
                      <div className="d">We'll alert you here when something requires your attention.</div>
                    </div>
                  ) : (
                    notifications.map(n => {
                      const ic = getNotificationIcon(n.type);
                      return (
                        <div 
                          key={n._id} 
                          className={`dropdown-list-item ${n.isRead ? '' : 'unread'}`}
                          onClick={() => handleMarkAsRead(n._id, n.isRead)}
                        >
                          <div className="icon" style={{ background: ic.bg, color: ic.color }}>
                            {ic.svg}
                          </div>
                          <div className="content-wrap">
                            <div className="title">{n.title}</div>
                            <div className="message">{n.message}</div>
                            <div className="time">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                          </div>
                          <div 
                            className="delete-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNotification(n._id, n.isRead);
                            }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Dropdown 2: Activities Dropdown Panel */}
              <div 
                className={`dropdown-panel ${activePanel === 'activities' ? 'show' : ''}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="dropdown-panel-header">
                  <span className="dropdown-panel-title">Activity Center</span>
                </div>
                <div className="dropdown-panel-body">
                  {activities.length === 0 ? (
                    <div className="dropdown-empty">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <div className="t">No recent activity</div>
                      <div className="d">Your account activity feed will show up here.</div>
                    </div>
                  ) : (
                    activities.map(a => {
                      const ic = getActivityIcon(a.type);
                      return (
                        <div key={a._id} className="dropdown-list-item">
                          <div className="icon" style={{ background: ic.bg, color: ic.color }}>
                            {ic.svg}
                          </div>
                          <div className="content-wrap">
                            <div className="title">{a.type}</div>
                            <div className="message">{a.message}</div>
                            <div className="time">{new Date(a.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Account Dropdown wrap */}
              <div className="account-wrap" onClick={(e) => e.stopPropagation()}>
                <button 
                  className={`account-trigger ${dropdownOpen ? 'open' : ''}`}
                  onClick={() => {
                    setActivePanel(null);
                    setDropdownOpen(!dropdownOpen);
                  }}
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