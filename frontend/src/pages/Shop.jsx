import { useState } from 'react';

function Shop({ products, navigateTo, addToCart, error, searchQuery, setSearchQuery }) {
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Powder', 'Whole', 'Blends', 'Seeds'];

  // Filter products by BOTH category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === 'All' || 
      (product.category && product.category.toLowerCase().includes(filterCategory.toLowerCase())) ||
      (filterCategory === 'Powder' && product.name.toLowerCase().includes('powder')) ||
      (filterCategory === 'Whole' && product.name.toLowerCase().includes('seeds')) ||
      (filterCategory === 'Blends' && product.name.toLowerCase().includes('masala'));
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <div className="shop-page section">
      <div className="container">
        
        {/* Title (Matching Screen 2) */}
        <div className="section-title-wrapper text-center" style={{ marginBottom: '30px' }}>
          <h1 className="main-headline-title">Our Products</h1>
          <p className="main-headline-sub">Pure. Natural. Full of Flavor.</p>
        </div>

        {error && (
          <div style={{ textAlign: 'center', color: 'var(--accent-red)', margin: '20px 0' }}>
            <p>⚠️ Error loading products: {error}</p>
          </div>
        )}

        {/* Search Results Summary */}
        {searchQuery && (
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Showing results for "<strong>{searchQuery}</strong>" ({filteredProducts.length} items found)
            </p>
            <button 
              className="btn btn-designer-outline" 
              onClick={() => setSearchQuery('')}
              style={{ padding: '6px 16px', fontSize: '0.75rem', marginTop: '10px' }}
            >
              Clear Search Filter
            </button>
          </div>
        )}

        {/* Category Filter Pills (Matching Screen 2) */}
        <div className="category-filter-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${filterCategory === cat ? 'active' : ''}`}
              onClick={() => setFilterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid (Matching Screen 2) */}
        <div className="designer-products-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="designer-product-card animate-fade-in">
              <div 
                className="designer-product-img-box"
                onClick={() => navigateTo('product', { id: product._id })}
              >
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="designer-product-img" 
                />
              </div>
              
              <div className="designer-product-info">
                <h3 
                  className="designer-product-name"
                  onClick={() => navigateTo('product', { id: product._id })}
                >
                  {product.name}
                </h3>
                
                <div className="designer-product-bottom-row">
                  <span className="designer-product-price">₹{product.price}</span>
                  <button 
                    className="designer-add-cart-btn"
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                    title="Add to Cart"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <p className="empty-title">No spices found matching your criteria</p>
            <button className="btn btn-designer-green" onClick={() => { setFilterCategory('All'); setSearchQuery(''); }}>
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Shop;
