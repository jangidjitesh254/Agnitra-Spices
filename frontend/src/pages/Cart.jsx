import { useState } from 'react';
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

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
          productId: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.image
        })),
        totalAmount: cartTotal
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to place order.');
      }

      alert(result.message);
      clearCart();
      onOrderPlaced(); // refresh app orders state
      navigateTo('orders');
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container empty-state section">
        <span className="empty-icon">🛒</span>
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
          <div style={{ backgroundColor: 'rgba(200, 62, 45, 0.1)', border: '1px solid var(--accent-red)', padding: '16px', borderRadius: '8px', marginBottom: '30px', color: 'var(--accent-red)' }}>
            ⚠️ Error: {error}
          </div>
        )}

        <div className="grid-2" style={{ gap: '40px', alignItems: 'start' }}>
          {/* Left: Cart Items List */}
          <div>
            <div className="cart-card">
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                Selected Spices ({cart.length})
              </h3>
              
              {cart.map((item) => (
                <div key={item.product._id} className="cart-item">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="cart-item-img" 
                  />
                  <div className="cart-item-info">
                    <h4 className="cart-item-title">{item.product.name}</h4>
                    <p className="cart-item-tech">{item.product.traditionalMethod}</p>
                    <span className="cart-item-price">₹{item.product.price} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/ {item.product.unit}</span></span>
                  </div>

                  {/* Qty Picker in Cart */}
                  <div className="detail-qty-picker" style={{ margin: '0 15px' }}>
                    <button 
                      className="qty-btn"
                      onClick={() => updateCartQty(item.product._id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="qty-num">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => updateCartQty(item.product._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: '80px' }}>
                    <p style={{ fontWeight: 700, fontFamily: 'var(--font-title)' }}>₹{item.product.price * item.quantity}</p>
                    <button 
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.product._id)}
                      style={{ marginTop: '4px' }}
                      title="Remove Item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="btn btn-secondary"
              onClick={() => navigateTo('shop')}
              style={{ marginTop: '20px', width: '100%' }}
            >
              ← Add More Spices
            </button>
          </div>

          {/* Right: Checkout Summary & Form */}
          <div>
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
              <form onSubmit={handleSubmitOrder} style={{ marginTop: '30px' }}>
                <h4 className="checkout-section-title">Shipping & Billing Details</h4>
                
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

                <div className="grid-2" style={{ gap: '15px', marginBottom: '0' }}>
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
                  <label className="form-label" htmlFor="address">Delivery Address</label>
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
                </div>

                <div className="grid-2" style={{ gap: '15px', marginBottom: '0' }}>
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
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '16px 20px', marginTop: '10px' }}
                  disabled={submitting}
                >
                  {submitting ? 'Placing Order...' : `Confirm & Place Order (₹${cartTotal})`}
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
