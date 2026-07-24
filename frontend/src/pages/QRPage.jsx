import { useState } from 'react';

function QRPage({ navigateTo }) {
  const [copied, setCopied] = useState(false);

  // Exact page URL for QR Code redirection
  const currentUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}#qr` 
    : 'https://www.instagram.com/agnitraspices/';

  const instagramUrl = 'https://www.instagram.com/agnitraspices/';
  const facebookUrl = 'https://www.facebook.com/profile.php?id=61592174644388';
  const whatsappUrl = 'https://wa.me/919461839415?text=Hello%20Agnitra%20Spices!%20I%20would%20like%20to%20connect%20with%20you.';
  const emailUrl = 'mailto:purity@agnitraspices.com?subject=Agnitra%20Spices%20Inquiry';

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="qr-landing-page">
      {/* Decorative Drifting Floating 3D Spice Icons */}
      <img src="/images/mint_leaf_icon.png" className="floating-leaf leaf-1" aria-hidden="true" alt="" />
      <img src="/images/turmeric_icon.png" className="floating-leaf leaf-4" aria-hidden="true" alt="" />
      <img src="/images/chilli_icon.png" className="floating-leaf chilli-drift" aria-hidden="true" alt="" />

      {/* Decorative Corner Raw Spice Dishes & Artwork Elements */}
      <div className="qr-corner-spice corner-top-left" aria-hidden="true">
        <img src="/images/turmeric.jpeg" alt="" className="corner-spice-img" />
      </div>
      <div className="qr-corner-spice corner-top-right" aria-hidden="true">
        <img src="/images/chilli.jpeg" alt="" className="corner-spice-img" />
      </div>

      <div className="qr-container">
        
        {/* Top Header Branding Section */}
        <header className="qr-header animate-fade-in">
          <div className="qr-logo-wrapper">
            <img 
              src="/images/Agnitra logo.jpg" 
              alt="Agnitra Spices Brand Logo" 
              className="qr-brand-logo-img" 
            />
            <div className="qr-brand-name-group">
              <span className="qr-brand-name">Agnitra</span>
              <span className="qr-brand-subname">SPICES</span>
            </div>
          </div>

          <div className="qr-divider-line">
            <span className="divider-leaf">🍂</span>
            <span className="divider-line"></span>
            <span className="divider-leaf">🌱</span>
          </div>

          <h1 className="qr-main-tagline">Pure Spices. Pure Love.</h1>

          <div className="qr-divider-line">
            <span className="divider-leaf">🌱</span>
            <span className="divider-line"></span>
            <span className="divider-leaf">🍂</span>
          </div>

          <p className="qr-welcome-text">
            Thank you for choosing Agnitra Spices.<br />
            Connect with us through the options below.
          </p>
        </header>

        {/* 6 Action Cards Responsive Grid (Exact Layout from Screenshot) */}
        <div className="qr-cards-grid">
          
          {/* Card 1: Visit Our Website */}
          <div 
            className="qr-card card-website animate-fade-in"
            onClick={() => navigateTo('shop')}
          >
            <div className="qr-card-icon-circle icon-website">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                <path d="M2 12h20"/>
              </svg>
            </div>
            <div className="qr-card-info">
              <h2 className="qr-card-title">Visit Our Website</h2>
              <p className="qr-card-desc">Explore our products and the world of Agnitra Spices.</p>
            </div>
            <div className="qr-card-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </div>

          {/* Card 2: Instagram */}
          <a 
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="qr-card card-instagram animate-fade-in"
          >
            <div className="qr-card-icon-circle icon-instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </div>
            <div className="qr-card-info">
              <h2 className="qr-card-title">Instagram</h2>
              <p className="qr-card-desc">Follow us for recipes, updates & exciting offers.</p>
            </div>
            <div className="qr-card-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </a>

          {/* Card 3: Facebook */}
          <a 
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="qr-card card-facebook animate-fade-in"
          >
            <div className="qr-card-icon-circle icon-facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </div>
            <div className="qr-card-info">
              <h2 className="qr-card-title">Facebook</h2>
              <p className="qr-card-desc">Like our page and stay updated with our latest news.</p>
            </div>
            <div className="qr-card-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </a>

          {/* Card 4: WhatsApp */}
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="qr-card card-whatsapp animate-fade-in"
          >
            <div className="qr-card-icon-circle icon-whatsapp">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div className="qr-card-info">
              <h2 className="qr-card-title">WhatsApp</h2>
              <p className="qr-card-desc">Chat with us for quick support and assistance.</p>
            </div>
            <div className="qr-card-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </a>

          {/* Card 5: Email Support */}
          <a 
            href={emailUrl}
            className="qr-card card-email animate-fade-in"
          >
            <div className="qr-card-icon-circle icon-email">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <div className="qr-card-info">
              <h2 className="qr-card-title">Email Support</h2>
              <p className="qr-card-desc">Reach out to us anytime. We're happy to help!</p>
            </div>
            <div className="qr-card-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </a>

          {/* Card 6: Feedback Form */}
          <div 
            className="qr-card card-feedback animate-fade-in"
            onClick={() => navigateTo('contact')}
          >
            <div className="qr-card-icon-circle icon-feedback">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                <polygon points="12 7 13.5 10 17 10.3 14.3 12.5 15.2 16 12 14 8.8 16 9.7 12.5 7 10.3 10.5 10 12 7"/>
              </svg>
            </div>
            <div className="qr-card-info">
              <h2 className="qr-card-title">Feedback Form</h2>
              <p className="qr-card-desc">We value your feedback. Share your experience with us.</p>
            </div>
            <div className="qr-card-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </div>

        </div>

        {/* Footer Thank You Note Section */}
        <footer className="qr-footer-thankyou animate-fade-in">
          <div className="qr-thank-title-row">
            <span className="qr-thank-leaf">🌿</span>
            <h3 className="qr-thank-title">Thank you! ❤️</h3>
            <span className="qr-thank-leaf">🌿</span>
          </div>
          <p className="qr-thank-sub">
            Your support inspires us to bring the best spices to your kitchen.
          </p>
        </footer>

      </div>

      {/* Dark Forest Green Bottom Banner Bar */}
      <div className="qr-bottom-bar-banner">
        <div className="qr-bottom-bar-content">
          <span className="bar-icon">🌿</span>
          <span className="bar-text-main">Agnitra Spices</span>
          <span className="bar-separator">|</span>
          <span className="bar-text-sub">Bringing Aroma to Every Home</span>
          <span className="bar-separator">|</span>
          <span className="bar-icon">🌿</span>
        </div>
      </div>
    </div>
  );
}

export default QRPage;
