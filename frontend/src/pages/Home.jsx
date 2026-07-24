import { useState } from 'react';

function Home({ products, navigateTo, addToCart, loading }) {
  const [activeTab, setActiveTab] = useState('chakki');

  return (
    <div className="home-page">
      {/* 1. HERO SECTION (Screen 1) with Floating Spices */}
      <section className="designer-hero" style={{ position: 'relative' }}>
        <img src="/images/mint_leaf_icon.png" className="floating-section-spice spice-hero-mint" aria-hidden="true" alt="" />
        <img src="/images/chilli_icon.png" className="floating-section-spice spice-hero-chilli" aria-hidden="true" alt="" />
        
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
                  src="/images/Agnitra bowl of curry.jpg" 
                  alt="Agnitra Spices Authentic Dish" 
                  className="hero-main-dish-img" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BODY SECTION: Authentic Technology Showcase (Screen 4 & 5) with Floating Spices */}
      <section className="section authentic-tech-section" style={{ position: 'relative' }}>
        <img src="/images/turmeric_icon.png" className="floating-section-spice spice-body-turmeric" aria-hidden="true" alt="" />
        <img src="/images/coriander_icon.png" className="floating-section-spice spice-body-coriander" aria-hidden="true" alt="" />

        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Authentic Technology</span>
            <h2 className="section-title">Why Low-Temperature Grinding Matters</h2>
            <p style={{ maxWidth: '680px', margin: '10px auto 0 auto', color: '#554a3d', fontSize: '1rem' }}>
              Commercial high-speed steel mills heat spices up to 90°C, burning away precious essential oils. Agnitra preserves 100% natural aroma and medicinal curcumin values.
            </p>
          </div>

          <div className="tech-toggle-buttons">
            <button 
              className={`btn-brand-tab ${activeTab === 'chakki' ? 'active' : ''}`}
              onClick={() => setActiveTab('chakki')}
            >
              ⚙️ Stone Chakki (Mills)
            </button>
            <button 
              className={`btn-brand-tab ${activeTab === 'okhli' ? 'active' : ''}`}
              onClick={() => setActiveTab('okhli')}
            >
              🪵 Okhli (Hand Pounded)
            </button>
            <button 
              className={`btn-brand-tab ${activeTab === 'sundrying' ? 'active' : ''}`}
              onClick={() => setActiveTab('sundrying')}
            >
              ☀️ Sun Drying
            </button>
          </div>

          <div className="tech-detail-card">
            {activeTab === 'chakki' && (
              <div className="tech-content-grid animate-fade-in">
                <div className="tech-text-col">
                  <h3 className="tech-card-title">Traditional Slow Stone Mill (Chakki)</h3>
                  <p className="tech-card-desc">
                    Our natural granite stone chakkis operate at low RPM (less than 40 RPM). This low friction ensures spices stay cool below 35°C, sealing in volatile aromatic oils like piperine and curcumin.
                  </p>
                  <ul className="tech-feature-list">
                    <li>✓ Zero heat damage to natural volatile oils</li>
                    <li>✓ Natural coarse & rich grain texture</li>
                    <li>✓ 100% pure stone-ground taste</li>
                  </ul>
                </div>
                <div className="tech-img-col">
                  <div className="tech-img-frame">
                    <img src="/images/Stone Chakki.jpg" alt="Stone Chakki Method" className="tech-img" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'okhli' && (
              <div className="tech-content-grid animate-fade-in">
                <div className="tech-text-col">
                  <h3 className="tech-card-title">Wooden Okhli & Musal (Hand Pounding)</h3>
                  <p className="tech-card-desc">
                    Hand pounding in seasoned wooden mortars creates an unbeatable coarse texture. This ancient method releases full essential flavor compounds that machine blades slice and lose.
                  </p>
                  <ul className="tech-feature-list">
                    <li>✓ Authentic heritage mortar rhythm</li>
                    <li>✓ Retains maximum oil cells unbroken until cooking</li>
                    <li>✓ Recommended by Ayurveda practitioners</li>
                  </ul>
                </div>
                <div className="tech-img-col">
                  <div className="tech-img-frame">
                    <img src="/images/Okhli.jpg" alt="Okhli Hand Pounded Method" className="tech-img" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sundrying' && (
              <div className="tech-content-grid animate-fade-in">
                <div className="tech-text-col">
                  <h3 className="tech-card-title">Natural Solar Sun Drying</h3>
                  <p className="tech-card-desc">
                    Before grinding, raw whole spices are solar-dried on clean canvas trays under natural sunlight. This removes moisture naturally without artificial heat ovens or chemical preservatives.
                  </p>
                  <ul className="tech-feature-list">
                    <li>✓ 100% Solar dehydrated purity</li>
                    <li>✓ Natural vibrant color preservation</li>
                    <li>✓ Longer natural shelf-life without additives</li>
                  </ul>
                </div>
                <div className="tech-img-col">
                  <div className="tech-img-frame">
                    <img src="/images/Sun Drying.jpg" alt="Sun Drying Method" className="tech-img" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. THREE PILLARS / CARDS SECTION with Floating Spices */}
      <section className="section" style={{ position: 'relative' }}>
        <img src="/images/chilli_icon.png" className="floating-section-spice spice-cards-chilli" aria-hidden="true" alt="" />
        <img src="/images/mint_leaf_icon.png" className="floating-section-spice spice-cards-mint" aria-hidden="true" alt="" />

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

      {/* 4. CUSTOMER REVIEWS SECTION with Floating Spices */}
      <section className="section reviews-section" style={{ position: 'relative', background: '#fbf9f4', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <img src="/images/mint_leaf_icon.png" className="floating-section-spice spice-reviews-mint" aria-hidden="true" alt="" />
        <img src="/images/turmeric_icon.png" className="floating-section-spice spice-reviews-turmeric" aria-hidden="true" alt="" />

        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Real Kitchen Testimonials</span>
            <h2 className="section-title">What Our Customers Say</h2>
          </div>

          <div className="grid-3" style={{ maxWidth: '1050px', margin: '0 auto' }}>
            <div className="designer-product-card" style={{ textAlign: 'left', padding: '24px' }}>
              <div style={{ color: '#d97706', fontSize: '1.2rem', marginBottom: '10px' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: '#443b31', marginBottom: '16px', lineHeight: '1.6' }}>
                "The aroma when opening Agnitra's hand-pounded red chilli powder is incredible! You only need half a spoon compared to market brands."
              </p>
              <div>
                <strong style={{ display: 'block', color: '#1a2813', fontSize: '0.95rem' }}>Ananya Sharma</strong>
                <span style={{ fontSize: '0.78rem', color: '#7a7365' }}>Verified Buyer • Jaipur</span>
              </div>
            </div>

            <div className="designer-product-card" style={{ textAlign: 'left', padding: '24px' }}>
              <div style={{ color: '#d97706', fontSize: '1.2rem', marginBottom: '10px' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: '#443b31', marginBottom: '16px', lineHeight: '1.6' }}>
                "You can actually feel the natural oil richness in their Lakadong Turmeric. The stone-ground quality makes a huge difference in daily cooking."
              </p>
              <div>
                <strong style={{ display: 'block', color: '#1a2813', fontSize: '0.95rem' }}>Rajesh Verma</strong>
                <span style={{ fontSize: '0.78rem', color: '#7a7365' }}>Verified Buyer • Delhi</span>
              </div>
            </div>

            <div className="designer-product-card" style={{ textAlign: 'left', padding: '24px' }}>
              <div style={{ color: '#d97706', fontSize: '1.2rem', marginBottom: '10px' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: '#443b31', marginBottom: '16px', lineHeight: '1.6' }}>
                "Fast delivery, beautiful packaging, and 100% natural flavor. Agnitra has replaced all machine-made spices in our home."
              </p>
              <div>
                <strong style={{ display: 'block', color: '#1a2813', fontSize: '0.95rem' }}>Pooja Mehta</strong>
                <span style={{ fontSize: '0.78rem', color: '#7a7365' }}>Verified Buyer • Ahmedabad</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS FLOW SHOWCASE */}
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

      {/* 6. STORYTELLING & CALL TO ACTION */}
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
