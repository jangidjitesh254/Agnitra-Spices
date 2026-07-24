import { useState } from 'react';

function Home({ products, navigateTo, addToCart, loading }) {
  const [activeTab, setActiveTab] = useState('chakki');

  return (
    <div className="home-page">
      {/* 14 Floating Mint Leaves Scattered Down the Whole Page */}
      <img src="/images/mint_leaf_icon.png" className="floating-leaf mint-leaf-1" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/mint_leaf_icon.png" className="floating-leaf mint-leaf-2" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/mint_leaf_icon.png" className="floating-leaf mint-leaf-3" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/mint_leaf_icon.png" className="floating-leaf mint-leaf-4" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/mint_leaf_icon.png" className="floating-leaf mint-leaf-5" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/mint_leaf_icon.png" className="floating-leaf mint-leaf-6" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/mint_leaf_icon.png" className="floating-leaf mint-leaf-7" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/mint_leaf_icon.png" className="floating-leaf mint-leaf-8" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/mint_leaf_icon.png" className="floating-leaf mint-leaf-9" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/mint_leaf_icon.png" className="floating-leaf mint-leaf-10" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/mint_leaf_icon.png" className="floating-leaf mint-leaf-11" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/mint_leaf_icon.png" className="floating-leaf mint-leaf-12" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/mint_leaf_icon.png" className="floating-leaf mint-leaf-13" aria-hidden="true" alt="Floating mint leaf" />
      <img src="/images/mint_leaf_icon.png" className="floating-leaf mint-leaf-14" aria-hidden="true" alt="Floating mint leaf" />

      {/* Decorative Drifting Turmeric & Chilli Spices */}
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
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div className="brand-tab-group">
              <button 
                className={`btn-brand-tab ${activeTab === 'chakki' ? 'active' : ''}`}
                onClick={() => setActiveTab('chakki')}
              >
                <span>⚙️ Stone Chakki (Mills)</span>
              </button>
              <button 
                className={`btn-brand-tab ${activeTab === 'okhli' ? 'active' : ''}`}
                onClick={() => setActiveTab('okhli')}
              >
                <span>🪵 Okhli (Hand Pounded)</span>
              </button>
              <button 
                className={`btn-brand-tab ${activeTab === 'sundried' ? 'active' : ''}`}
                onClick={() => setActiveTab('sundried')}
              >
                <span>☀️ Sun Drying</span>
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
                    Agnitra sun-dries all spices in dust-free solar racks before grinding, preserving raw immunity enzymes and organic taste profiles.
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
            <div className="designer-products-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: '1000px', margin: '0 auto' }}>
              {products.slice(0, 3).map((product) => (
                <div key={product._id} className="designer-product-card animate-fade-in">
                  <div 
                    className="designer-product-img-box"
                    onClick={() => navigateTo('product', { id: product._id })}
                  >
                    <img 
                      src={product.image || product.imageUrl} 
                      alt={product.name} 
                      className="designer-product-img" 
                    />
                  </div>
                  
                  <div className="designer-product-info">
                    <h3 
                      className="designer-product-name"
                      onClick={() => navigateTo('product', { id: product._id })}
                    >
                      {product.name}
                    </h3>

                    <div style={{ marginBottom: '12px' }}>
                      <span className="product-tech-badge">{product.traditionalMethod}</span>
                    </div>

                    <div className="designer-product-bottom-row">
                      <div className="price-tag-group">
                        <span className="designer-product-price">₹{product.price}</span>
                        <span className="designer-product-unit">/ {product.unit || '250g'}</span>
                      </div>
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => addToCart(product, 1)}
                        aria-label={`Add ${product.name} to Cart`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                        <span>Add</span>
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
