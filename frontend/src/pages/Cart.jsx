import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../App';

function Cart({ cart, updateCartQty, removeFromCart, clearCart, navigateTo, onOrderPlaced }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // Auto-fill customer details ONLY if user is logged in
  useEffect(() => {
    try {
      const loggedIn = localStorage.getItem('agnitra_user_logged_in') === 'true';
      setIsUserLoggedIn(loggedIn);

      if (loggedIn) {
        const savedUser = localStorage.getItem('agnitra_user_profile');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          setFormData(prev => ({
            name: user.name || prev.name,
            email: user.email || prev.email,
            phone: user.phone || prev.phone,
            address: user.address || prev.address,
            city: user.city || prev.city,
            zipCode: user.zipCode || user.pincode || prev.zipCode
          }));
          setIsAutoFilled(true);
        }
      }
    } catch (e) {
      console.error('Error auto-filling account profile:', e);
    }
  }, []);

  // Fetch current GPS location and reverse geocode
  const handleFetchGPSLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('GPS location is not supported by your browser');
      return;
    }
    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data && data.address) {
            const road = data.address.road || data.address.suburb || data.address.neighbourhood || '';
            const city = data.address.city || data.address.town || data.address.village || data.address.state_district || '';
            const postcode = data.address.postcode || '';
            const fullAddress = [data.address.house_number, road, data.address.suburb, data.address.city_district].filter(Boolean).join(', ') || data.display_name;

            setFormData(prev => ({
              ...prev,
              address: fullAddress,
              city: city || prev.city,
              zipCode: postcode || prev.zipCode
            }));
          } else {
            setFormData(prev => ({
              ...prev,
              address: `GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
            }));
          }
        } catch (err) {
          console.error('Error in reverse geocoding:', err);
          setFormData(prev => ({
            ...prev,
            address: `GPS Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
          }));
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        setLocationError(err.message || 'Unable to retrieve location');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    try {
      setSubmitting(true);
      setError(null);

      const orderPayload = {
        customer: formData,
        items: cart.map(item => ({
          productId: item.product._id || item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.image || item.product.imageUrl
        })),
        totalAmount: cartTotal
      };

      let createdOrder = {};

      // Attempt backend API order save (reflects on Admin Dashboard)
      try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderPayload)
        });

        if (response.ok) {
          const result = await response.json();
          createdOrder = result.order || {};
          if (onOrderPlaced) {
            await onOrderPlaced().catch(() => {});
          }
        }
      } catch (backendErr) {
        console.warn('Backend server order save offline fallback:', backendErr);
      }

      // Generate unique Order ID fallback if backend was unavailable or timed out
      const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const formattedOrderId = createdOrder.orderId || `AGN-${todayStr}-${randNum}`;

      // Save order to local order history in localStorage so customer can track it under /profile
      try {
        const existingLocalOrders = JSON.parse(localStorage.getItem('agnitra_local_orders') || '[]');
        const newLocalOrder = {
          orderId: formattedOrderId,
          createdAt: new Date().toISOString(),
          customer: formData,
          items: orderPayload.items,
          totalAmount: cartTotal,
          status: 'processing'
        };
        localStorage.setItem('agnitra_local_orders', JSON.stringify([newLocalOrder, ...existingLocalOrders]));
      } catch (e) {}

      // Build clean, professional WhatsApp order message (NO problematic emojis that render as ? in WhatsApp)
      const itemsFormattedText = cart.map((item, index) => {
        const itemNum = index + 1;
        const unit = item.product.unit || '100g';
        const price = item.product.price;
        const subtotal = price * item.quantity;
        return `${itemNum}. *${item.product.name}* (${unit})\n   Qty: ${item.quantity}\n   Price: Rs. ${price}\n   Subtotal: Rs. ${subtotal}`;
      }).join('\n\n');

      const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

      const whatsappText = 
