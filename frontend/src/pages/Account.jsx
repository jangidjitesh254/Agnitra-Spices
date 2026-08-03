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

  return (
    <div className="account-page section">
      <div className="container" style={{ maxWidth: '980px' }}>
        
        {/* User Profile Header Card */}
        <div className="account-user-card animate-fade-in">
          <div className="account-avatar-wrapper">
            <div className="account-avatar-circle">{initials}</div>
          </div>
          
          <div className="account-user-info">
            <div className="account-name-row">
              <h1 className="account-user-name">{profile.name}</h1>
              <span className="account-vip-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Agnitra VIP Member
              </span>
            </div>
            <p className="account-user-contact">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '4px' }}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                {profile.email}
              </span>
              <span className="dot-sep">•</span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '4px' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                {profile.phone}
              </span>
            </p>
            <p className="account-user-location">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '4px' }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="12" r="3"/></svg>
              {profile.address ? `${profile.address}, ${profile.city}` : 'No primary address configured'}
            </p>
          </div>

          <div className="account-stats-group">
            <div className="stat-box">
              <span className="stat-num">{orders.length}</span>
              <span className="stat-label">Total Orders</span>
            </div>
            <div className="stat-box">
              <span className="stat-num" style={{ color: '#d4af37' }}>100%</span>
              <span className="stat-label">Aroma Lock</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="account-tab-pills">
          <button 
            className={`account-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>My Profile & Address</span>
          </button>
          
          <button 
            className={`account-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span>Order History ({orders.length})</span>
          </button>
        </div>

        {/* TAB 1: Profile & Delivery Address Editing Form */}
        {activeTab === 'profile' && (
          <div className="account-tab-content animate-fade-in">
            <div className="account-card-box">
              <div className="account-card-header">
                <h2 className="account-card-title">Personal & Shipping Destination</h2>
                <p className="account-card-desc">Update your profile details and primary address for fast 1-click checkout.</p>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label className="form-label" style={{ margin: 0 }}>Delivery Street Address</label>
                    <span style={{ fontSize: '0.78rem', color: '#2b3e1b', fontWeight: 700 }}>✍️ Write Manually or Auto-Filled</span>
                  </div>
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

        {/* TAB 2: Past Orders History */}
        {activeTab === 'orders' && (
          <div className="account-tab-content animate-fade-in">
            {orders.length === 0 ? (
              <div className="empty-state account-card-box">
                <span className="empty-icon" style={{ fontSize: '3rem' }}>📦</span>
                <h3 className="empty-title" style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', color: '#1b2e13', margin: '12px 0 6px 0' }}>No Orders Placed Yet</h3>
                <p className="empty-desc" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Once you place an order, you can track its packing and aroma-lock status here.</p>
                <button className="btn btn-save-profile" onClick={() => navigateTo('shop')} style={{ marginTop: '20px', display: 'inline-flex', width: 'auto', padding: '12px 28px' }}>
                  Explore Spices Shop
                </button>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.orderId} className="order-card animate-fade-in">
                    <div className="order-header">
                      <div>
                        <span className="order-meta-label">Order Reference</span>
                        <span className="order-id">#{order.orderId}</span>
                      </div>
                      <div>
                        <span className="order-meta-label">Placed On</span>
                        <span className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                      <div>
                        <span className="order-meta-label">Aroma Lock Status</span>
                        <span className={`order-status-badge ${getStatusClass(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>

                    {/* List items */}
                    <div className="order-items-list">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="order-item-row">
                          <div className="order-item-info">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="order-item-thumb"
                            />
                            <div>
                              <span className="order-item-title">{item.name}</span>
                              <span className="order-item-qty">Qty: {item.quantity} × {item.unit || '100g'}</span>
                            </div>
                          </div>
                          <span className="order-item-price">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address */}
                    <div className="order-address-box">
                      <p className="order-address-title">📍 Shipping Destination:</p>
                      <p className="order-address-text">{order.customer?.name || profile.name} | {order.customer?.phone || profile.phone}</p>
                      <p className="order-address-text">{order.customer?.address || profile.address}, {order.customer?.city || profile.city} - {order.customer?.zipCode || profile.zipCode}</p>
                    </div>

                    {/* Order Total */}
                    <div className="order-total-row">
                      <span className="total-label">Grand Total Paid</span>
                      <span className="total-price">₹{order.totalAmount}</span>
                    </div>
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
