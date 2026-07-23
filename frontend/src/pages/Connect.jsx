import { useState } from 'react';

function Connect({ navigateTo }) {
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Exact page URL for QR Code redirection
  const currentUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}#connect` 
    : 'https://www.instagram.com/agnitraspices/';

  const instagramUrl = 'https://www.instagram.com/agnitraspices/';
  const facebookUrl = 'https://www.facebook.com/profile.php?id=61592174644388';
  const whatsappNumber = '+91 94618 39415';
  const whatsappCleanNumber = '919461839415';
  const whatsappUrl = `https://wa.me/${whatsappCleanNumber}?text=Hello%20Agnitra%20Spices!%20I%20would%20like%20to%20inquire%20about%20your%20pure%20traditional%20spices.`;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'url') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  return (
    <div className="connect-page section">
      {/* Floating 3D Spice Icons */}
      <img src="/images/mint_leaf_icon.jpg" className="floating-leaf leaf-1" aria-hidden="true" alt="" />
      <img src="/images/chilli_icon.jpg" className="floating-leaf chilli-drift" aria-hidden="true" alt="" />
      <img src="/images/turmeric_icon.jpg" className="floating-leaf leaf-4" aria-hidden="true" alt="" />
      <img src="/images/coriander_icon.jpg" className="floating-leaf peppercorns-drift" aria-hidden="true" alt="" />

      <div className="container" style={{ maxWidth: '680px' }}>
        
        {/* Brand Avatar & Bio Card */}
        <div className="connect-header-card animate-fade-in">
          <div className="connect-avatar-wrapper">
            <img 
              src="/images/Agnitra logo.jpg" 
              alt="Agnitra Spices Brand Logo" 
              className="connect-avatar-img" 
            />
            <span className="connect-verified-badge" title="Official Verified Page">✓</span>
          </div>

          <h1 className="connect-brand-title">AGNITRA SPICES</h1>
          <p className="connect-brand-subtitle">Low-Temperature Stone Ground • 100% Pure & Authentic</p>
          
          <div className="connect-tags-row">
            <span className="connect-tag">☀️ Sun Dried</span>
            <span className="connect-tag">🪵 Hand Pounded</span>
            <span className="connect-tag">🌿 Zero Additives</span>
          </div>
        </div>

        {/* QR Code Quick Copy Box for User */}
        <div className="connect-qr-box animate-fade-in">
          <div className="qr-box-header">
            <div>
              <h3 className="qr-box-title">QR Code Link Destination</h3>
              <p className="qr-box-desc">Use this link to generate QR codes for your spice boxes & flyers:</p>
            </div>
            <button 
              className={`btn ${copied ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => copyToClipboard(currentUrl, 'url')}
              style={{ padding: '8px 18px', fontSize: '0.75rem', flexShrink: 0 }}
            >
              {copied ? '✓ Copied Link!' : '📋 Copy URL'}
            </button>
          </div>
          <div className="qr-url-display">
            {currentUrl}
          </div>
        </div>

        {/* Social Media & Contact Links List */}
        <div className="connect-links-container">
          
          {/* Instagram Link Card */}
          <a 
            href={instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="connect-link-card instagram-card animate-fade-in"
          >
            <div className="connect-link-icon-box instagram-icon-bg">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </div>
            <div className="connect-link-content">
              <span className="connect-link-title">Follow on Instagram</span>
              <span className="connect-link-sub">@agnitraspices • Spice secrets, recipes & farm stories</span>
            </div>
            <span className="connect-link-arrow">→</span>
          </a>

          {/* Facebook Link Card */}
          <a 
            href={facebookUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="connect-link-card facebook-card animate-fade-in"
          >
            <div className="connect-link-icon-box facebook-icon-bg">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </div>
            <div className="connect-link-content">
              <span className="connect-link-title">Connect on Facebook</span>
              <span className="connect-link-sub">Official Agnitra Spices Community Page</span>
            </div>
            <span className="connect-link-arrow">→</span>
          </a>

          {/* WhatsApp Direct Chat Card */}
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="connect-link-card whatsapp-card animate-fade-in"
          >
            <div className="connect-link-icon-box whatsapp-icon-bg">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div className="connect-link-content">
              <span className="connect-link-title">WhatsApp Support & Orders</span>
              <span className="connect-link-sub">{whatsappNumber} • Instant Customer Care & Inquiries</span>
            </div>
            <span className="connect-link-badge">CHAT</span>
          </a>

          {/* Direct Phone Call / Quick Copy Card */}
          <div className="connect-link-card phone-card animate-fade-in">
            <div className="connect-link-icon-box phone-icon-bg">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div className="connect-link-content">
              <span className="connect-link-title">Direct Call: {whatsappNumber}</span>
              <span className="connect-link-sub">Click button to copy phone number</span>
            </div>
            <button 
              className="copy-phone-btn" 
              onClick={() => copyToClipboard(whatsappNumber, 'phone')}
            >
              {copiedPhone ? 'Copied!' : 'Copy No.'}
            </button>
          </div>

          {/* Official Website & Store Navigation Link */}
          <div 
            className="connect-link-card store-card animate-fade-in"
            onClick={() => navigateTo('shop')}
            style={{ cursor: 'pointer' }}
          >
            <div className="connect-link-icon-box store-icon-bg">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <div className="connect-link-content">
              <span className="connect-link-title">Explore Pure Spices Store</span>
              <span className="connect-link-sub">Order Kashmiri Chilli, Turmeric & Coriander online</span>
            </div>
            <span className="connect-link-arrow">→</span>
          </div>

          {/* Sourcing Story Page Navigation Link */}
          <div 
            className="connect-link-card story-card animate-fade-in"
            onClick={() => navigateTo('about')}
            style={{ cursor: 'pointer' }}
          >
            <div className="connect-link-icon-box story-icon-bg">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="connect-link-content">
              <span className="connect-link-title">Why Low-Temp Grinding?</span>
              <span className="connect-link-sub">Read our heritage story & cold Chakki processing</span>
            </div>
            <span className="connect-link-arrow">→</span>
          </div>

        </div>

        {/* Footer Tag */}
        <div style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <p>© {new Date().getFullYear()} Agnitra Spices. Traditional Quality Guaranteed.</p>
        </div>

      </div>
    </div>
  );
}

export default Connect;
