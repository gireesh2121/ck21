import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Plus, Minus, Check } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { Category, MenuItem } from '../types';

interface MenuViewProps {
  addToCart: (item: MenuItem, qty: number) => void;
  cart: { menuItem: MenuItem; quantity: number }[];
}

export default function MenuView({ addToCart, cart }: MenuViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(350); // maximum item price is around 320
  const [showFilters, setShowFilters] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedItemNotification, setAddedItemNotification] = useState<string | null>(null);

  const categories: (Category | 'All')[] = [
    'All',
    'Pizza',
    'Burger',
    'Sandwich',
    'French Fries',
    'Coffee',
    'Tea',
    'Cold Drinks',
    'Desserts'
  ];

  // Filter items based on Category, Search query, and Price limit
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = item.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [selectedCategory, searchQuery, maxPrice]);

  const handleQtyChange = (itemId: string, diff: number) => {
    const current = quantities[itemId] || 1;
    const next = Math.max(1, current + diff);
    setQuantities((prev) => ({ ...prev, [itemId]: next }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const qty = quantities[item.id] || 1;
    addToCart(item, qty);
    
    // Trigger tiny animated notification success
    setAddedItemNotification(item.id);
    setTimeout(() => {
      setAddedItemNotification(null);
    }, 2000);

    // Reset local quantity input
    setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
  };

  // Find if item is already in cart to show a status badge
  const getItemCartQty = (itemId: string) => {
    const cartItem = cart.find((c) => c.menuItem.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="flex flex-col gap-10 pb-16 px-1 sm:px-0">
      {/* Page Header */}
      <div className="text-center sm:text-left">
        <span className="text-orange-500 font-mono text-xs font-bold tracking-wider uppercase">BISTRO KITCHEN</span>
        <h1 className="text-3xl font-bold text-white tracking-tight mt-1 font-display">Our Gourmet Food & Drinks</h1>
        <p className="text-gray-400 text-sm mt-2 max-w-xl">
          Order pizza, burgers, side fries, or fresh coffee and tea directly. All crafted freshly on order.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-md">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search pizza, coffee, brownie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 focus:border-orange-500/50 rounded-2xl py-2.5 pl-11 pr-4 text-sm text-gray-200 outline-none placeholder:text-gray-600 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Controls Toggle & Price Sliders */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-semibold transition-all cursor-pointer ${
              showFilters || maxPrice < 350
                ? 'bg-orange-500/15 border-orange-500/30 text-orange-400'
                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters {maxPrice < 350 && `(Price < ₹${maxPrice})`}</span>
          </button>
        </div>
      </div>

      {/* Expandable Advanced Filters (Price Slider) */}
      {showFilters && (
        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl animate-fadeIn flex flex-col gap-4">
          <div className="max-w-md">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-gray-300">Filter by Maximum Price</label>
              <span className="font-mono text-sm font-bold text-orange-500">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="40"
              max="350"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-[10px] text-gray-600 font-mono mt-1">
              <span>₹40</span>
              <span>₹150</span>
              <span>₹250</span>
              <span>₹350</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setMaxPrice(350);
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs text-gray-500 hover:text-white underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        </div>
      )}

      {/* Category Horizontal Scrolling Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 -mx-2 px-2 scrollbar-hide shrink-0">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
              selectedCategory === cat
                ? 'bg-orange-500 border-orange-500 text-black shadow-lg shadow-orange-500/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Item Bento/Cards Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const itemQty = quantities[item.id] || 1;
            const cartQty = getItemCartQty(item.id);

            return (
              <div
                key={item.id}
                id={`menu-item-${item.id}`}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/25 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image panel */}
                <div className="relative h-48 overflow-hidden bg-black/25">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-white/10 text-gray-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {item.category}
                  </span>
                  {/* Popular Banner */}
                  {item.isPopular && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-extrabold uppercase px-2 py-1 rounded-full tracking-wider shadow">
                      Popular
                    </span>
                  )}
                  {/* Cart count badge */}
                  {cartQty > 0 && (
                    <span className="absolute bottom-3 left-3 bg-orange-500 text-black text-[10px] font-bold px-2.5 py-1 rounded-xl border border-black/10">
                      {cartQty} in Cart
                    </span>
                  )}
                  {/* Price */}
                  <span className="absolute bottom-3 right-3 bg-black/85 backdrop-blur-md px-3 py-1 rounded-lg text-sm font-bold text-orange-400 border border-white/10">
                    ₹{item.price}
                  </span>
                </div>

                {/* Info & Quantity controls panel */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-bold font-display text-base text-white group-hover:text-orange-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-sans">Select Quantity</span>
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-xl p-1">
                        <button
                          onClick={() => handleQtyChange(item.id, -1)}
                          className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center font-mono text-xs font-bold text-white">
                          {itemQty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(item.id, 1)}
                          className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Order action button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                        addedItemNotification === item.id
                          ? 'bg-emerald-500 text-black'
                          : 'bg-orange-500 hover:bg-orange-600 text-black'
                      }`}
                    >
                      {addedItemNotification === item.id ? (
                        <>
                          <Check className="w-4 h-4 animate-ping" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <span>Add {itemQty} Item{itemQty > 1 && 's'} to Cart</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center bg-white/5 border border-white/10 p-12 rounded-3xl flex flex-col items-center justify-center gap-3">
          <p className="text-gray-400 text-sm">No items found matching your filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setMaxPrice(350);
            }}
            className="px-4 py-2 bg-white/5 text-orange-500 border border-white/10 rounded-xl text-xs hover:bg-white/10 transition-all cursor-pointer"
          >
            Clear Search Filters
          </button>
        </div>
      )}
    </div>
  );
}
