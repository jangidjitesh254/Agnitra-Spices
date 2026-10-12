import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Helper to build an Amazon/Flipkart-style multi-angle & texture gallery for each product
 */
export function getProductGalleryImages(product) {
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    return product.images.map((img, idx) => ({
      id: `img-${idx}`,
      url: typeof img === 'string' ? img : img.url,
      label: typeof img === 'object' && img.label ? img.label : `View ${idx + 1}`,
      tag: typeof img === 'object' && img.tag ? img.tag : 'Pack'
    }));
  }

  const main = product.image || product.imageUrl || '/images/Agnitra logo.jpg';
  const nameLower = (product.name || '').toLowerCase();

  if (nameLower.includes('mirchi') || nameLower.includes('chilli')) {
    return [
      { id: 'front', url: main, label: 'Kashmiri Lal Mirch Pack', tag: 'Pack Front' },
      { id: 'texture', url: '/images/chilli_icon.png', label: 'Cold-Ground Texture', tag: 'Micro Grain' },
      { id: 'origin', url: '/images/khadi_mirch.png', label: 'Sun-Dried Byadgi Chillies', tag: 'Spice Source' },
      { id: 'quality', url: '/images/agnitra_vision_banner.png', label: '100% Pure & Lab Certified', tag: 'Purity Seal' }
    ];
  }

  if (nameLower.includes('haldi') || nameLower.includes('turmeric')) {
    return [
      { id: 'front', url: main, label: 'Hand-Pounded Haldi Pack', tag: 'Pack Front' },
      { id: 'texture', url: '/images/turmeric_icon.png', label: 'High-Curcumin Golden Powder', tag: 'Micro Grain' },
      { id: 'showcase', url: '/images/hero_spices_showcase.png', label: 'Heritage Stone Chakki Process', tag: 'Process' },
      { id: 'quality', url: '/images/agnitra_vision_banner.png', label: 'Zero Lead Chromate Certified', tag: 'Purity Seal' }
    ];
  }

  if (nameLower.includes('dhaniya') || nameLower.includes('coriander')) {
    return [
      { id: 'front', url: main, label: 'Clay-Roasted Dhaniya Pack', tag: 'Pack Front' },
      { id: 'texture', url: '/images/coriander_icon.png', label: 'Aromatic Roasted Texture', tag: 'Aroma Lock' },
      { id: 'origin', url: '/images/sabut_dhaniya.png', label: 'Hand-Harvested Whole Seeds', tag: 'Spice Source' },
      { id: 'quality', url: '/images/agnitra_vision_banner.png', label: 'Natural Essential Oils Intact', tag: 'Purity Seal' }
    ];
  }

  if (nameLower.includes('combo')) {
    return [
      { id: 'front', url: main, label: 'Agnitra Trio Pack (3x100g)', tag: 'Full Bundle' },
      { id: 'trio', url: '/images/hero_spices_showcase.png', label: 'The 3 Heritage Spices', tag: 'Spice Trio' },
      { id: 'mirch', url: '/images/chilli.jpeg', label: 'Cold-Ground Kashmiri Mirch', tag: 'Lal Mirch' },
      { id: 'haldi', url: '/images/turmeric.jpeg', label: 'Hand-Pounded Haldi', tag: 'Haldi' },
      { id: 'dhaniya', url: '/images/corainder.jpeg', label: 'Clay-Roasted Dhaniya', tag: 'Dhaniya' }
    ];
  }

  // Fallback for general products
  return [
    { id: 'front', url: main, label: 'Product Packaging View', tag: 'Pack Front' },
    { id: 'quality', url: '/images/agnitra_vision_banner.png', label: 'Heritage Purity Guarantee', tag: 'Certified' }
  ];
}

/**
 * Amazon & Flipkart Style Product Image Viewer with Floating Zoom Flyout & Viewfinder Lens
 */
