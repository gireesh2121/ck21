import { MenuItem, Testimonial, Offer } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Pizza
  {
    id: 'pizza-1',
    name: 'Chicken Barbecue Pizza',
    category: 'Pizza',
    description: 'Fresh baked dough topped with tender BBQ chicken, red onions, mozzarella cheese, and signature BBQ sauce glaze.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    isPopular: true
  },
  {
    id: 'pizza-2',
    name: 'Margherita Classic Pizza',
    category: 'Pizza',
    description: 'Simple yet elegant. Fresh tomato marinara sauce, premium mozzarella, organic basil leaves, and a drizzle of extra virgin olive oil.',
    price: 260,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pizza-3',
    name: 'Veg Supreme Pizza',
    category: 'Pizza',
    description: 'A colorful blend of crisp bell peppers, sweet corn, black olives, sliced mushrooms, jalapeños, and extra cheese.',
    price: 290,
    image: 'https://images.unsplash.com/photo-1571066811602-71683a3f680d?auto=format&fit=crop&w=600&q=80'
  },

  // Burger
  {
    id: 'burger-1',
    name: 'Cheese Chicken Burger',
    category: 'Burger',
    description: 'Crispy seasoned chicken patty with melted cheddar cheese, fresh lettuce, sliced tomatoes, and spicy mayo on a toasted brioche bun.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    isPopular: true
  },
  {
    id: 'burger-2',
    name: 'Crispy Veg Burger',
    category: 'Burger',
    description: 'Golden fried vegetable patty loaded with potato, peas, and carrots, topped with coleslaw, onions, and sweet-sour relish.',
    price: 140,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'burger-3',
    name: 'Double Patty Flame Burger',
    category: 'Burger',
    description: 'Two premium flame-grilled patties, double layers of cheddar, crispy onion rings, dill pickles, and special house BBQ dressing.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80'
  },

  // Sandwich
  {
    id: 'sandwich-1',
    name: 'Gourmet Club Sandwich',
    category: 'Sandwich',
    description: 'Triple-decker bread stuffed with grilled chicken breast, fried egg, crispy lettuce, tomato slices, and cream cheese spreads.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&w=600&q=80',
    isPopular: true
  },
  {
    id: 'sandwich-2',
    name: 'Paneer Tikka Sandwich',
    category: 'Sandwich',
    description: 'Spiced clay-oven cottage cheese cubes with mint chutney, sliced bell peppers, and melted mozzarella inside toasted sourdough.',
    price: 135,
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sandwich-3',
    name: 'Classic Grilled Cheese',
    category: 'Sandwich',
    description: 'Simple comfort food. Triple blend of sharp cheddar, mozzarella, and swiss cheeses grilled to golden perfection.',
    price: 100,
    image: 'https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?auto=format&fit=crop&w=600&q=80'
  },

  // French Fries
  {
    id: 'fries-1',
    name: 'Peri Peri Crispy Fries',
    category: 'French Fries',
    description: 'Hot and crispy potato fries tossed in our signature, fiery African-style peri-peri seasoning mix.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80',
    isPopular: true
  },
  {
    id: 'fries-2',
    name: 'Loaded Triple Cheese Fries',
    category: 'French Fries',
    description: 'Freshly fried potatoes drenched in hot cheddar sauce, mozzarella sprinkles, chives, and spicy jalapeño bits.',
    price: 140,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'fries-3',
    name: 'Classic Salted Fries',
    category: 'French Fries',
    description: 'Straight-cut sea-salted classic premium fries, served crisp and piping hot with standard tomato ketchup.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80'
  },

  // Coffee
  {
    id: 'coffee-1',
    name: 'Iced Caramel Macchiato',
    category: 'Coffee',
    description: 'Chilled rich espresso combined with creamy milk, vanilla-flavored syrup, and topped with a buttery sweet caramel drizzle.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    isPopular: true
  },
  {
    id: 'coffee-2',
    name: 'Premium Hot Cappuccino',
    category: 'Coffee',
    description: 'Double shot of high-grade Arabica espresso topped with a smooth, velvety layer of steamed and aerated milk foam.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'coffee-3',
    name: 'Rich Italian Espresso',
    category: 'Coffee',
    description: 'A concentrated, full-bodied shot of espresso brewed under precise pressure for a thick hazelnut-colored crema layer.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1510972527409-cef1903972fa?auto=format&fit=crop&w=600&q=80'
  },

  // Tea
  {
    id: 'tea-1',
    name: 'Authentic Masala Chai',
    category: 'Tea',
    description: 'Brewed Indian black tea infused with aromatic freshly ground spices like cardamom, ginger, cloves, and cinnamon.',
    price: 40,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    isPopular: true
  },
  {
    id: 'tea-2',
    name: 'Royal Cardamom Tea',
    category: 'Tea',
    description: 'Freshly steeped fine Assam tea leaves boiled with fresh milk and premium hand-crushed green cardamom seeds.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tea-3',
    name: 'Organic Jasmine Green Tea',
    category: 'Tea',
    description: 'Premium light organic green tea leaves scented with fresh sweet jasmine blossoms, packed with antioxidants.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=600&q=80'
  },

  // Cold Drinks
  {
    id: 'cold-1',
    name: 'Double Chocolate Milkshake',
    category: 'Cold Drinks',
    description: 'Rich dark chocolate gelato blended with fresh chilled milk, topped with whip cream, cocoa dust, and hot fudge sauces.',
    price: 130,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    isPopular: true
  },
  {
    id: 'cold-2',
    name: 'Fresh Mint Lime Mojito',
    category: 'Cold Drinks',
    description: 'Muddled fresh mint leaves, tart lime wedges, pure cane sugar syrup, topped with chilled premium sparkling soda water.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cold-3',
    name: 'Sweet Lemon Iced Tea',
    category: 'Cold Drinks',
    description: 'Chilled home-brewed black tea shaken with sweet organic lemon juices and garnished with aromatic citrus slices.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80'
  },

  // Desserts
  {
    id: 'dessert-1',
    name: 'Sizzling Chocolate Brownie',
    category: 'Desserts',
    description: 'Warm fudge walnut brownie served on a sizzling hot plate with cold vanilla bean ice cream and hot poured chocolate syrup.',
    price: 160,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    isPopular: true
  },
  {
    id: 'dessert-2',
    name: 'Red Velvet Fresh Pastry',
    category: 'Desserts',
    description: 'Layers of moist dark crimson sponge cake filled with luscious sweet cream cheese frostings, sprinkled with red velvet crumbles.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1586985289688-ca9cf499350e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dessert-3',
    name: 'New York Blueberry Cheesecake',
    category: 'Desserts',
    description: 'A rich and creamy baked cheesecake with a crunchy graham cracker crust and topped with tangy blueberry compote glazes.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&w=600&q=80'
  }
];

