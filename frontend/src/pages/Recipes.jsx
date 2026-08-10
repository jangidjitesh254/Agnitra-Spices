import { useState } from 'react';

const RECIPES_DATA = [
  {
    id: 1,
    title: 'Royal Veg Shahi Pulao',
    category: 'Lunch',
    time: '25 mins',
    servings: '3-4 Persons',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
    desc: 'Aromatic long-grain basmati rice infused with Agnitra whole spices, roasted cashews, and fresh saffron.',
    spicesUsed: ['Khadi Mirch', 'Sabut Dhaniya', 'Haldi Powder'],
    ingredients: [
      '2 cups Extra Long Basmati Rice',
      '1 tsp Agnitra Haldi (Turmeric Powder)',
      '2 Agnitra Khadi Mirch (Whole Red Chilli)',
      '1 tsp Agnitra Sabut Dhaniya (Crushed Coriander Seeds)',
      '1/2 cup Mixed Vegetables (Carrots, Peas, Beans)',
      '2 tbsp Pure Desi Ghee',
      'Cashews & Raisins for garnish'
    ],
    steps: [
      'Soak Basmati rice for 20 minutes and drain thoroughly.',
      'Heat 2 tbsp ghee in a heavy-bottomed handi. Add Agnitra Khadi Mirch and Sabut Dhaniya until aromatic.',
      'Add mixed vegetables, Agnitra Haldi powder, and sauté for 3 minutes.',
      'Add soaked rice, 3.5 cups water, salt to taste, and simmer on low heat for 12 minutes.',
      'Garnish with golden fried cashews and serve piping hot with raita!'
    ]
  },
  {
    id: 2,
    title: 'Aroma-Sealed Paneer Butter Masala',
    category: 'Dinner',
    time: '35 mins',
    servings: '4 Persons',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    desc: 'Rich & creamy cottage cheese gravy cooked in cashew-tomato purée and stone-ground Agnitra Lal Mirch.',
    spicesUsed: ['Lal Mirchi', 'Haldi Powder', 'Dhaniya Powder'],
    ingredients: [
      '250g Fresh Malai Paneer (cubed)',
      '1.5 tsp Agnitra Lal Mirchi (Red Chilli Powder)',
      '1 tsp Agnitra Dhaniya (Coriander Powder)',
      '1/2 tsp Agnitra Haldi (Turmeric Powder)',
      '3 Fresh Tomatoes & 10 Cashews (puréed)',
      '2 tbsp Butter & 1 tbsp Kasuri Methi'
    ],
    steps: [
      'Melt butter in a pan, add tomato-cashew purée and cook until oil separates.',
      'Add Agnitra Lal Mirchi, Dhaniya powder, and Haldi. Stir gently on medium flame.',
      'Pour 1/2 cup warm water, add paneer cubes, and simmer for 6 minutes.',
      'Crush Kasuri Methi between palms and sprinkle on top with a dash of fresh cream.'
    ]
  },
  {
    id: 3,
    title: 'Traditional Masala Chai',
    category: 'Breakfast',
    time: '10 mins',
    servings: '2 Cups',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    desc: 'Rejuvenating Indian tea brewed with fresh ginger, tulsi, and crushed Agnitra whole spices.',
    spicesUsed: ['Sabut Dhaniya', 'Khadi Mirch'],
    ingredients: [
      '1.5 cups Water & 1 cup Fresh Milk',
      '2 tsp CTC Tea Leaves',
      '1 inch Fresh Crushed Ginger',
      '1/2 tsp Agnitra Sabut Dhaniya (crushed)',
      '1 Green Cardamom & 1 Clove',
      'Sugar or Jaggery to taste'
    ],
    steps: [
      'Bring water to boil in a saucepan. Add crushed ginger and Agnitra Sabut Dhaniya.',
      'Add tea leaves and simmer for 3 minutes until deep amber.',
      'Pour milk and bring to a rolling boil twice for maximum flavor extraction.',
      'Strain into kulhads or cups and enjoy hot!'
    ]
  },
  {
    id: 4,
    title: 'Desi Tadka Dal Fry',
    category: 'Lunch',
    time: '25 mins',
    servings: '3 Persons',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    desc: 'Golden yellow lentils tempered in cow ghee, garlic, Agnitra Khadi Mirch, and organic Haldi.',
    spicesUsed: ['Haldi Powder', 'Khadi Mirch', 'Dhaniya Powder'],
    ingredients: [
      '1 cup Toor Dal (Pigeon Peas)',
      '1 tsp Agnitra Haldi (Turmeric Powder)',
      '2 Agnitra Khadi Mirch (Red Chilli)',
      '1 tsp Agnitra Dhaniya Powder',
      '2 tbsp Ghee & 5 Garlic Cloves',
      'Fresh Coriander Leaves'
    ],
    steps: [
      'Pressure cook toor dal with Agnitra Haldi, salt, and water for 4 whistles.',
      'Heat ghee in a pan for tadka. Add cumin, garlic, and Agnitra Khadi Mirch.',
      'Pour sizzling tadka over cooked dal, sprinkle Agnitra Dhaniya powder, and cover for 2 mins to lock aroma.',
      'Garnish with fresh coriander and serve with steamed rice.'
    ]
  },
  {
    id: 5,
    title: 'Crispy Samosa Chaat & Chutney',
    category: 'Snacks',
    time: '20 mins',
    servings: '2 Plates',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    desc: 'Crushed potato samosas drizzled with sweet tamarind chutney, curd, and roasted Agnitra Lal Mirch.',
    spicesUsed: ['Lal Mirchi', 'Dhaniya Powder'],
    ingredients: [
      '4 Fresh Crispy Samosas',
      '1 cup Cooked White Chickpea Curry (Chole)',
      '1 tsp Agnitra Lal Mirchi (Red Chilli)',
      '1 tsp Agnitra Dhaniya Powder',
      '1/2 cup Sweet Curd & Tamarind Chutney',
      'Fine Sev & Chopped Onions'
    ],
    steps: [
      'Break 2 samosas into a wide plate. Ladle hot chole curry over them.',
      'Drizzle sweetened curd, green chutney, and sweet tamarind chutney.',
      'Dust with Agnitra Lal Mirchi and Dhaniya powder for instant zing.',
      'Top with fine sev and pomegranate seeds.'
    ]
  },
  {
    id: 6,
    title: 'Special Hyderabadi Dum Biryani',
    category: 'Dinner',
    time: '50 mins',
    servings: '5 Persons',
    difficulty: 'Expert',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    desc: 'Authentic royal dum biryani cooked with Agnitra stone-ground spices and saffron dum layer.',
    spicesUsed: ['Lal Mirchi', 'Haldi Powder', 'Khadi Mirch', 'Sabut Dhaniya'],
    ingredients: [
      '3 cups Saffron Basmati Rice',
      '2 tsp Agnitra Lal Mirchi',
      '1 tsp Agnitra Haldi',
      '3 Agnitra Khadi Mirch',
      '1 tbsp Agnitra Sabut Dhaniya',
      'Fried Onions (Birista) & Ghee'
    ],
    steps: [
      'Parboil basmati rice with whole spices until 70% done.',
      'Layer spicy vegetable/paneer gravy marinated with Agnitra Lal Mirchi & Haldi.',
      'Cover with rice, saffron milk, mint leaves, and fried onions.',
      'Seal with dough dough edge and cook on dum (slow flame) for 25 minutes.'
    ]
  }
];

