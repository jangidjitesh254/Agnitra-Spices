import { useState, useEffect } from 'react';

function Account({ orders, navigateTo }) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'orders'
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // Default initial profile data
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('agnitra_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback if parsing fails
      }
    }
    return {
      name: 'Jitesh Jangid',
      email: 'jitesh@agnitraspices.com',
      phone: '+91 98765 43210',
      address: 'Plot 45, Heritage Colony, Mansarovar',
      city: 'Jaipur',
      state: 'Rajasthan',
      zipCode: '302020'
    };
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFetchGPSLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser. Please enter your address manually below.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          
          if (data && data.address) {
            const addr = data.address;
            const road = addr.road || addr.suburb || addr.neighbourhood || '';
            const house = addr.house_number || addr.building || '';
            const streetAddr = [house, road, addr.suburb].filter(Boolean).join(', ') || data.display_name.split(',')[0];
            const city = addr.city || addr.town || addr.village || addr.county || 'Jaipur';
            const state = addr.state || 'Rajasthan';
            const postcode = addr.postcode || '';

            setProfile(prev => ({
              ...prev,
              address: streetAddr || prev.address,
              city: city || prev.city,
              state: state || prev.state,
              zipCode: postcode || prev.zipCode
            }));
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 4000);
          } else {
            setProfile(prev => ({
              ...prev,
              address: `GPS Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
            }));
          }
        } catch (err) {
          console.error('Reverse geocode error:', err);
          setProfile(prev => ({
            ...prev,
            address: `GPS Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
          }));
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location permission denied by browser. You can write your address manually below.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable. Please write your address manually below.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please enter address manually below.');
            break;
          default:
            setLocationError('Could not fetch GPS location. Please enter manually below.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('agnitra_user_profile', JSON.stringify(profile));
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'processing':
        return 'status-processing';
      case 'aroma-locked':
      case 'aroma-sealed':
        return 'status-aroma-locked';
      case 'shipped':
      case 'delivered':
        return 'status-shipped';
      default:
        return 'status-processing';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'processing':
        return 'Processing Batch';
      case 'aroma-locked':
      case 'aroma-sealed':
        return 'Aroma Sealed';
      case 'shipped':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return status || 'Processing';
    }
  };

  const [currentView, setCurrentView] = useState('dashboard');
  const [orderFilter, setOrderFilter] = useState('all'); 
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const filteredOrders = orders.filter(order => {
    const status = order.status?.toLowerCase() || 'pending';
    if (orderFilter === 'pending') return status === 'pending' || status === 'processing';
    if (orderFilter === 'processing') return status === 'processing' || status === 'aroma-locked' || status === 'aroma-sealed';
    if (orderFilter === 'shipped') return status === 'shipped';
    if (orderFilter === 'delivered') return status === 'delivered';
    return true;
  });

  // User Initials
  const initials = profile.name
    ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'JJ';

  return (
    <div className="account-page section">
      <div className="container" style={{ maxWidth: '640px', padding: '0 12px' }}>

        {currentView === 'dashboard' && (
          <div className="agnitra-profile-wrapper animate-fade-in">
            
            {/* 1. Light Green Botanical Header Card */}
            <div className="agnitra-hero-header">
              <div className="agnitra-header-bar">
                <div className="agnitra-header-logo-group">
                  <div className="agnitra-brand-name">Agnitra Spices</div>
                </div>
              </div>

              <div className="agnitra-profile-row">
                <div className="agnitra-avatar-box">
                  <div className="agnitra-avatar-circle" onClick={() => setCurrentView('profile_edit')} title="Edit Profile Details">
                    <span className="agnitra-avatar-monogram">{initials}</span>
                  </div>
                </div>

                <div className="agnitra-profile-meta">
                  <h1 className="agnitra-user-title">{profile.name}</h1>
                  <p className="agnitra-user-subtitle">{profile.email} • {profile.city || 'Jaipur'}</p>
                </div>
              </div>

              {/* 3 Column Statistics Bar */}
              <div className="agnitra-stats-bar">
                <div className="agnitra-stat-col">
                  <span className="agnitra-stat-value">12</span>
                  <span className="agnitra-stat-label">Products</span>
                </div>
                <div className="agnitra-stat-divider"></div>
                <div className="agnitra-stat-col">
                  <span className="agnitra-stat-value">4.8 ★</span>
                  <span className="agnitra-stat-label">Rating</span>
                </div>
                <div className="agnitra-stat-divider"></div>
                <div className="agnitra-stat-col">
                  <span className="agnitra-stat-value">2.4K</span>
                  <span className="agnitra-stat-label">Happy Customers</span>
                </div>
              </div>
            </div>

            <div className="agnitra-orders-section">
              <div className="agnitra-section-header">
                <h3 className="agnitra-section-title">My Orders</h3>
                <button 
                  type="button" 
                  className="agnitra-view-all-btn"
                  onClick={() => { setCurrentView('orders'); setOrderFilter('all'); }}
                >
                  View All →
                </button>
              </div>

              <div className="agnitra-orders-grid">
                <button 
                  type="button" 
                  className="order-status-card"
                  onClick={() => { setCurrentView('orders'); setOrderFilter('pending'); }}
                >
                  <div className="order-status-icon-box">
                    <span className="status-badge-count">{orders.length || 1}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/></svg>
                  </div>
                  <span className="order-status-label">Pending</span>
                </button>

                <button 
                  type="button" 
                  className="order-status-card"
                  onClick={() => { setCurrentView('orders'); setOrderFilter('processing'); }}
                >
                  <div className="order-status-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="13" x="1" y="3" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  </div>
                  <span className="order-status-label">Processing</span>
                </button>

                <button 
                  type="button" 
                  className="order-status-card"
                  onClick={() => { setCurrentView('orders'); setOrderFilter('shipped'); }}
                >
                  <div className="order-status-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
                  </div>
                  <span className="order-status-label">Shipped</span>
                </button>

                <button 
                  type="button" 
                  className="order-status-card"
                  onClick={() => { setCurrentView('orders'); setOrderFilter('delivered'); }}
                >
                  <div className="order-status-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <span className="order-status-label">Delivered</span>
                </button>
              </div>
            </div>

            <div className="agnitra-menu-card">
              <button 
                type="button" 
                className="agnitra-menu-row"
                onClick={() => setCurrentView('profile_edit')}
              >
                <div className="menu-icon-circle green-soft">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div className="menu-row-info">
                  <span className="menu-row-title">My Profile</span>
                  <span className="menu-row-sub">Manage your personal details</span>
                </div>
                <span className="menu-row-arrow">›</span>
              </button>

              <button 
                type="button" 
                className="agnitra-menu-row"
                onClick={() => setCurrentView('address_edit')}
              >
                <div className="menu-icon-circle green-soft">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <div className="menu-row-info">
                  <span className="menu-row-title">My Addresses</span>
                  <span className="menu-row-sub">{profile.address ? `${profile.address}, ${profile.city}` : 'Delivery locations'}</span>
                </div>
                <span className="menu-row-arrow">›</span>
              </button>

              <button 
                type="button" 
                className="agnitra-menu-row"
                onClick={() => navigateTo('cart')}
              >
                <div className="menu-icon-circle green-soft">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                </div>
                <div className="menu-row-info">
                  <span className="menu-row-title">Payment Methods</span>
                  <span className="menu-row-sub">Secure &amp; easy payments</span>
                </div>
                <span className="menu-row-arrow">›</span>
              </button>

              <button 
                type="button" 
                className="agnitra-menu-row"
                onClick={() => navigateTo('about')}
              >
                <div className="menu-icon-circle green-soft">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
                </div>
                <div className="menu-row-info">
                  <span className="menu-row-title">About Agnitra</span>
                  <span className="menu-row-sub">Our story, mission &amp; quality</span>
                </div>
                <span className="menu-row-arrow">›</span>
              </button>
            </div>

            <div className="agnitra-why-banner" onClick={() => navigateTo('about')}>
              <div className="why-banner-left">
                <div className="why-mortar-icon">🥣</div>
              </div>
              <div className="why-banner-content">
                <h4 className="why-banner-title">Why Agnitra?</h4>
                <p className="why-banner-sub">100% Pure • Naturally Sourced • Traditionally Ground</p>
              </div>
              <span className="why-banner-arrow">›</span>
            </div>

            <div className="agnitra-logout-row">
              <button type="button" className="btn-agnitra-logout" onClick={() => navigateTo('home')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                <span>Logout</span>
              </button>
            </div>

          </div>
        )}

        {(currentView === 'profile_edit' || currentView === 'address_edit') && (
          <div className="account-tab-content animate-fade-in">
            <button 
              type="button"
              className="btn-back-dashboard"
              onClick={() => setCurrentView('dashboard')}
            >
              ← Back to Profile Dashboard
            </button>

            <div className="account-card-box" style={{ marginTop: '16px' }}>
              <div className="account-card-header">
                <h2 className="account-card-title">
                  {currentView === 'address_edit' ? 'Delivery Address & GPS' : 'Edit Personal Profile'}
                </h2>
                <p className="account-card-desc">Update your name, contact information, and primary shipping destination.</p>
              </div>

              {saveSuccess && (
                <div className="profile-save-toast animate-fade-in">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>Profile and location details updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="account-form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" name="name" value={profile.name} onChange={handleInputChange} className="account-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" name="email" value={profile.email} onChange={handleInputChange} className="account-input" required />
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" name="phone" value={profile.phone} onChange={handleInputChange} className="account-input" required />
                </div>
                <div className="location-options-bar full-width">
                  <div className="location-bar-header">
                    <span className="location-bar-title">GPS Delivery Address Detection</span>
                    <span className="location-bar-subtitle">Auto-fill street name, city, and pincode via GPS</span>
                  </div>
                  <button type="button" className="btn-fetch-gps" onClick={handleFetchGPSLocation} disabled={isLocating}>
                    {isLocating ? (
                      <>
                        <span className="mini-spinner"></span>
                        <span>Detecting Location...</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="12" r="3"/></svg>
                        <span>Fetch Current Location (GPS)</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Delivery Street Address</label>
                  <input type="text" name="address" value={profile.address} onChange={handleInputChange} className="account-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input type="text" name="city" value={profile.city} onChange={handleInputChange} className="account-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input type="text" name="state" value={profile.state} onChange={handleInputChange} className="account-input" required />
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Pincode / Zip Code</label>
                  <input type="text" name="zipCode" value={profile.zipCode} onChange={handleInputChange} className="account-input" required />
                </div>
                <div className="form-submit-row full-width">
                  <button type="submit" className="btn btn-save-profile">
                    Save Profile &amp; Location Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {currentView === 'orders' && (
          <div className="account-tab-content animate-fade-in">
            <button type="button" className="btn-back-dashboard" onClick={() => setCurrentView('dashboard')}>
              ← Back to Profile Dashboard
            </button>
            <div className="orders-header-bar" style={{ marginTop: '16px' }}>
              <h2 className="orders-page-title">My Orders</h2>
              <div className="orders-filter-pills">
                <button className={`orders-filter-btn ${orderFilter === 'all' ? 'active-filter' : ''}`} onClick={() => setOrderFilter('all')}>All ({orders.length})</button>
                <button className={`orders-filter-btn ${orderFilter === 'pending' ? 'active-filter' : ''}`} onClick={() => setOrderFilter('pending')}>Pending</button>
                <button className={`orders-filter-btn ${orderFilter === 'shipped' ? 'active-filter' : ''}`} onClick={() => setOrderFilter('shipped')}>Shipped</button>
                <button className={`orders-filter-btn ${orderFilter === 'delivered' ? 'active-filter' : ''}`} onClick={() => setOrderFilter('delivered')}>Delivered</button>
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="empty-state account-card-box">
                <span className="empty-icon" style={{ fontSize: '3rem' }}>📦</span>
                <h3 className="empty-title" style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', color: '#1b2e13', margin: '12px 0 6px 0' }}>No Orders Found</h3>
                <button className="btn btn-save-profile" onClick={() => navigateTo('shop')} style={{ marginTop: '20px', display: 'inline-flex', width: 'auto', padding: '12px 28px' }}>Explore Spices Shop</button>
              </div>
            ) : (
              <div className="orders-list">
                {filteredOrders.map((order) => (
                  <div key={order.orderId} className="mockup-order-card animate-fade-in">
                    <div className="mockup-order-top">
                      <div>
                        <span className="mockup-order-no">Order No: #{order.orderId}</span>
                        <span className="mockup-order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <span className={`mockup-status-pill ${getStatusClass(order.status)}`}>{getStatusText(order.status)}</span>
                    </div>
                    <div className="mockup-order-mid">
                      <p className="mockup-order-meta">
                        <span>Items: <strong>{order.items?.reduce((a, b) => a + (b.quantity || 1), 0) || 1}</strong></span>
                        <span className="dot-sep">•</span>
                        <span>Total Amount: <strong>₹{order.totalAmount}</strong></span>
                      </p>
                    </div>
                    <div className="mockup-order-bottom">
                      <button type="button" className="btn-mockup-details" onClick={() => setExpandedOrderId(expandedOrderId === order.orderId ? null : order.orderId)}>
                        {expandedOrderId === order.orderId ? 'Hide Details ▲' : 'Details ▼'}
                      </button>
                      <span className="mockup-tracking-no">Aroma Sealed &amp; Locked</span>
                    </div>
                    {expandedOrderId === order.orderId && (
                      <div className="mockup-expanded-details animate-fade-in">
                        <h4 style={{ fontSize: '0.88rem', color: '#1b2e13', margin: '0 0 10px 0', fontWeight: 700 }}>Packed Spices:</h4>
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="order-item-row">
                            <div className="order-item-info">
                              <img src={item.image} alt={item.name} className="order-item-thumb" />
                              <div>
                                <span className="order-item-title">{item.name}</span>
                                <span className="order-item-qty">Qty: {item.quantity} × {item.unit || '100g'}</span>
                              </div>
                            </div>
                            <span className="order-item-price">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                        <div className="order-address-box" style={{ marginTop: '12px', paddingTop: '12px' }}>
                          <p className="order-address-title">📍 Shipping Destination:</p>
                          <p className="order-address-text">{order.customer?.name || profile.name} | {order.customer?.phone || profile.phone}</p>
                          <p className="order-address-text">{order.customer?.address || profile.address}, {order.customer?.city || profile.city} - {order.customer?.zipCode || profile.zipCode}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Account;