export const OFFERS: Offer[] = [
  {
    id: 'offer-1',
    title: 'Welcome Discount',
    description: 'Get 10% off on your first order! Sign up and enjoy.',
    code: 'WELCOME10',
    discountPercent: 10,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'offer-2',
    title: 'Happy Hours Special',
    description: 'Enjoy 15% off on all Coffees and Desserts between 4 PM to 7 PM.',
    code: 'HAPPY15',
    discountPercent: 15,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'offer-3',
    title: 'Super Weekend Feast',
    description: 'Flat 20% off on premium Pizzas and Burgers above ₹500.',
    code: 'WEEKEND20',
    discountPercent: 20,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Aishwarya Sen',
    role: 'Food Enthusiast',
    rating: 5,
    text: 'The Margherita pizza here is to die for! The cheese is incredibly fresh, and the loyalty program rewarded me with a free garlic bread on my 7th order. Highly recommend!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-2',
    name: 'Rahul Mehta',
    role: 'Tech Consultant',
    rating: 5,
    text: 'Excellent service and a phenomenal selection of coffees. The glassmorphic website layout works so smoothly. I check my reward progress every time I order!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-3',
    name: 'Karthik Raja',
    role: 'College Student',
    rating: 4,
    text: 'Double Chocolate Milkshake paired with Peri Peri Fries is my absolute comfort food. Affordable pricing and super friendly cafe owners.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  }
];
