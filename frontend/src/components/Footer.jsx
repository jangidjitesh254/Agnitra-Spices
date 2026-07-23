function Footer({ navigateTo }) {
  const handleLinkClick = (e, page) => {
    e.preventDefault();
    navigateTo(page);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to Agnitra Spices Newsletter! We will send you traditional recipes and spice secrets.');
    e.target.reset();
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid-3">
          {/* Brand Column */}
          <div className="footer-brand">
            <a href="#home" className="logo-wrapper" onClick={(e) => handleLinkClick(e, 'home')}>
              <img 
                src="/images/Agnitra logo.jpg" 
                alt="Agnitra Spices Logo" 
                className="logo-img" 
              />
              <span className="logo-text">AGNITRA</span>
            </a>
            <p className="footer-desc">
              Reviving India's ancient spice traditions. Ground at low temperatures using sun-drying, stone mills, and traditional mortars to keep essential oils and flavor lock sealed.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="footer-title">Our Heritage</h3>
            <ul className="footer-links">
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>
                  Home Page
                </a>
              </li>
              <li>
                <a href="#shop" onClick={(e) => handleLinkClick(e, 'shop')}>
                  Pure Spice Catalog
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>
                  Sourcing & Chakki Grinding
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>
                  Reach Our Experts
                </a>
              </li>
              <li>
                <a href="#connect" onClick={(e) => handleLinkClick(e, 'connect')}>
                  Follow & Connect (QR Page)
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="footer-title">Aroma Updates</h3>
            <p className="footer-desc" style={{ marginTop: 0 }}>
              Join our newsletter for ancient spice benefits, immunity tips, and traditional culinary recipes.
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                className="newsletter-input" 
                placeholder="Enter your email" 
                required 
              />
              <button type="submit" className="newsletter-btn">
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Agnitra Spices. Crafted with love for Purity & Tradition.</p>
          <p>Traditional Chakki & Okhli Grinding Methodologies. 100% Preservative Free.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
