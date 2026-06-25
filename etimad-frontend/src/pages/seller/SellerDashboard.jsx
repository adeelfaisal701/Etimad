import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function SellerDashboard() {
  const [data, setData] = useState({});
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    // Fetch stats
    API.get("/dashboard/seller")
      .then(res => setData(res.data))
      .catch(err => console.error("Error loading seller dashboard stats:", err));

    // Fetch products to count them
    API.get("/products/my")
      .then(res => setProductsCount(res.data.length))
      .catch(err => console.error("Error loading products count:", err));
  }, []);

  return (
    <div className="view active">
      {/* Stat Grid Row 1 */}
      <div className="stat-grid">
        {/* Total Products */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon gold">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2M3 8l1.5 11a1.5 1.5 0 0 0 1.5 1.3h12a1.5 1.5 0 0 0 1.5-1.3L21 8M3 8h18" />
              </svg>
            </div>
            <span className="stat-trend up">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M17 7 7 17M17 7H8M17 7v9" />
              </svg>
              Active
            </span>
          </div>
          <div className="stat-label">Total Products</div>
          <div className="stat-value tabular">{productsCount}</div>
          <div className="stat-foot">Items in your catalog</div>
        </div>

        {/* Total Orders */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 7h18l-1.5 12.5a2 2 0 0 1-2 1.5h-11a2 2 0 0 1-2-1.5L3 7Z" />
                <path d="M8 7V5a4 4 0 0 1 8 0v2" />
              </svg>
            </div>
            <span className="stat-trend up">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M17 7 7 17M17 7H8M17 7v9" />
              </svg>
              All time
            </span>
          </div>
          <div className="stat-label">Total Orders</div>
          <div className="stat-value tabular">{data.totalOrders || 0}</div>
          <div className="stat-foot">Customer orders placed</div>
        </div>

        {/* Processing Orders */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon red">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            </div>
            <span className="stat-trend down">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M17 17 7 7M17 17H8M17 17V8" />
              </svg>
              Pending
            </span>
          </div>
          <div className="stat-label">Processing Orders</div>
          <div className="stat-value tabular">{data.processing || 0}</div>
          <div className="stat-foot">Requires package fulfillment</div>
        </div>

        {/* Shipped Orders */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <span className="stat-trend up">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M17 7 7 17M17 7H8M17 7v9" />
              </svg>
              Transit
            </span>
          </div>
          <div className="stat-label">Shipped Orders</div>
          <div className="stat-value tabular">{data.shipped || 0}</div>
          <div className="stat-foot">Packages on their way</div>
        </div>
      </div>

      {/* Stat Grid Row 2 */}
      <div className="stat-grid" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: "24px" }}>
        {/* Delivered Orders */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          </div>
          <div className="stat-label">Delivered Orders</div>
          <div className="stat-value tabular">{data.delivered || 0}</div>
          <div className="stat-foot">Successfully dropped off</div>
        </div>

        {/* Completed Orders */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon gold">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l2.6 6.6L21 9l-5 4.5 1.5 7.5L12 17l-5.5 4 1.5-7.5L3 9l6.4-.4z" />
              </svg>
            </div>
          </div>
          <div className="stat-label">Completed Orders</div>
          <div className="stat-value tabular">{data.completed || 0}</div>
          <div className="stat-foot">Payout released to account</div>
        </div>
      </div>

      {/* Revenue and Goal Row */}
      <div className="stat-grid" style={{ gridTemplateColumns: "1.4fr 1fr", marginBottom: "24px" }}>
        {/* Total Earnings Card */}
        <div className="stat-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
          <div>
            <div className="stat-label">Total Earnings</div>
            <div className="stat-value tabular">Rs. {Number(data.totalEarnings || 0).toLocaleString()}</div>
            <div className="stat-foot">
              <span style={{ color: "var(--success)", fontWeight: 700 }}>▲ Net Payouts</span> — Seller account balance
            </div>
          </div>
          <div style={{ width: "160px", flexShrink: 0 }}>
            <svg viewBox="0 0 160 56" width="160" height="56">
              <polyline points="0,40 20,36 40,38 60,28 80,30 100,18 120,20 140,8 160,10" fill="none" stroke="#1F9D6F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <polygon points="0,40 20,36 40,38 60,28 80,30 100,18 120,20 140,8 160,10 160,56 0,56" fill="#1F9D6F" opacity="0.08" />
            </svg>
          </div>
        </div>

        {/* Monthly Sales Goal Card */}
        <div className="stat-card">
          <div className="stat-label">Monthly Sales Goal</div>
          <div className="stat-value tabular">
            Rs. {Number(data.totalEarnings || 0).toLocaleString()}
            <span style={{ fontSize: "14px", color: "var(--text-faint)", fontWeight: 600 }}> / 100,000</span>
          </div>
          <div className="tp-bar-track" style={{ marginTop: "12px" }}>
            <div 
              className="tp-bar-fill" 
              style={{ width: `${Math.min(100, ((data.totalEarnings || 0) / 100000) * 100)}%` }}
            ></div>
          </div>
          <div className="stat-foot">
            {Math.round(Math.min(100, ((data.totalEarnings || 0) / 100000) * 100))}% of monthly target reached
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Revenue Overview chart */}
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Revenue Overview</h3>
              <div className="sub">Earnings across the last 7 months</div>
            </div>
            <div className="seg-tabs">
              <span className="seg-tab active">7M</span>
              <span className="seg-tab">3M</span>
              <span className="seg-tab">1Y</span>
            </div>
          </div>
          <div className="card-body">
            <svg viewBox="0 0 560 220" width="100%" height="220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C8902A" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#C8902A" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g stroke="#EAE7E0" strokeWidth="1">
                <line x1="0" y1="20" x2="560" y2="20" />
                <line x1="0" y1="68" x2="560" y2="68" />
                <line x1="0" y1="116" x2="560" y2="116" />
                <line x1="0" y1="164" x2="560" y2="164" />
                <line x1="0" y1="200" x2="560" y2="200" />
              </g>
              <polygon points="10,150 90,140 170,160 250,110 330,120 410,70 490,85 550,40 550,200 10,200" fill="url(#revFill)" />
              <polyline points="10,150 90,140 170,160 250,110 330,120 410,70 490,85 550,40" fill="none" stroke="#C8902A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <g fill="#C8902A">
                <circle cx="10" cy="150" r="4" /><circle cx="90" cy="140" r="4" /><circle cx="170" cy="160" r="4" />
                <circle cx="250" cy="110" r="4" /><circle cx="330" cy="120" r="4" /><circle cx="410" cy="70" r="4" />
                <circle cx="490" cy="85" r="4" /><circle cx="550" cy="40" r="5" stroke="#fff" strokeWidth="2" />
              </g>
              <g fontFamily="Inter" fontSize="11" fill="#9CA3AF">
                <text x="10" y="216">Jan</text><text x="86" y="216">Feb</text><text x="162" y="216">Mar</text>
                <text x="242" y="216">Apr</text><text x="322" y="216">May</text><text x="402" y="216">Jun</text><text x="482" y="216">Jul</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Store Activities / Notifications */}
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Recent Activities</h3>
              <div className="sub">Latest updates on your account</div>
            </div>
          </div>
          <div className="card-body tight">
            <div className="list-item">
              <div className="notif-icon" style={{ background: "var(--success-bg)", color: "var(--success)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <div className="ttl">Orders Monitored</div>
                <div className="desc">Database statistics connected successfully.</div>
                <div className="time">Just now</div>
              </div>
            </div>
            <div className="list-item">
              <div className="notif-icon" style={{ background: "var(--info-bg)", color: "var(--info)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3" />
                </svg>
              </div>
              <div>
                <div className="ttl">Seller Account Connected</div>
                <div className="desc">Switch account controls working correctly.</div>
                <div className="time">5 mins ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}