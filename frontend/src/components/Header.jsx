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
                href="/qr" 
                className={`nav-link ${currentPage === 'qr' || currentPage === 'connect' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('qr');
                }}
              >
                Follow & Connect
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
            <a href="https://www.instagram.com/agnitraspices/" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61592174644388" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://wa.me/919461839415?text=Hello%20Agnitra%20Spices!" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
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
