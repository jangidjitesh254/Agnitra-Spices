import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * ProductImageViewer
 * Provides:
 * 1. Precision Magnifier Lens (Zoom effect on hover/move with adjustable zoom level)
 * 2. Interactive 360° Turntable / Rotation Viewer (drag/swipe to rotate, auto-spin, angle slider)
 */
export default function ProductImageViewer({ product, height = 440 }) {
  const [viewMode, setViewMode] = useState('zoom'); // 'zoom' | '360'
  
  // Magnifier States
  const [isZooming, setIsZooming] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(2.2); // 1.8x, 2.2x, 3.0x
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, relX: 50, relY: 50 });
  const imgContainerRef = useRef(null);

  // 360° Spin States
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [angleStart, setAngleStart] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const autoSpinRef = useRef(null);

  const mainImage = product.image || product.imageUrl || '/images/Agnitra logo.jpg';

  // -------------------------------------------------------------
  // 1. MAGNIFIER ZOOM HANDLERS
  // -------------------------------------------------------------
  const handleMouseMove = (e) => {
    if (!imgContainerRef.current) return;
    const rect = imgContainerRef.current.getBoundingClientRect();
    
    // Relative position inside container (0 to 100%)
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    let x = clientX - rect.left;
    let y = clientY - rect.top;

    // Clamp coordinates
    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));

    const relX = (x / rect.width) * 100;
    const relY = (y / rect.height) * 100;

    setLensPos({ x, y, relX, relY });
  };

  const handleMouseEnter = () => setIsZooming(true);
  const handleMouseLeave = () => setIsZooming(false);

  // -------------------------------------------------------------
  // 2. 360° ROTATION INTERACTIVE HANDLERS (Drag / Swipe)
  // -------------------------------------------------------------
  const startDrag = (clientX) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setAngleStart(rotationAngle);
    if (isAutoSpinning) setIsAutoSpinning(false);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    startDrag(e.clientX);
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      startDrag(e.touches[0].clientX);
    }
  };

  const onDragMove = useCallback((clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartX;
    // 1px delta = 0.8 degrees of rotation
    const newAngle = (angleStart + deltaX * 0.8) % 360;
    setRotationAngle(newAngle < 0 ? newAngle + 360 : newAngle);
  }, [isDragging, dragStartX, angleStart]);

  const stopDrag = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const onMouseMoveWindow = (e) => onDragMove(e.clientX);
    const onTouchMoveWindow = (e) => {
      if (e.touches && e.touches[0]) onDragMove(e.touches[0].clientX);
    };
    const onMouseUpWindow = () => stopDrag();

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMoveWindow);
      window.addEventListener('mouseup', onMouseUpWindow);
      window.addEventListener('touchmove', onTouchMoveWindow);
      window.addEventListener('touchend', onMouseUpWindow);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMoveWindow);
      window.removeEventListener('mouseup', onMouseUpWindow);
      window.removeEventListener('touchmove', onTouchMoveWindow);
      window.removeEventListener('touchend', onMouseUpWindow);
    };
  }, [isDragging, onDragMove]);

  // Auto-spin timer
  useEffect(() => {
    if (isAutoSpinning && viewMode === '360') {
      autoSpinRef.current = setInterval(() => {
        setRotationAngle(prev => (prev + 1.5) % 360);
      }, 30);
    } else {
      if (autoSpinRef.current) clearInterval(autoSpinRef.current);
    }
    return () => {
      if (autoSpinRef.current) clearInterval(autoSpinRef.current);
    };
  }, [isAutoSpinning, viewMode]);

  // Step rotation by +/- 45 degrees
  const stepRotation = (delta) => {
    if (isAutoSpinning) setIsAutoSpinning(false);
    setRotationAngle(prev => {
      const next = (prev + delta) % 360;
      return next < 0 ? next + 360 : next;
    });
  };

  // Helper to describe perspective angle
  const getAngleLabel = (angle) => {
    const norm = Math.round(angle) % 360;
    if (norm >= 335 || norm < 25) return 'Front View (Primary Label)';
    if (norm >= 25 && norm < 70) return 'Front-Right Perspective';
    if (norm >= 70 && norm < 115) return 'Right Side Seal & Origin Info';
    if (norm >= 115 && norm < 160) return 'Rear-Right Packaging Details';
    if (norm >= 160 && norm < 205) return 'Rear View (Nutritional & Purity)';
    if (norm >= 205 && norm < 250) return 'Rear-Left Cold-Ground Certifications';
    if (norm >= 250 && norm < 295) return 'Left Side Seal & Aroma Lock';
    return 'Front-Left Perspective';
  };

  return (
    <div className="product-image-viewer-container" style={{ width: '100%', position: 'relative' }}>
      
      {/* Top Controls: Mode Switcher Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'inline-flex', background: '#faf6f0', padding: '4px', borderRadius: '50px', border: '1.5px solid #ede6d8' }}>
          <button
            type="button"
            onClick={() => { setViewMode('zoom'); setIsAutoSpinning(false); }}
            style={{
              padding: '6px 14px',
              borderRadius: '50px',
              border: 'none',
              background: viewMode === 'zoom' ? '#2b3e1b' : 'transparent',
              color: viewMode === 'zoom' ? '#ffffff' : '#1b2e13',
              fontSize: '0.8rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <span>🔍</span> Magnifier Zoom
          </button>
          <button
            type="button"
            onClick={() => { setViewMode('360'); setIsAutoSpinning(true); }}
            style={{
              padding: '6px 14px',
              borderRadius: '50px',
              border: 'none',
              background: viewMode === '360' ? '#2b3e1b' : 'transparent',
              color: viewMode === '360' ? '#ffffff' : '#1b2e13',
              fontSize: '0.8rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <span>🔄</span> 360° Interactive View
          </button>
        </div>

        {/* View Mode Specific Sub-controls */}
        {viewMode === 'zoom' ? (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#1b2e13', fontWeight: '700' }}>
            <span>Zoom:</span>
            {[1.8, 2.5, 3.2].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setZoomLevel(lvl)}
                style={{
                  background: zoomLevel === lvl ? '#3b6e28' : '#faf6f0',
                  color: zoomLevel === lvl ? '#ffffff' : '#1b2e13',
                  border: '1px solid #ede6d8',
                  borderRadius: '6px',
                  padding: '2px 8px',
                  fontSize: '0.74rem',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                {lvl}x
              </button>
            ))}
          </div>
        ) : (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              onClick={() => setIsAutoSpinning(!isAutoSpinning)}
              style={{
                background: isAutoSpinning ? '#3b6e28' : '#faf6f0',
                color: isAutoSpinning ? '#ffffff' : '#1b2e13',
                border: '1.5px solid #ede6d8',
                borderRadius: '50px',
                padding: '4px 12px',
                fontSize: '0.76rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              {isAutoSpinning ? '⏸ Pause Spin' : '▶ Auto-Rotate 360°'}
            </button>
          </div>
        )}
      </div>

      {/* Main View Area Card */}
      <div
        ref={imgContainerRef}
        onMouseMove={viewMode === 'zoom' ? handleMouseMove : undefined}
        onMouseEnter={viewMode === 'zoom' ? handleMouseEnter : undefined}
        onMouseLeave={viewMode === 'zoom' ? handleMouseLeave : undefined}
        onMouseDown={viewMode === '360' ? handleMouseDown : undefined}
        onTouchStart={viewMode === '360' ? handleTouchStart : undefined}
        style={{
          width: '100%',
          height: `${height}px`,
          position: 'relative',
          borderRadius: '24px',
          background: '#ffffff',
          border: '1.5px solid rgba(229, 223, 210, 0.95)',
          boxShadow: '0 12px 36px rgba(37, 29, 24, 0.07)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          cursor: viewMode === 'zoom' ? 'crosshair' : isDragging ? 'grabbing' : 'grab'
        }}
      >
        {/* Background Soft Studio Stage Grid & Lighting */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 45%, #ffffff 0%, #faf6f0 80%, #ede6d8 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* ---------------- MODE 1: ZOOM / MAGNIFIER VIEW ---------------- */}
        {viewMode === 'zoom' && (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <img
              src={mainImage}
              alt={product.name}
              style={{
                maxWidth: '85%',
                maxHeight: '85%',
                objectFit: 'contain',
                pointerEvents: 'none',
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.12))'
              }}
            />

            {/* Magnifier Lens / Floating Loupe Window */}
            {isZooming && (
              <div
                style={{
                  position: 'absolute',
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  top: `${lensPos.y}px`,
                  left: `${lensPos.x}px`,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.35), inset 0 0 10px rgba(0,0,0,0.2)',
                  border: '3px solid #3b6e28',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url(${mainImage})`,
                  backgroundColor: '#ffffff',
                  backgroundSize: `${zoomLevel * 100}%`,
                  backgroundPosition: `${lensPos.relX}% ${lensPos.relY}%`,
                  zIndex: 20
                }}
              >
                {/* Crosshair indicator */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: '12px', height: '12px', border: '1px solid rgba(59, 110, 40, 0.4)', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
              </div>
            )}

            {/* Hint overlay badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '14px',
                background: 'rgba(27, 46, 19, 0.85)',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '50px',
                fontSize: '0.74rem',
                fontWeight: '700',
                letterSpacing: '0.04em',
                pointerEvents: 'none',
                backdropFilter: 'blur(4px)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>🔍</span> Move cursor over product to magnify pure stone-ground texture
            </div>
          </div>
        )}

        {/* ---------------- MODE 2: 360° INTERACTIVE 3D SPIN ---------------- */}
        {viewMode === '360' && (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            
            {/* Turntable Stage Base Reflection */}
            <div 
              style={{
                position: 'absolute',
                bottom: '38px',
                width: '65%',
                height: '24px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(37, 29, 24, 0.28) 0%, rgba(37, 29, 24, 0) 70%)',
                transform: `scale(${1 - Math.sin((rotationAngle * Math.PI) / 180) * 0.08})`,
                transition: 'transform 0.05s linear'
              }}
            />

            {/* Rotating 3D Perspective Container */}
            <div
              style={{
                perspective: '1000px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '82%'
              }}
            >
              <div
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${rotationAngle}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.08s ease-out',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                {/* Pack Image with cylindrical lighting simulation */}
                <img
                  src={mainImage}
                  alt={`${product.name} 360 view`}
                  style={{
                    maxWidth: '82%',
                    maxHeight: '340px',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                    filter: `drop-shadow(0 18px 25px rgba(0,0,0,0.18)) brightness(${
                      0.9 + 0.2 * Math.cos(((rotationAngle - 45) * Math.PI) / 180)
                    })`
                  }}
                />

                {/* Cylindrical Sheen Effect overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '16px',
                    pointerEvents: 'none',
                    background: `linear-gradient(${90 + rotationAngle}deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.15) 100%)`,
                    opacity: 0.35,
                    mixBlendMode: 'overlay'
                  }}
                />
              </div>
            </div>

            {/* Bottom 360° Degree Badge & Angle Inspector */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1.5px solid #ede6d8',
                borderRadius: '50px',
                padding: '4px 14px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
              }}
            >
              <span style={{ color: '#3b6e28', fontWeight: '900', fontSize: '0.82rem' }}>
                {Math.round(rotationAngle)}°
              </span>
              <span style={{ color: '#d4af37', fontSize: '0.75rem' }}>•</span>
              <span style={{ color: '#1b2e13', fontWeight: '700', fontSize: '0.78rem' }}>
                {getAngleLabel(rotationAngle)}
              </span>
            </div>

            {/* Drag Gesture Hint overlay */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(27, 46, 19, 0.08)',
                color: '#1b2e13',
                padding: '4px 10px',
                borderRadius: '50px',
                fontSize: '0.72rem',
                fontWeight: '800',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>↔</span> Drag / Swipe to Spin 360°
            </div>
          </div>
        )}
      </div>

      {/* 360° Manual Rotation Slider & Angle Steppers (Shown in 360 mode) */}
      {viewMode === '360' && (
        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', background: '#faf6f0', padding: '10px 16px', borderRadius: '16px', border: '1px solid #ede6d8' }}>
          <button
            type="button"
            onClick={() => stepRotation(-45)}
            title="Rotate Left 45°"
            style={{
              background: '#ffffff',
              border: '1px solid #ede6d8',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              fontWeight: '800',
              color: '#1b2e13',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}
          >
            ⟲
          </button>

          <input
            type="range"
            min="0"
            max="360"
            value={Math.round(rotationAngle)}
            onChange={(e) => {
              if (isAutoSpinning) setIsAutoSpinning(false);
              setRotationAngle(Number(e.target.value));
            }}
            style={{
              flex: 1,
              accentColor: '#3b6e28',
              cursor: 'pointer'
            }}
          />

          <button
            type="button"
            onClick={() => stepRotation(45)}
            title="Rotate Right 45°"
            style={{
              background: '#ffffff',
              border: '1px solid #ede6d8',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              fontWeight: '800',
              color: '#1b2e13',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}
          >
            ⟳
          </button>
        </div>
      )}

    </div>
  );
}
