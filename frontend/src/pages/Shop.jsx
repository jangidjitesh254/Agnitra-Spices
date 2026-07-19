import { useState } from 'react';

function Shop({ products, navigateTo, addToCart, error, searchQuery, setSearchQuery }) {
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Chilli', 'Turmeric', 'Coriander'];

  // Filter products by BOTH category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.traditionalMethod.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="shop-page section">
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <span className="section-subtitle">Pure Heritage Collection</span>
          <h2 className="section-title">Shop Our Traditional Spices</h2>
        </div>

        {error && (
          <div style={{ textAlign: 'center', color: 'var(--accent-red)', margin: '20px 0' }}>
            <p>⚠️ Error loading products: {error}</p>
            <p>Please check database connection settings.</p>
          </div>
        )}

        {/* Search Results Summary & Reset */}
        {searchQuery && (
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              Showing results for "<strong>{searchQuery}</strong>" ({filteredProducts.length} found)
            </p>
            <button 
              className="btn btn-secondary" 
              onClick={() => setSearchQuery('')}
              style={{ padding: '6px 16px', fontSize: '0.75rem', marginTop: '10px' }}
            >
              Clear Search Filter
            </button>
          </div>
        )}

        {/* Category Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '50px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn ${filterCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilterCategory(cat)}
              style={{ padding: '8px 20px', fontSize: '0.8rem' }}
            >
              {cat} Spices
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🫙</span>
            <h3 className="empty-title">No spices found</h3>
            <p className="empty-desc">We couldn't find any spices matching your criteria. Try searching for other terms like "Chilli", "Curcumin", or "Chakki".</p>
          </div>
        ) : (
          <div className="grid-3">
            {filteredProducts.map((product) => (
              <div key={product._id} className="product-card animate-fade-in">
                <div className="product-img-wrapper">
                  <span className="product-tag">{product.category}</span>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-img" 
                    onClick={() => navigateTo('product', { id: product._id })}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                <div className="product-info">
                  <h3 
                    className="product-title"
                    onClick={() => navigateTo('product', { id: product._id })}
                    style={{ cursor: 'pointer' }}
                  >
                    {product.name}
                  </h3>
                  <span className="product-tech-badge">{product.traditionalMethod}</span>
                  <p className="product-desc">{product.description}</p>
                  
                  {/* Highlights checklist */}
                  <div style={{ margin: '12px 0 20px 0', fontSize: '0.85rem', borderTop: '1px dashed var(--border-color)', paddingTop: '12px' }}>
                    <p style={{ color: 'var(--accent-orange)', fontWeight: 700, marginBottom: '6px' }}>Key Highlights:</p>
                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                      <li style={{ color: 'var(--text-secondary)', marginBottom: '3px', fontWeight: 500 }}>✓ {product.specifications.essentialOils}</li>
                      <li style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>✓ Ground {product.specifications.grindingTemp}</li>
                    </ul>
                  </div>

                  <div className="product-footer">
                    <div className="product-price-wrapper">
                      <span className="product-price">₹{product.price}</span>
                      <span className="product-unit">per {product.unit}</span>
                    </div>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                      aria-label={`Add ${product.name} to Cart`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
