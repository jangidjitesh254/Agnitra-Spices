import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// Your web app's Firebase configuration
// Get these values from Firebase Console -> Project Settings -> General -> Your apps -> Web app
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_FIREBASE_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-app-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Check if valid Firebase API Key is configured
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey && 
    firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY" && 
    !firebaseConfig.apiKey.includes("YOUR_");
};

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Setup invisible reCAPTCHA verifier
export const setupRecaptcha = (containerId = 'recaptcha-container') => {
  // Always clear previous verifier if present to prevent stale reCAPTCHA tokens
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (e) {
      console.warn('Recaptcha clear warning:', e);
    }
    window.recaptchaVerifier = null;
  }

  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      console.log('🛡️ reCAPTCHA verified successfully!');
    },
    'expired-callback': () => {
      console.warn('⚠️ reCAPTCHA expired.');
    }
  });

  return window.recaptchaVerifier;
};

// Send OTP via Firebase Phone Auth
export const sendFirebaseOtp = async (phoneNumberFormatted, containerId = 'recaptcha-container') => {
  try {
    const appVerifier = setupRecaptcha(containerId);
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumberFormatted, appVerifier);
    window.confirmationResult = confirmationResult;
    return { success: true, confirmationResult };
  } catch (error) {
    console.error('❌ Firebase Phone Auth Error:', error);
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {}
      window.recaptchaVerifier = null;
    }
    throw error;
  }
};

// Verify OTP via Firebase Confirmation Result
export const verifyFirebaseOtp = async (otpCode) => {
  if (!window.confirmationResult) {
    throw new Error('No pending OTP verification found. Please request a new OTP.');
  }
  const result = await window.confirmationResult.confirm(otpCode);
  return result.user;
};

export default app;
