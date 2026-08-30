import { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../App';

// Step 1 (the cart itself) lives on /cart. It still appears in the rail so the
// shopper can see where they are in the whole journey and jump back to it.
const CHECKOUT_STEPS = [
  { id: 1, title: 'Cart', short: 'Cart' },
  { id: 2, title: 'Delivery Address', short: 'Address', hint: 'Where should we deliver' },
  { id: 3, title: 'Order Summary', short: 'Summary', hint: 'Check before confirming' },
  { id: 4, title: 'Payment', short: 'Payment', hint: 'Choose how you pay' }
];

const PAYMENT_METHODS = [
  {
    id: 'cod',
    title: 'Cash on Delivery',
    desc: 'Pay in cash when the sealed pack reaches your door.',
    badge: 'Most popular'
  },
  {
    id: 'upi',
    title: 'UPI / Bank Transfer',
    desc: 'We share a UPI link on WhatsApp right after you confirm.'
  }
];

const ADDRESS_TYPES = ['Home', 'Work', 'Other'];

const CONTINUE_LABEL = {
  2: 'Save & Deliver Here',
  3: 'Continue to Payment',
  4: 'Place Order'
};

const getDeliveryEstimate = () => {
  const eta = new Date();
  eta.setDate(eta.getDate() + 3);
  return eta.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
};

function Checkout({ cart, clearCart, navigateTo, onOrderPlaced }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    city: '',
    zipCode: '',
    addressType: 'Home'
  });
  const [activeStep, setActiveStep] = useState(2);
  const [maxStepReached, setMaxStepReached] = useState(2);
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [saveAddress, setSaveAddress] = useState(true);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const hasInteracted = useRef(false);

  const deliveryEstimate = getDeliveryEstimate();

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
            ...prev,
            name: user.name || prev.name,
            email: user.email || prev.email,
            phone: user.phone || prev.phone,
            address: user.address || prev.address,
            landmark: user.landmark || prev.landmark,
            city: user.city || prev.city,
            zipCode: user.zipCode || user.pincode || prev.zipCode,
            addressType: user.addressType || prev.addressType
          }));
        }
      }
    } catch (e) {
      console.error('Error auto-filling account profile:', e);
    }
  }, []);

  // Bring the newly opened step under the sticky checkout bar.
  useEffect(() => {
    if (!hasInteracted.current) return;
    const el = document.getElementById(`checkout-step-${activeStep}`);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 150;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, [activeStep]);

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
          setErrors(prev => ({ ...prev, address: undefined, city: undefined, zipCode: undefined }));
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
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const validateAddress = () => {
    const next = {};
    if (formData.name.trim().length < 2) next.name = 'Please enter your full name';
    if (formData.phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a valid 10-digit mobile number';
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      next.email = 'Enter a valid email address';
    }
    if (formData.address.trim().length < 10) next.address = 'Add house/flat no., street and locality';
    if (!formData.city.trim()) next.city = 'Enter your city';
    if (!/^\d{6}$/.test(formData.zipCode.trim())) next.zipCode = 'Enter a valid 6-digit PIN code';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const openStep = (id) => {
    if (id === 1) {
      navigateTo('cart');
      return;
    }
    if (id > maxStepReached) return;
    hasInteracted.current = true;
    setActiveStep(id);
  };

  const advanceTo = (id) => {
    hasInteracted.current = true;
    setMaxStepReached(prev => Math.max(prev, id));
    setActiveStep(id);
  };

  const persistAddressToProfile = () => {
    if (!saveAddress) return;
    try {
      const saved = JSON.parse(localStorage.getItem('agnitra_user_profile') || '{}');
      localStorage.setItem('agnitra_user_profile', JSON.stringify({ ...saved, ...formData }));
    } catch (e) {
      console.error('Could not save address to profile:', e);
    }
  };

  const handleContinue = () => {
    if (activeStep === 2) {
      if (!validateAddress()) return;
      persistAddressToProfile();
      advanceTo(3);
      return;
    }
    if (activeStep === 3) {
      advanceTo(4);
      return;
    }
    handlePlaceOrder();
  };

  // Back always retreats one step, and steps off the flow entirely at the top.
  const handleBack = () => openStep(activeStep - 1);

  const buildWhatsappText = (orderId) => {
    const itemsFormattedText = cart.map((item, index) => {
      const unit = item.product.unit || '100g';
      const price = item.product.price;
      return `${index + 1}. *${item.product.name}* (${unit})\n   Qty: ${item.quantity}\n   Price: Rs. ${price}\n   Subtotal: Rs. ${price * item.quantity}`;
    }).join('\n\n');

    const paymentLabel = PAYMENT_METHODS.find(m => m.id === paymentMethod)?.title || 'Cash on Delivery';

    return (
`*Order ID:* ${orderId}

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
Payment Mode: ${paymentLabel}
Expected Delivery: ${deliveryEstimate}

------------------------------------

*DELIVERY ADDRESS (${formData.addressType})*

${formData.address}${formData.city ? `,\n${formData.city}` : ''}${formData.zipCode ? ` - ${formData.zipCode}` : ''}${formData.landmark ? `\nLandmark: ${formData.landmark}` : ''}

------------------------------------


Please confirm my order.`
    );
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    try {
      setSubmitting(true);
      setError(null);

      const orderPayload = {
        customer: { ...formData, paymentMethod },
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
          headers: { 'Content-Type': 'application/json' },
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

      // Save order to local order history so the customer can track it under /profile
      try {
        const existingLocalOrders = JSON.parse(localStorage.getItem('agnitra_local_orders') || '[]');
        const newLocalOrder = {
          orderId: formattedOrderId,
          createdAt: new Date().toISOString(),
          customer: { ...formData, paymentMethod },
          items: orderPayload.items,
          totalAmount: cartTotal,
          status: 'processing'
        };
        localStorage.setItem('agnitra_local_orders', JSON.stringify([newLocalOrder, ...existingLocalOrders]));
      } catch (e) {
        console.error('Could not save order to local history:', e);
      }

      const whatsappUrl = `https://wa.me/919461839415?text=${encodeURIComponent(buildWhatsappText(formattedOrderId))}`;

      // Snapshot the order before the cart is emptied so the confirmation screen
      // still has something to render.
      setPlacedOrder({
        orderId: formattedOrderId,
        itemCount: totalItemsCount,
        totalAmount: cartTotal,
        whatsappUrl,
        customer: { ...formData },
        paymentMethod
      });

      window.open(whatsappUrl, '_blank');
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Something went wrong while placing your order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------------------------------------------------------- Success */

  if (placedOrder) {
    const paymentLabel = PAYMENT_METHODS.find(m => m.id === placedOrder.paymentMethod)?.title || 'Cash on Delivery';
    return (
      <div className="checkout-screen">
        <header className="checkout-topbar">
          <div className="checkout-topbar-inner">
            <span className="checkout-brand">
              <img src="/images/Agnitra logo.jpg" alt="" className="checkout-brand-mark" />
              <span className="checkout-brand-text">Agnitra<span>Spices</span></span>
            </span>
          </div>
        </header>

        <div className="checkout-body">
          <div className="order-success-card">
            <div className="order-success-tick">
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h2 className="order-success-title">Order Placed Successfully</h2>
            <p className="order-success-desc">
              Thank you, {placedOrder.customer.name.split(' ')[0]}! We have opened WhatsApp so our team can
              confirm your order instantly.
            </p>

            <div className="order-success-meta">
              <div className="order-success-meta-item">
                <span className="oss-label">Order ID</span>
                <span className="oss-value">{placedOrder.orderId}</span>
              </div>
              <div className="order-success-meta-item">
                <span className="oss-label">Items</span>
                <span className="oss-value">{placedOrder.itemCount}</span>
              </div>
              <div className="order-success-meta-item">
                <span className="oss-label">Amount</span>
                <span className="oss-value">₹{placedOrder.totalAmount}</span>
              </div>
              <div className="order-success-meta-item">
                <span className="oss-label">Payment</span>
                <span className="oss-value">{paymentLabel}</span>
              </div>
            </div>

            <div className="order-success-eta">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>
              <span>Expected delivery by <strong>{deliveryEstimate}</strong></span>
            </div>

            <div className="order-success-actions">
              <button className="btn btn-primary" onClick={() => navigateTo('profile')}>Track My Order</button>
              <a className="btn btn-secondary" href={placedOrder.whatsappUrl} target="_blank" rel="noreferrer">Reopen WhatsApp</a>
              <button className="btn-link-plain" onClick={() => navigateTo('shop')}>Continue Shopping →</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------- Guard: nothing left to check out */

  if (cart.length === 0) {
    return (
      <div className="checkout-screen">
        <header className="checkout-topbar">
          <div className="checkout-topbar-inner">
            <button type="button" className="checkout-back" onClick={() => navigateTo('shop')} aria-label="Go back">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              <span>Back</span>
            </button>
            <span className="checkout-brand">
              <img src="/images/Agnitra logo.jpg" alt="" className="checkout-brand-mark" />
              <span className="checkout-brand-text">Agnitra<span>Spices</span></span>
            </span>
          </div>
        </header>

        <div className="checkout-body">
          <div className="order-success-card">
            <h2 className="order-success-title">Your Cart is Empty</h2>
            <p className="order-success-desc">Add a few spices before heading to checkout.</p>
            <div className="order-success-actions">
              <button className="btn btn-primary" onClick={() => navigateTo('shop')}>Browse Spices Catalog</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------- Step summaries */

  const stepSummary = (id) => {
    if (id === 1) return `${totalItemsCount} ${totalItemsCount === 1 ? 'item' : 'items'} · ₹${cartTotal}`;
    if (id === 2) {
      return `${formData.name}, ${formData.address}${formData.city ? `, ${formData.city}` : ''}${formData.zipCode ? ` - ${formData.zipCode}` : ''}`;
    }
    if (id === 3) return `Delivery by ${deliveryEstimate}`;
    return PAYMENT_METHODS.find(m => m.id === paymentMethod)?.title || '';
  };

  const renderStepHeader = (step) => {
    const isActive = activeStep === step.id;
    const isDone = step.id < activeStep;
    const isLocked = step.id > maxStepReached;

    return (
      <button
        type="button"
        className={`checkout-step-head${isActive ? ' is-active' : ''}${isDone ? ' is-done' : ''}${isLocked ? ' is-locked' : ''}`}
        onClick={() => openStep(step.id)}
        disabled={isLocked}
        aria-expanded={isActive}
        aria-controls={`checkout-panel-${step.id}`}
      >
        <span className="checkout-step-num">
          {isDone ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          ) : step.id}
        </span>
        <span className="checkout-step-text">
          <span className="checkout-step-title">{step.title}</span>
          <span className="checkout-step-sub">{isDone ? stepSummary(step.id) : step.hint}</span>
        </span>
        {isDone && <span className="checkout-step-change">CHANGE</span>}
      </button>
    );
  };

  /* ------------------------------------------------------------------ Page */

  return (
    <div className="checkout-screen">
      {/* Minimal checkout chrome: back control, wordmark, progress rail */}
      <header className="checkout-topbar">
        <div className="checkout-topbar-inner">
          <button type="button" className="checkout-back" onClick={handleBack} aria-label="Go back">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            <span>Back</span>
          </button>

          <span className="checkout-brand">
            <img src="/images/Agnitra logo.jpg" alt="" className="checkout-brand-mark" />
            <span className="checkout-brand-text">Agnitra<span>Spices</span></span>
          </span>
        </div>

        <ol className="checkout-progress" aria-label="Checkout progress">
          {CHECKOUT_STEPS.map((step, i) => {
            const state = step.id < activeStep ? 'done' : step.id === activeStep ? 'current' : 'todo';
            return (
              <li key={step.id} className={`checkout-progress-item is-${state}`}>
                <span className="cp-dot">
                  {state === 'done' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : step.id}
                </span>
                <span className="cp-label">{step.short}</span>
                {i < CHECKOUT_STEPS.length - 1 && <span className="cp-line" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </header>

      <div className="checkout-body">
        {error && (
          <div className="checkout-alert" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            <span>{error}</span>
          </div>
        )}

        <div className="cart-layout-grid">
          <div className="cart-left-col">
            <div className="checkout-steps">

              {/* --------------------------------------- Step 2 — Address */}
              <section className="checkout-step" id="checkout-step-2">
                {renderStepHeader(CHECKOUT_STEPS[1])}
                {activeStep === 2 && (
                  <div className="checkout-step-body" id="checkout-panel-2">
                    {isUserLoggedIn ? (
                      <div className="checkout-note is-success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <span>Signed in as {formData.phone || 'your account'} — details auto-filled from your profile.</span>
                      </div>
                    ) : (
                      <div className="checkout-note">
                        <span>Have an account? Log in to auto-fill your saved address.</span>
                        <button type="button" className="btn-link-plain" onClick={() => navigateTo('profile')}>Log in →</button>
                      </div>
                    )}

                    <div className="form-group">
                      <label className="form-label" htmlFor="name">Full Name</label>
                      <input
                        type="text" id="name" name="name"
                        className={`form-input${errors.name ? ' has-error' : ''}`}
                        value={formData.name} onChange={handleInputChange}
                        placeholder="E.g. Rajesh Kumar" autoComplete="name"
                      />
                      {errors.name && <p className="field-error">{errors.name}</p>}
                    </div>

                    <div className="cart-form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="phone">Mobile Number</label>
                        <input
                          type="tel" id="phone" name="phone" inputMode="numeric"
                          className={`form-input${errors.phone ? ' has-error' : ''}`}
                          value={formData.phone} onChange={handleInputChange}
                          placeholder="9876543210" autoComplete="tel"
                        />
                        {errors.phone && <p className="field-error">{errors.phone}</p>}
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="email">Email <span className="label-optional">(optional)</span></label>
                        <input
                          type="email" id="email" name="email"
                          className={`form-input${errors.email ? ' has-error' : ''}`}
                          value={formData.email} onChange={handleInputChange}
                          placeholder="rajesh@mail.com" autoComplete="email"
                        />
                        {errors.email && <p className="field-error">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="cart-address-header">
                        <label className="form-label" htmlFor="address">Delivery Address</label>
                        <button
                          type="button" className="btn-fetch-gps-cart"
                          onClick={handleFetchGPSLocation} disabled={isLocating}
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
                        id="address" name="address" rows="3"
                        className={`form-input${errors.address ? ' has-error' : ''}`}
                        value={formData.address} onChange={handleInputChange}
                        placeholder="House No, Street Name, Locality"
                        style={{ resize: 'vertical' }} autoComplete="street-address"
                      ></textarea>
                      {errors.address && <p className="field-error">{errors.address}</p>}
                      {locationError && <p className="field-error">{locationError}</p>}
                    </div>

                    <div className="cart-form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="city">City</label>
                        <input
                          type="text" id="city" name="city"
                          className={`form-input${errors.city ? ' has-error' : ''}`}
                          value={formData.city} onChange={handleInputChange}
                          placeholder="Mumbai" autoComplete="address-level2"
                        />
                        {errors.city && <p className="field-error">{errors.city}</p>}
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="zipCode">PIN Code</label>
                        <input
                          type="text" id="zipCode" name="zipCode" inputMode="numeric" maxLength="6"
                          className={`form-input${errors.zipCode ? ' has-error' : ''}`}
                          value={formData.zipCode} onChange={handleInputChange}
                          placeholder="400001" autoComplete="postal-code"
                        />
                        {errors.zipCode && <p className="field-error">{errors.zipCode}</p>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="landmark">Landmark <span className="label-optional">(optional)</span></label>
                      <input
                        type="text" id="landmark" name="landmark" className="form-input"
                        value={formData.landmark} onChange={handleInputChange}
                        placeholder="Near Ganesh Mandir"
                      />
                    </div>

                    <div className="form-group">
                      <span className="form-label">Save address as</span>
                      <div className="address-type-chips" role="radiogroup" aria-label="Address type">
                        {ADDRESS_TYPES.map(type => (
                          <button
                            key={type} type="button" role="radio"
                            aria-checked={formData.addressType === type}
                            className={`address-type-chip${formData.addressType === type ? ' is-selected' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, addressType: type }))}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <label className="checkout-checkbox">
                      <input type="checkbox" checked={saveAddress} onChange={(e) => setSaveAddress(e.target.checked)} />
                      <span>Save this address to my profile for faster checkout next time</span>
                    </label>

                    <div className="checkout-step-actions">
                      <button type="button" className="btn btn-secondary" onClick={handleBack}>← Back to Cart</button>
                      <button type="button" className="btn btn-primary checkout-cta" onClick={handleContinue}>
                        {CONTINUE_LABEL[2]}
                      </button>
                    </div>
                  </div>
                )}
              </section>

              {/* ---------------------------------------- Step 3 — Summary */}
              <section className="checkout-step" id="checkout-step-3">
                {renderStepHeader(CHECKOUT_STEPS[2])}
                {activeStep === 3 && (
                  <div className="checkout-step-body" id="checkout-panel-3">
                    <div className="review-address-card">
                      <div className="review-address-head">
                        <span className="review-address-type">{formData.addressType}</span>
                        <button type="button" className="btn-link-plain" onClick={() => openStep(2)}>Change</button>
                      </div>
                      <p className="review-address-name">{formData.name} · {formData.phone}</p>
                      <p className="review-address-lines">
                        {formData.address}
                        {formData.landmark && <>, {formData.landmark}</>}
                        {formData.city && <>, {formData.city}</>}
                        {formData.zipCode && <> - {formData.zipCode}</>}
                      </p>
                      {formData.email && <p className="review-address-lines">{formData.email}</p>}
                    </div>

                    <div className="review-eta">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>
                      <span>Expected delivery by <strong>{deliveryEstimate}</strong> · Aroma-lock sealed packing</span>
                    </div>

                    <ul className="review-items">
                      {cart.map((item) => {
                        const productId = item.product._id || item.product.id;
                        return (
                          <li key={productId} className="review-item">
                            <img src={item.product.image || item.product.imageUrl} alt={item.product.name} className="review-item-thumb" />
                            <div className="review-item-info">
                              <span className="review-item-name">{item.product.name}</span>
                              <span className="review-item-meta">{item.product.unit || '100g'} · Qty {item.quantity}</span>
                            </div>
                            <span className="review-item-price">₹{item.product.price * item.quantity}</span>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="checkout-step-actions">
                      <button type="button" className="btn btn-secondary" onClick={handleBack}>← Back to Address</button>
                      <button type="button" className="btn btn-primary checkout-cta" onClick={handleContinue}>
                        {CONTINUE_LABEL[3]}
                      </button>
                    </div>
                  </div>
                )}
              </section>

              {/* ---------------------------------------- Step 4 — Payment */}
              <section className="checkout-step" id="checkout-step-4">
                {renderStepHeader(CHECKOUT_STEPS[3])}
                {activeStep === 4 && (
                  <div className="checkout-step-body" id="checkout-panel-4">
                    <div className="payment-options" role="radiogroup" aria-label="Payment method">
                      {PAYMENT_METHODS.map(method => (
                        <button
                          key={method.id} type="button" role="radio"
                          aria-checked={paymentMethod === method.id}
                          className={`payment-option${paymentMethod === method.id ? ' is-selected' : ''}`}
                          onClick={() => setPaymentMethod(method.id)}
                        >
                          <span className="payment-radio" aria-hidden="true" />
                          <span className="payment-option-text">
                            <span className="payment-option-title">
                              {method.title}
                              {method.badge && <span className="payment-badge">{method.badge}</span>}
                            </span>
                            <span className="payment-option-desc">{method.desc}</span>
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="checkout-note">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                      <span>Your order is confirmed by our team on WhatsApp. No card details are ever collected on this site.</span>
                    </div>

                    <div className="checkout-step-actions">
                      <button type="button" className="btn btn-secondary" onClick={handleBack}>← Back to Summary</button>
                      <button
                        type="button" className="btn btn-primary checkout-cta"
                        onClick={handleContinue} disabled={submitting}
                      >
                        {submitting ? 'Placing Order...' : `Place Order · ₹${cartTotal}`}
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>

          {/* Right: sticky price details */}
          <div className="cart-right-col">
            <div className="cart-summary">
              <h3 className="summary-title">Price Details</h3>

              <div className="summary-row">
                <span>Price ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})</span>
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

              <div className="summary-trust">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" /></svg>
                <span>100% pure, cold-ground spices · Safe & secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky action bar */}
      <div className="checkout-mobile-bar">
        <div className="checkout-mobile-total">
          <span className="cmb-label">Total</span>
          <span className="cmb-value">₹{cartTotal}</span>
        </div>
        <button
          type="button" className="btn btn-primary checkout-mobile-cta"
          onClick={handleContinue} disabled={submitting}
        >
          {submitting ? 'Placing Order...' : CONTINUE_LABEL[activeStep]}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
