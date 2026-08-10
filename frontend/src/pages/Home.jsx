import { useRef } from 'react';

function Home({ products, navigateTo, addToCart, updateCartQty, cart, loading }) {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -310 : 310;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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
                From Nature<br />To Our Kitchen
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
            <div className="home-products-scroll-wrapper">
              <button 
                type="button" 
                className="scroll-nav-btn prev" 
                onClick={() => handleScroll('left')}
                aria-label="Scroll left"
              >
                ‹
              </button>

              <div className="home-products-scroll-container" ref={scrollContainerRef}>
                {products.map((product) => {
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

                        <div className="designer-product-bottom-row">
                          <div className="price-tag-group">
                            <span className="designer-product-price">₹{product.price}</span>
                            <span className="designer-product-unit">/ {product.unit || '100g'}</span>
                          </div>

                          {qty > 0 ? (
                            <div 
                              className="product-qty-stepper animate-fade-in" 
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '8px',
                                background: 'linear-gradient(180deg, #f9f6f0 0%, #ede6d8 100%)',
                                color: '#1b2a12',
                                borderRadius: '50px',
                                padding: '4px 10px',
                                border: '1.5px solid #2b3e1b',
                                boxShadow: '0 4px 12px rgba(37, 29, 24, 0.08)',
                                boxSizing: 'border-box'
                              }}
                            >
                              <button 
                                type="button"
                                className="stepper-btn minus"
                                onClick={() => updateCartQty(productId, qty - 1)}
                                aria-label="Decrease quantity"
                                style={{
                                  appearance: 'none',
                                  WebkitAppearance: 'none',
                                  width: '28px',
                                  height: '28px',
                                  minWidth: '28px',
                                  minHeight: '28px',
                                  borderRadius: '50%',
                                  background: 'linear-gradient(135deg, #2b3e1b 0%, #1b2a12 100%)',
                                  color: '#ffffff',
                                  border: 'none',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  padding: '0',
                                  margin: '0',
                                  lineHeight: '1',
                                  outline: 'none',
                                  boxShadow: '0 2px 6px rgba(43, 62, 27, 0.3)'
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                              </button>

                              <span 
                                className="stepper-count"
                                style={{
                                  fontFamily: 'var(--font-body), sans-serif',
                                  fontSize: '0.98rem',
                                  fontWeight: '800',
                                  color: '#1b2a12',
                                  minWidth: '20px',
                                  textAlign: 'center'
                                }}
                              >
                                {qty}
                              </span>

                              <button 
                                type="button"
                                className="stepper-btn plus"
                                onClick={() => updateCartQty(productId, qty + 1)}
                                aria-label="Increase quantity"
                                style={{
                                  appearance: 'none',
                                  WebkitAppearance: 'none',
                                  width: '28px',
                                  height: '28px',
                                  minWidth: '28px',
                                  minHeight: '28px',
                                  borderRadius: '50%',
                                  background: 'linear-gradient(135deg, #2b3e1b 0%, #1b2a12 100%)',
                                  color: '#ffffff',
                                  border: 'none',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  padding: '0',
                                  margin: '0',
                                  lineHeight: '1',
                                  outline: 'none',
                                  boxShadow: '0 2px 6px rgba(43, 62, 27, 0.3)'
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
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

              <button 
                type="button" 
                className="scroll-nav-btn next" 
                onClick={() => handleScroll('right')}
                aria-label="Scroll right"
              >
                ›
              </button>
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



      {/* Traditional Recipes Showcase Section */}
      <section className="section" style={{ background: '#FAF6F0', padding: '60px 0', borderTop: '1px solid #EDE6D8', borderBottom: '1px solid #EDE6D8' }}>
        <div className="container">
          <div className="section-title-wrapper text-center" style={{ marginBottom: '40px' }}>
            <span className="section-subtitle" style={{ color: '#3b6e28', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>🌿 CULINARY HERITAGE & INSPIRATION</span>
            <h2 className="main-headline-title" style={{ fontFamily: 'var(--font-title)', fontSize: '2.4rem', color: '#1b2e13', margin: '8px 0' }}>Cook Authentic Recipes with Agnitra</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px', marginBottom: '36px' }}>
            {[
              {
                id: 1,
                title: 'Royal Veg Shahi Pulao',
                category: 'Lunch',
                time: '25 mins',
                image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80',
                spices: 'Khadi Mirch • Sabut Dhaniya • Haldi'
              },
              {
                id: 2,
                title: 'Paneer Butter Masala',
                category: 'Dinner',
                time: '35 mins',
                image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
                spices: 'Lal Mirchi • Haldi • Dhaniya'
              },
              {
                id: 3,
                title: 'Desi Tadka Dal Fry',
                category: 'Lunch',
                time: '25 mins',
                image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
                spices: 'Haldi • Khadi Mirch • Dhaniya'
              },
              {
                id: 4,
                title: 'Special Dum Biryani',
                category: 'Dinner',
                time: '50 mins',
                image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
                spices: 'Lal Mirchi • Sabut Dhaniya • Haldi'
              }
            ].map((recipe) => (
              <div 
                key={recipe.id}
                onClick={() => navigateTo('recipes')}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1.5px solid #ede6d8',
                  boxShadow: '0 8px 24px rgba(37, 29, 24, 0.05)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                  <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#2b3e1b', color: '#ffffff', padding: '3px 10px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>
                    {recipe.category}
                  </span>
                  <span style={{ position: 'absolute', top: '12px', right: '12px', background: '#ffffff', color: '#1b2e13', padding: '3px 10px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '800' }}>
                    ⏱ {recipe.time}
                  </span>
                </div>

                <div style={{ padding: '18px' }}>
                  <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.15rem', fontWeight: '800', color: '#1b2e13', marginBottom: '6px' }}>
                    {recipe.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#3b6e28', fontWeight: '700', margin: '0 0 12px 0' }}>
                    Agnitra Spices: {recipe.spices}
                  </p>
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1b2e13', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    View Ingredients &amp; Recipe →
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              className="btn btn-primary"
              onClick={() => navigateTo('recipes')}
              style={{ padding: '14px 32px', fontSize: '0.98rem', fontWeight: '800', background: '#2b3e1b', color: '#ffffff', border: 'none', borderRadius: '12px' }}
            >
              Explore All Traditional Recipes →
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
