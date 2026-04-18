export interface Product {
  id: string
  name: string
  subName: string
  price: string
  description: string
  folderPath: string
  themeColor: string
  gradient: string
  features: string[]
  stats: { label: string; val: string }[]
  nutrition: { calories: string; fat: string; protein: string }
  section1: { title: string; subtitle: string }
  section2: { title: string; subtitle: string }
  section3: { title: string; subtitle: string }
  section4: { title: string; subtitle: string }
  detailsSection: { title: string; description: string; imageAlt: string }
  freshnessSection: { title: string; description: string }
  buyNowSection: {
    price: string
    unit: string
    processingParams: string[]
    deliveryPromise: string
    returnPolicy: string
  }
  frameCount: number
  framePrefix: string
  framePad: number
  frameExtension: string
  ingredients: {
    id: string
    label: string
    src: string
    calories: number
    fat: number
    protein: number
    x: number
    y: number
    rot: number
    scale: number
  }[]
  emptyBowlSrc: string
  fullBowlSrc: string
}

const defaultIngredients: Product['ingredients'] = [
  {
    id: 'lettuce',
    label: 'Lettuce',
    src: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=720&q=80',
    calories: 20,
    fat: 0.2,
    protein: 1.4,
    x: -136,
    y: -44,
    rot: -19,
    scale: 0.94,
  },
  {
    id: 'spinach',
    label: 'Spinach',
    src: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=720&q=80',
    calories: 23,
    fat: 0.4,
    protein: 2.4,
    x: -42,
    y: -68,
    rot: -8,
    scale: 0.86,
  },
  {
    id: 'avocado',
    label: 'Avocado',
    src: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&w=720&q=80',
    calories: 94,
    fat: 8.6,
    protein: 1.3,
    x: 112,
    y: -24,
    rot: 15,
    scale: 0.86,
  },
  {
    id: 'tomato',
    label: 'Tomato',
    src: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=720&q=80',
    calories: 21,
    fat: 0.2,
    protein: 1.1,
    x: 14,
    y: -88,
    rot: -9,
    scale: 0.82,
  },
  {
    id: 'cucumber',
    label: 'Cucumber',
    src: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=720&q=80',
    calories: 16,
    fat: 0.1,
    protein: 0.7,
    x: -12,
    y: 4,
    rot: 12,
    scale: 0.98,
  },
  {
    id: 'onion',
    label: 'Onion',
    src: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=720&q=80',
    calories: 27,
    fat: 0.1,
    protein: 0.8,
    x: -86,
    y: 34,
    rot: -13,
    scale: 0.84,
  },
  {
    id: 'feta',
    label: 'Feta',
    src: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=720&q=80',
    calories: 64,
    fat: 5.2,
    protein: 4.8,
    x: 74,
    y: 26,
    rot: 8,
    scale: 0.8,
  },
  {
    id: 'microgreens',
    label: 'Microgreens',
    src: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=720&q=80',
    calories: 14,
    fat: 0.2,
    protein: 1.6,
    x: 0,
    y: 58,
    rot: 5,
    scale: 0.94,
  },
]

