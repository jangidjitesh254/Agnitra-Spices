import { useState } from 'react';

function ProductDetail({ productId, products, addToCart, navigateTo }) {
  const [qty, setQty] = useState(1);

  const product = products.find(p => (p._id === productId || p.id === productId));

  if (!product) {
    return (
      <div className="container empty-state section" style={{ minHeight: '60vh', textAlign: 'center', paddingTop: '60px' }}>
        <span className="empty-icon" style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>🔍</span>
        <h2 className="empty-title" style={{ fontFamily: 'var(--font-title)', fontSize: '1.8rem', color: '#1b2e13', marginBottom: '10px' }}>Spice Not Found</h2>
        <p className="empty-desc" style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>The spice you are looking for does not exist in our heritage inventory.</p>
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

  const specs = product.specifications || {
    essentialOils: "Essential Oils Preserved",
    moisture: "Under 8% (Max Aroma Lock)",
    origin: "Heritage Farms, India",
    grindingTemp: "Low-Temperature Process"
  };

  const benefits = (product.benefits && product.benefits.length > 0) ? product.benefits : [
    "100% Pure & Traditionally Processed",
    "Zero chemical preservatives, lead chromate, or starch fillers",
    "High essential oil retention with aroma lock seal"
  ];

  const usage = product.usage || "Ideal for daily Indian cooking, traditional tadka, curries, marinades, and spice rubs.";

  const recipes = (product.recipes && product.recipes.length > 0) ? product.recipes : [
    "Add to warm ghee or oil at the start of cooking to release natural essential oils.",
    "Stir into slow-cooked gravies at the end of cooking for authentic aroma."
  ];

  return (
    <div className="detail-container container section" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Back Button */}
      <a 
        href="#shop" 
        className="detail-back-link" 
        onClick={(e) => { e.preventDefault(); navigateTo('shop'); }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#1b2e13',
          fontWeight: '700',
          fontSize: '0.9rem',
          marginBottom: '28px',
          textDecoration: 'none'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Our Spices Catalog
      </a>

      {/* Main product card */}
      <div className="grid-2" style={{ gap: '44px', alignItems: 'start' }}>
        {/* Left: Product Image */}
        <div className="detail-img-card" style={{ background: '#ffffff', borderRadius: '24px', padding: '24px', border: '1.5px solid rgba(229, 223, 210, 0.95)', boxShadow: '0 10px 30px rgba(37, 29, 24, 0.06)', textAlign: 'center' }}>
          <img 
            src={product.image || product.imageUrl} 
            alt={product.name} 
            className="detail-img" 
            style={{ width: '100%', maxHeight: '420px', objectFit: 'contain', borderRadius: '16px' }}
          />
        </div>

        {/* Right: Product Info details */}
        <div>
          <span className="product-tech-badge" style={{ display: 'inline-block', marginBottom: '12px', background: '#eff5ea', color: '#3b6e28', padding: '6px 14px', borderRadius: '50px', fontWeight: '800', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.category || 'Pure Spice'}
          </span>
          <h1 className="detail-title" style={{ fontFamily: 'var(--font-title)', fontSize: '2.2rem', fontWeight: '800', color: '#1b2e13', marginBottom: '12px', lineHeight: '1.25' }}>
            {product.name}
          </h1>
          
          <div className="detail-tech-highlight" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', background: '#faf6f0', padding: '10px 16px', borderRadius: '12px', border: '1px solid #ede6d8' }}>
            <span style={{ fontWeight: '700', color: '#1b2e13', fontSize: '0.88rem' }}>⚙️ Processing Method:</span>
            <span style={{ color: '#d4af37', fontWeight: '800', fontSize: '0.88rem' }}>{product.traditionalMethod || product.traditional_method || 'Stone Ground'}</span>
          </div>

          <p className="detail-desc" style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.65', marginBottom: '24px' }}>
            {product.description}
          </p>

          {/* Specifications Table */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: '800', color: '#1b2e13', marginBottom: '12px' }}>Specifications & Origin</h3>
            <table className="detail-specs-table" style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff', borderRadius: '14px', overflow: 'hidden', border: '1px solid #e5dfd2' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f0e8d8' }}>
                  <td style={{ padding: '10px 16px', fontWeight: '700', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Essential Oils</td>
                  <td style={{ padding: '10px 16px', fontWeight: '800', color: '#1b2e13', fontSize: '0.88rem' }}>{specs.essentialOils || 'Natural Essential Oils Intact'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f0e8d8' }}>
                  <td style={{ padding: '10px 16px', fontWeight: '700', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Moisture Level</td>
                  <td style={{ padding: '10px 16px', fontWeight: '800', color: '#1b2e13', fontSize: '0.88rem' }}>{specs.moisture || 'Under 8% (Max Aroma)'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f0e8d8' }}>
                  <td style={{ padding: '10px 16px', fontWeight: '700', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Spice Origin</td>
                  <td style={{ padding: '10px 16px', fontWeight: '800', color: '#1b2e13', fontSize: '0.88rem' }}>{specs.origin || 'Selected Farms, India'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 16px', fontWeight: '700', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Grinding / Drying Temp</td>
                  <td style={{ padding: '10px 16px', fontWeight: '800', color: '#1b2e13', fontSize: '0.88rem' }}>{specs.grindingTemp || specs.type || 'Low-Temperature Cold Process'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Key Purity Benefits */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: '800', color: '#1b2e13', marginBottom: '12px' }}>Purity & Health Benefits</h3>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              {benefits.map((benefit, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }}>{benefit}</li>
              ))}
            </ul>
          </div>

          {/* Culinary Usage */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: '800', color: '#1b2e13', marginBottom: '10px' }}>Culinary Usage</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {usage}
            </p>
          </div>

          {/* Suggested Recipes */}
          <div style={{ marginBottom: '32px', padding: '18px 20px', backgroundColor: 'rgba(212, 175, 55, 0.08)', borderRadius: '14px', borderLeft: '4px solid #d4af37' }}>
            <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 800, color: '#1b2e13', marginBottom: '8px', fontSize: '0.95rem' }}>Traditional Cooking Tips:</h4>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              {recipes.map((recipe, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }}>{recipe}</li>
              ))}
            </ul>
          </div>

          {/* Purchase Section */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', padding: '18px 24px', borderRadius: '18px', border: '1.5px solid rgba(229, 223, 210, 0.95)', boxShadow: '0 8px 24px rgba(37, 29, 24, 0.05)', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>Price ({product.unit || '100g'})</span>
              <span style={{ fontFamily: 'var(--font-title)', fontSize: '1.8rem', fontWeight: '800', color: '#1b2e13' }}>₹{product.price * qty}</span>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {/* Quantity Picker */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#faf6f0', padding: '6px 14px', borderRadius: '50px', border: '1px solid #ede6d8' }}>
                <button 
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Decrease quantity"
                  style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#3b6e28', color: '#ffffff', border: 'none', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}
                >
                  -
                </button>
                <span style={{ fontWeight: '800', fontSize: '1rem', color: '#1b2e13', minWidth: '20px', textAlign: 'center' }}>{qty}</span>
                <button 
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  aria-label="Increase quantity"
                  style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#3b6e28', color: '#ffffff', border: 'none', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}
                >
                  +
                </button>
              </div>

              {/* Add Button */}
              <button 
                className="btn btn-primary"
                onClick={handleAddToCart}
                style={{ padding: '12px 28px', fontSize: '0.92rem' }}
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
