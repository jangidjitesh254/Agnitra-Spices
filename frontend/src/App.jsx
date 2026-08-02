import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import About from './pages/About';
import Contact from './pages/Contact';
import QRPage from './pages/QRPage';
import Account from './pages/Account';
import AdminDashboard from './pages/AdminDashboard';

export const API_BASE_URL = typeof window !== 'undefined' 
  ? `http://${window.location.hostname}:5000/api`
  : 'http://localhost:5000/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // home, shop, product/:id, cart, orders, account, about, contact, qr, admin
  const [activeProductId, setActiveProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle URL Path & Hash navigation on load and route changes (e.g. /qr, /QR, #qr)
  useEffect(() => {
    const handleRouting = () => {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      const hash = window.location.hash.replace(/^#/, '').toLowerCase();

      if (path === 'qr' || hash === 'qr') {
        setCurrentPage('qr');
        if (window.location.pathname !== '/QR') {
          window.history.replaceState({}, '', '/QR');
        }
        return;
      }

      if (path.startsWith('product/')) {
        const id = path.split('/')[1];
        setActiveProductId(id);
        setCurrentPage('product');
      } else if (['home', 'shop', 'about', 'contact', 'orders', 'account', 'cart', 'admin'].includes(path)) {
        setCurrentPage(path);
      } else if (path === '') {
        setCurrentPage('home');
      }
    };

    handleRouting();
    window.addEventListener('popstate', handleRouting);
    return () => {
      window.removeEventListener('popstate', handleRouting);
    };
  }, []);

const STANDARD_FALLBACK_PRODUCTS = [
  {
    _id: "agnitra_chilli_100g",
    name: "Lal Mirchi - Agnitra Spices",
    description: "100% pure sun-dehydrated red chilli powder with vibrant natural color & authentic spiciness.",
    price: 52,
    unit: "100g",
    category: "Powder",
    rating: 4.9,
    image: "/images/chilli.jpeg",
    inStock: true
  },
  {
    _id: "agnitra_turmeric_100g",
    name: "Haldi - Agnitra Spices",
    description: "Cold-ground turmeric powder with high natural Curcumin content for rich aroma & immunity wellness.",
    price: 40,
    unit: "100g",
    category: "Powder",
    rating: 5.0,
    image: "/images/turmeric.jpeg",
    inStock: true
  },
  {
    _id: "agnitra_coriander_100g",
    name: "Dhaniya - Agnitra Spices",
    description: "Freshly ground fragrant coriander powder harvested from organic farms in Rajasthan.",
    price: 35,
    unit: "100g",
    category: "Powder",
    rating: 4.8,
    image: "/images/corainder.jpeg",
    inStock: true
  }
];

// Load products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch spices from Agnitra server');
        }
        const data = await response.json();
        setProducts(data && data.length > 0 ? data : STANDARD_FALLBACK_PRODUCTS);
        setError(null);
      } catch (err) {
        console.error('Error fetching products from backend, using fallback:', err);
        setProducts(STANDARD_FALLBACK_PRODUCTS);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch past orders from backend
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage]); // re-fetch when switching pages

  // Cart Management
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId));
  };

  const updateCartQty = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Routing Handler
  const navigateTo = (page, params = null) => {
    window.scrollTo(0, 0);
    if (page === 'product' && params) {
      setActiveProductId(params.id);
      setCurrentPage('product');
      window.history.pushState({}, '', `/product/${params.id}`);
    } else if (page === 'qr' || page === 'QR') {
      setCurrentPage('qr');
      window.history.pushState({}, '', '/QR');
    } else if (page === 'home') {
      setCurrentPage('home');
      window.history.pushState({}, '', '/');
    } else {
      setCurrentPage(page);
      window.history.pushState({}, '', `/${page}`);
    }
  };

  // Get total item count in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Render active page component
  const renderPage = () => {
    if (loading && currentPage === 'shop') {
      return <div className="loading-spinner"></div>;
    }

    switch (currentPage) {
      case 'home':
        return (
          <Home 
            products={products} 
            navigateTo={navigateTo} 
            addToCart={addToCart} 
            updateCartQty={updateCartQty}
            cart={cart}
            loading={loading}
          />
        );
      case 'shop':
        return (
          <Shop 
            products={products} 
            navigateTo={navigateTo} 
            addToCart={addToCart}
            updateCartQty={updateCartQty}
            cart={cart}
            error={error}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );
      case 'product':
        return (
          <ProductDetail
            productId={activeProductId}
            products={products}
            addToCart={addToCart}
            navigateTo={navigateTo}
          />
        );
      case 'cart':
        return (
          <Cart
            cart={cart}
            updateCartQty={updateCartQty}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            navigateTo={navigateTo}
            onOrderPlaced={fetchOrders}
          />
        );
      case 'account':
      case 'orders':
        return <Account orders={orders} navigateTo={navigateTo} />;
      case 'about':
        return <About navigateTo={navigateTo} />;
      case 'contact':
        return <Contact />;
      case 'qr':
        return <QRPage navigateTo={navigateTo} />;
      case 'admin':
        return (
          <AdminDashboard 
            products={products}
            orders={orders}
            fetchOrders={fetchOrders}
            navigateTo={navigateTo}
          />
        );
      default:
        return (
          <div className="container empty-state">
            <h2 className="empty-title">Page Not Found</h2>
            <button className="btn btn-primary" onClick={() => navigateTo('home')}>
              Back to Home
            </button>
          </div>
        );
    }
  };

  const isStandalonePage = currentPage === 'qr';
  const cartTotalAmount = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const showFloatingCartBar = cartItemCount > 0 && ['home', 'shop', 'product', 'about', 'contact', 'cart'].includes(currentPage);

  if (isStandalonePage) {
    return (
      <main className="main-content">
        {renderPage()}
      </main>
    );
  }

  return (
    <div className="app-layout">
      <Header 
        currentPage={currentPage} 
        navigateTo={navigateTo} 
        cartItemCount={cartItemCount} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main className="main-content">
        {renderPage()}
      </main>

      {/* Floating Bottom-Right Pay Now / View Cart Bar */}
      {showFloatingCartBar && (
        <div 
          className="floating-cart-pay-bar animate-fade-in" 
          onClick={() => navigateTo('cart')}
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            background: 'linear-gradient(135deg, #1b3017 0%, #273b22 100%)',
            color: '#ffffff',
            padding: '10px 16px 10px 22px',
            borderRadius: '50px',
            boxShadow: '0 14px 40px rgba(27, 48, 23, 0.45)',
            border: '2px solid #bd593c',
            outline: '2px solid rgba(212, 175, 55, 0.35)',
            cursor: 'pointer'
          }}
        >
          <div className="floating-cart-info" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span 
              className="floating-cart-badge"
              style={{
                fontSize: '0.76rem',
                fontWeight: '800',
                color: '#d4af37',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
            </span>
            <span 
              className="floating-cart-price"
              style={{
                fontFamily: 'var(--font-title), serif',
                fontSize: '1.2rem',
                fontWeight: '800',
                color: '#ffffff'
              }}
            >
              ₹{cartTotalAmount}
            </span>
          </div>
          
          <button 
            className="floating-pay-btn" 
            type="button"
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #bd593c 0%, #a43a1e 100%)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '0.9rem',
              fontWeight: '800',
              padding: '10px 22px',
              borderRadius: '50px',
              boxShadow: '0 4px 14px rgba(189, 89, 60, 0.4)',
              cursor: 'pointer'
            }}
          >
            <span>Pay Now</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      )}

      <Footer navigateTo={navigateTo} />
    </div>
  );
}

export default App;
