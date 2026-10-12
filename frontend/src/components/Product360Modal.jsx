import ProductImageViewer from './ProductImageViewer';

export default function Product360Modal({ product, onClose, addToCart, navigateTo }) {
  if (!product) return null;

  return (
    <div 
      className="product-360-modal-overlay animate-fade-in"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(27, 46, 19, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div 
        className="product-360-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '28px',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          border: '2px solid #ede6d8',
          position: 'relative',
          padding: '28px 24px'
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close 360 Viewer"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#faf6f0',
            border: '1px solid #ede6d8',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#1b2e13',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '16px', textAlign: 'left', paddingRight: '40px' }}>
          <span style={{ fontSize: '0.74rem', background: '#eff5ea', color: '#3b6e28', padding: '4px 10px', borderRadius: '50px', fontWeight: '800', textTransform: 'uppercase' }}>
            {product.category || 'Pure Spice'}
          </span>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.6rem', color: '#1b2e13', margin: '6px 0 2px 0' }}>
            {product.name}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
            Interactive 360° Turntable Rotation &amp; Precision Magnifier Inspection
          </p>
        </div>

        {/* The 360 & Zoom Viewer */}
        <ProductImageViewer product={product} height={380} />

        {/* Modal Footer Controls */}
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid #ede6d8', paddingTop: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Price ({product.unit || '100g'})</span>
            <span style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', fontWeight: '800', color: '#1b2e13' }}>₹{product.price}</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {navigateTo && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  onClose();
                  const id = product._id || product.id;
                  navigateTo('product', { id });
                }}
                style={{ padding: '8px 16px', fontSize: '0.84rem' }}
              >
                View Full Specs →
              </button>
            )}

            {addToCart && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  addToCart(product, 1);
                  onClose();
                }}
                style={{ padding: '8px 20px', fontSize: '0.84rem' }}
              >
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
