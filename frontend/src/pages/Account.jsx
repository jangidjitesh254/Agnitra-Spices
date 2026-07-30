import { useState, useEffect } from 'react';

function Account({ orders, navigateTo }) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'orders'
  const [saveSuccess, setSaveSuccess] = useState(false);

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
        return '🔒 Aroma Sealed';
      case 'shipped':
        return '🚚 Out for Delivery';
      case 'delivered':
        return '✅ Delivered';
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
      <div className="container" style={{ maxWidth: '950px' }}>
        
        {/* User Profile Header Card */}
        <div className="account-user-card animate-fade-in">
          <div className="account-avatar-wrapper">
            <div className="account-avatar-circle">{initials}</div>
          </div>
          
          <div className="account-user-info">
            <div className="account-name-row">
              <h1 className="account-user-name">{profile.name}</h1>
              <span className="account-vip-badge">🌿 Agnitra VIP Member</span>
            </div>
            <p className="account-user-contact">
              <span>📧 {profile.email}</span>
              <span className="dot-sep">•</span>
              <span>📞 {profile.phone}</span>
            </p>
            <p className="account-user-location">
              📍 {profile.address ? `${profile.address}, ${profile.city}` : 'No address set'}
            </p>
          </div>

          <div className="account-stats-group">
            <div className="stat-box">
              <span className="stat-num">{orders.length}</span>
              <span className="stat-label">Total Orders</span>
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
                <h2 className="account-card-title">Edit Personal & Location Details</h2>
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

                <div className="form-group">
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

                <div className="form-group full-width">
                  <label className="form-label">Delivery Street Address / Location</label>
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

                <div className="form-group">
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
                  <button type="submit" className="btn btn-designer-green btn-save-profile">
                    Save Profile Details
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
                <span className="empty-icon">📦</span>
                <h3 className="empty-title">No Orders Placed Yet</h3>
                <p className="empty-desc">Once you place an order, you can track its packing and aroma-lock status here.</p>
                <button className="btn btn-designer-green" onClick={() => navigateTo('shop')} style={{ marginTop: '16px' }}>
                  Explore Spices Shop
                </button>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.orderId} className="order-card animate-fade-in">
                    <div className="order-header">
                      <div>
                        <span className="order-meta-label">Order ID</span>
                        <span className="order-id">{order.orderId}</span>
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
                        <span className="order-meta-label">Aroma Status</span>
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
                      <span className="total-label">Grand Total</span>
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