export const products: Product[] = [
  {
    id: 'green-glow',
    name: 'Green Glow Bowl',
    subName: 'Freshness with intent.',
    price: 'Rs 299',
    description: 'Hand-cut greens, clean fats, high-fiber goodness',
    folderPath: '/zalada/images',
    themeColor: '#2F6B3F',
    gradient: 'linear-gradient(135deg, #3d8a53 0%, #2F6B3F 100%)',
    features: ['Farm-picked produce', 'No preservatives', 'Chef-layered assembly'],
    stats: [
      { label: 'Freshness', val: '24h' },
      { label: 'Cut', val: 'Chef' },
      { label: 'Dressing', val: 'House' },
    ],
    nutrition: { calories: '348 kcal', fat: '15.0 g', protein: '14.1 g' },
    section1: { title: 'Green Glow Bowl', subtitle: 'Premium clean composition.' },
    section2: {
      title: 'Assembled ingredient by ingredient',
      subtitle: 'Crisp greens, avocado, tomato, cucumber, onion, feta and microgreens.',
    },
    section3: {
      title: 'Textural balance by design',
      subtitle: 'Leaf volume, soft fats and refreshing crunch tuned in each layer.',
    },
    section4: {
      mainImage: '/zalada/menu/DSC02327.JPG.jpeg',
      title: 'Freshness you can see',
      subtitle: 'Built live in the hero sequence from empty bowl to finished plate.',
    },
    detailsSection: {
      title: 'Chef-Layered Precision',
      description:
        'We compose this bowl in ordered layers to preserve crunch and aroma. Every component is cut, chilled and packed for texture-forward freshness.',
      imageAlt: 'Green glow salad details',
    },
    freshnessSection: {
      title: 'Controlled Cold Chain',
      description:
        'Produce is washed, dried, chilled and assembled in temperature-managed prep zones before dispatch.',
    },
    buyNowSection: {
      price: 'Rs 299',
      unit: 'per bowl',
      processingParams: ['Cold prepped', 'No additives', 'Same-day assembly'],
      deliveryPromise: 'Delivered in insulated packaging with freshness timestamp.',
      returnPolicy: 'Quality issue? Instant replacement guaranteed.',
    },
    frameCount: 140,
    framePrefix: 'ezgif-frame-',
    framePad: 3,
    frameExtension: 'jpg',
    emptyBowlSrc:
      'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1400&q=80',
    fullBowlSrc:
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1800&q=80',
    ingredients: defaultIngredients,
  },
  {
    id: 'citrus-crunch',
    name: 'Citrus Crunch Salad',
    subName: 'Bright and aromatic.',
    price: 'Rs 319',
    description: 'Citrus-forward dressing with layered crunch',
    folderPath: '/zalada/images',
    themeColor: '#2F6B3F',
    gradient: 'linear-gradient(135deg, #3d8a53 0%, #2F6B3F 100%)',
    features: ['Citrus zest profile', 'Hydrating produce', 'Seed crunch finish'],
    stats: [
      { label: 'Acidity', val: 'Balanced' },
      { label: 'Crunch', val: 'High' },
      { label: 'Finish', val: 'Bright' },
    ],
    nutrition: { calories: '336 kcal', fat: '14.4 g', protein: '12.9 g' },
    section1: { title: 'Citrus Crunch Salad', subtitle: 'Lively, bright, textured.' },
    section2: {
      title: 'Fresh citrus-led profile',
      subtitle: 'Aromatic greens meet tomato sweetness and cucumber hydration.',
    },
    section3: {
      title: 'Light body, complete meal',
      subtitle: 'Balanced macros for clean energy and lasting satiety.',
    },
    section4: {
      title: 'Built for sensory contrast',
      subtitle: 'Each layer protects crispness until the final bite.',
    },
    detailsSection: {
      title: 'Citrus Composition Method',
      description:
        'We pair tart citrus dressing with moisture-rich produce to create a vivid but controlled flavor arc.',
      imageAlt: 'Citrus crunch salad details',
    },
    freshnessSection: {
      title: 'Fresh Through Delivery',
      description:
        'A strict cold chain and breathable packaging keep acidity bright and leaves crisp on arrival.',
    },
    buyNowSection: {
      price: 'Rs 319',
      unit: 'per bowl',
      processingParams: ['Citrus blend', 'Chef finished', 'Cold packed'],
      deliveryPromise: 'Shipped chilled in thermal-safe food-grade carriers.',
      returnPolicy: 'Freshness not right? We replace with priority dispatch.',
    },
    frameCount: 140,
    framePrefix: 'ezgif-frame-',
    framePad: 3,
    frameExtension: 'jpg',
    emptyBowlSrc:
      'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1400&q=80',
    fullBowlSrc:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1800&q=80',
    ingredients: defaultIngredients,
  },
  {
    id: 'herb-protein',
    name: 'Herb Protein Bowl',
    subName: 'Strength with freshness.',
    price: 'Rs 349',
    description: 'Protein-rich profile with herb dressing finish',
    folderPath: '/zalada/images',
    themeColor: '#2F6B3F',
    gradient: 'linear-gradient(135deg, #3d8a53 0%, #2F6B3F 100%)',
    features: ['Protein-forward blend', 'Herb dressing', 'Long satiety'],
    stats: [
      { label: 'Protein', val: 'High' },
      { label: 'Fiber', val: 'High' },
      { label: 'Energy', val: 'Steady' },
    ],
    nutrition: { calories: '386 kcal', fat: '18.4 g', protein: '22.7 g' },
    section1: { title: 'Herb Protein Bowl', subtitle: 'Performance-grade freshness.' },
    section2: {
      title: 'Built for sustained energy',
      subtitle: 'Dense macro composition while preserving light, fresh bite quality.',
    },
    section3: {
      title: 'Protein without heaviness',
      subtitle: 'A cleaner profile designed for post-work and lunch resets.',
    },
    section4: {
      title: 'Premium prep discipline',
      subtitle: 'Precise cut ratio and layering keep texture intact through transport.',
    },
    detailsSection: {
      title: 'Protein, Reframed',
      description:
        'This bowl concentrates protein and fiber while protecting freshness with strict assembly sequencing.',
      imageAlt: 'Herb protein bowl details',
    },
    freshnessSection: {
      title: 'Precision Handling',
      description:
        'High-density ingredients are portioned to avoid compression and preserve mouthfeel at delivery.',
    },
    buyNowSection: {
      price: 'Rs 349',
      unit: 'per bowl',
      processingParams: ['Protein-forward', 'Herb infused', 'Cold chain'],
      deliveryPromise: 'Priority dispatch in insulated packs for peak texture.',
      returnPolicy: 'Any quality mismatch receives immediate replacement.',
    },
    frameCount: 140,
    framePrefix: 'ezgif-frame-',
    framePad: 3,
    frameExtension: 'jpg',
    emptyBowlSrc:
      'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1400&q=80',
    fullBowlSrc:
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1800&q=80',
    ingredients: defaultIngredients,
  },
]
