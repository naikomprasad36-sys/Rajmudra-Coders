import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Sparkles, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  Crown, 
  Flame, 
  Coffee,
  ChevronRight,
  Receipt,
  Loader2
} from 'lucide-react';
import { apiBookFood } from '../services/api';

export default function FoodBookingPage({ onBookFood, setActiveTab }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState(null);

  const categories = ['All', 'Royal Banquet', 'Gourmet Starters', 'Artisan Mocktails', 'Grand Desserts'];

  const menuItems = [
    {
      id: 'F1',
      title: 'Shahi Royal Thali & Banquet Feast',
      category: 'Royal Banquet',
      type: 'Veg',
      price: 699,
      rating: 4.9,
      description: 'Paneer Makhani, Dal Bukhara, Zafrani Pulao, Butter Naan, and Gulab Jamun served in royal bronze platters.',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 'F2',
      title: 'Grand Mughlai Biryani Platter',
      category: 'Royal Banquet',
      type: 'Non-Veg',
      price: 799,
      rating: 5.0,
      description: 'Slow-cooked Dum Biryani infused with saffron, served with Mirchi Ka Salan and creamy Burani Raita.',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 'F3',
      title: 'Tandoori Saffron Paneer Tikka',
      category: 'Gourmet Starters',
      type: 'Veg',
      price: 399,
      rating: 4.8,
      description: 'Charcoal-grilled cottage cheese marinated in hung curd, yellow mustard, and Kashmiri saffron.',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 'F4',
      title: 'Smoked Crispy Kebab Sampler',
      category: 'Gourmet Starters',
      type: 'Non-Veg',
      price: 499,
      rating: 4.9,
      description: 'Assorted Galouti and Seekh kebabs served with mint dip, pickled onions, and roomali crisps.',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 'F5',
      title: 'Golden Aura Saffron Elixir',
      category: 'Artisan Mocktails',
      type: 'Veg',
      price: 249,
      rating: 4.7,
      description: 'Signature mocktail with pure saffron strands, rose water, sparkling tonic, and edible gold dust.',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 'F6',
      title: 'Pistachio Kulfi & Saffron Rabri Fondue',
      category: 'Grand Desserts',
      type: 'Veg',
      price: 299,
      rating: 4.9,
      description: 'Handcrafted slow-churned malai kulfi skewers served with warm saffron pistachio reduction.',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=60'
    }
  ];

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter((i) => i.category === selectedCategory);

  // Cart operations
  const addToCart = (item) => {
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      setCart(cart.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(cart.map((c) => {
      if (c.id === id) {
        const newQty = c.qty + delta;
        return newQty > 0 ? { ...c, qty: newQty } : null;
      }
      return c;
    }).filter(Boolean));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + taxes;

  // Place order & sync with backend
  const handlePlaceOrder = async () => {
    if (cart.length === 0 || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const orderPayload = {
        items: cart,
        total: grandTotal,
        table: tableNumber || 'Main Banquet Table',
        userName: 'User (You)',
        userEmail: 'user@rajmudra.com'
      };

      const result = await apiBookFood(orderPayload);

      if (result && result.success) {
        setConfirmedOrderId(result.order.id);
        
        if (onBookFood) {
          onBookFood(result.ticket || {
            id: result.order.id,
            eventTitle: `Royal Catering (${cart.map(i => `${i.qty}x ${i.title}`).join(', ')})`,
            name: 'User (You)',
            date: new Date().toLocaleDateString(),
            time: 'Banquet Hours',
            venue: tableNumber || 'Main Banquet Table',
            type: 'food'
          });
        }

        setOrderSuccess(true);
        setTimeout(() => {
          setCart([]);
          setOrderSuccess(false);
          if (setActiveTab) setActiveTab('tickets');
        }, 2200);
      }
    } catch (err) {
      console.error('Failed to book food:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#241D1A] via-[#352822] to-[#241D1A] text-white rounded-3xl p-8 border border-[#E5B84B]/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5B84B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5B84B]/20 border border-[#E5B84B]/40 text-[#F3E5AB] text-xs font-bold">
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#E5B84B]" />
              <span>Royal Banquet & Dining</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F3E5AB] to-[#E5B84B]">
              Curated Event Dining & Catering
            </h1>
            <p className="text-[#D1C7BD] text-xs sm:text-sm max-w-xl">
              Live catering booking with backend sync. Pre-book gourmet dining boxes and refreshments delivered directly to your hall table.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#1A1614]/80 p-3.5 rounded-2xl border border-[#E5B84B]/30 backdrop-blur-md">
            <ShoppingBag className="w-6 h-6 text-[#E5B84B]" />
            <div>
              <p className="text-[10px] text-[#8C7A6B] font-bold uppercase">Cart Items</p>
              <p className="text-sm font-black text-[#F3E5AB]">{cart.reduce((a, b) => a + b.qty, 0)} Items Added</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Menu Items, Right Order Tray */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Menu and Filters */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 shrink-0 border ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#D4A337] to-[#E5B84B] text-[#1A1614] border-[#F3E5AB] shadow-md shadow-[#E5B84B]/20 scale-[1.02]'
                    : 'bg-[#241D1A]/80 text-[#D1C7BD] border-[#E5B84B]/20 hover:border-[#E5B84B]/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredItems.map((item) => {
              const inCart = cart.find((c) => c.id === item.id);

              return (
                <div
                  key={item.id}
                  className="bg-[#241D1A]/90 backdrop-blur-xl rounded-3xl border border-[#E5B84B]/20 overflow-hidden shadow-lg hover:border-[#E5B84B]/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-black/40">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#241D1A] via-transparent to-transparent" />
                    
                    {/* Diet Tag */}
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-xl text-[10px] font-black border backdrop-blur-md ${
                      item.type === 'Veg'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                        : 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                    }`}>
                      {item.type === 'Veg' ? '● Pure Veg' : '▲ Non-Veg'}
                    </span>

                    {/* Rating Tag */}
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-black/70 border border-[#E5B84B]/40 text-[#F3E5AB] text-[10px] font-extrabold backdrop-blur-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#E5B84B]" /> {item.rating}
                    </span>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-base text-[#FAF7F2] leading-snug group-hover:text-[#F3E5AB] transition">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#D1C7BD]/80 line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E5B84B]/15 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[10px] text-[#8C7A6B] block uppercase font-bold">Price</span>
                        <span className="text-base font-black text-[#F3E5AB]">₹{item.price}</span>
                      </div>

                      {inCart ? (
                        <div className="flex items-center gap-2 bg-[#1A1614] border border-[#E5B84B]/40 p-1 rounded-2xl">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 rounded-xl bg-[#2C221E] hover:bg-rose-500 hover:text-white text-[#D1C7BD] flex items-center justify-center transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 font-black text-xs text-[#F3E5AB]">{inCart.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 rounded-xl bg-gradient-to-r from-[#D4A337] to-[#E5B84B] text-[#1A1614] flex items-center justify-center font-bold transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#D4A337] to-[#E5B84B] hover:from-[#F3E5AB] hover:to-[#D4A337] text-[#1A1614] font-black text-xs flex items-center gap-1.5 shadow-md shadow-[#E5B84B]/20 transition transform hover:scale-105 active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Tray</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Food Order Tray & Checkout */}
        <div className="bg-[#241D1A]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[#E5B84B]/30 shadow-xl flex flex-col justify-between space-y-6 h-fit sticky top-24">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5B84B]/20 pb-4">
              <div>
                <h3 className="text-lg font-black text-[#F3E5AB] tracking-wide">Banquet Order Tray</h3>
                <p className="text-xs text-[#8C7A6B]">Review Selected Delicacies</p>
              </div>
              <Crown className="w-5 h-5 text-[#E5B84B]" />
            </div>

            {/* Table / Pass ID input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#D1C7BD]">Event Table / Pass ID (Optional):</label>
              <input
                type="text"
                placeholder="e.g. VIP Table 4 / Pass #9821"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#1A1614] border border-[#E5B84B]/30 rounded-xl focus:ring-2 focus:ring-[#E5B84B] outline-none text-xs text-white placeholder:text-[#6B5B52]"
              />
            </div>

            {/* Cart Items List */}
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-[#1A1614] border border-dashed border-[#E5B84B]/20 text-[#8C7A6B] text-xs">
                  <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-[#E5B84B]/40" />
                  Your tray is empty. Add royal delicacies from the menu to proceed.
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-[#1A1614] p-3 rounded-2xl border border-[#E5B84B]/15 text-xs"
                  >
                    <div className="space-y-0.5 max-w-[130px]">
                      <p className="font-bold text-white truncate">{item.title}</p>
                      <p className="text-[10px] text-[#8C7A6B]">₹{item.price} each</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-[#241D1A] px-2 py-1 rounded-xl border border-[#E5B84B]/20">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="text-[#D1C7BD] hover:text-rose-400 font-bold"
                        >
                          -
                        </button>
                        <span className="font-black text-[#F3E5AB]">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="text-[#D1C7BD] hover:text-[#E5B84B] font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-extrabold text-[#F3E5AB] w-12 text-right">
                        ₹{item.price * item.qty}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Price Calculation */}
            {cart.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-[#E5B84B]/20 text-xs text-[#D1C7BD]">
                <div className="flex justify-between">
                  <span>Food Subtotal</span>
                  <span className="font-bold text-white">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Catering GST (5%)</span>
                  <span className="font-bold text-white">₹{taxes}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#F3E5AB] pt-2 border-t border-[#E5B84B]/20">
                  <span>Total Amount</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
            )}
          </div>

          {/* Place Order CTA */}
          <div>
            {orderSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-center space-y-1 animate-in zoom-in-95">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <p className="font-extrabold text-sm">Order #{confirmedOrderId || 'FD-LIVE'} Placed!</p>
                <p className="text-[11px] text-emerald-400/80">Backend confirmed • Passes updated...</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={cart.length === 0 || isSubmitting}
                className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-300 shadow-xl ${
                  cart.length === 0 || isSubmitting
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-gradient-to-r from-[#D4A337] via-[#E5B84B] to-[#D4A337] text-[#1A1614] shadow-[#D4A337]/30 hover:scale-[1.02] active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Booking with Server...</span>
                  </>
                ) : (
                  <>
                    <Receipt className="w-4 h-4" />
                    <span>Place Banquet Order (₹{grandTotal})</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
