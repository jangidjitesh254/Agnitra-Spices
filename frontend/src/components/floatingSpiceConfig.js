// Transparent-background spice PNGs used for the drifting page decorations.
// Add a new spice by dropping its icon into /public/images and referencing it here.
export const SPICE_ICONS = {
  chilli: '/images/chilli_icon.png',
  mint: '/images/mint_leaf_icon.png',
  coriander: '/images/coriander_icon.png',
  turmeric: '/images/turmeric_icon.png',
  ginger: '/images/ginger_icon.png'
};

// Home page: positioned against the viewport, because .home-page is not a
// positioned ancestor. Offsets live in index.css under the floating decoration block.
export const HOME_FLOATING_SPICES = [
  // Left gutter, top to bottom
  { key: 'chilli-drift', icon: 'chilli' },
  { key: 'leaf-1', icon: 'mint' },
  { key: 'coriander-drift-1', icon: 'coriander' },
  { key: 'leaf-2', icon: 'mint' },
  { key: 'coriander-drift-3', icon: 'coriander' },
  { key: 'ginger-drift-1', icon: 'ginger' },
  { key: 'mint-drift-2', icon: 'mint' },
  // Right gutter, top to bottom
  { key: 'chilli-right-1', icon: 'chilli' },
  { key: 'leaf-4', icon: 'turmeric' },
  { key: 'ginger-drift-2', icon: 'ginger' },
  { key: 'chilli-right-2', icon: 'chilli' },
  { key: 'coriander-drift-2', icon: 'coriander' },
  { key: 'turmeric-drift-2', icon: 'turmeric' }
];
