import { useState } from 'react';
import { API_BASE_URL } from '../App';

function Contact() {
  // Inquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Feedback Form State
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    rating: 5,
    category: 'Spice Quality & Purity',
    comments: ''
  });
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(null);

  // Modal State for Google Review Submission
  const [showGoogleReviewModal, setShowGoogleReviewModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setErrorMsg(null);
      setSuccessMsg(null);

      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit message.');
      }

      setSuccessMsg(result.message);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.error('Contact submission error:', err);
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmittingFeedback(true);
      setFeedbackSuccess(null);

      const feedbackPayload = {
        name: feedbackData.name,
        email: feedbackData.email,
        subject: `[Customer Feedback - ${feedbackData.rating} Stars] (${feedbackData.category})`,
        message: `Rating: ${feedbackData.rating}/5 Stars\nCategory: ${feedbackData.category}\nFeedback: ${feedbackData.comments}`
      };

      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackPayload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback.');
      }

      setFeedbackSuccess('Thank you for your valuable feedback! Your review helps us preserve traditional spice purity.');
      setFeedbackData({
        name: '',
        email: '',
        rating: 5,
        category: 'Spice Quality & Purity',
        comments: ''
      });
    } catch (err) {
      console.error('Feedback submission error:', err);
      alert('Unable to submit feedback at the moment. Please try again.');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const sampleReviews = [
    {
      id: 1,
      name: 'Vikramaditya Sharma',
      city: 'Jaipur, Rajasthan',
      rating: 5,
      date: '2 days ago',
      review: 'The aroma of Haldi - Agnitra Spices is incomparable to mass market brands. Truly authentic cold stone ground purity! You can smell the rich essential curcumin oils the moment you break the aroma seal.'
    },
    {
      id: 2,
      name: 'Priya Rajvansh',
      city: 'New Delhi',
      rating: 5,
      date: '1 week ago',
      review: 'Lal Mirchi - Agnitra Spices gave our curry a gorgeous natural red color without artificial dyes or stomach irritation. Fast delivery and high quality packaging!'
    },
    {
      id: 3,
      name: 'Ramesh Kulkarni',
      city: 'Mumbai, Maharashtra',
      rating: 5,
      date: '2 weeks ago',
      review: 'Dhaniya - Agnitra Spices has a fresh, sweet herbal aroma. I scanned the QR code on the box and verified the stone-grinding process details. 100% genuine brand.'
    }
  ];

  return (
    <div className="contact-page section">
      <div className="container">
        
        {/* Page Header */}
        <div className="section-title-wrapper text-center">
          <span className="section-subtitle">Connect With Agnitra Gurus</span>
          <h1 className="main-headline-title">Get In Touch & Share Feedback</h1>
          <p className="main-headline-sub">We are dedicated to preserving authentic stone-ground spice purity.</p>
        </div>

        {/* 1. Google Rating & Customer Reviews Showcase Banner */}
        <div 
          className="google-rating-banner animate-fade-in"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #faf6ee 100%)',
            border: '1.5px solid var(--border-color)',
            borderRadius: '20px',
            padding: '28px 24px',
            marginBottom: '45px',
            boxShadow: '0 10px 30px rgba(37, 29, 24, 0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '25px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Google G SVG Icon */}
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.13-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-title)', fontSize: '1.6rem', fontWeight: 800, color: '#1a2813' }}>4.9</span>
                  <div style={{ color: '#f39c12', fontSize: '1.1rem', letterSpacing: '2px' }}>★ ★ ★ ★ ★</div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Based on <strong>480+ Verified Google Customer Reviews</strong>
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-designer-green"
              onClick={() => setShowGoogleReviewModal(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', fontSize: '0.9rem' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>Write a Google Review</span>
            </button>
          </div>

          {/* Verified Customer Reviews Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            {sampleReviews.map((rev) => (
              <div 
                key={rev.id} 
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: '14px',
                  padding: '18px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ color: '#f39c12', fontSize: '0.9rem' }}>★ ★ ★ ★ ★</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#273b22', lineHeight: '1.5', marginBottom: '14px', fontStyle: 'italic' }}>
                  "{rev.review}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-orange)', color: '#ffffff', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {rev.name[0]}
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{rev.name}</h5>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{rev.city} • Verified Buyer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Main Grid: Contact Info & Inquiry Form */}
        <div className="grid-2" style={{ gap: '40px', marginBottom: '50px' }}>
          {/* Left: Contact Info cards */}
          <div className="contact-info-card animate-fade-in">
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', marginBottom: '24px', color: 'var(--accent-gold)' }}>
              Agnitra Heritage Headquarters
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '35px' }}>
              Have questions about our stone-grinding process? Want to place a bulk order for a restaurant or wedding? Reach out to us directly or fill out the form.
            </p>

            <div className="contact-detail-row">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <div>
                <h4 className="contact-title">Spicery Factory</h4>
                <p className="contact-desc">Plot 45, Heritage Agricultural Industrial Estate, Rajasthan - 302001</p>
              </div>
            </div>

            <div className="contact-detail-row">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <h4 className="contact-title">Email Us</h4>
                <p className="contact-desc">purity@agnitraspices.com</p>
                <p className="contact-desc">care@agnitraspices.com</p>
              </div>
            </div>

            <div className="contact-detail-row">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <h4 className="contact-title">Call / WhatsApp</h4>
                <p className="contact-desc">+91 98765 43210 (Bulk Orders)</p>
                <p className="contact-desc">+91 141 223344 (Customer Support)</p>
              </div>
            </div>

            <div className="contact-detail-row" style={{ marginBottom: 0 }}>
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <h4 className="contact-title">Operating Hours</h4>
                <p className="contact-desc">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                <p className="contact-desc">Sunday: Traditional Mortar Rest Day</p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="contact-form-card animate-fade-in">
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', marginBottom: '20px' }}>
              Send An Inquiry
            </h3>

            {successMsg && (
              <div style={{ backgroundColor: 'rgba(54, 82, 39, 0.12)', border: '1px solid var(--accent-green)', padding: '16px', borderRadius: '10px', marginBottom: '20px', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div style={{ backgroundColor: 'rgba(200, 62, 45, 0.1)', border: '1px solid var(--accent-red)', padding: '16px', borderRadius: '10px', marginBottom: '20px', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-input" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="E.g. Shashi Tharoor"
                />
              </div>

              <div className="grid-2" style={{ gap: '15px', marginBottom: '0' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-input" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="shashi@mail.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    className="form-input" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  className="form-input" 
                  value={formData.subject} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Bulk order pricing, Sourcing partnership, etc."
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="form-input" 
                  rows="4" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Type your message details here..."
                  style={{ resize: 'vertical' }}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '14px' }}
                disabled={submitting}
              >
                {submitting ? 'Sending Message...' : 'Submit Message'}
              </button>
            </form>
          </div>
        </div>

        {/* 3. Customer Feedback & Rating Form Section */}
        <div 
          className="customer-feedback-section animate-fade-in"
          style={{
            background: 'linear-gradient(135deg, #1b3017 0%, #273b22 100%)',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '35px 28px',
            boxShadow: '0 14px 40px rgba(27, 48, 23, 0.25)',
            border: '2px solid #bd593c'
          }}
        >
          <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <span style={{ color: '#d4af37', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Your Voice Matters
              </span>
              <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.8rem', color: '#ffffff', marginTop: '6px', marginBottom: '8px' }}>
                Share Your Agnitra Spices Feedback
              </h2>
              <p style={{ color: '#d5cbbd', fontSize: '0.95rem' }}>
                Help us continuously improve our cold stone-grinding process and packaging quality.
              </p>
            </div>

            {feedbackSuccess && (
              <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', border: '1px solid #d4af37', padding: '16px', borderRadius: '12px', marginBottom: '25px', color: '#ffffff', fontSize: '0.95rem', textAlign: 'center', fontWeight: 600 }}>
                ✨ {feedbackSuccess}
              </div>
            )}

            <form onSubmit={handleFeedbackSubmit}>
              {/* Star Rating Picker */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#e5dfd2', marginBottom: '10px', fontWeight: 700 }}>
                  Rate Your Agnitra Experience
                </label>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedbackData(prev => ({ ...prev, rating: star }))}
                      style={{
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1.8rem',
                        color: star <= feedbackData.rating ? '#f39c12' : 'rgba(255,255,255,0.25)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease',
                        outline: 'none',
                        padding: '0 4px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid-2" style={{ gap: '18px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#e5dfd2', marginBottom: '6px', fontWeight: 700 }}>
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={feedbackData.name}
                    onChange={handleFeedbackChange}
                    required
                    placeholder="E.g. Rajesh Kumar"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#e5dfd2', marginBottom: '6px', fontWeight: 700 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={feedbackData.email}
                    onChange={handleFeedbackChange}
                    required
                    placeholder="rajesh@mail.com"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#e5dfd2', marginBottom: '6px', fontWeight: 700 }}>
                  Feedback Category
                </label>
                <select
                  name="category"
                  value={feedbackData.category}
                  onChange={handleFeedbackChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: '#1b3017',
                    color: '#ffffff',
                    fontSize: '0.95rem'
                  }}
                >
                  <option value="Spice Quality & Purity">Spice Quality & Stone-Ground Purity</option>
                  <option value="Aroma & Flavor">Aroma Preservation & Taste</option>
                  <option value="Packaging & Delivery">Zip-Lock Packaging & Fast Delivery</option>
                  <option value="Overall Shopping Experience">Overall Website & Service Experience</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#e5dfd2', marginBottom: '6px', fontWeight: 700 }}>
                  Your Detailed Review / Suggestions
                </label>
                <textarea
                  name="comments"
                  rows="3"
                  value={feedbackData.comments}
                  onChange={handleFeedbackChange}
                  required
                  placeholder="Share what you loved or how we can serve you better..."
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    resize: 'vertical'
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn"
                disabled={submittingFeedback}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #bd593c 0%, #a43a1e 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(189, 89, 60, 0.4)'
                }}
              >
                {submittingFeedback ? 'Submitting Feedback...' : 'Submit Customer Review & Feedback'}
              </button>
            </form>
          </div>
        </div>

        {/* 4. Write Google Review Modal */}
        {showGoogleReviewModal && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(4px)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setShowGoogleReviewModal(false)}
          >
            <div 
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '30px 24px',
                maxWidth: '500px',
                width: '100%',
                boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
                textAlign: 'center',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowGoogleReviewModal(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(0,0,0,0.06)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 800
                }}
              >
                ✕
              </button>

              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(66, 133, 244, 0.1)', color: '#4285F4', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <svg width="32" height="32" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.13-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              </div>

              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', marginBottom: '8px' }}>
                Review Agnitra Spices on Google
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '24px' }}>
                Your review helps families across India choose pure, authentic stone-ground spices over machine-milled heat powders.
              </p>

              <a
                href="https://search.google.com/local/writereview?placeid=agnitraspices"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-designer-green"
                style={{ width: '100%', padding: '14px', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
                onClick={() => setShowGoogleReviewModal(false)}
              >
                <span>Continue to Google Reviews ↗</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Contact;
