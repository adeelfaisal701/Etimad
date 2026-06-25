import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function BuyerDashboard() {
  const [data, setData] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch stats
    API.get("/dashboard/buyer")
      .then(res => setData(res.data))
      .catch(err => console.error("Error loading buyer dashboard stats:", err));

    // Fetch orders to display recent activity
    API.get("/orders/buyer")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error loading buyer orders:", err));
  }, []);

  const getStatusClass = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("delivered") || s.includes("completed")) return "delivered";
    if (s.includes("pending")) return "pending";
    if (s.includes("processing")) return "processing";
    if (s.includes("shipped") || s.includes("transit")) return "processing";
    return "cancelled";
  };

  const getLatestOrder = () => {
    return orders[0] || null;
  };

  const latestOrder = getLatestOrder();

  const isStepDone = (status, stepName) => {
    if (!status) return false;
    const states = ["Pending Payment", "Processing", "Shipped", "Delivered", "Completed"];
    const currentIndex = states.indexOf(status);
    
    if (stepName === 'Placed') return currentIndex >= 0;
    if (stepName === 'Processing') return currentIndex >= 1;
    if (stepName === 'Shipped') return currentIndex >= 2;
    if (stepName === 'Received') return currentIndex >= 3;
    return false;
  };

  return (
    <div className="view active">
      {/* Stat Grid */}
      <div className="stat-grid">
        {/* Total Orders Card */}
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
          <div className="stat-foot">Orders placed in your account</div>
        </div>

        {/* Pending Orders Card */}
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
              Needs Action
            </span>
          </div>
          <div className="stat-label">Pending Orders</div>
          <div className="stat-value tabular">{data.pending || 0}</div>
          <div className="stat-foot">Awaiting seller processing</div>
        </div>

        {/* Completed Orders Card */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          </div>
          <div className="stat-label">Completed Orders</div>
          <div className="stat-value tabular">{data.completed || 0}</div>
          <div className="stat-foot">Successfully received items</div>
        </div>

        {/* Commission Card */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon gold">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v10M9.5 9.5c0-1.4 1.2-2.3 2.5-2.3 1.6 0 2.5 1 2.5 2" />
              </svg>
            </div>
          </div>
          <div className="stat-label">Commission Saved</div>
          <div className="stat-value tabular">Rs. 0</div>
          <div className="stat-foot">Platform fees waived</div>
        </div>
      </div>

      {/* Grid 2: Recent Orders & Fulfillment Status */}
      <div className="grid-2">
        {/* Recent Orders List */}
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Recent Orders</h3>
              <div className="sub">Overview of your last purchases</div>
            </div>
          </div>
          <div className="card-body tight">
            {orders.length === 0 ? (
              <div className="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <div className="t">No orders placed yet</div>
                <div className="d">Browse products on the marketplace to place your first order.</div>
              </div>
            ) : (
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Seller</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(o => (
                    <tr key={o._id}>
                      <td className="cell-product">
                        <div className="prod-thumb">📦</div>
                        <div>
                          <div className="pname">{o.product?.name || "Product Name"}</div>
                          <div className="pmeta">Order ID: {o._id.substring(18)}</div>
                        </div>
                      </td>
                      <td>{o.seller?.name || "Verified Seller"}</td>
                      <td className="tabular font-semibold">Rs. {o.amount}</td>
                      <td>
                        <span className={`badge ${getStatusClass(o.status)}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Fulfillment Timeline for the Latest Order */}
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Order Tracking</h3>
              <div className="sub">Realtime status of your last purchase</div>
            </div>
          </div>
          <div className="card-body">
            {latestOrder ? (
              <div style={{ padding: "10px 0" }}>
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--text)" }}>
                    {latestOrder.product?.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-faint)", marginTop: "4px" }}>
                    Total: Rs. {latestOrder.amount} | Seller: {latestOrder.seller?.name}
                  </div>
                </div>

                <div className="track-timeline">
                  <div className={`track-step ${isStepDone(latestOrder.status, 'Placed') ? 'done' : ''}`}>
                    <div className="dot">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="line"></div>
                    <div className="lbl">Placed</div>
                    <div className="sub">Confirmed</div>
                  </div>

                  <div className={`track-step ${isStepDone(latestOrder.status, 'Processing') ? 'done' : ''}`}>
                    <div className="dot">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="line"></div>
                    <div className="lbl">Fulfilling</div>
                    <div className="sub">In Progress</div>
                  </div>

                  <div className={`track-step ${isStepDone(latestOrder.status, 'Shipped') ? 'done' : ''}`}>
                    <div className="dot">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="line"></div>
                    <div className="lbl">Shipped</div>
                    <div className="sub">In Transit</div>
                  </div>

                  <div className={`track-step ${isStepDone(latestOrder.status, 'Received') ? 'done' : ''}`}>
                    <div className="dot">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="lbl">Completed</div>
                    <div className="sub">Delivered</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div className="t">No active shipments</div>
                <div className="d">Once you purchase a product, its shipping status will be tracked here.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}