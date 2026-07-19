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
              <div className="contact-icon">📍</div>
              <div>
                <h4 className="contact-title">Spicery Factory</h4>
                <p className="contact-desc">Plot 45, Heritage Agricultural Industrial Estate, Rajasthan - 302001</p>
              </div>
            </div>

            <div className="contact-detail-row">
              <div className="contact-icon">📧</div>
              <div>
                <h4 className="contact-title">Email Us</h4>
                <p className="contact-desc">purity@agnitraspices.com</p>
                <p className="contact-desc">care@agnitraspices.com</p>
              </div>
            </div>

            <div className="contact-detail-row">
              <div className="contact-icon">📞</div>
              <div>
                <h4 className="contact-title">Call / WhatsApp</h4>
                <p className="contact-desc">+91 98765 43210 (Bulk Orders)</p>
                <p className="contact-desc">+91 141 223344 (Customer Support)</p>
              </div>
            </div>

            <div className="contact-detail-row" style={{ marginBottom: 0 }}>
              <div className="contact-icon">⏰</div>
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
              <div style={{ backgroundColor: 'rgba(0, 150, 136, 0.15)', border: '1px solid #009688', padding: '16px', borderRadius: '8px', marginBottom: '20px', color: '#009688' }}>
                ✓ {successMsg}
              </div>
            )}

            {errorMsg && (
              <div style={{ backgroundColor: 'rgba(200, 62, 45, 0.1)', border: '1px solid var(--accent-red)', padding: '16px', borderRadius: '8px', marginBottom: '20px', color: 'var(--accent-red)' }}>
                ⚠️ Error: {errorMsg}
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
