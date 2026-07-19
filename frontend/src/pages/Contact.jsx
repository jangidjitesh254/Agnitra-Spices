import { useState } from 'react';
import { API_BASE_URL } from '../App';

function Contact() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

  return (
    <div className="contact-page section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Reach Our Spice Gurus</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <div className="grid-2" style={{ gap: '40px' }}>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <div>
                <h4 className="contact-title">Spicery Factory</h4>
                <p className="contact-desc">Plot 45, Heritage Agricultural Industrial Estate, Rajasthan - 302001</p>
              </div>
            </div>

            <div className="contact-detail-row">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <h4 className="contact-title">Email Us</h4>
                <p className="contact-desc">purity@agnitraspices.com</p>
                <p className="contact-desc">care@agnitraspices.com</p>
              </div>
            </div>

            <div className="contact-detail-row">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <h4 className="contact-title">Call / WhatsApp</h4>
                <p className="contact-desc">+91 98765 43210 (Bulk Orders)</p>
                <p className="contact-desc">+91 141 223344 (Customer Support)</p>
              </div>
            </div>

            <div className="contact-detail-row" style={{ marginBottom: 0 }}>
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
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
              <div style={{ backgroundColor: 'rgba(0, 150, 136, 0.15)', border: '1px solid #009688', padding: '16px', borderRadius: '8px', marginBottom: '20px', color: '#009688', display: 'flex', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle" style={{marginRight: '8px'}}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div style={{ backgroundColor: 'rgba(200, 62, 45, 0.1)', border: '1px solid var(--accent-red)', padding: '16px', borderRadius: '8px', marginBottom: '20px', color: 'var(--accent-red)', display: 'flex', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle" style={{marginRight: '8px'}}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
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
      </div>
    </div>
  );
}

export default Contact;
