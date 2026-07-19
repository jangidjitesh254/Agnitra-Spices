import { useState } from 'react';

function Home({ products, navigateTo, addToCart, loading }) {
  const [activeTab, setActiveTab] = useState('chakki');

  return (
    <div className="home-page">
      {/* Decorative Drifting Spices & Leaves (from user screenshot) */}
      <div className="floating-leaf leaf-1" aria-hidden="true">🍃</div>
      <div className="floating-leaf leaf-2" aria-hidden="true">🍃</div>
      <div className="floating-leaf leaf-3" aria-hidden="true">🍃</div>
      <div className="floating-leaf leaf-4" aria-hidden="true">🌿</div>
      <div className="floating-leaf chilli-drift" aria-hidden="true">🌶️</div>
      <div className="floating-leaf peppercorns-drift" aria-hidden="true">⚫⚫</div>

      {/* Hero Section - Overhauled to match screenshot */}
      <section className="hero">
        {/* Large red curve shape on the right */}
        <div className="hero-curve-backdrop"></div>

        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', minHeight: '65vh' }}>
            {/* Left side: Text content */}
            <div className="hero-text-col">
              <span className="hero-tag">Natural & Organic</span>
              <h1 className="hero-title">
                Spices <span className="cursive">Powder</span>
              </h1>
              <p className="hero-desc">
                Agnitra Spices makes available the protein-rich pure traditional spices and herbs directly sourced from finest organic farms of Rajasthan, Karnataka, and Meghalaya. Ground at low speed without thermal loss.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigateTo('shop')}
                >
                  Read More
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => navigateTo('about')}
                >
                  Our Process
                </button>
              </div>
            </div>
            
            {/* Right side: Circular overlapping spice image */}
            <div className="hero-showcase-col">
              <div className="hero-circle-frame">
                <img 
                  src="/images/turmeric.jpeg" 
                  alt="Turmeric powder stone grinding mixtures" 
                  className="hero-circle-img"
                  onClick={() => navigateTo('shop')}
                  style={{ cursor: 'pointer' }}
                />
              </div>

              {/* Overlapping floating red chilli underlay */}
              <div className="hero-chilli-underlay" aria-hidden="true">
                🌶️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Badges Section */}
      <section className="features-section">
        <div className="container">
          <div className="grid-3">
            <div className="feature-badge-card">
              <div className="feature-icon-wrapper">🌡️</div>
              <div>
                <h4 className="feature-badge-title">Cold-Ground Purity</h4>
                <p className="feature-badge-desc">Stays strictly under 38°C to retain essential volatile oils.</p>
              </div>
            </div>
            <div className="feature-badge-card">
              <div className="feature-icon-wrapper">☀️</div>
              <div>
                <h4 className="feature-badge-title">Naturally Sun Dried</h4>
                <p className="feature-badge-desc">Dehydrated in solar racks to capture rich natural taste.</p>
              </div>
            </div>
            <div className="feature-badge-card">
              <div className="feature-icon-wrapper">🌱</div>
              <div>
                <h4 className="feature-badge-title">100% Organic Sourcing</h4>
                <p className="feature-badge-desc">Directly harvested from certified local farm families.</p>
              </div>
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
