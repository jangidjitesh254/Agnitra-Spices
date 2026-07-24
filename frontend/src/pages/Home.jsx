import { useState } from 'react';

function Home({ products, navigateTo, addToCart, loading }) {
  const [activeTab, setActiveTab] = useState('chakki');

  return (
    <div className="home-page">
      {/* Decorative Drifting Spices & Leaves */}
      <img src="/images/mint_leaf_icon.png" className="floating-leaf leaf-1" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/mint_leaf_icon.png" className="floating-leaf leaf-2" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/mint_leaf_icon.png" className="floating-leaf leaf-3" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/turmeric_icon.png" className="floating-leaf leaf-4" aria-hidden="true" alt="Floating turmeric root" />
      <img src="/images/chilli_icon.png" className="floating-leaf chilli-drift" aria-hidden="true" alt="Floating red chilli" />
      <img src="/images/coriander_icon.png" className="floating-leaf peppercorns-drift" aria-hidden="true" alt="Floating coriander seeds" />

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
            
            {/* Right side: Hero Visual Bowl Composition */}
            <div className="hero-visual-col animate-fade-in">
              <div className="hero-dish-frame">
                <img 
                  src="/images/turmeric.jpeg" 
                  alt="Nature pure Indian spices" 
                  className="hero-main-dish-img"
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

      {/* Traditional Technology Showcase Tabs */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Authentic Technology</span>
            <h2 className="section-title">Why Low-Temp Grinding Matters</h2>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
              <button 
                className={`btn ${activeTab === 'chakki' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveTab('chakki')}
              >
                Stone Chakki (Mills)
              </button>
              <button 
                className={`btn ${activeTab === 'okhli' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveTab('okhli')}
              >
                Okhli (Hand Pounded)
              </button>
              <button 
                className={`btn ${activeTab === 'sundried' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveTab('sundried')}
              >
                Sun Drying
              </button>
            </div>

            <div className="about-heritage-card" style={{ marginTop: 0, padding: '40px' }}>
              {activeTab === 'chakki' && (
                <div>
                  <h3 style={{ color: 'var(--accent-red)', marginBottom: '16px', fontFamily: 'var(--font-title)', fontSize: '1.5rem' }}>Slow Rotating Stone Mills</h3>
                  <p className="about-text">
                    Industrial steel pulverizers spin at up to 10,000 RPM, creating extreme friction temperatures (75°C - 90°C). This heat literally burns off volatile essential oils, destroying flavor, medicinal curcumin, and natural color.
                  </p>
                  <p className="about-text">
                    Agnitra uses heavy stone-wheels (Chakki) that rotate slowly under 45 RPM. The natural grinding stones absorb excess temperature, ensuring the spice stays cool (under 38°C) and locks in all aromatic oils.
                  </p>
                </div>
              )}

              {activeTab === 'okhli' && (
                <div>
                  <h3 style={{ color: 'var(--accent-red)', marginBottom: '16px', fontFamily: 'var(--font-title)', fontSize: '1.5rem' }}>Hand-Pounding (Okhli-Musar)</h3>
                  <p className="about-text">
                    Pounding is an ancient technique of crushing spices with blunt impact rather than slicing. Slicing spices with high-speed blades ruptures cell walls aggressively, leading to quick oxidation and flavor degradation.
                  </p>
                  <p className="about-text">
                    Our hand-pounding method gently crushes raw turmeric rhizomes and pods. This preserves the internal cellular structure of the spices, keeping health curcumin nodes intact and unlocking a multi-layered flavor profile.
                  </p>
                </div>
              )}

              {activeTab === 'sundried' && (
                <div>
                  <h3 style={{ color: 'var(--accent-red)', marginBottom: '16px', fontFamily: 'var(--font-title)', fontSize: '1.5rem' }}>Natural Solar Dehydration</h3>
                  <p className="about-text">
                    Commercial brands dry spices in high-temperature diesel ovens. This exposes spice leaves and roots to fuel fumes and severe temperature shocks, making spices dry, stiff, and carbon-polluted.
                  </p>
                  <p className="about-text">
                    We dry all our chillies, turmeric roots, and coriander seeds naturally under direct sunlight in clean, open-air racks. The solar rays gently extract moisture while sealing the vital therapeutic minerals inside the crop.
                  </p>
                </div>
              )}
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
            <div className="grid-3">
              {products.slice(0, 3).map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-img-wrapper">
                    <span className="product-tag">{product.category}</span>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-img" 
                      onClick={() => navigateTo('product', { id: product._id })}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  <div className="product-info">
                    <h3 
                      className="product-title"
                      onClick={() => navigateTo('product', { id: product._id })}
                      style={{ cursor: 'pointer' }}
                    >
                      {product.name}
                    </h3>
                    <span className="product-tech-badge">{product.traditionalMethod}</span>
                    <p className="product-desc">{product.description}</p>
                    <div className="product-footer">
                      <div className="product-price-wrapper">
                        <span className="product-price">₹{product.price}</span>
                        <span className="product-unit">per {product.unit}</span>
                      </div>
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => {
                          addToCart(product, 1);
                          alert(`${product.name} added to cart!`);
                        }}
                        aria-label={`Add ${product.name} to Cart`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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

      {/* Process Flow Showcase */}
      <section className="section process-section" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Purity in Action</span>
            <h2 className="section-title">From Farms to Aroma-Lock Seal</h2>
          </div>

          <div className="grid-4">
            <div className="process-card">
              <span className="process-num">1</span>
              <h3 className="process-title">Earthy Sourcing</h3>
              <p className="process-desc">Directly harvested from organic, heritage farmers in Meghalaya, Rajasthan, and Karnataka.</p>
            </div>
            <div className="process-card">
              <span className="process-num">2</span>
              <h3 className="process-title">Sun-Dehydrated</h3>
              <p className="process-desc">Slow sun-dried over clean canvas racks, retaining solar nutrients and natural dryness.</p>
            </div>
            <div className="process-card">
              <span className="process-num">3</span>
              <h3 className="process-title">Traditional Grinding</h3>
              <p className="process-desc">Slow cold-pressed ground in traditional stone chakkis and wooden mortars below 38°C.</p>
            </div>
            <div className="process-card">
              <span className="process-num">4</span>
              <h3 className="process-title">Aroma-Lock Packaging</h3>
              <p className="process-desc">Packed immediately in triple-layer nitrogen-flushed packages to prevent oxidation.</p>
            </div>
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
