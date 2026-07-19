import { useState } from 'react';

function ProductDetail({ productId, products, addToCart, navigateTo }) {
  const [qty, setQty] = useState(1);

  const product = products.find(p => p._id === productId);

  if (!product) {
    return (
      <div className="container empty-state section">
        <span className="empty-icon">🔍</span>
        <h2 className="empty-title">Spice Not Found</h2>
        <p className="empty-desc">The spice you are looking for does not exist in our heritage inventory.</p>
        <button className="btn btn-primary" onClick={() => navigateTo('shop')}>
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, qty);
    alert(`${qty} x ${product.name} added to cart!`);
  };

  return (
    <div className="detail-container container">
      {/* Back Button */}
      <a href="#shop" className="detail-back-link" onClick={(e) => { e.preventDefault(); navigateTo('shop'); }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Our Spices
      </a>

      {/* Main product card */}
      <div className="grid-2" style={{ gap: '50px', alignItems: 'start' }}>
        {/* Left: Product Image */}
        <div className="detail-img-card">
          <img 
            src={product.image} 
            alt={product.name} 
            className="detail-img" 
          />
        </div>

        {/* Right: Product Info details */}
        <div>
          <span className="product-tech-badge" style={{ marginBottom: '12px' }}>{product.category} Spice</span>
          <h1 className="detail-title">{product.name}</h1>
          
          <div className="detail-tech-highlight">
            <span>⚙️ Technology:</span>
            <span className="text-gold">{product.traditionalMethod}</span>
          </div>

          <p className="detail-desc">{product.description}</p>

          {/* Specifications Table */}
          <table className="detail-specs-table">
            <tbody>
              <tr>
                <td>Essential Oils</td>
                <td>{product.specifications.essentialOils}</td>
              </tr>
              <tr>
                <td>Moisture Level</td>
                <td>{product.specifications.moisture}</td>
              </tr>
              <tr>
                <td>Spice Origin</td>
                <td>{product.specifications.origin}</td>
              </tr>
              <tr>
                <td>Grinding Temp</td>
                <td>{product.specifications.grindingTemp}</td>
              </tr>
            </tbody>
          </table>

          {/* Key Purity Benefits */}
          <h3 className="detail-benefits-title">Purity & Health Benefits</h3>
          <ul className="detail-benefits-list">
            {product.benefits.map((benefit, idx) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>

          {/* Culinary Usage */}
          <div style={{ marginBottom: '30px' }}>
            <h3 className="detail-benefits-title">Culinary Usage</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              {product.usage}
            </p>
          </div>

          {/* Suggested Recipes */}
          <div style={{ marginBottom: '40px', padding: '20px', backgroundColor: 'rgba(229, 169, 59, 0.05)', borderRadius: '8px', borderLeft: '3px solid var(--accent-gold)' }}>
            <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '8px', fontSize: '0.95rem' }}>Traditional Recipe Tips:</h4>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {product.recipes.map((recipe, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }}>{recipe}</li>
              ))}
            </ul>
          </div>

          {/* Purchase section */}
          <div className="detail-purchase-row">
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Price</span>
              <span className="detail-price">₹{product.price * qty}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>for {product.unit} pack</span>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginLeft: 'auto' }}>
              {/* Quantity Picker */}
              <div className="detail-qty-picker">
                <button 
                  className="qty-btn"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-num">{qty}</span>
                <button 
                  className="qty-btn"
                  onClick={() => setQty(qty + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add Button */}
              <button 
                className="btn btn-primary"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
