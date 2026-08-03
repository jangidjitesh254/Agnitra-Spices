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

  // Get user initials for avatar
  const initials = profile.name
    ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AS';

  // Order filter state for orders tab
  const [orderFilter, setOrderFilter] = useState('all'); // 'all', 'delivered', 'processing'
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const filteredOrders = orders.filter(order => {
    if (orderFilter === 'delivered') return order.status?.toLowerCase() === 'delivered' || order.status?.toLowerCase() === 'shipped';
    if (orderFilter === 'processing') return order.status?.toLowerCase() === 'processing' || !order.status;
    return true;
  });

  return (
    <div className="account-page section">
      <div className="container" style={{ maxWidth: '820px' }}>
        
        {/* Mockup-Inspired Hero Profile Card with Organic Curved Wave Header */}
        <div className="profile-hero-card animate-fade-in">
          <div className="profile-banner-bg">
            <div className="profile-banner-wave">
              <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
                <path d="M0.00,49.98 C160.27,140.00 320.80,-20.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" fill="#ffffff"></path>
              </svg>
            </div>
          </div>

          <div className="profile-hero-content">
            <div className="profile-avatar-container">
              <div className="profile-avatar-ring">
                <span className="profile-avatar-text">{initials}</span>
              </div>
              <button 
                type="button" 
                className="avatar-edit-badge" 
                title="Update Profile Avatar"
                onClick={() => setActiveTab('profile')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              </button>
            </div>

            <h1 className="profile-user-title">{profile.name}</h1>
            <p className="profile-user-subtitle">Agnitra VIP Connoisseur</p>
            
            <div className="profile-contact-chips">
              <span className="chip-item">✉️ {profile.email}</span>
              <span className="chip-item">📞 {profile.phone}</span>
              <span className="chip-item">📍 {profile.city || 'Jaipur'}</span>
            </div>
          </div>

          {/* Quick Action Category Grid (Inspired by mockup 3x2 grid) */}
          <div className="profile-quick-grid">
            <button 
              type="button" 
              className={`quick-tile ${activeTab === 'orders' && orderFilter === 'all' ? 'active-tile' : ''}`}
              onClick={() => { setActiveTab('orders'); setOrderFilter('all'); }}
            >
              <div className="tile-icon-box tile-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
              </div>
              <span className="tile-label">My Orders</span>
              <span className="tile-badge-count">{orders.length}</span>
            </button>

            <button 
              type="button" 
              className={`quick-tile ${activeTab === 'orders' && orderFilter === 'delivered' ? 'active-tile' : ''}`}
              onClick={() => { setActiveTab('orders'); setOrderFilter('delivered'); }}
            >
              <div className="tile-icon-box tile-yellow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-2.3-2.76a1 1 0 0 0-.77-.37H16v6h3Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
              </div>
              <span className="tile-label">Delivered</span>
              <span className="tile-badge-count">
                {orders.filter(o => o.status?.toLowerCase() === 'delivered' || o.status?.toLowerCase() === 'shipped').length}
              </span>
            </button>

            <button 
              type="button" 
              className={`quick-tile ${activeTab === 'orders' && orderFilter === 'processing' ? 'active-tile' : ''}`}
              onClick={() => { setActiveTab('orders'); setOrderFilter('processing'); }}
            >
              <div className="tile-icon-box tile-pink">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 22v-4"/><path d="m19.07 19.07-2.83-2.83"/><path d="M22 12h-4"/><path d="m19.07 4.93-2.83 2.83"/></svg>
              </div>
              <span className="tile-label">Processing</span>
              <span className="tile-badge-count">
                {orders.filter(o => o.status?.toLowerCase() === 'processing' || !o.status).length}
              </span>
            </button>

            <button 
              type="button" 
              className={`quick-tile ${activeTab === 'profile' ? 'active-tile' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <div className="tile-icon-box tile-green">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <span className="tile-label">GPS Address</span>
            </button>

            <button 
              type="button" 
              className="quick-tile"
              onClick={() => navigateTo('shop')}
            >
              <div className="tile-icon-box tile-purple">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </div>
              <span className="tile-label">Explore Spices</span>
            </button>

            <button 
              type="button" 
              className="quick-tile"
              onClick={() => navigateTo('contact')}
            >
              <div className="tile-icon-box tile-purple-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
              </div>
              <span className="tile-label">Customer Care</span>
            </button>
          </div>

          {/* Menu Item Cards (Inspired by Mockup List Items) */}
          <div className="profile-menu-list">
            <button 
              type="button"
              className={`menu-list-item ${activeTab === 'profile' ? 'item-active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <div className="menu-item-left">
                <span className="menu-icon">👤</span>
                <div className="menu-text">
                  <span className="menu-title">Edit Profile Details</span>
                  <span className="menu-subtitle">Update name, phone number, and email address</span>
                </div>
              </div>
              <span className="menu-chevron">›</span>
            </button>

            <button 
              type="button"
              className={`menu-list-item ${activeTab === 'profile' ? 'item-active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <div className="menu-item-left">
                <span className="menu-icon">📍</span>
                <div className="menu-text">
                  <span className="menu-title">Shipping Address & GPS</span>
                  <span className="menu-subtitle">{profile.address ? `${profile.address}, ${profile.city}` : 'Configure delivery address'}</span>
                </div>
              </div>
              <span className="menu-chevron">›</span>
            </button>

            <button 
              type="button"
              className={`menu-list-item ${activeTab === 'orders' ? 'item-active' : ''}`}
              onClick={() => { setActiveTab('orders'); setOrderFilter('all'); }}
            >
              <div className="menu-item-left">
                <span className="menu-icon">📦</span>
                <div className="menu-text">
                  <span className="menu-title">My Orders History ({orders.length})</span>
                  <span className="menu-subtitle">View past order receipts & aroma-lock tracking</span>
                </div>
              </div>
              <span className="menu-chevron">›</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Edit Profile & Address */}
        {activeTab === 'profile' && (
          <div className="account-tab-content animate-fade-in" style={{ marginTop: '24px' }}>
            <div className="account-card-box">
              <div className="account-card-header">
                <h2 className="account-card-title">Edit Personal & Location Details</h2>
                <p className="account-card-desc">Update your name, contact information, and primary shipping destination.</p>
              </div>

              {saveSuccess && (
                <div className="profile-save-toast animate-fade-in">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>Profile and delivery address updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="account-form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="account-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="account-input"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                    className="account-input"
                    required
                  />
                </div>

                {/* Location Detection Bar */}
                <div className="location-options-bar full-width">
                  <div className="location-bar-header">
                    <span className="location-bar-title">GPS Delivery Address Detection</span>
                    <span className="location-bar-subtitle">Auto-fill street name, city, and pincode via GPS</span>
                  </div>
                  <button 
                    type="button" 
                    className="btn-fetch-gps"
                    onClick={handleFetchGPSLocation}
                    disabled={isLocating}
                  >
                    {isLocating ? (
                      <>
                        <span className="mini-spinner"></span>
                        <span>Detecting Location...</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s-8-6-8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span>Fetch Current Location (GPS)</span>
                      </>
                    )}
                  </button>
                </div>

                {locationError && (
                  <div className="location-error-banner full-width">
                    <span>⚠️ {locationError}</span>
                  </div>
                )}

                <div className="form-group full-width">
                  <label className="form-label">Delivery Street Address</label>
                  <input 
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleInputChange}
                    placeholder="House/Flat No., Building, Street Name"
                    className="account-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">City</label>
                  <input 
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleInputChange}
                    placeholder="City / District"
                    className="account-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">State</label>
                  <input 
                    type="text"
                    name="state"
                    value={profile.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="account-input"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Pincode / Zip Code</label>
                  <input 
                    type="text"
                    name="zipCode"
                    value={profile.zipCode}
                    onChange={handleInputChange}
                    placeholder="6-digit pincode"
                    className="account-input"
                    required
                  />
                </div>

                <div className="form-submit-row full-width">
                  <button type="submit" className="btn btn-save-profile">
                    Save Profile & Address Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: Orders History (Inspired by mockup My Orders page) */}
        {activeTab === 'orders' && (
          <div className="account-tab-content animate-fade-in" style={{ marginTop: '24px' }}>
            <div className="orders-header-bar">
              <h2 className="orders-page-title">My Orders</h2>
              
              {/* Order Status Filter Pills */}
              <div className="orders-filter-pills">
                <button 
                  className={`orders-filter-btn ${orderFilter === 'all' ? 'active-filter' : ''}`}
                  onClick={() => setOrderFilter('all')}
                >
                  All ({orders.length})
                </button>
                <button 
                  className={`orders-filter-btn ${orderFilter === 'delivered' ? 'active-filter' : ''}`}
                  onClick={() => setOrderFilter('delivered')}
                >
                  Delivered
                </button>
                <button 
                  className={`orders-filter-btn ${orderFilter === 'processing' ? 'active-filter' : ''}`}
                  onClick={() => setOrderFilter('processing')}
                >
                  Processing
                </button>
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="empty-state account-card-box">
                <span className="empty-icon" style={{ fontSize: '3rem' }}>📦</span>
                <h3 className="empty-title" style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', color: '#1b2e13', margin: '12px 0 6px 0' }}>No Orders Found</h3>
                <p className="empty-desc" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No orders match your selected filter.</p>
                <button className="btn btn-save-profile" onClick={() => navigateTo('shop')} style={{ marginTop: '20px', display: 'inline-flex', width: 'auto', padding: '12px 28px' }}>
                  Explore Spices Shop
                </button>
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
                      <span className={`mockup-status-pill ${getStatusClass(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>

                    <div className="mockup-order-mid">
                      <p className="mockup-order-meta">
                        <span>Items: <strong>{order.items?.reduce((a, b) => a + (b.quantity || 1), 0) || 1}</strong></span>
                        <span className="dot-sep">•</span>
                        <span>Total Amount: <strong>₹{order.totalAmount}</strong></span>
                      </p>
                    </div>

                    <div className="mockup-order-bottom">
                      <button 
                        type="button"
                        className="btn-mockup-details"
                        onClick={() => setExpandedOrderId(expandedOrderId === order.orderId ? null : order.orderId)}
                      >
                        {expandedOrderId === order.orderId ? 'Hide Details ▲' : 'Details ▼'}
                      </button>

                      <span className="mockup-tracking-no">
                        Aroma Sealed & Locked
                      </span>
                    </div>

                    {/* Expandable Order Details Panel */}
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
