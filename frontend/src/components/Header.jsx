import { useState } from 'react';

function Header({ currentPage, navigateTo, cartItemCount, searchQuery, setSearchQuery }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  const handleNavClick = (page) => {
    navigateTo(page);
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setMobileSearchOpen(false);
    setMobileMenuOpen(false);
    navigateTo('shop'); // automatically open shop results
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setSearchQuery(e.target.value);
    if (currentPage !== 'shop' && e.target.value !== '') {
      navigateTo('shop');
    }
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileSearchOpen) setMobileSearchOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-container">
        
        {/* LEFT: Agnitra Logo */}
        <a href="#home" className="logo-wrapper" onClick={() => handleNavClick('home')}>
          <img 
            src="/images/Agnitra logo.jpg" 
            alt="Agnitra Spices Logo" 
            className="logo-img" 
          />
          <div className="logo-text-group">
            <span className="logo-text">Agnitra</span>
            <span className="logo-subtext">SPICES</span>
          </div>
        </a>

        {/* CENTER: Navigation Links & Desktop Search */}
        <nav className="nav-center-wrapper">
          <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {/* Mobile Search Input in Drawer */}
            <li className="mobile-search-item">
              <form onSubmit={handleSearchSubmit} className="mobile-drawer-search-form">
                <input 
                  type="text" 
                  placeholder="Search spices, herbs, blends..." 
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="mobile-drawer-search-input"
                />
                <button type="submit" className="mobile-drawer-search-btn" aria-label="Submit Search">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
              </form>
            </li>
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
                Products
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                href="#recipes" 
                className={`nav-link ${currentPage === 'recipes' ? 'active' : ''}`}
                onClick={() => handleNavClick('recipes')}
              >
                Recipes
              </a>
            </li>
            <li>
              <a 
                href="#recipes" 
                className={`nav-link ${currentPage === 'blog' ? 'active' : ''}`}
                onClick={() => handleNavClick('recipes')}
              >
                Blog
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* RIGHT: Search, Account & Cart Icons */}
        <div className="header-right">
          <button 
            className={`header-icon-btn ${mobileSearchOpen ? 'active' : ''}`} 
            onClick={toggleMobileSearch}
            aria-label="Search Spices"
            title="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>

          <button 
            className="header-icon-btn" 
            onClick={() => navigateTo('orders')}
            aria-label="User Account & Orders"
            title="My Orders"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>

          <button 
            className="cart-icon-btn" 
            onClick={() => navigateTo('cart')}
            aria-label="View Shopping Cart"
            title="Cart"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <path d="M3 6h18"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </button>

          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
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

      {/* Mobile Expandable Search Bar Bar Drawer */}
      {mobileSearchOpen && (
        <div className="mobile-search-bar-drawer animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="mobile-search-form">
            <input 
              type="text" 
              placeholder="Search pure spices, turmeric, chilli..." 
              value={searchInput}
              onChange={handleSearchChange}
              className="mobile-search-bar-input"
              autoFocus
            />
            <button type="submit" className="mobile-search-bar-btn" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </form>
        </div>
      )}
    </header>
  );
}

export default Header;
