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
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z"/><path d="M19 17l1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z"/></svg> Agnitra Traditional Cold Grinding
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
