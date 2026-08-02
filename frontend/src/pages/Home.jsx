function Home({ products, navigateTo, addToCart, updateCartQty, cart, loading }) {

  const getProductCartQty = (product) => {
    if (!cart || !Array.isArray(cart)) return 0;
    const productId = product._id || product.id;
    const found = cart.find(item => (item.product._id || item.product.id) === productId);
    return found ? found.quantity : 0;
  };

  return (
    <div className="home-page">
      {/* Decorative Drifting Spices & Leaves */}
      <img src="/images/mint_leaf_icon.png" className="floating-leaf leaf-1" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/mint_leaf_icon.png" className="floating-leaf leaf-2" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/turmeric_icon.png" className="floating-leaf leaf-4" aria-hidden="true" alt="Floating turmeric root" />
      <img src="/images/chilli_icon.png" className="floating-leaf chilli-drift" aria-hidden="true" alt="Floating red chilli left" />
      <img src="/images/chilli_icon.png" className="floating-leaf chilli-right-1" aria-hidden="true" alt="Floating red chilli right top" />
      <img src="/images/chilli_icon.png" className="floating-leaf chilli-right-2" aria-hidden="true" alt="Floating red chilli right mid" />

      {/* Hero Section - Matching Designer Screen 1 */}
      <section className="designer-hero">
        <div className="container">
          <div className="hero-grid-2">
            
            {/* Left side: Headline & Call To Action */}
            <div className="hero-content-col animate-fade-in">
              <h1 className="designer-hero-title">
                From Nature<br />To Your Kitchen
              </h1>
              <p className="designer-hero-subtitle">
                100% natural spices for a healthy and happy life.
              </p>
              <div>
                <button 
                  className="btn btn-designer-green"
                  onClick={() => navigateTo('shop')}
                >
                  Shop Now →
                </button>
              </div>
            </div>
            
            {/* Right side: Hero 3D Transparent Visual Placement */}
            <div className="hero-visual-col animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="hero-3d-image-wrapper">
                <img 
                  src="/images/Agnitra-home.png" 
                  alt="Agnitra Spices 3D Handcrafted Collection" 
                  className="hero-3d-transparent-img"
                  onClick={() => navigateTo('shop')}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Badges Green Ribbon (Matching Designer Screen 1) */}
      <section className="hero-feature-ribbon">
        <div className="container">
          <div className="ribbon-grid-4">
            <div className="ribbon-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>100% Natural</span>
            </div>
            <div className="ribbon-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg>
              <span>No Additives</span>
            </div>
            <div className="ribbon-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <span>Rich in Aroma</span>
            </div>
            <div className="ribbon-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              <span>Hygienically Packed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spices Section */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Our Signature Collection</span>
            <h2 className="section-title">The Three Pillars of Agnitra</h2>
          </div>

          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <div className="designer-products-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>
              {products.slice(0, 3).map((product) => {
                const productId = product._id || product.id;
                const qty = getProductCartQty(product);

                return (
                  <div key={productId} className="designer-product-card animate-fade-in">
                    <div 
                      className="designer-product-img-box"
                      onClick={() => navigateTo('product', { id: productId })}
                    >
                      <span className="product-badge-overlay">{product.unit || '100g'} Pure</span>
                      <img 
                        src={product.image || product.imageUrl} 
                        alt={product.name} 
                        className="designer-product-img" 
                      />
                    </div>
                    
                    <div className="designer-product-info">
                      <h3 
                        className="designer-product-name"
                        onClick={() => navigateTo('product', { id: productId })}
                      >
                        {product.name}
                      </h3>

                      <div style={{ marginBottom: '12px' }}>
                        <span className="product-tech-badge">{product.traditionalMethod || product.traditional_method}</span>
                      </div>

                      <div className="designer-product-bottom-row">
                        <div className="price-tag-group">
                          <span className="designer-product-price">₹{product.price}</span>
                          <span className="designer-product-unit">/ {product.unit || '100g'}</span>
                        </div>

                        {qty > 0 ? (
                          <div 
                            className="product-qty-stepper animate-fade-in" 
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button 
                              type="button"
                              className="stepper-btn minus"
                              onClick={() => updateCartQty(productId, qty - 1)}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="stepper-count">{qty}</span>
                            <button 
                              type="button"
                              className="stepper-btn plus"
                              onClick={() => updateCartQty(productId, qty + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button 
                            className="add-to-cart-btn"
                            onClick={() => addToCart(product, 1)}
                            aria-label={`Add ${product.name} to Cart`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                            <span>Add</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button 
              className="btn btn-secondary"
              onClick={() => navigateTo('shop')}
            >
              Browse All Spices
            </button>
          </div>
        </div>
      </section>



      {/* Storytelling & Call to Action */}
      <section className="section" style={{ background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontFamily: 'var(--font-title)' }}>Experience Real Heritage Flavor</h2>
          <p className="about-text" style={{ fontSize: '1.1rem', marginBottom: '35px' }}>
            Cooking with Agnitra means using spices in their native, oil-rich form. Your curries will smell richer, require smaller spice amounts, and provide the traditional therapeutic values your ancestors cherished.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => navigateTo('shop')}
            style={{ padding: '16px 40px', fontSize: '1rem' }}
          >
            Taste the Purity
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
