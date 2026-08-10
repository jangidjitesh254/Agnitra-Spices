import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../App';
import { isFirebaseConfigured, sendFirebaseOtp, verifyFirebaseOtp } from '../firebase';

function Account({ orders, navigateTo }) {
  // Authentication & Login State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('agnitra_user_logged_in') === 'true';
  });

  const [loginStep, setLoginStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneInput, setPhoneInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpMessage, setOtpMessage] = useState(null);
  const [otpError, setOtpError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Tab & Profile States
  const [activeTab, setActiveTab] = useState('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // Default initial profile data
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('agnitra_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      } catch (e) {
        // Fallback
      }
    }
    return {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    };
  });

  // Countdown timer effect for OTP resend
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Helper to handle post-OTP verification onboarding check
  const completeVerificationAndProceed = (verifiedPhone) => {
    const saved = localStorage.getItem('agnitra_user_profile');
    let parsed = null;
    if (saved) {
      try { parsed = JSON.parse(saved); } catch (e) {}
    }

    // Check if user already has a completed profile (name & address populated)
    if (parsed && parsed.name && parsed.name.trim().length > 0 && parsed.address && parsed.address.trim().length > 0) {
      const updatedProfile = { ...parsed, phone: verifiedPhone };
      localStorage.setItem('agnitra_user_profile', JSON.stringify(updatedProfile));
      localStorage.setItem('agnitra_user_logged_in', 'true');
      setProfile(updatedProfile);
      setIsLoggedIn(true);
      setOtpMessage(null);
    } else {
      // First-time user sign-in -> Prompt Name, Delivery Location & Email (Optional)
      setProfile(prev => ({
        ...prev,
        phone: verifiedPhone,
        name: prev?.name || '',
        email: prev?.email || '',
        address: prev?.address || '',
        city: prev?.city || '',
        state: prev?.state || '',
        zipCode: prev?.zipCode || ''
      }));
      setLoginStep('onboarding');
      setOtpMessage('🎉 Mobile number verified! Please set up your name & shipping address below.');
    }
  };

  // Handle Send OTP (Firebase or Backend API)
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setOtpError(null);
    setOtpMessage(null);

    const cleanPhone = phoneInput.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setOtpError('Please enter a valid 10-digit mobile phone number.');
      return;
    }

    const formattedPhone = `+91${cleanPhone.slice(-10)}`;

    try {
      setAuthLoading(true);

      if (isFirebaseConfigured()) {
        await sendFirebaseOtp(formattedPhone, 'recaptcha-container');
        setLoginStep('otp');
        setOtpMessage(`🔥 Real SMS OTP sent via Firebase to ${formattedPhone}. Please check your mobile messages.`);
        setCountdown(30);
        return;
      }

      // Backend API OTP fallback
      const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send OTP.');
      }

      setLoginStep('otp');
      setOtpMessage(`OTP sent to ${formattedPhone}. (Demo OTP: ${data.otp || '123456'})`);
      setCountdown(30);
    } catch (err) {
      console.error('Send OTP error:', err);
      if (err.code === 'auth/billing-not-enabled' || err.message?.includes('billing-not-enabled')) {
        setOtpError('💳 Firebase Billing Notice: Live SMS sending requires adding a Free Test Phone Number in Firebase Console (or upgrading to Blaze plan). Switched to Test Mode for instant verification below.');
        setLoginStep('otp');
        setOtpMessage(`Testing Mode Active for ${formattedPhone}. (Use Demo OTP: 123456)`);
        setCountdown(30);
      } else if (err.message?.includes('region') || err.code === 'auth/operation-not-allowed') {
        setOtpError('🌐 Firebase SMS Region Restriction: Please go to Firebase Console -> Authentication -> Settings tab -> SMS Region Policy -> Select "Allow all SMS regions" (or enable India +91) and click Save. (You can also use Demo OTP: 123456 below).');
        setLoginStep('otp');
        setOtpMessage(`Testing Mode Active for ${formattedPhone}. (Demo OTP: 123456)`);
        setCountdown(30);
      } else if (err.code === 'auth/invalid-app-credential' || err.message?.includes('invalid-app-credential')) {
        setOtpError('⚠️ Firebase Authorized Domain Error. Please ensure "localhost" is added under Firebase Console -> Authentication -> Settings -> Authorized Domains. (You can also use Demo OTP: 123456).');
        setLoginStep('otp');
        setOtpMessage(`Testing Mode Active for ${formattedPhone}. (Demo OTP: 123456)`);
        setCountdown(30);
      } else if (err.code === 'auth/too-many-requests' || err.message?.includes('too-many-requests')) {
        setOtpError('⚠️ Firebase SMS Quota Exceeded for today. Use Demo OTP: 123456 below to test instantly.');
        setLoginStep('otp');
        setOtpMessage(`Testing Mode Active for ${formattedPhone}. (Demo OTP: 123456)`);
        setCountdown(30);
      } else if (isFirebaseConfigured()) {
        setOtpError(err.message || 'Firebase SMS delivery failed. Make sure Phone Auth is enabled in Firebase Console.');
      } else {
        setLoginStep('otp');
        setOtpMessage(`OTP sent to ${formattedPhone}. (Demo OTP: 123456)`);
        setCountdown(30);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Verify OTP (Firebase or Backend API)
  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    setOtpError(null);

    if (otpInput.length < 6) {
      setOtpError('Please enter the complete 6-digit OTP code.');
      return;
    }

    try {
      setAuthLoading(true);
      const cleanPhone = phoneInput.replace(/\D/g, '').slice(-10);
      const userPhoneFormatted = `+91 ${cleanPhone}`;

      // Firebase Verification Flow
      if (isFirebaseConfigured() && window.confirmationResult) {
        const user = await verifyFirebaseOtp(otpInput);
        console.log('✅ Firebase Phone Authentication Success:', user);
        completeVerificationAndProceed(user.phoneNumber || userPhoneFormatted);
        return;
      }

      // Backend API Verification Fallback
      const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, otp: otpInput })
      });

      const data = await res.json();
      if (!res.ok && otpInput !== '123456') {
        throw new Error(data.error || 'Invalid OTP code.');
      }

      // Proceed to Onboarding check
      completeVerificationAndProceed(userPhoneFormatted);
    } catch (err) {
      console.error('Verify OTP error:', err);
      if (otpInput === '123456') {
        // Fallback demo OTP bypass
        completeVerificationAndProceed(`+91 ${phoneInput.replace(/\D/g, '').slice(-10)}`);
      } else {
        setOtpError(err.message || 'Invalid OTP code. Use 123456 for instant testing.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle First-Time User Onboarding Form Submit
  const handleOnboardingSubmit = (e) => {
    if (e) e.preventDefault();
    setOtpError(null);

    if (!profile.name || !profile.name.trim()) {
      setOtpError('Please enter your full name.');
      return;
    }
    if (!profile.address || !profile.address.trim()) {
      setOtpError('Please enter your delivery location/address.');
      return;
    }

    // Save final profile & complete login
    localStorage.setItem('agnitra_user_profile', JSON.stringify(profile));
    localStorage.setItem('agnitra_user_logged_in', 'true');
    setIsLoggedIn(true);
    setOtpMessage(null);
    setOtpError(null);
  };

  // Handle Quick Demo Fill
  const handleDemoFill = () => {
    setPhoneInput('9876543210');
    setOtpError(null);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('agnitra_user_logged_in');
    setIsLoggedIn(false);
    setLoginStep('phone');
    setPhoneInput('');
    setOtpInput('');
    setOtpMessage(null);
    setOtpError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFetchGPSLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser. Please enter your address manually below.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          
          if (data && data.address) {
            const addr = data.address;
            const road = addr.road || addr.suburb || addr.neighbourhood || '';
            const house = addr.house_number || addr.building || '';
            const streetAddr = [house, road, addr.suburb].filter(Boolean).join(', ') || data.display_name.split(',')[0];
            const city = addr.city || addr.town || addr.village || addr.county || 'Jaipur';
            const state = addr.state || 'Rajasthan';
            const postcode = addr.postcode || '';

            setProfile(prev => ({
              ...prev,
              address: streetAddr || prev.address,
              city: city || prev.city,
              state: state || prev.state,
              zipCode: postcode || prev.zipCode
            }));
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 4000);
          } else {
            setProfile(prev => ({
              ...prev,
              address: `GPS Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
            }));
          }
        } catch (err) {
          console.error('Reverse geocode error:', err);
          setProfile(prev => ({
            ...prev,
            address: `GPS Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
          }));
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location permission denied by browser. You can write your address manually below.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable. Please write your address manually below.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please enter address manually below.');
            break;
          default:
            setLocationError('Could not fetch GPS location. Please enter manually below.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('agnitra_user_profile', JSON.stringify(profile));
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'processing':
        return 'status-processing';
      case 'aroma-locked':
      case 'aroma-sealed':
        return 'status-aroma-locked';
      case 'shipped':
      case 'delivered':
        return 'status-shipped';
      default:
        return 'status-processing';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'processing':
        return 'Processing Batch';
      case 'aroma-locked':
      case 'aroma-sealed':
        return 'Aroma Sealed';
      case 'shipped':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return status || 'Processing';
    }
  };

  const [currentView, setCurrentView] = useState('dashboard');
  const [orderFilter, setOrderFilter] = useState('all'); 
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const filteredOrders = orders.filter(order => {
    if (orderFilter === 'all') return true;
    const st = (order.status || 'processing').toLowerCase();
    if (orderFilter === 'pending' || orderFilter === 'processing') {
      return st === 'processing' || st === 'pending';
    }
    return st === orderFilter.toLowerCase();
  });

  // -------------------------------------------------------------
  // RENDER: PHONE NUMBER + OTP LOGIN FORM (WHEN NOT LOGGED IN)
  // -------------------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 16px', background: 'var(--bg-primary)' }}>
        <div className="phone-login-card animate-fade-in" style={{ width: '100%', maxWidth: '450px', background: '#ffffff', borderRadius: '28px', padding: '40px 32px', border: '1.5px solid #ede6d8', boxShadow: '0 20px 50px rgba(37, 29, 24, 0.09)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          
          {/* Solid Top Green Accent Line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: '#3b6e28' }}></div>

          {/* Agnitra Logo Avatar */}
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#faf6f0', border: '2px solid #3b6e28', padding: '4px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <img src="/images/Agnitra logo.jpg" alt="Agnitra Spices Logo" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.85rem', fontWeight: '800', color: '#1b2e13', marginBottom: '6px', lineHeight: '1.2' }}>
            {loginStep === 'phone' ? 'Welcome to Agnitra' : loginStep === 'otp' ? 'Enter 6-Digit OTP' : 'Create Your Profile'}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '26px', lineHeight: '1.5' }}>
            {loginStep === 'phone' 
              ? 'Sign in or create your account using your mobile phone number' 
              : loginStep === 'otp'
              ? `Verification code sent to +91 ${phoneInput.slice(-10)}`
              : 'Enter your name, shipping location, and optional email to complete setup.'}
          </p>

          {otpMessage && (
            <div style={{ backgroundColor: 'rgba(59, 110, 40, 0.08)', border: '1.5px solid #3b6e28', color: '#3b6e28', padding: '14px 16px', borderRadius: '14px', marginBottom: '22px', fontSize: '0.88rem', fontWeight: '700', lineHeight: '1.45', textAlign: 'left' }}>
              ✨ {otpMessage}
            </div>
          )}

          {otpError && (
            <div style={{ backgroundColor: 'rgba(200, 62, 45, 0.08)', border: '1.5px solid var(--accent-red)', color: 'var(--accent-red)', padding: '14px 16px', borderRadius: '14px', marginBottom: '22px', fontSize: '0.88rem', fontWeight: '700', textAlign: 'left' }}>
              ⚠️ {otpError}
            </div>
          )}

          {/* Invisible Firebase reCAPTCHA Container */}
          <div id="recaptcha-container"></div>

          {loginStep === 'phone' ? (
            <form onSubmit={handleSendOtp} style={{ textAlign: 'left' }}>
              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: '#1b2e13', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Mobile Phone Number
                </label>

                <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #e0d8c8', borderRadius: '14px', overflow: 'hidden', background: '#faf6f0', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}>
                  <span style={{ padding: '15px 16px', fontWeight: '800', color: '#1b2e13', fontSize: '1.05rem', borderRight: '1.5px solid #e0d8c8', background: '#ede6d8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    🇮🇳 +91
                  </span>
                  <input 
                    type="tel"
                    placeholder="98765 43210"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    maxLength="10"
                    required
                    style={{ flex: '1', border: 'none', background: 'transparent', padding: '15px 16px', fontSize: '1.1rem', fontWeight: '700', color: '#1b2e13', outline: 'none' }}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={authLoading}
                style={{ width: '100%', padding: '15px', fontSize: '1.02rem', fontWeight: '800', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#2b3e1b', color: '#ffffff', border: 'none', cursor: 'pointer' }}
              >
                {authLoading ? 'Sending OTP...' : 'Send Verification OTP →'}
              </button>

              <button 
                type="button"
                onClick={handleDemoFill}
                style={{ width: '100%', marginTop: '14px', background: 'rgba(59, 110, 40, 0.08)', border: '1.5px dashed #3b6e28', color: '#1b2e13', padding: '12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' }}
              >
                ⚡ Quick Fill Demo Number: 9876543210
              </button>
            </form>
          ) : loginStep === 'otp' ? (
            <form onSubmit={handleVerifyOtp} style={{ textAlign: 'left' }}>
              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: '#1b2e13', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  6-Digit Verification OTP
                </label>

                <input 
                  type="text"
                  placeholder="• • • • • •"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength="6"
                  required
                  style={{ width: '100%', border: '2px solid #e0d8c8', borderRadius: '14px', padding: '16px', fontSize: '1.35rem', fontWeight: '800', color: '#1b2e13', outline: 'none', textAlign: 'center', letterSpacing: '0.4em', background: '#faf6f0', boxSizing: 'border-box' }}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={authLoading}
                style={{ width: '100%', padding: '15px', fontSize: '1.02rem', fontWeight: '800', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#2b3e1b', color: '#ffffff', border: 'none', cursor: 'pointer' }}
              >
                {authLoading ? 'Verifying Code...' : 'Verify OTP & Continue →'}
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '18px', fontSize: '0.85rem' }}>
                <button 
                  type="button" 
                  onClick={() => setLoginStep('phone')} 
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                >
                  ← Change Number
                </button>
                <button 
                  type="button" 
                  onClick={handleSendOtp} 
                  disabled={countdown > 0} 
                  style={{ background: 'none', border: 'none', color: countdown > 0 ? 'var(--text-muted)' : '#3b6e28', cursor: countdown > 0 ? 'default' : 'pointer', fontWeight: 700 }}
                >
                  {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
                </button>
              </div>
            </form>
          ) : (
            /* STEP 3: FIRST-TIME USER ONBOARDING FORM */
            <form onSubmit={handleOnboardingSubmit} style={{ textAlign: 'left' }}>
              
              {/* Full Name */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: '#1b2e13', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Full Name <span style={{ color: 'var(--accent-red)' }}>*</span>
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  required
                  style={{ width: '100%', border: '2px solid #e0d8c8', borderRadius: '12px', padding: '12px 14px', fontSize: '0.95rem', fontWeight: '700', color: '#1b2e13', background: '#faf6f0', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {/* Delivery Address & GPS */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#1b2e13', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
                    Delivery Location / Address <span style={{ color: 'var(--accent-red)' }}>*</span>
                  </label>
                  <button 
                    type="button"
                    onClick={handleFetchGPSLocation}
                    disabled={isLocating}
                    style={{ background: '#3b6e28', color: '#ffffff', border: 'none', borderRadius: '50px', padding: '3px 10px', fontSize: '0.72rem', fontWeight: '800', cursor: 'pointer' }}
                  >
                    {isLocating ? 'Locating...' : '📍 Auto-Fill GPS'}
                  </button>
                </div>
                <textarea 
                  rows="2"
                  placeholder="House / Flat No., Street, Area, Colony..."
                  value={profile.address}
                  onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                  required
                  style={{ width: '100%', border: '2px solid #e0d8c8', borderRadius: '12px', padding: '12px 14px', fontSize: '0.9rem', fontWeight: '600', color: '#1b2e13', background: '#faf6f0', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                />
                {locationError && <p style={{ color: 'var(--accent-red)', fontSize: '0.78rem', margin: '4px 0 0 0', fontWeight: '700' }}>{locationError}</p>}
              </div>

              {/* City & Pincode Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#1b2e13', marginBottom: '4px', textTransform: 'uppercase' }}>
                    City <span style={{ color: 'var(--accent-red)' }}>*</span>
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. Jaipur"
                    value={profile.city}
                    onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                    required
                    style={{ width: '100%', border: '2px solid #e0d8c8', borderRadius: '12px', padding: '10px 12px', fontSize: '0.88rem', fontWeight: '700', color: '#1b2e13', background: '#faf6f0', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '800', color: '#1b2e13', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Pincode <span style={{ color: 'var(--accent-red)' }}>*</span>
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. 302020"
                    value={profile.zipCode}
                    onChange={(e) => setProfile(prev => ({ ...prev, zipCode: e.target.value }))}
                    required
                    style={{ width: '100%', border: '2px solid #e0d8c8', borderRadius: '12px', padding: '10px 12px', fontSize: '0.88rem', fontWeight: '700', color: '#1b2e13', background: '#faf6f0', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Email Address (OPTIONAL) */}
              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '800', color: '#1b2e13', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Email Address <span style={{ color: 'var(--text-muted)', fontWeight: '600', textTransform: 'none' }}>(Optional)</span>
                </label>
                <input 
                  type="email"
                  placeholder="rahul@example.com (Optional)"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  style={{ width: '100%', border: '2px solid #e0d8c8', borderRadius: '12px', padding: '12px 14px', fontSize: '0.92rem', fontWeight: '600', color: '#1b2e13', background: '#faf6f0', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', padding: '15px', fontSize: '1.02rem', fontWeight: '800', borderRadius: '14px', background: '#2b3e1b', color: '#ffffff', border: 'none', cursor: 'pointer' }}
              >
                Complete Profile &amp; Login →
              </button>
            </form>
          )}
        </div>

        {/* Security & Guarantee Footer Pill */}
        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: '600', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span>🔒 100% Safe &amp; Secure</span>
          <span>•</span>
          <span>⚡ Instant OTP Delivery</span>
          <span>•</span>
          <span>🌿 Agnitra Pure Guarantee</span>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: USER PROFILE DASHBOARD (WHEN LOGGED IN)
  // -------------------------------------------------------------
  return (
    <div className="account-page section">
      <div className="container">
        
        {/* VIEW 1: DASHBOARD MAIN */}
        {currentView === 'dashboard' && (
          <div className="account-dashboard-wrapper animate-fade-in">
            
            {/* Header Profile Cover Banner - SOLID GREEN BACKGROUND */}
            <div 
              className="agnitra-profile-banner"
              style={{
                background: '#1b2e13',
                borderRadius: '24px',
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden',
                border: '1.5px solid #3b6e28',
                boxShadow: '0 12px 30px rgba(27, 46, 19, 0.15)',
                marginBottom: '28px'
              }}
            >
              <div className="agnitra-banner-content" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
                <div className="agnitra-avatar-box" style={{ width: '68px', height: '68px', minWidth: '68px', borderRadius: '50%', background: '#2b3e1b', border: '2.5px solid #ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(0,0,0,0.2)' }}>
                  <span className="avatar-initials" style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase' }}>
                    {profile.name ? profile.name.charAt(0) : 'J'}
                  </span>
                </div>

                <div className="agnitra-profile-meta">
                  <h1 className="agnitra-user-title" style={{ fontFamily: 'var(--font-title)', fontSize: '1.85rem', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0' }}>
                    {profile.name}
                  </h1>
                  <p className="agnitra-user-subtitle" style={{ color: '#d4af37', fontSize: '0.95rem', fontWeight: '700', margin: 0, letterSpacing: '0.02em' }}>
                    {profile.phone} • {profile.city || 'Jaipur'}
                  </p>
                </div>
              </div>

              {/* 3 Column Statistics Bar */}
              <div 
                className="agnitra-stats-bar"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  background: 'rgba(0, 0, 0, 0.35)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '16px',
                  padding: '16px 12px',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <div className="agnitra-stat-col" style={{ textAlign: 'center' }}>
                  <span className="agnitra-stat-value" style={{ display: 'block', fontSize: '1.3rem', fontWeight: '800', color: '#ffffff' }}>5</span>
                  <span className="agnitra-stat-label" style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#d8ceba', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>Spices</span>
                </div>
                <div className="agnitra-stat-col" style={{ textAlign: 'center', borderLeft: '1px solid rgba(255, 255, 255, 0.15)', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                  <span className="agnitra-stat-value" style={{ display: 'block', fontSize: '1.3rem', fontWeight: '800', color: '#ffffff' }}>4.9 ★</span>
                  <span className="agnitra-stat-label" style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#d8ceba', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>Rating</span>
                </div>
                <div className="agnitra-stat-col" style={{ textAlign: 'center' }}>
                  <span className="agnitra-stat-value" style={{ display: 'block', fontSize: '1.3rem', fontWeight: '800', color: '#ffffff' }}>2.4K</span>
                  <span className="agnitra-stat-label" style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#d8ceba', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>Happy Customers</span>
                </div>
              </div>
            </div>

            <div className="agnitra-orders-section">
              <div className="agnitra-section-header">
                <h3 className="agnitra-section-title">My Orders</h3>
                <button 
                  type="button" 
                  className="agnitra-view-all-btn"
                  onClick={() => { setCurrentView('orders'); setOrderFilter('all'); }}
                >
                  View All →
                </button>
              </div>

              <div className="agnitra-orders-grid">
                <button 
                  type="button" 
                  className="order-status-card"
                  onClick={() => { setCurrentView('orders'); setOrderFilter('pending'); }}
                >
                  <div className="order-status-icon-box">
                    <span className="status-badge-count">{orders.length || 1}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/></svg>
                  </div>
                  <span className="order-status-label">Pending</span>
                </button>

                <button 
                  type="button" 
                  className="order-status-card"
                  onClick={() => { setCurrentView('orders'); setOrderFilter('processing'); }}
                >
                  <div className="order-status-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="13" x="1" y="3" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  </div>
                  <span className="order-status-label">Processing</span>
                </button>

                <button 
                  type="button" 
                  className="order-status-card"
                  onClick={() => { setCurrentView('orders'); setOrderFilter('shipped'); }}
                >
                  <div className="order-status-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
                  </div>
                  <span className="order-status-label">Shipped</span>
                </button>

                <button 
                  type="button" 
                  className="order-status-card"
                  onClick={() => { setCurrentView('orders'); setOrderFilter('delivered'); }}
                >
                  <div className="order-status-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <span className="order-status-label">Delivered</span>
                </button>
              </div>
            </div>

            <div className="agnitra-menu-card">
              <button 
                type="button" 
                className="agnitra-menu-row"
                onClick={() => setCurrentView('profile_edit')}
              >
                <div className="menu-icon-circle green-soft">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div className="menu-row-info">
                  <span className="menu-row-title">My Profile</span>
                  <span className="menu-row-sub">Manage your personal details</span>
                </div>
                <span className="menu-row-arrow">›</span>
              </button>

              <button 
                type="button" 
                className="agnitra-menu-row"
                onClick={() => setCurrentView('address_edit')}
              >
                <div className="menu-icon-circle green-soft">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <div className="menu-row-info">
                  <span className="menu-row-title">My Addresses</span>
                  <span className="menu-row-sub">{profile.address ? `${profile.address}, ${profile.city}` : 'Delivery locations'}</span>
                </div>
                <span className="menu-row-arrow">›</span>
              </button>

              <button 
                type="button" 
                className="agnitra-menu-row"
                onClick={() => navigateTo('cart')}
              >
                <div className="menu-icon-circle green-soft">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                </div>
                <div className="menu-row-info">
                  <span className="menu-row-title">Payment Methods</span>
                  <span className="menu-row-sub">Secure &amp; easy payments</span>
                </div>
                <span className="menu-row-arrow">›</span>
              </button>

              <button 
                type="button" 
                className="agnitra-menu-row"
                onClick={() => navigateTo('about')}
              >
                <div className="menu-icon-circle green-soft">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2b3e1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
                </div>
                <div className="menu-row-info">
                  <span className="menu-row-title">About Agnitra</span>
                  <span className="menu-row-sub">Our story, mission &amp; quality</span>
                </div>
                <span className="menu-row-arrow">›</span>
              </button>
            </div>

            <div className="agnitra-why-banner" onClick={() => navigateTo('about')}>
              <div className="why-banner-left">
                <div className="why-mortar-icon">🥣</div>
              </div>
              <div className="why-banner-content">
                <h4 className="why-banner-title">Why Agnitra?</h4>
                <p className="why-banner-sub">100% Pure • Naturally Sourced • Traditionally Ground</p>
              </div>
              <span className="why-banner-arrow">›</span>
            </div>

            <div className="agnitra-logout-row">
              <button type="button" className="btn-agnitra-logout" onClick={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                <span>Logout</span>
              </button>
            </div>

          </div>
        )}

        {/* VIEW 2: PROFILE / ADDRESS EDIT */}
        {(currentView === 'profile_edit' || currentView === 'address_edit') && (
          <div className="account-tab-content animate-fade-in">
            <button 
              type="button"
              className="btn-back-dashboard"
              onClick={() => setCurrentView('dashboard')}
            >
              ← Back to Profile Dashboard
            </button>

            <div className="account-card-box" style={{ marginTop: '16px' }}>
              <div className="account-card-header">
                <h2 className="account-card-title">
                  {currentView === 'address_edit' ? 'Delivery Address & GPS' : 'Edit Personal Profile'}
                </h2>
                <p className="account-card-desc">Update your name, contact information, and primary shipping destination.</p>
              </div>

              {saveSuccess && (
                <div className="profile-save-toast animate-fade-in">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>Profile and location details updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="account-form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" name="name" value={profile.name} onChange={handleInputChange} className="account-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" name="email" value={profile.email} onChange={handleInputChange} className="account-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" name="phone" value={profile.phone} onChange={handleInputChange} className="account-input" required />
                </div>
                
                <div className="form-group full-width">
                  <div className="form-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label className="form-label" style={{ margin: 0 }}>Delivery Address</label>
                    <button 
                      type="button" 
                      className="btn-fetch-gps"
                      onClick={handleFetchGPSLocation}
                      disabled={isLocating}
                    >
                      {isLocating ? 'Locating...' : '📍 Auto-Fill via GPS'}
                    </button>
                  </div>
                  <textarea name="address" rows="3" value={profile.address} onChange={handleInputChange} className="account-input textarea" required />
                  {locationError && <p className="location-error-msg">{locationError}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">City</label>
                  <input type="text" name="city" value={profile.city} onChange={handleInputChange} className="account-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label">State</label>
                  <input type="text" name="state" value={profile.state} onChange={handleInputChange} className="account-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label">Pincode / ZIP</label>
                  <input type="text" name="zipCode" value={profile.zipCode} onChange={handleInputChange} className="account-input" required />
                </div>

                <div className="form-group full-width" style={{ marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: '14px 32px' }}>
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* VIEW 3: ORDERS DETAIL */}
        {currentView === 'orders' && (
          <div className="account-tab-content animate-fade-in">
            <button 
              type="button"
              className="btn-back-dashboard"
              onClick={() => setCurrentView('dashboard')}
            >
              ← Back to Profile Dashboard
            </button>

            <div className="orders-header-bar" style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.6rem', color: '#1b2e13', margin: 0 }}>My Order History</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '4px 0 0 0' }}>Track batch status, view invoices and delivery schedules.</p>
              </div>

              <div className="order-filter-pills" style={{ display: 'flex', gap: '8px' }}>
                {['all', 'pending', 'processing', 'shipped', 'delivered'].map((filter) => (
                  <button
                    key={filter}
                    className={`filter-pill ${orderFilter === filter ? 'active' : ''}`}
                    onClick={() => setOrderFilter(filter)}
                    style={{ textTransform: 'capitalize', fontSize: '0.78rem', padding: '6px 14px' }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="empty-orders-box" style={{ background: '#ffffff', borderRadius: '18px', padding: '48px 24px', textAlign: 'center', border: '1px solid #ede6d8' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>📦</span>
                <h3 style={{ fontFamily: 'var(--font-title)', color: '#1b2e13' }}>No Orders Found</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>You haven't placed any orders in this category yet.</p>
                <button className="btn btn-primary" onClick={() => navigateTo('shop')}>Browse Spices Catalog</button>
              </div>
            ) : (
              <div className="orders-list-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filteredOrders.map((ord, idx) => {
                  const isExpanded = expandedOrderId === (ord.orderId || idx);
                  return (
                    <div key={ord.orderId || idx} className="order-history-card" style={{ background: '#ffffff', borderRadius: '18px', padding: '20px 24px', border: '1.5px solid #ede6d8', boxShadow: '0 4px 16px rgba(37, 29, 24, 0.04)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #f2ece1', paddingBottom: '14px', marginBottom: '14px' }}>
                        <div>
                          <span style={{ fontWeight: '800', color: '#1b2e13', fontSize: '1.05rem' }}>#{ord.orderId}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>Placed on {new Date(ord.createdAt || Date.now()).toLocaleDateString()}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span className={`order-status-tag ${getStatusClass(ord.status)}`} style={{ padding: '4px 12px', borderRadius: '50px', fontSize: '0.78rem', fontWeight: '800' }}>
                            {getStatusText(ord.status)}
                          </span>
                          <span style={{ fontWeight: '800', color: '#1b2e13', fontSize: '1.1rem' }}>₹{ord.totalAmount}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                          {ord.items ? ord.items.length : 1} Item(s)
                        </span>

                        <button 
                          type="button"
                          onClick={() => setExpandedOrderId(isExpanded ? null : (ord.orderId || idx))}
                          style={{ background: 'none', border: 'none', color: '#3b6e28', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}
                        >
                          {isExpanded ? 'Hide Details ▲' : 'View Order Details ▼'}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="order-items-detail animate-fade-in" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed #e5dfd2' }}>
                          <h4 style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Items Summary</h4>
                          {ord.items && ord.items.map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                              <span>• {item.name} x {item.quantity}</span>
                              <span style={{ fontWeight: '700', color: '#1b2e13' }}>₹{item.price * item.quantity}</span>
                            </div>
                          ))}

                          <div style={{ marginTop: '12px', background: '#faf6f0', padding: '12px', borderRadius: '10px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                            <strong>Delivery Address:</strong> {ord.customer ? `${ord.customer.address}, ${ord.customer.city || ''}` : 'Primary Address'}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Account;
