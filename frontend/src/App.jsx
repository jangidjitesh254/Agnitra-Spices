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
import Recipes from './pages/Recipes';
import QRPage from './pages/QRPage';

export const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // home, shop, product/:id, cart, orders, about, contact, recipes, qr
  const [activeProductId, setActiveProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle URL Path & Hash navigation on load and route changes (e.g. /qr, /recipes)
  useEffect(() => {
    const handleRouting = () => {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();

      if (path === 'qr') {
        setCurrentPage('qr');
        return;
      }

      if (path.startsWith('product/')) {
        const id = path.split('/')[1];
        setActiveProductId(id);
        setCurrentPage('product');
      } else if (['home', 'shop', 'about', 'contact', 'recipes', 'blog', 'orders', 'cart'].includes(path)) {
        setCurrentPage(path === 'blog' ? 'recipes' : path);
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
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
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
    } else if (page === 'qr') {
      setCurrentPage('qr');
      window.history.pushState({}, '', '/qr');
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
            loading={loading}
          />
        );
      case 'shop':
        return (
          <Shop 
            products={products} 
            navigateTo={navigateTo} 
            addToCart={addToCart} 
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
      case 'orders':
        return <Orders orders={orders} navigateTo={navigateTo} />;
      case 'about':
        return <About navigateTo={navigateTo} />;
      case 'contact':
        return <Contact />;
      case 'recipes':
      case 'blog':
        return <Recipes navigateTo={navigateTo} />;
      case 'qr':
        return <QRPage navigateTo={navigateTo} />;
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
      <Footer navigateTo={navigateTo} />
    </div>
  );
}

export default App;