function Recipes({ navigateTo }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeRecipeModal, setActiveRecipeModal] = useState(null);

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  const filteredRecipes = selectedCategory === 'All' 
    ? RECIPES_DATA 
    : RECIPES_DATA.filter(r => r.category === selectedCategory);

  return (
    <div className="recipes-page section" style={{ padding: '40px 0 80px 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Page Header */}
        <div className="section-title-wrapper text-center" style={{ marginBottom: '36px' }}>
          <span className="section-subtitle" style={{ color: '#3b6e28', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>Traditional Culinary Inspiration</span>
          <h1 className="main-headline-title" style={{ fontFamily: 'var(--font-title)', fontSize: '2.4rem', color: '#1b2e13', margin: '8px 0' }}>Authentic Spice Recipes</h1>
          <p className="main-headline-sub" style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>Discover delicious home-style Indian dishes made superior with 100% pure Agnitra stone-ground spices.</p>
        </div>

        {/* Category Filter Pills */}
        <div className="category-filter-pills" style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '50px',
                border: selectedCategory === cat ? 'none' : '1.5px solid #dcd3c1',
                background: selectedCategory === cat ? '#2b3e1b' : '#ffffff',
                color: selectedCategory === cat ? '#ffffff' : '#1b2e13',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipes Grid */}
        <div className="recipes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
          {filteredRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className="recipe-card animate-fade-in"
              onClick={() => setActiveRecipeModal(recipe)}
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1.5px solid #ede6d8',
                boxShadow: '0 10px 30px rgba(37, 29, 24, 0.06)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
              }}
            >
              <div>
                <div className="recipe-img-box" style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  />
                  <span style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(27, 46, 19, 0.85)', backdropFilter: 'blur(4px)', color: '#ffffff', padding: '4px 12px', borderRadius: '50px', fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase' }}>
                    {recipe.category}
                  </span>
                  <span style={{ position: 'absolute', top: '14px', right: '14px', background: '#ffffff', color: '#1b2e13', padding: '4px 12px', borderRadius: '50px', fontSize: '0.78rem', fontWeight: '800', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    ⏱ {recipe.time}
                  </span>
                </div>

                <div className="recipe-card-content" style={{ padding: '22px' }}>
                  <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.3rem', fontWeight: '800', color: '#1b2e13', marginBottom: '8px', lineHeight: '1.3' }}>
                    {recipe.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '16px' }}>
                    {recipe.desc}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {recipe.spicesUsed.map((spice, idx) => (
                      <span key={idx} style={{ background: 'rgba(59, 110, 40, 0.08)', color: '#3b6e28', border: '1px solid #3b6e28', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '700' }}>
                        🌿 {spice}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 22px 22px 22px' }}>
                <button 
                  type="button"
                  className="btn" 
                  style={{ width: '100%', background: '#faf6f0', border: '1.5px solid #dcd3c1', color: '#1b2e13', padding: '10px', borderRadius: '12px', fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  View Full Recipe &amp; Steps →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recipe Details Modal Popup */}
        {activeRecipeModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
            <div className="animate-fade-in" style={{ background: '#ffffff', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '28px', padding: '32px', position: 'relative', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>
              
              <button 
                type="button"
                onClick={() => setActiveRecipeModal(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: '#faf6f0', border: 'none', width: '36px', height: '36px', borderRadius: '50%', fontSize: '1.2rem', fontWeight: '800', color: '#1b2e13', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ background: '#3b6e28', color: '#ffffff', padding: '4px 12px', borderRadius: '50px', fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase' }}>
                  {activeRecipeModal.category}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '700' }}>
                  ⏱ {activeRecipeModal.time} • 👥 Serves {activeRecipeModal.servings}
                </span>
              </div>

              <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.8rem', fontWeight: '800', color: '#1b2e13', marginBottom: '12px' }}>
                {activeRecipeModal.title}
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '24px' }}>
                {activeRecipeModal.desc}
              </p>

              {/* Ingredients List */}
              <div style={{ background: '#faf6f0', borderRadius: '18px', padding: '20px', marginBottom: '24px', border: '1px solid #ede6d8' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: '800', textTransform: 'uppercase', color: '#1b2e13', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🥣 Required Ingredients:
                </h4>
                <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {activeRecipeModal.ingredients.map((ing, i) => (
                    <li key={i} style={{ fontWeight: ing.includes('Agnitra') ? '800' : '500', color: ing.includes('Agnitra') ? '#3b6e28' : 'inherit' }}>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cooking Steps */}
              <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: '800', textTransform: 'uppercase', color: '#1b2e13', marginBottom: '14px' }}>
                  🍳 Cooking Instructions:
                </h4>
                <ol style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.65' }}>
                  {activeRecipeModal.steps.map((step, i) => (
                    <li key={i} style={{ marginBottom: '10px' }}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  style={{ flex: 1, padding: '14px', background: '#2b3e1b', color: '#ffffff', borderRadius: '12px', fontWeight: '800' }}
                  onClick={() => { setActiveRecipeModal(null); navigateTo('shop'); }}
                >
                  Buy Agnitra Spices Used →
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Recipes;
