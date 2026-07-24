import { useState } from 'react';

const RECIPES_DATA = [
  {
    id: 1,
    title: 'Veg Pulao',
    category: 'Lunch',
    time: '20 mins',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80',
    desc: 'Fragrant basmati rice infused with Agnitra whole cumin, cardamom, cloves & star anise.'
  },
  {
    id: 2,
    title: 'Paneer Butter Masala',
    category: 'Dinner',
    time: '35 mins',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    desc: 'Creamy cottage cheese curry crafted with cold-ground Agnitra Kashmiri Red Chili & Kitchen King masala.'
  },
  {
    id: 3,
    title: 'Masala Chai',
    category: 'Breakfast',
    time: '10 mins',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    desc: 'Warming Indian spiced tea brewed with fresh ginger, cardamom & Agnitra crushed black pepper.'
  },
  {
    id: 4,
    title: 'Spiced Dal Tadka',
    category: 'Lunch',
    time: '25 mins',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    desc: 'Yellow lentils tempered in pure ghee, mustard seeds, garlic & Agnitra organic turmeric.'
  },
  {
    id: 5,
    title: 'Crispy Samosa Chaat',
    category: 'Snacks',
    time: '15 mins',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    desc: 'Crushed potato samosas sprinkled with Agnitra roasted cumin powder & tangy amchur.'
  },
  {
    id: 6,
    title: 'Biryani Special Masala',
    category: 'Dinner',
    time: '45 mins',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    desc: 'Royal dum biryani layered with Agnitra authentic low-temperature Biryani Masala.'
  }
];

function Recipes({ navigateTo }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  const filteredRecipes = selectedCategory === 'All' 
    ? RECIPES_DATA 
    : RECIPES_DATA.filter(r => r.category === selectedCategory);

  return (
    <div className="recipes-page section">
      <div className="container">
        
        {/* Header Title Section (Matching Screen 5) */}
        <div className="section-title-wrapper text-center" style={{ marginBottom: '35px' }}>
          <h1 className="main-headline-title">Recipes & Inspiration</h1>
          <p className="main-headline-sub">Ideas for every meal, made better with Agnitra.</p>
        </div>

        {/* Category Pills Filter Bar */}
        <div className="category-filter-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipes Grid */}
        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card animate-fade-in">
              <div className="recipe-img-box">
                <img src={recipe.image} alt={recipe.title} className="recipe-img" />
                <span className="recipe-cat-badge">{recipe.category}</span>
                <span className="recipe-time-badge">⏱ {recipe.time}</span>
              </div>
              <div className="recipe-card-content">
                <h3 className="recipe-card-title">{recipe.title}</h3>
                <p className="recipe-card-desc">{recipe.desc}</p>
                <button 
                  className="btn-recipe-link" 
                  onClick={() => navigateTo('shop')}
                >
                  View Recipe & Get Spices →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <button className="btn btn-primary" onClick={() => navigateTo('shop')}>
            View All Recipes & Ingredients
          </button>
        </div>

      </div>
    </div>
  );
}

export default Recipes;
