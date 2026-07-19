import { useState } from 'react';

function Header({ currentPage, navigateTo, cartItemCount, searchQuery, setSearchQuery }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  const handleNavClick = (page) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    navigateTo('shop'); // automatically open shop results
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    // instant filtering if typing
    setSearchQuery(e.target.value);
    if (currentPage !== 'shop' && e.target.value !== '') {
      navigateTo('shop');
    }
  };

  return (
    <header className="header">
      <div className="container header-container">
        
        {/* LEFT: Search Bar (as shown in user screenshot) */}
        <form className="header-search-form" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Search Spices..." 
            className="header-search-input" 
            value={searchInput}
            onChange={handleSearchChange}
          />
          <button type="submit" className="header-search-btn" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
        </form>

        {/* CENTER: Logo & Navigation */}
        <div className="nav-center-wrapper">
          <a href="#home" className="logo-wrapper" onClick={() => handleNavClick('home')}>
            <img 
              src="/images/Agnitra logo.jpg" 
              alt="Agnitra Spices Logo" 
              className="logo-img" 
            />
            <span className="logo-text">AGNITRA</span>
          </a>

          <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li>
              <a 
                href="#home" 
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#shop" 
                className={`nav-link ${currentPage === 'shop' || currentPage === 'product' ? 'active' : ''}`}
                onClick={() => handleNavClick('shop')}
              >
                Herbs & Spices
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                Our Heritage
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                Contact Us
              </a>
            </li>
            <li>
              <a 
                href="#orders" 
                className={`nav-link ${currentPage === 'orders' ? 'active' : ''}`}
                onClick={() => handleNavClick('orders')}
              >
                Track Order
              </a>
            </li>
          </ul>
        </div>

        {/* RIGHT: Social links & Cart */}
        <div className="header-right">
          {/* Social Icons (from screenshot top right) */}
          <div className="header-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>

          <div className="nav-actions">
            <button 
              className="cart-icon-btn" 
              onClick={() => navigateTo('cart')}
              aria-label="View Shopping Cart"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide lucide-shopping-cart"
              >
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>

            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
              )}
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;