export default function ProductImageViewer({ product, height = 480 }) {
  const gallery = getProductGalleryImages(product);
  const [activeIdx, setActiveIdx] = useState(0);
  const currentImage = gallery[activeIdx] || gallery[0];

  // Zoom States
  const [isHovering, setIsHovering] = useState(false);
  const [zoomFactor, setZoomFactor] = useState(2.8); // 2.0x, 2.8x, 3.8x
  const [lensBox, setLensBox] = useState({ x: 0, y: 0, width: 150, height: 150 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 440, height: 440 });
  const [isDesktopScreen, setIsDesktopScreen] = useState(true);

  // Expanded Fullscreen Lightbox States (Amazon-style expanded modal)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1);
  const [lightboxPan, setLightboxPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);

  // Detect screen width for side flyout eligibility (>= 992px)
  useEffect(() => {
    const checkWidth = () => {
      setIsDesktopScreen(window.innerWidth >= 992);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Update container dimensions on mount & resize
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerDimensions({ width: rect.width, height: rect.height });
    }
  }, [height]);

  // Handle cursor movement inside main image
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const clientX = e.clientX;
    const clientY = e.clientY;

    const rawX = clientX - rect.left;
    const rawY = clientY - rect.top;

    // Calculate lens dimensions based on zoom factor
    const lensWidth = Math.round(rect.width / zoomFactor);
    const lensHeight = Math.round(rect.height / zoomFactor);

    // Center the lens over cursor
    let lensX = rawX - lensWidth / 2;
    let lensY = rawY - lensHeight / 2;

    // Clamp strictly inside image container
    lensX = Math.max(0, Math.min(lensX, rect.width - lensWidth));
    lensY = Math.max(0, Math.min(lensY, rect.height - lensHeight));

    setLensBox({
      x: lensX,
      y: lensY,
      width: lensWidth,
      height: lensHeight
    });
    setContainerDimensions({ width: rect.width, height: rect.height });
    setIsHovering(true);
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  // Mouse wheel zoom in/out like modern Amazon
  const handleWheel = (e) => {
    if (!isHovering) return;
    e.preventDefault();
    if (e.deltaY < 0) {
      // Zoom in
      setZoomFactor((prev) => Math.min(4.5, +(prev + 0.3).toFixed(1)));
    } else {
      // Zoom out
      setZoomFactor((prev) => Math.max(1.8, +(prev - 0.3).toFixed(1)));
    }
  };

  // Keyboard shortcut (Escape to close lightbox)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Open Lightbox
  const openLightbox = () => {
    setIsLightboxOpen(true);
    setLightboxScale(1);
    setLightboxPan({ x: 0, y: 0 });
  };

  // Lightbox Pan Handlers
  const handleLightboxMouseDown = (e) => {
    setIsPanning(true);
    setPanStart({ x: e.clientX - lightboxPan.x, y: e.clientY - lightboxPan.y });
  };

  const handleLightboxMouseMove = (e) => {
    if (!isPanning) return;
    setLightboxPan({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y
    });
  };

  const handleLightboxMouseUp = () => setIsPanning(false);

  // Ratio calculation for Flyout Zoom Window
  const flyoutWidth = 520;
  const flyoutHeight = Math.max(480, containerDimensions.height);
  const bgSizeX = containerDimensions.width * zoomFactor;
  const bgSizeY = containerDimensions.height * zoomFactor;
  const bgPosX = -lensBox.x * zoomFactor;
  const bgPosY = -lensBox.y * zoomFactor;

  return (
    <div className="amazon-zoom-gallery-wrapper" style={{ width: '100%', position: 'relative' }}>
      
      {/* Main Layout: Thumbnails strip + Main Image Container */}
      <div 
        className="amazon-zoom-layout"
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
          position: 'relative'
        }}
      >
        
        {/* 1. THUMBNAILS GALLERY STRIP (Left Side on Desktop) */}
        <div 
          className="amazon-thumbnails-strip"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            minWidth: '72px',
            maxWidth: '82px'
          }}
        >
          {gallery.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={item.id || idx}
                type="button"
                className={`amazon-thumb-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                aria-label={`View ${item.label}`}
                title={item.label}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '12px',
                  border: isActive ? '2px solid #2b3e1b' : '1.5px solid #e5dfd2',
                  backgroundColor: '#ffffff',
                  padding: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isActive ? '0 4px 14px rgba(43, 62, 27, 0.22)' : '0 2px 6px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  outline: 'none',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={item.url}
                  alt={item.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
                {isActive && (
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      height: '3px',
                      background: '#d4af37'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 2. MAIN PRODUCT IMAGE CONTAINER (With Hover Viewfinder Lens) */}
        <div style={{ flex: 1, position: 'relative' }}>
          
          <div
            ref={containerRef}
            className="amazon-main-image-viewport"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onWheel={handleWheel}
            onClick={openLightbox}
            style={{
              width: '100%',
              height: `${height}px`,
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1.5px solid #ebdcd0',
              boxShadow: '0 8px 30px rgba(37, 29, 24, 0.06)',
              position: 'relative',
              overflow: 'hidden',
              cursor: isHovering ? 'crosshair' : 'zoom-in',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none'
            }}
          >
            
            {/* Subtle background stage gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #faf6f0 85%, #f4efe6 100%)',
                pointerEvents: 'none'
              }}
            />

            {/* Quality Purity Badge */}
            <div
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                background: 'rgba(27, 46, 19, 0.9)',
                color: '#ffffff',
                border: '1px solid rgba(212, 175, 55, 0.5)',
                borderRadius: '50px',
                padding: '4px 12px',
                fontSize: '0.72rem',
                fontWeight: '800',
                letterSpacing: '0.04em',
                zIndex: 5,
                backdropFilter: 'blur(4px)',
                pointerEvents: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span style={{ color: '#d4af37' }}>★</span>
              <span>{currentImage.tag || '100% Pure'}</span>
            </div>

            {/* Main Image Display */}
            <img
              src={currentImage.url}
              alt={currentImage.label || product.name}
              style={{
                maxWidth: '86%',
                maxHeight: '86%',
                objectFit: 'contain',
                pointerEvents: 'none',
                filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.1))',
                transition: 'opacity 0.2s ease'
              }}
            />

            {/* FLIPKART & AMAZON STYLE VIEWFINDER LENS RETICLE */}
            {isHovering && isDesktopScreen && (
              <div
                className="amazon-viewfinder-lens animate-fade-in"
                style={{
                  position: 'absolute',
                  left: `${lensBox.x}px`,
                  top: `${lensBox.y}px`,
                  width: `${lensBox.width}px`,
                  height: `${lensBox.height}px`,
                  backgroundColor: 'rgba(212, 175, 55, 0.22)', /* Iconic Flipkart/Amazon soft golden lens tint */
                  border: '1.5px solid rgba(43, 62, 27, 0.7)',
                  borderRadius: '4px',
                  boxShadow: '0 0 14px rgba(0,0,0,0.18), inset 0 0 10px rgba(212, 175, 55, 0.25)',
                  pointerEvents: 'none',
                  zIndex: 20
                }}
              >
                {/* Center crosshair */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '10px',
                    height: '10px',
                    border: '1px solid rgba(43, 62, 27, 0.5)',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </div>
            )}

            {/* Click to Expand Overlay Trigger Pill */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                background: 'rgba(255, 255, 255, 0.92)',
                border: '1px solid #ebdcd0',
                borderRadius: '50px',
                padding: '4px 12px',
                fontSize: '0.74rem',
                fontWeight: '700',
                color: '#1b2e13',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                zIndex: 6,
                pointerEvents: 'none'
              }}
            >
              <span>⛶</span>
              <span>Click to Expand</span>
            </div>

          </div>

          {/* Amazon Roll-over instruction bar below image */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '10px',
              padding: '0 4px',
              color: 'var(--text-secondary)',
              fontSize: '0.8rem'
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
              <span style={{ fontSize: '0.95rem' }}>🔍</span>
              <span>Roll over image to zoom in</span>
            </div>
            <button
              type="button"
              onClick={openLightbox}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#2b3e1b',
                fontWeight: '700',
                fontSize: '0.8rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              View Fullscreen
            </button>
          </div>

          {/* 3. AMAZON & FLIPKART FLOATING ZOOM FLYOUT WINDOW (Desktop Side Flyout) */}
          {isHovering && isDesktopScreen && (
            <div
              className="amazon-zoom-flyout animate-fade-in"
              style={{
                position: 'absolute',
                top: 0,
                left: 'calc(100% + 22px)',
                width: `${flyoutWidth}px`,
                height: `${flyoutHeight}px`,
                backgroundColor: '#ffffff',
                border: '2px solid #ede6d8',
                borderRadius: '20px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.22), 0 5px 15px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
                zIndex: 999,
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Flyout Top Info Bar */}
              <div
                style={{
                  background: '#1b2e13',
                  color: '#ffffff',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1.5px solid #d4af37',
                  zIndex: 2
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.9rem' }}>🔍</span>
                  <span style={{ fontWeight: '800', fontSize: '0.82rem', letterSpacing: '0.03em', color: '#fff8e7' }}>
                    {currentImage.label}
                  </span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: '#d4af37', fontWeight: '800' }}>
                  <span>{zoomFactor}x Magnification</span>
                </div>
              </div>

              {/* Flyout Magnified Canvas with Exact Pixel Alignment */}
              <div
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${currentImage.url})`,
                  backgroundSize: `${bgSizeX}px ${bgSizeY}px`,
                  backgroundPosition: `${bgPosX}px ${bgPosY}px`,
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: '#ffffff'
                }}
              />

              {/* Flyout Bottom Quality Assurance Footnote */}
              <div
                style={{
                  background: '#faf6f0',
                  padding: '6px 16px',
                  borderTop: '1px solid #ede6d8',
                  fontSize: '0.72rem',
                  color: '#2b3e1b',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Pure Heritage Spice Grain Texture Inspection</span>
                <span style={{ color: '#d4af37' }}>★ Agnitra Quality Verified</span>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* 4. AMAZON-STYLE EXPANDED FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div
          className="amazon-lightbox-overlay animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(18, 28, 15, 0.94)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px'
          }}
        >
          {/* Modal Header */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#ffffff',
              padding: '10px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.12)'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', background: '#3b6e28', color: '#ffffff', padding: '3px 10px', borderRadius: '50px', fontWeight: '800', textTransform: 'uppercase' }}>
                {product.category || 'Pure Spice'}
              </span>
              <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', color: '#ffffff', margin: '4px 0 0 0' }}>
                {product.name} — <span style={{ color: '#d4af37', fontWeight: '400', fontSize: '1.1rem' }}>{currentImage.label}</span>
              </h2>
            </div>

            {/* Lightbox Controls (+, -, Reset, Close) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.1)', borderRadius: '50px', padding: '4px 8px', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => setLightboxScale((prev) => Math.max(0.8, +(prev - 0.3).toFixed(1)))}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    cursor: 'pointer'
                  }}
                  title="Zoom Out"
                >
                  −
                </button>
                <span style={{ color: '#d4af37', fontWeight: '800', fontSize: '0.85rem', display: 'flex', alignItems: 'center', minWidth: '46px', justifyContent: 'center' }}>
                  {Math.round(lightboxScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxScale((prev) => Math.min(3.5, +(prev + 0.3).toFixed(1)))}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    cursor: 'pointer'
                  }}
                  title="Zoom In"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => { setLightboxScale(1); setLightboxPan({ x: 0, y: 0 }); }}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '0.76rem',
                    fontWeight: '800',
                    padding: '4px 10px',
                    borderRadius: '50px',
                    cursor: 'pointer'
                  }}
                >
                  Reset
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  color: '#ffffff',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Close Lightbox"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Modal Main Stage (Pan & Zoom Canvas) */}
          <div
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleLightboxMouseDown}
            onMouseMove={handleLightboxMouseMove}
            onMouseUp={handleLightboxMouseUp}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              cursor: isPanning ? 'grabbing' : 'grab',
              userSelect: 'none',
              position: 'relative'
            }}
          >
            <img
              src={currentImage.url}
              alt={currentImage.label}
              style={{
                maxWidth: '82%',
                maxHeight: '82%',
                objectFit: 'contain',
                transform: `translate(${lightboxPan.x}px, ${lightboxPan.y}px) scale(${lightboxScale})`,
                transition: isPanning ? 'none' : 'transform 0.15s ease-out',
                pointerEvents: 'none',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))'
              }}
            />
          </div>

          {/* Modal Bottom Gallery Thumbnails */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              paddingTop: '14px',
              borderTop: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {gallery.map((item, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={item.id || idx}
                  type="button"
                  onClick={() => { setActiveIdx(idx); setLightboxScale(1); setLightboxPan({ x: 0, y: 0 }); }}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '10px',
                    backgroundColor: '#ffffff',
                    border: isActive ? '3px solid #d4af37' : '1.5px solid rgba(255,255,255,0.3)',
                    padding: '4px',
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 0 16px rgba(212, 175, 55, 0.6)' : 'none',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img
                    src={item.url}
                    alt={item.label}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </button>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