`*NEW ORDER - AGNITRA SPICES*

*Order ID:* ${formattedOrderId}

------------------------------------

*CUSTOMER DETAILS*

Name: ${formData.name}
Phone: ${formData.phone}${formData.email ? `\nEmail: ${formData.email}` : ''}

------------------------------------

*ORDERED ITEMS*

${itemsFormattedText}

------------------------------------

*ORDER SUMMARY*

Total Items: ${totalItemsCount}
Grand Total: Rs. ${cartTotal}

------------------------------------

*DELIVERY ADDRESS*

${formData.address}${formData.city ? `,\n${formData.city}` : ''}${formData.zipCode ? ` - ${formData.zipCode}` : ''}

------------------------------------

Thank you for choosing Agnitra Spices!
Please confirm my order.`;

      const encodedText = encodeURIComponent(whatsappText);
      const whatsappUrl = `https://wa.me/919461839415?text=${encodedText}`;

      // Redirect user to Agnitra official WhatsApp
      window.open(whatsappUrl, '_blank');

      // Clear cart and navigate to profile tracking page
      clearCart();
      navigateTo('profile');
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Redirecting to Agnitra WhatsApp for instant order placement...');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container empty-state section">
        <div className="empty-icon-box" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(189, 89, 60, 0.1)', color: 'var(--accent-orange)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </div>
        <h2 className="empty-title">Your Cart is Empty</h2>
        <p className="empty-desc">You haven't added any pure traditional spices to your cart yet.</p>
        <button className="btn btn-primary" onClick={() => navigateTo('shop')}>
          Browse Spices Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Aroma Preservation Checkout</span>
          <h2 className="section-title">Your Shopping Cart</h2>
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(200, 62, 45, 0.08)', border: '1px solid var(--accent-red)', padding: '14px 18px', borderRadius: '12px', marginBottom: '30px', color: 'var(--accent-red)', fontSize: '0.92rem', fontWeight: 600 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            <span>Error: {error}</span>
          </div>
        )}

        <div className="cart-layout-grid">
          {/* Left: Cart Items List */}
          <div className="cart-left-col">
            <div className="cart-card">
              <h3 className="cart-card-header-title">
                Selected Spices ({cart.length})
              </h3>
              
              <div className="cart-items-wrapper">
                {cart.map((item) => {
                  const productId = item.product._id || item.product.id;
                  return (
                    <div key={productId} className="cart-item-row">
                      <div className="cart-item-main">
                        <img 
                          src={item.product.image || item.product.imageUrl} 
                          alt={item.product.name} 
                          className="cart-item-thumb" 
                        />
                        <div className="cart-item-details">
                          <h4 className="cart-item-name">{item.product.name}</h4>
                          <p className="cart-item-sub">{item.product.traditionalMethod || '100% Cold Ground'}</p>
                          <span className="cart-item-unit-price">₹{item.product.price} / {item.product.unit || '100g'}</span>
                        </div>
                        <button 
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(productId)}
                          title="Remove Item"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        </button>
                      </div>

                      <div className="cart-item-controls">
                        <div className="cart-stepper-widget">
                          <button 
                            type="button"
                            className="cart-stepper-btn"
                            onClick={() => updateCartQty(productId, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="cart-stepper-val">{item.quantity}</span>
                          <button 
                            type="button"
                            className="cart-stepper-btn"
                            onClick={() => updateCartQty(productId, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <span className="cart-item-subtotal">₹{item.product.price * item.quantity}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button 
              className="btn btn-secondary btn-continue-shopping"
              onClick={() => navigateTo('shop')}
            >
              ← Add More Spices
            </button>
          </div>

          {/* Right: Checkout Summary & Form */}
          <div className="cart-right-col">
            <div className="cart-summary">
              <h3 className="summary-title">Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="summary-row">
                <span>Aroma-Lock Sealed Packing</span>
                <span className="text-gold" style={{ fontWeight: 600 }}>FREE</span>
              </div>
              <div className="summary-row">
                <span>Standard Shipping</span>
                <span className="text-gold" style={{ fontWeight: 600 }}>FREE</span>
              </div>

              <div className="summary-row total">
                <span>Total Amount</span>
                <span className="summary-total-val">₹{cartTotal}</span>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleSubmitOrder} className="checkout-form" style={{ marginTop: '30px' }}>
                <h4 className="checkout-section-title" style={{ marginBottom: '12px' }}>Shipping & Billing Details</h4>
                
                {isUserLoggedIn ? (
                  <div style={{ backgroundColor: 'rgba(59, 110, 40, 0.08)', border: '1px solid #3b6e28', color: '#2b3e1b', padding: '10px 14px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span>Logged in ({formData.phone || 'Account'}). Details auto-filled from your profile.</span>
                  </div>
                ) : (
                  <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                      type="button" 
                      onClick={() => navigateTo('profile')} 
                      style={{ background: 'rgba(59, 110, 40, 0.08)', border: '1.5px solid #3b6e28', color: '#2b3e1b', padding: '8px 14px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      Login for Auto-fill →
                    </button>
                  </div>
                )}
                
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="form-input" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="E.g. Rajesh Kumar"
                  />
                </div>

                <div className="cart-form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="form-input" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="rajesh@mail.com"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      className="form-input" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="cart-address-header">
                    <label className="form-label" htmlFor="address">Delivery Address</label>
                    <button 
                      type="button"
                      className="btn-fetch-gps-cart"
                      onClick={handleFetchGPSLocation}
                      disabled={isLocating}
                    >
                      {isLocating ? (
                        <>
                          <span className="mini-spinner"></span>
                          <span>Locating...</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="12" r="3"/></svg>
                          <span>Use GPS Location</span>
                        </>
                      )}
                    </button>
                  </div>
                  <textarea 
                    id="address" 
                    name="address" 
                    className="form-input" 
                    rows="3" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="House No, Street Name, Locality"
                    style={{ resize: 'vertical' }}
                  ></textarea>
                  {locationError && (
                    <p style={{ color: 'var(--accent-red)', fontSize: '0.78rem', marginTop: '6px', margin: 0 }}>
                      ⚠️ {locationError}
                    </p>
                  )}
                </div>

                <div className="cart-form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="city">City</label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city" 
                      className="form-input" 
                      value={formData.city} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="Mumbai"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="zipCode">ZIP / Postal Code</label>
                    <input 
                      type="text" 
                      id="zipCode" 
                      name="zipCode" 
                      className="form-input" 
                      value={formData.zipCode} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="400001"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-place-order" 
                  disabled={submitting}
                >
                  {submitting ? 'Placing Order...' : `Place Order (₹${cartTotal})`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
