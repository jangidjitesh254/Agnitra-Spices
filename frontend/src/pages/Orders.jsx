function Orders({ orders, navigateTo }) {
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'processing':
        return 'status-processing';
      case 'aroma-locked':
      case 'aroma-sealed':
        return 'status-aroma-locked';
      case 'shipped':
        return 'status-shipped';
      default:
        return 'status-processing';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'processing':
        return 'Processing Order';
      case 'aroma-locked':
        return '🔒 Aroma Locked';
      case 'shipped':
        return '🚚 Shipped out';
      default:
        return status || 'Processing';
    }
  };

  return (
    <div className="orders-page section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-title-wrapper">
          <span className="section-subtitle">Aroma Tracking System</span>
          <h2 className="section-title">Track Your Orders</h2>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📦</span>
            <h3 className="empty-title">No Orders Placed Yet</h3>
            <p className="empty-desc">Once you place an order, you can track its packing and aroma-lock status here.</p>
            <button className="btn btn-primary" onClick={() => navigateTo('shop')}>
              Explore Spices Shop
            </button>
          </div>
        ) : (
          <div>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '30px' }}>
              Your spices are processed in small traditional batches. Below is the real-time preparation state of your spice packages:
            </p>

            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.orderId} className="order-card animate-fade-in">
                  <div className="order-header">
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Order ID</span>
                      <span className="order-id">{order.orderId}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Placed On</span>
                      <span className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>Aroma Status</span>
                      <span className={`order-status-badge ${getStatusClass(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>

                  {/* List items */}
                  <div className="order-items-list">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item-row">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                          />
                          <div>
                            <span style={{ fontWeight: 600 }}>{item.name}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span style={{ fontFamily: 'var(--font-title)', fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed var(--border-color)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Shipping Destination:</p>
                    <p>{order.customer.name} | {order.customer.phone}</p>
                    <p>{order.customer.address}, {order.customer.city} - {order.customer.zipCode}</p>
                  </div>

                  {/* Order Total */}
                  <div className="order-total-row">
                    <span>Grand Total</span>
                    <span style={{ color: 'var(--accent-gold)', fontSize: '1.2rem', fontFamily: 'var(--font-title)' }}>₹{order.totalAmount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
