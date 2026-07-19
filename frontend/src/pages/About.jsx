function About({ navigateTo }) {
  return (
    <div className="about-page section">
      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <span className="section-subtitle">Heritage & Philosophy</span>
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
                <strong>Agnitra</strong> was born to stop this damage. By pairing premium raw spice crops with traditional slow-speed cold grinding systems, we ensure you taste spices exactly as nature grew them: fresh, oily, therapeutic, and bursting with aroma.
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

        {/* Technology comparison section */}
        <div className="section-title-wrapper" style={{ marginTop: '80px', marginBottom: '30px' }}>
          <span className="section-subtitle">Comparing Processing Methods</span>
          <h2 className="section-title">Cold Ground vs. Industrial Heat</h2>
        </div>

        <div className="about-tech-comparison">
          {/* Cold ground */}
          <div className="comparison-box traditional">
            <h3 className="comparison-title text-gold">
              <span>🌟</span> Agnitra Traditional Cold Grinding
            </h3>
            <ul className="comparison-list">
              <li><strong>Friction Temp:</strong> Stays strictly under 38°C, keeping essential oils intact.</li>
              <li><strong>Grinding Speed:</strong> 40 to 50 RPM in rotating stone mills or gentle wooden pounding.</li>
              <li><strong>Active Curcumin:</strong> Over 5.2% curcumin retained in turmeric (Lakadong root).</li>
              <li><strong>Purity Guarantee:</strong> Zero additives, starch fillers, or lead chromate colors.</li>
              <li><strong>Aroma Longevity:</strong> Triple-layer nitrogen flush locks scent for up to 12 months.</li>
            </ul>
          </div>

          {/* Industrial heat */}
          <div className="comparison-box industrial">
            <h3 className="comparison-title text-red">
              <span>⚠️</span> Industrial High-Speed Milling
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

        {/* Sourcing details */}
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', marginBottom: '20px' }}>Direct From Sourcing Farmers</h2>
          <p className="about-text" style={{ maxWidth: '800px', margin: '0 auto 40px auto' }}>
            We work directly with certified farmers across India. Our Kashmiri chillies come from local cultivators in Karnataka, our high-curcumin turmeric roots are sourced from Lakadong in Meghalaya, and our premium coriander seeds are harvested in Rajasthan. By eliminating middle-men, we pay farmers premium rates and source the finest raw crops.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => navigateTo('shop')}
          >
            Support Our Farmers - Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
