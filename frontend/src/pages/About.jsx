import SpiceDoodleLayer from '../components/SpiceDoodles';

function About({ navigateTo }) {
  // The four stages every Agnitra spice passes through before it reaches a kitchen
  const processJourney = [
    {
      step: '01',
      title: 'Direct Farm Sourcing',
      icon: '🌾',
      desc: 'Raw crops are bought straight from cultivators in Byadgi (Karnataka), Lakadong (Meghalaya) and Ramganj Mandi (Rajasthan). No mandi middle-men, no blended lots of unknown origin.'
    },
    {
      step: '02',
      title: 'Slow Sun Drying',
      icon: '☀️',
      desc: 'Every batch is sun-dried and hand-sorted until moisture drops under 8%. Sun drying takes days instead of minutes, but it protects the volatile oils that mechanical dryers cook away.'
    },
    {
      step: '03',
      title: 'Cold Grinding',
      icon: '🪨',
      desc: 'Spices are cold ground in slow-rotating stone chakkis at 40-50 RPM, or hand-pounded in an okhli-musar. Cold grinding holds friction heat under 38°C so essential oils stay inside the powder.'
    },
    {
      step: '04',
      title: 'Aroma-Lock Packing',
      icon: '🔒',
      desc: 'Powders are packed the same day into sealed, light-resistant 100g packs. Nothing sits exposed in a warehouse losing its scent before it reaches you.'
    }
  ];

  // What is deliberately absent from every Agnitra pack
  const neverAdded = [
    'Artificial colours or lead chromate',
    'Starch, rice husk or bran fillers',
    'Chemical preservatives',
    'Sulphur or polishing agents',
    'Anti-caking chemical agents',
    'Recycled or blended spice waste'
  ];

  // The five spices currently in the Agnitra range
  const spiceRange = [
    { name: 'Lal Mirchi', image: '/images/chilli.jpeg', method: 'Cold-Ground (Stone Chakki)', note: 'Byadgi chillies, 1.5% capsaicin oils preserved' },
    { name: 'Haldi', image: '/images/turmeric.jpeg', method: 'Hand-Pounded (Okhli-Musar)', note: 'Lakadong roots, over 5.2% active curcumin' },
    { name: 'Dhaniya', image: '/images/corainder.jpeg', method: 'Clay-Roasted & Stone-Ground', note: '0.9% linalool oils, cooling and citrusy' },
    { name: 'Khadi Mirch', image: '/images/khadi_mirch.png', method: 'Sun-Dried & Hand-Sorted', note: 'Whole pods with stem and seeds intact' },
    { name: 'Sabut Dhaniya', image: '/images/sabut_dhaniya.png', method: 'Sun-Dried & Hand-Cleaned', note: 'Unpolished whole seeds, no sulphur treatment' }
  ];

  return (
    <div className="about-page section doodle-host">
      <SpiceDoodleLayer variant="page" doodles={['chakki', 'mortar', 'turmeric', 'chilli', 'coriander', 'garlic']} />
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <span className="section-subtitle">Heritage &amp; Philosophy</span>
          <h2 className="section-title">The Story of Agnitra Spices</h2>
        </div>

        {/* Brand Mission Card */}
        <div className="about-heritage-card animate-fade-in">
          <div className="grid-2" style={{ alignItems: 'center', gap: '40px' }}>
            <div>
              <h2 className="about-title" style={{ fontFamily: 'var(--font-title)', color: 'var(--accent-gold)' }}>
                Reclaiming Sacred Kitchen Heritage
              </h2>
              <p className="about-text">
                For centuries, Indian kitchens were powered by slow stone grinders and heavy mortars. Spices weren't just colors or flavoring agents; they were therapeutic herbs. Grinding was treated as a delicate craft because spices carry highly sensitive volatile oils.
              </p>
              <p className="about-text">
                Industrialization replaced stones with high-speed steel hammer-mills. To maximize throughput, modern grinders slice spices at thousands of rotations per minute. This generates temperatures exceeding 80°C, effectively vaporizing the essential oils and stripping spices of their natural enzymes, flavor, and immunity-boosting compounds.
              </p>
              <p className="about-text">
                <strong>Agnitra</strong> was born to stop this damage. We pair premium raw spice crops with traditional cold grinding — slow stone chakkis and hand-pounding that never let friction heat build up. The result is a spice you can smell across the room the moment the seal breaks: fresh, oily, therapeutic, and exactly as nature grew it.
              </p>
              <p className="about-text">
                Every pack we sell is 100g of a single spice from a single sourcing region. We do not blend, we do not bulk out, and we do not sell anything we would not cook with at home.
              </p>
            </div>
            <div>
              {/* Uses logo directly as visual signature */}
              <img
                src="/images/Agnitra logo.jpg"
                alt="Traditional grinding stone signature logo"
                style={{ width: '80%', margin: '0 auto', borderRadius: '50%', border: '4px solid var(--accent-gold)', boxShadow: 'var(--card-shadow)' }}
              />
            </div>
          </div>
        </div>

        {/* Cold Grinding Process Journey */}
        <div className="section-title-wrapper" style={{ marginTop: '80px', marginBottom: '30px' }}>
          <span className="section-subtitle">From Farm To Your Kitchen</span>
          <h2 className="section-title">The Agnitra Cold Grinding Process</h2>
        </div>

        <div
          className="about-process-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '22px' }}
        >
          {processJourney.map((stage) => (
            <div
              key={stage.step}
              className="animate-fade-in"
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '26px 22px',
                border: '1.5px solid #ede6d8',
                boxShadow: '0 8px 26px rgba(37, 29, 24, 0.05)',
                borderTop: '4px solid #3b6e28',
                position: 'relative'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '20px',
                  fontFamily: 'var(--font-title)',
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: 'rgba(59, 110, 40, 0.12)',
                  lineHeight: 1
                }}
              >
                {stage.step}
              </span>
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{stage.icon}</div>
              <h3
                style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: '1.15rem',
                  fontWeight: '800',
                  color: '#1b2e13',
                  marginBottom: '10px'
                }}
              >
                {stage.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                {stage.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Technology comparison section */}
        <div className="section-title-wrapper" style={{ marginTop: '80px', marginBottom: '30px' }}>
          <span className="section-subtitle">Comparing Processing Methods</span>
          <h2 className="section-title">Cold Grinding vs. Industrial Heat</h2>
        </div>

        <div className="about-tech-comparison">
          {/* Cold ground */}
          <div className="comparison-box traditional">
            <h3 className="comparison-title text-gold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z"/><path d="M19 17l1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z"/></svg> Agnitra Traditional Cold Grinding
            </h3>
            <ul className="comparison-list">
              <li><strong>Friction Temp:</strong> Cold grinding stays strictly under 38°C, keeping essential oils intact.</li>
              <li><strong>Grinding Speed:</strong> 40 to 50 RPM in rotating stone mills or gentle wooden pounding.</li>
              <li><strong>Active Curcumin:</strong> Over 5.2% curcumin retained in turmeric (Lakadong root).</li>
              <li><strong>Purity Guarantee:</strong> Zero additives, starch fillers, or lead chromate colors.</li>
              <li><strong>Aroma Longevity:</strong> Aroma-lock sealed packing holds scent for up to 12 months.</li>
            </ul>
          </div>

          {/* Industrial heat */}
          <div className="comparison-box industrial">
            <h3 className="comparison-title text-red">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg> Industrial High-Speed Milling
            </h3>
            <ul className="comparison-list">
              <li><strong>Friction Temp:</strong> Exceeds 80°C, burning away flavor and natural scent.</li>
              <li><strong>Grinding Speed:</strong> Up to 12,000 RPM in steel hammers, pulverizing the fiber structure.</li>
              <li><strong>Active Curcumin:</strong> Often falls below 1.5% due to high-temperature degradation.</li>
              <li><strong>Additives:</strong> Often mixed with starch, rice husk, or artificial coloring agents.</li>
              <li><strong>Aroma Longevity:</strong> Volatile scents evaporate rapidly within weeks of opening.</li>
            </ul>
          </div>
        </div>

        {/* Our Spice Range */}
        <div className="section-title-wrapper" style={{ marginTop: '80px', marginBottom: '30px' }}>
          <span className="section-subtitle">The Agnitra Collection</span>
          <h2 className="section-title">Five Spices, Made Properly</h2>
        </div>

        <p className="about-text" style={{ maxWidth: '760px', margin: '0 auto 36px auto', textAlign: 'center' }}>
          We would rather make five spices exceptionally than fifty adequately. Each one is a single-origin, 100g, cold ground pack with its grinding method printed on the label.
        </p>

        <div
          className="about-range-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}
        >
          {spiceRange.map((spice) => (
            <div
              key={spice.name}
              className="animate-fade-in"
              onClick={() => navigateTo('shop')}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1.5px solid #ede6d8',
                boxShadow: '0 8px 26px rgba(37, 29, 24, 0.05)',
                cursor: 'pointer'
              }}
            >
              <div style={{ height: '150px', overflow: 'hidden', background: '#faf6f0' }}>
                <img
                  src={spice.image}
                  alt={spice.name}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '18px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-title)',
                    fontSize: '1.1rem',
                    fontWeight: '800',
                    color: '#1b2e13',
                    marginBottom: '6px'
                  }}
                >
                  {spice.name}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--accent-orange)', fontWeight: '800', margin: '0 0 8px 0' }}>
                  {spice.method}
                </p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                  {spice.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Purity Pledge - what we never add */}
        <div
          className="about-purity-pledge animate-fade-in"
          style={{
            marginTop: '80px',
            background: 'linear-gradient(135deg, #1b3017 0%, #273b22 100%)',
            borderRadius: '24px',
            padding: '40px 32px',
            color: '#ffffff',
            boxShadow: '0 14px 40px rgba(27, 48, 23, 0.22)',
            border: '2px solid #bd593c'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span
              style={{
                color: '#d4af37',
                fontSize: '0.85rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              The Agnitra Purity Pledge
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-title)',
                fontSize: '1.9rem',
                color: '#ffffff',
                marginTop: '8px',
                marginBottom: '10px'
              }}
            >
              What You Will Never Find In Our Packs
            </h2>
            <p style={{ color: '#d5cbbd', fontSize: '0.95rem', maxWidth: '640px', margin: '0 auto' }}>
              A spice is defined as much by what is left out as by what goes in. This is our standing commitment to every Agnitra kitchen.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            {neverAdded.map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(0, 0, 0, 0.28)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '12px',
                  padding: '14px 16px'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bd593c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.93 4.93 14.14 14.14" />
                </svg>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sourcing details */}
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', marginBottom: '20px' }}>Direct From Sourcing Farmers</h2>
          <p className="about-text" style={{ maxWidth: '800px', margin: '0 auto 20px auto' }}>
            We work directly with certified farmers across India. Our Kashmiri chillies come from local cultivators in Byadgi, Karnataka; our high-curcumin turmeric roots are sourced from Lakadong in Meghalaya; and our premium coriander seeds are harvested in Ramganj Mandi, Rajasthan. By eliminating middle-men, we pay farmers premium rates and source the finest raw crops.
          </p>
          <p className="about-text" style={{ maxWidth: '800px', margin: '0 auto 40px auto' }}>
            That relationship is the reason we can print a grinding temperature and an essential-oil percentage on every product page. When you know the farm, the batch and the chakki, there is nothing left to hide.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={() => navigateTo('shop')}
            >
              Support Our Farmers - Buy Now
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigateTo('contact')}
            >
              Talk To Our Spice Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
