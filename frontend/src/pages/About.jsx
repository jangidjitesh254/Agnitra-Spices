import { useState } from 'react';
import SpiceDoodleLayer from '../components/SpiceDoodles';

function About({ navigateTo }) {
  const [openFaq, setOpenFaq] = useState(0);

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

  // How Agnitra got here. Only milestones we can actually stand behind.
  const journey = [
    {
      marker: '2026',
      title: 'Agnitra Begins',
      desc: 'Agnitra Spices starts in Jaipur, Rajasthan around a single rule we refuse to bend: nothing gets ground hot. Where the industry chose speed, we chose the slow stone chakki and the okhli-musar our grandmothers used.'
    },
    {
      marker: '2026',
      title: 'Straight To The Farms',
      desc: 'Direct buying relationships are set up with cultivators in Byadgi (Karnataka), Lakadong (Meghalaya) and Ramganj Mandi (Rajasthan). No mandi middle-men, no blended lots of unknown origin, and premium rates paid straight to the grower.'
    },
    {
      marker: 'July 2026',
      title: 'agnitraspices.com Goes Live',
      desc: 'The online store opens so any kitchen in India can order single-origin, cold-ground spices directly, with the grinding method and sourcing region printed on every pack and product page.'
    },
    {
      marker: 'Today',
      title: 'Five Spices, Made Properly',
      desc: 'The range stands at five single-origin 100g packs. We would rather make five spices exceptionally than fifty adequately, so the list grows only when we find a farm and a method we are willing to put our name on.'
    }
  ];

  // Where each crop comes from, and why that region and not another
  const sourcingRegions = [
    {
      region: 'Byadgi',
      state: 'Karnataka',
      crop: 'Lal Mirchi & Khadi Mirch',
      image: '/images/chilli.jpeg',
      desc: 'Byadgi chillies are prized for deep red colour with mild heat, which is why they need no artificial colouring at all. We buy whole pods with stem and seeds intact and keep 1.5% capsaicin oils through cold grinding.'
    },
    {
      region: 'Lakadong',
      state: 'Meghalaya',
      crop: 'Haldi',
      image: '/images/turmeric.jpeg',
      desc: 'Lakadong turmeric carries some of the highest curcumin in the world. Ordinary turmeric sits near 2%; our hand-pounded Lakadong roots hold over 5.2%, because pounding never lets friction heat degrade the compound.'
    },
    {
      region: 'Ramganj Mandi',
      state: 'Rajasthan',
      crop: 'Dhaniya & Sabut Dhaniya',
      image: '/images/corainder.jpeg',
      desc: 'One of India’s largest coriander belts, close to our own base. Seeds are clay-roasted and stone-ground to hold 0.9% linalool oils, and the whole seeds are left unpolished with no sulphur treatment.'
    }
  ];

  // Questions we are actually asked, answered from how we work
  const faqs = [
    {
      q: 'What does “cold ground” actually mean?',
      a: 'Our spices are ground in slow-rotating stone chakkis at 40 to 50 RPM, or hand-pounded in an okhli-musar. That keeps friction temperature under 38°C. Industrial hammer-mills run up to 12,000 RPM and cross 80°C, which vaporises the volatile oils that give a spice its aroma and therapeutic value.'
    },
    {
      q: 'How long do the spices stay fresh?',
      a: 'Our aroma-lock sealed, light-resistant packs hold their scent for up to 12 months. Powders are packed the same day they are ground, so nothing sits in a warehouse losing its aroma before it reaches you. Once opened, use within a few months for the fullest aroma.'
    },
    {
      q: 'How should I store them at home?',
      a: 'Keep the pack sealed, in a cool dry cupboard away from direct sunlight and the heat of the stove. Always use a dry spoon. Moisture and heat are what dull a spice, not time on its own.'
    },
    {
      q: 'Why only 100g packs?',
      a: 'Because a cold-ground spice is at its best when it is fresh. A 100g pack of a single spice from a single region gets finished while the oils are still alive, instead of sitting half-used for a year. It also means we never blend or bulk out a pack with anything.'
    },
    {
      q: 'Why do you sell only five spices?',
      a: 'Every spice we add needs a farm we trust, a grinding method that suits it, and a batch we would cook with at home. We would rather make five spices exceptionally than fifty adequately. The range grows only when all three line up.'
    },
    {
      q: 'How do I place an order and pay?',
      a: 'Add what you need to the cart and go through checkout. Our team confirms every order on WhatsApp, so you can ask questions before anything is dispatched. Pay cash on delivery, or by UPI through a link we send on WhatsApp. Shipping and aroma-lock packing are free.'
    }
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

              <div className="about-founded-strip">
                <div className="founded-stat">
                  <span className="founded-label">Founded</span>
                  <span className="founded-value">2026</span>
                </div>
                <div className="founded-stat">
                  <span className="founded-label">Based in</span>
                  <span className="founded-value">Jaipur, Rajasthan</span>
                </div>
                <div className="founded-stat">
                  <span className="founded-label">Sourcing regions</span>
                  <span className="founded-value">3 states</span>
                </div>
                <div className="founded-stat">
                  <span className="founded-label">Range</span>
                  <span className="founded-value">5 single-origin spices</span>
                </div>
              </div>
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

        {/* Our Journey */}
        <div className="section-title-wrapper" style={{ marginTop: '80px', marginBottom: '30px' }}>
          <span className="section-subtitle">How We Got Here</span>
          <h2 className="section-title">The Agnitra Journey</h2>
        </div>

        <ol className="about-journey">
          {journey.map((stage) => (
            <li key={stage.title} className="journey-item animate-fade-in">
              <span className="journey-dot" aria-hidden="true" />
              <div className="journey-body">
                <span className="journey-marker">{stage.marker}</span>
                <h3 className="journey-title">{stage.title}</h3>
                <p className="journey-desc">{stage.desc}</p>
              </div>
            </li>
          ))}
        </ol>

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

        {/* Where the crops come from */}
        <div className="section-title-wrapper" style={{ marginTop: '80px', marginBottom: '30px' }}>
          <span className="section-subtitle">Direct From Sourcing Farmers</span>
          <h2 className="section-title">Three Regions, Chosen On Purpose</h2>
        </div>

        <p className="about-text" style={{ maxWidth: '820px', margin: '0 auto 36px auto', textAlign: 'center' }}>
          We work directly with certified farmers across India, and every crop comes from the belt that grows it best.
          By eliminating middle-men we pay farmers premium rates and get first pick of the raw crop. That relationship is
          the reason we can print a grinding temperature and an essential-oil percentage on every product page — when you
          know the farm, the batch and the chakki, there is nothing left to hide.
        </p>

        <div className="sourcing-grid">
          {sourcingRegions.map((r) => (
            <article key={r.region} className="sourcing-card animate-fade-in">
              <div className="sourcing-media">
                <img src={r.image} alt={`${r.crop} from ${r.region}`} loading="lazy" />
                <span className="sourcing-state">{r.state}</span>
              </div>
              <div className="sourcing-body">
                <h3 className="sourcing-region">{r.region}</h3>
                <p className="sourcing-crop">{r.crop}</p>
                <p className="sourcing-desc">{r.desc}</p>
              </div>
            </article>
          ))}
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

        {/* Frequently asked questions */}
        <div className="section-title-wrapper" style={{ marginTop: '80px', marginBottom: '30px' }}>
          <span className="section-subtitle">Good Questions</span>
          <h2 className="section-title">Frequently Asked</h2>
        </div>

        <div className="about-faq-list">
          {faqs.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={item.q} className={`faq-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span>{item.q}</span>
                  <span className="faq-toggle" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                  </span>
                </button>
                {isOpen && (
                  <p className="faq-answer" id={`faq-answer-${i}`}>{item.a}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Company details */}
        <div className="section-title-wrapper" style={{ marginTop: '80px', marginBottom: '30px' }}>
          <span className="section-subtitle">Reach Us</span>
          <h2 className="section-title">Company Details</h2>
        </div>

        <div className="about-company-grid">
          <div className="company-card">
            <span className="company-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="12" r="3"/></svg>
            </span>
            <span className="company-label">Registered Address</span>
            <p className="company-value">Plot 45, Heritage Agricultural Industrial Estate,<br />Jaipur, Rajasthan &ndash; 302001</p>
          </div>

          <div className="company-card">
            <span className="company-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </span>
            <span className="company-label">Email</span>
            <p className="company-value">
              <a href="mailto:it.agnitraspices@gmail.com">it.agnitraspices@gmail.com</a>
            </p>
          </div>

          <div className="company-card">
            <span className="company-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </span>
            <span className="company-label">WhatsApp &amp; Orders</span>
            <p className="company-value">
              <a href="https://wa.me/919461839415" target="_blank" rel="noreferrer">+91 94618 39415</a>
            </p>
          </div>

          <div className="company-card">
            <span className="company-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </span>
            <span className="company-label">Instagram</span>
            <p className="company-value">
              <a href="https://instagram.com/agnitraspices" target="_blank" rel="noreferrer">@agnitraspices</a>
            </p>
          </div>
        </div>

        <div style={{ marginTop: '60px', textAlign: 'center' }}>
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
