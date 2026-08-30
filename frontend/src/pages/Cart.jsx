import SpiceDoodleLayer from '../components/SpiceDoodles';

function Cart({ cart, updateCartQty, removeFromCart, navigateTo }) {
  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container empty-state section doodle-host">
        <SpiceDoodleLayer variant="page" doodles={['cinnamon', 'coriander', 'starAnise']} />
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
    <div className="cart-page section doodle-host">
      <SpiceDoodleLayer variant="page" doodles={['cinnamon', 'starAnise', 'bayleaf', 'cardamom', 'peppercorn']} />
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Aroma Preservation</span>
          <h2 className="section-title">Your Shopping Cart</h2>
        </div>

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

          {/* Right: Price summary & checkout entry point */}
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

              <button
                type="button"
                className="btn btn-primary btn-place-order"
                onClick={() => navigateTo('checkout')}
              >
                Proceed to Checkout
              </button>

              <div className="summary-trust">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" /></svg>
                <span>100% pure, cold-ground spices · Safe &amp; secure checkout</span>
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
          type="button"
          className="btn btn-primary checkout-mobile-cta"
          onClick={() => navigateTo('checkout')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
