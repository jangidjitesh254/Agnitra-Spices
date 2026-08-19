import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../App';
import SpiceDoodleLayer from '../components/SpiceDoodles';

function AdminDashboard({ products, orders, fetchOrders, navigateTo }) {
  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('agnitra_admin_logged_in') === 'true';
  });

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  // Dashboard Active Tab
  const [adminTab, setAdminTab] = useState('overview'); // 'overview', 'orders', 'feedbacks', 'products'

  // Data states
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [updatingOrderStatus, setUpdatingOrderStatus] = useState(null);

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const res = await fetch(`${API_BASE_URL}/messages`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Error fetching admin messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchMessages();
      if (fetchOrders) fetchOrders();
    }
  }, [isAdminLoggedIn]);

  // Admin Login Handler
  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginError(null);

    // Verified Admin Credentials
    if (loginEmail.trim().toLowerCase() === 'admin@agnitraspices.com' && loginPassword === 'admin123') {
      localStorage.setItem('agnitra_admin_logged_in', 'true');
      setIsAdminLoggedIn(true);
    } else {
      setLoginError('Invalid Admin Email or Password. Try: admin@agnitraspices.com / admin123');
    }
  };

  const handleQuickFillCredentials = () => {
    setLoginEmail('admin@agnitraspices.com');
    setLoginPassword('admin123');
  };

  // Admin Logout Handler
  const handleAdminLogout = () => {
    localStorage.removeItem('agnitra_admin_logged_in');
    setIsAdminLoggedIn(false);
  };

  // Update Order Status Handler
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingOrderStatus(orderId);
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        if (fetchOrders) fetchOrders();
      } else {
        alert('Failed to update order status');
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    } finally {
      setUpdatingOrderStatus(null);
    }
  };

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + (Number(ord.totalAmount) || 0), 0);
  const processingCount = orders.filter(o => !o.status || o.status === 'Processing').length;
  const shippedCount = orders.filter(o => o.status === 'Shipped').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;

  // Render Admin Login Form if not authenticated
  if (!isAdminLoggedIn) {
    return (
      <div className="section doodle-host" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SpiceDoodleLayer variant="page" doodles={['chakki', 'mortar']} />
        <div className="container" style={{ maxWidth: '440px' }}>
          <div 
            className="animate-fade-in"
            style={{
              background: '#ffffff',
              border: '1.5px solid var(--border-color)',
              borderRadius: '24px',
              padding: '36px 28px',
              boxShadow: '0 16px 40px rgba(37, 29, 24, 0.08)',
              textAlign: 'center'
            }}
          >
            {/* Admin Badge Header */}
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #1b3017 0%, #273b22 100%)', color: '#d4af37', fontSize: '1.8rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 6px 16px rgba(27, 48, 23, 0.2)' }}>
              🛡️
            </div>
            
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.6rem', color: '#1b3017', marginBottom: '6px' }}>
              Agnitra Admin Portal
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '25px' }}>
              Sign in with your administrative credentials to manage orders, products & customer feedbacks.
            </p>

            {loginError && (
              <div style={{ background: 'rgba(200, 62, 45, 0.1)', border: '1px solid var(--accent-red)', color: 'var(--accent-red)', padding: '12px', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '20px' }}>
                ⚠️ {loginError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} style={{ textAlign: 'left' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="admin-email">Admin Email ID</label>
                <input 
                  type="email" 
                  id="admin-email"
                  className="form-input"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@agnitraspices.com"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '22px' }}>
                <label className="form-label" htmlFor="admin-password">Password</label>
                <input 
                  type="password" 
                  id="admin-password"
                  className="form-input"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button 
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', borderRadius: '50px', fontWeight: 800, fontSize: '0.95rem' }}
              >
                Sign In To Admin Portal
              </button>
            </form>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed var(--border-color)' }}>
              <button
                type="button"
                onClick={handleQuickFillCredentials}
                style={{
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  background: 'rgba(189, 89, 60, 0.08)',
                  color: 'var(--accent-orange)',
                  border: '1px solid rgba(189, 89, 60, 0.25)',
                  borderRadius: '50px',
                  padding: '6px 16px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                ⚡ Quick Fill Admin Credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logged In Admin Dashboard View
  return (
    <div className="admin-dashboard-page section doodle-host">
      <SpiceDoodleLayer variant="page" doodles={['chakki', 'peppercorn', 'mortar', 'starAnise']} />
      <div className="container">
        
        {/* Top Header Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '30px', background: 'linear-gradient(135deg, #1b3017 0%, #273b22 100%)', padding: '24px 28px', borderRadius: '20px', color: '#ffffff', boxShadow: '0 10px 30px rgba(27, 48, 23, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#d4af37', color: '#1b3017', fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🛡️
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-title)', fontSize: '1.6rem', color: '#ffffff', margin: 0 }}>
                Agnitra Spices Control Center
              </h1>
              <p style={{ fontSize: '0.84rem', color: '#d5cbbd', margin: 0 }}>
                Logged in as <strong>admin@agnitraspices.com</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              type="button" 
              onClick={() => { fetchMessages(); if (fetchOrders) fetchOrders(); }}
              style={{
                appearance: 'none',
                WebkitAppearance: 'none',
                background: 'rgba(255,255,255,0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '50px',
                padding: '8px 16px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>🔄 Refresh Data</span>
            </button>
            
            <button 
              type="button" 
              onClick={handleAdminLogout}
              style={{
                appearance: 'none',
                WebkitAppearance: 'none',
                background: '#bd593c',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50px',
                padding: '8px 18px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Logout Admin
            </button>
          </div>
        </div>

        {/* 1. Overview Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '35px' }}>
          
          {/* Card 1: Total Revenue */}
          <div style={{ background: '#ffffff', border: '1.5px solid var(--border-color)', borderRadius: '18px', padding: '22px', boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Revenue
            </span>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.9rem', color: '#1b3017', marginTop: '6px', marginBottom: '4px' }}>
              ₹{totalRevenue}
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-green)', fontWeight: 700 }}>
              Live Neon DB Sync
            </span>
          </div>

          {/* Card 2: Total Orders */}
          <div style={{ background: '#ffffff', border: '1.5px solid var(--border-color)', borderRadius: '18px', padding: '22px', boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Orders
            </span>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.9rem', color: 'var(--accent-orange)', marginTop: '6px', marginBottom: '4px' }}>
              {orders.length}
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {processingCount} Processing • {deliveredCount} Delivered
            </span>
          </div>

          {/* Card 3: Received Feedbacks */}
          <div style={{ background: '#ffffff', border: '1.5px solid var(--border-color)', borderRadius: '18px', padding: '22px', boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Customer Feedbacks
            </span>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.9rem', color: '#f39c12', marginTop: '6px', marginBottom: '4px' }}>
              {messages.length}
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              From Contact & Reviews
            </span>
          </div>

          {/* Card 4: Active Products */}
          <div style={{ background: '#ffffff', border: '1.5px solid var(--border-color)', borderRadius: '18px', padding: '22px', boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Products Catalog
            </span>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.9rem', color: 'var(--accent-gold)', marginTop: '6px', marginBottom: '4px' }}>
              {products.length}
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-green)', fontWeight: 700 }}>
              100% Stone-Ground Spices
            </span>
          </div>

        </div>

        {/* 2. Admin Navigation Tabs */}
        <div className="account-tab-pills" style={{ marginBottom: '30px' }}>
          <button 
            className={`account-tab-btn ${adminTab === 'overview' ? 'active' : ''}`}
            onClick={() => setAdminTab('overview')}
          >
            <span>📊 Overview & Analytics</span>
          </button>
          
          <button 
            className={`account-tab-btn ${adminTab === 'orders' ? 'active' : ''}`}
            onClick={() => setAdminTab('orders')}
          >
            <span>🛍️ Orders & Transactions ({orders.length})</span>
          </button>

          <button 
            className={`account-tab-btn ${adminTab === 'feedbacks' ? 'active' : ''}`}
            onClick={() => setAdminTab('feedbacks')}
          >
            <span>💬 Customer Feedbacks ({messages.length})</span>
          </button>

          <button 
            className={`account-tab-btn ${adminTab === 'products' ? 'active' : ''}`}
            onClick={() => setAdminTab('products')}
          >
            <span>🌶️ Spice Inventory ({products.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {adminTab === 'overview' && (
          <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
            {/* Order Status Breakdown */}
            <div style={{ background: '#ffffff', border: '1.5px solid var(--border-color)', borderRadius: '20px', padding: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.3rem', color: '#1b3017', marginBottom: '18px' }}>
                Order Fulfillment Status
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(243, 156, 18, 0.08)', padding: '14px 18px', borderRadius: '12px' }}>
                  <span style={{ fontWeight: 700, color: '#d68910', fontSize: '0.92rem' }}>Processing Orders</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#d68910' }}>{processingCount}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(41, 128, 185, 0.08)', padding: '14px 18px', borderRadius: '12px' }}>
                  <span style={{ fontWeight: 700, color: '#2980b9', fontSize: '0.92rem' }}>Shipped Orders</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2980b9' }}>{shippedCount}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(54, 82, 39, 0.08)', padding: '14px 18px', borderRadius: '12px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--accent-green)', fontSize: '0.92rem' }}>Delivered Orders</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-green)' }}>{deliveredCount}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div style={{ background: '#ffffff', border: '1.5px solid var(--border-color)', borderRadius: '20px', padding: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.3rem', color: '#1b3017', marginBottom: '18px' }}>
                Quick Admin Actions
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setAdminTab('orders')}
                  className="btn btn-secondary"
                  style={{ justifyContent: 'flex-start', padding: '14px 18px', fontSize: '0.92rem' }}
                >
                  📦 Manage Customer Orders ({orders.length})
                </button>
                <button
                  type="button"
                  onClick={() => setAdminTab('feedbacks')}
                  className="btn btn-secondary"
                  style={{ justifyContent: 'flex-start', padding: '14px 18px', fontSize: '0.92rem' }}
                >
                  💬 View Customer Reviews & Feedback ({messages.length})
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('shop')}
                  className="btn btn-secondary"
                  style={{ justifyContent: 'flex-start', padding: '14px 18px', fontSize: '0.92rem' }}
                >
                  🛍️ View Live Customer Shop Page
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS & TRANSACTIONS */}
        {adminTab === 'orders' && (
          <div className="animate-fade-in">
            <div style={{ background: '#ffffff', border: '1.5px solid var(--border-color)', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', color: '#1b3017', marginBottom: '20px' }}>
                Customer Orders & Fulfillment Database
              </h3>

              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
                  <p>No orders placed yet in database.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <th style={{ padding: '12px' }}>Order ID</th>
                        <th style={{ padding: '12px' }}>Customer Info</th>
                        <th style={{ padding: '12px' }}>Destination</th>
                        <th style={{ padding: '12px' }}>Items</th>
                        <th style={{ padding: '12px' }}>Amount</th>
                        <th style={{ padding: '12px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((ord) => (
                        <tr key={ord.orderId || ord.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                          <td style={{ padding: '14px 12px', fontWeight: 800, color: 'var(--accent-orange)' }}>
                            {ord.orderId || ord.id}
                          </td>
                          <td style={{ padding: '14px 12px' }}>
                            <div style={{ fontWeight: 700 }}>{ord.customer?.name || 'Customer'}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{ord.customer?.email}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{ord.customer?.phone}</div>
                          </td>
                          <td style={{ padding: '14px 12px', maxWidth: '200px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                            {ord.customer?.address}, {ord.customer?.city} - {ord.customer?.zipCode}
                          </td>
                          <td style={{ padding: '14px 12px' }}>
                            {ord.items && ord.items.map((it, idx) => (
                              <div key={idx} style={{ fontSize: '0.82rem' }}>
                                • {it.name} (x{it.quantity})
                              </div>
                            ))}
                          </td>
                          <td style={{ padding: '14px 12px', fontWeight: 800, color: '#1b3017' }}>
                            ₹{ord.totalAmount}
                          </td>
                          <td style={{ padding: '14px 12px' }}>
                            <select
                              value={ord.status || 'Processing'}
                              disabled={updatingOrderStatus === (ord.orderId || ord.id)}
                              onChange={(e) => handleStatusChange(ord.orderId || ord.id, e.target.value)}
                              style={{
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                padding: '6px 12px',
                                borderRadius: '50px',
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                border: '1.5px solid transparent',
                                background: (ord.status === 'Delivered') ? 'rgba(54, 82, 39, 0.12)' : (ord.status === 'Shipped') ? 'rgba(41, 128, 185, 0.12)' : 'rgba(243, 156, 18, 0.12)',
                                color: (ord.status === 'Delivered') ? 'var(--accent-green)' : (ord.status === 'Shipped') ? '#2980b9' : '#d68910'
                              }}
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER FEEDBACKS & REVIEWS */}
        {adminTab === 'feedbacks' && (
          <div className="animate-fade-in">
            <div style={{ background: '#ffffff', border: '1.5px solid var(--border-color)', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', color: '#1b3017', margin: 0 }}>
                  Received Customer Feedbacks & Contact Inquiries
                </h3>
                <span style={{ fontSize: '0.85rem', background: 'rgba(27, 48, 23, 0.08)', color: '#1b3017', padding: '4px 14px', borderRadius: '50px', fontWeight: 800 }}>
                  Total: {messages.length}
                </span>
              </div>

              {loadingMessages ? (
                <div className="loading-spinner"></div>
              ) : messages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
                  <p>No customer feedbacks submitted yet.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      style={{
                        background: '#faf6ee',
                        border: '1.5px solid var(--border-color)',
                        borderRadius: '16px',
                        padding: '20px',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-orange) 0%, var(--accent-red) 100%)', color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {msg.name ? msg.name[0].toUpperCase() : 'C'}
                          </div>
                          <div>
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{msg.name}</h4>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{msg.email} {msg.phone ? `• ${msg.phone}` : ''}</span>
                          </div>
                        </div>

                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </div>

                      {msg.subject && (
                        <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-orange)', marginBottom: '6px' }}>
                          {msg.subject}
                        </h5>
                      )}

                      <p style={{ fontSize: '0.9rem', color: '#273b22', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SPICE INVENTORY */}
        {adminTab === 'products' && (
          <div className="animate-fade-in">
            <div style={{ background: '#ffffff', border: '1.5px solid var(--border-color)', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', color: '#1b3017', marginBottom: '20px' }}>
                Spice Catalog & Stock Management
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '12px' }}>Product</th>
                      <th style={{ padding: '12px' }}>Category</th>
                      <th style={{ padding: '12px' }}>Traditional Method</th>
                      <th style={{ padding: '12px' }}>Price</th>
                      <th style={{ padding: '12px' }}>Unit</th>
                      <th style={{ padding: '12px' }}>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((prod) => (
                      <tr key={prod.id || prod._id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                        <td style={{ padding: '14px 12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={prod.image} alt={prod.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{prod.name}</span>
                        </td>
                        <td style={{ padding: '14px 12px', color: 'var(--text-secondary)' }}>{prod.category}</td>
                        <td style={{ padding: '14px 12px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{prod.traditionalMethod || prod.traditional_method}</td>
                        <td style={{ padding: '14px 12px', fontWeight: 800, color: '#1b3017' }}>₹{prod.price}</td>
                        <td style={{ padding: '14px 12px', color: 'var(--text-secondary)' }}>{prod.unit || '100g'}</td>
                        <td style={{ padding: '14px 12px' }}>
                          <span style={{ background: 'rgba(54, 82, 39, 0.12)', color: 'var(--accent-green)', padding: '4px 12px', borderRadius: '50px', fontWeight: 800, fontSize: '0.78rem' }}>
                            {prod.stock || 100} units
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;
