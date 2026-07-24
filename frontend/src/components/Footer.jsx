function Footer({ navigateTo }) {
  const handleLinkClick = (e, page) => {
    e.preventDefault();
    navigateTo(page);
  };

  return (
    <footer className="designer-footer">
      <div className="container">
        <div className="footer-grid-4">
          
          {/* Column 1: Brand & Tagline */}
          <div className="footer-col-brand">
            <a href="#home" className="footer-logo-link" onClick={(e) => handleLinkClick(e, 'home')}>
              <img 
                src="/images/Agnitra logo.jpg" 
                alt="Agnitra Spices Logo" 
                className="footer-logo-img" 
              />
              <div className="footer-logo-text-group">
                <span className="footer-logo-title">Agnitra</span>
                <span className="footer-logo-subtitle">SPICES</span>
              </div>
            </a>
            
            <p className="footer-tagline-text">
              From nature to your kitchen.<br />Pure spices. Pure love.
            </p>

            <div className="footer-social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="footer-social-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com/agnitraspices" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-social-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://wa.me/919461839415" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="footer-social-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="footer-social-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>Home</a></li>
              <li><a href="#shop" onClick={(e) => handleLinkClick(e, 'shop')}>Products</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>About Us</a></li>
              <li><a href="#recipes" onClick={(e) => handleLinkClick(e, 'recipes')}>Recipes</a></li>
              <li><a href="#recipes" onClick={(e) => handleLinkClick(e, 'recipes')}>Blog</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="footer-col">
            <h4 className="footer-col-title">Customer Care</h4>
            <ul className="footer-links-list">
              <li><a href="#orders" onClick={(e) => handleLinkClick(e, 'orders')}>My Account</a></li>
              <li><a href="#orders" onClick={(e) => handleLinkClick(e, 'orders')}>Track Order</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>Shipping & Delivery</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>Returns & Refunds</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>FAQ's</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Our Categories */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our Categories</h4>
            <ul className="footer-links-list">
              <li><a href="#shop" onClick={(e) => handleLinkClick(e, 'shop')}>Spices Powders</a></li>
              <li><a href="#shop" onClick={(e) => handleLinkClick(e, 'shop')}>Whole Spices</a></li>
              <li><a href="#shop" onClick={(e) => handleLinkClick(e, 'shop')}>Spice Blends</a></li>
              <li><a href="#shop" onClick={(e) => handleLinkClick(e, 'shop')}>Seeds</a></li>
              <li><a href="#shop" onClick={(e) => handleLinkClick(e, 'shop')}>Masalas</a></li>
            </ul>
          </div>

        </div>

        {/* Feature Badges Bottom Ribbon (Matching Screen 9) */}
        <div className="footer-ribbon-bar">
          <div className="ribbon-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>100% Natural</span>
          </div>
          <div className="ribbon-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg>
            <span>No Additives</span>
          </div>
          <div className="ribbon-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            <span>Hygienically Packed</span>
          </div>
          <div className="ribbon-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <span>Made with Love in India</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright-text">
          <p>© {new Date().getFullYear()} Agnitra Spices. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
