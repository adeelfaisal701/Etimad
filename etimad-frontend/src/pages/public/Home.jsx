import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import CartDrawer from "../../components/common/CartDrawer";
import API from "../../api/axios";
import { getDashboardRoute } from "../../util/getDashboardRoutes";
import "./LandingPage.css";

const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: "💻", itemCount: "12k+" },
  { id: "fashion", name: "Fashion", icon: "👕", itemCount: "18k+" },
  { id: "beauty", name: "Beauty", icon: "✨", itemCount: "5k+" },
  { id: "home-living", name: "Home & Living", icon: "🏠", itemCount: "9k+" },
  { id: "digital", name: "Digital Products", icon: "📦", itemCount: "3k+" },
  { id: "services", name: "Services", icon: "💼", itemCount: "2k+" },
  { id: "accessories", name: "Accessories", icon: "⌚", itemCount: "7k+" },
  { id: "gaming", name: "Gaming", icon: "🎮", itemCount: "4k+" },
];

const PRODUCTS = [
  { id:"p1", title:"Quantum X Pro Smartphone", price:899.99, originalPrice:1099.99, category:"Electronics", sellerName:"TechNova Official", rating:4.8, reviews:1245, imageUrl:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80", isNew:true },
  { id:"p2", title:"AeroGlide Urban Sneakers", price:129.50, category:"Fashion", sellerName:"StreetVibe Kicks", rating:4.6, reviews:832, imageUrl:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { id:"p3", title:"SonicBass ANC Headphones", price:249.00, originalPrice:299.00, category:"Electronics", sellerName:"AudioPhile Hub", rating:4.9, reviews:2108, imageUrl:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  { id:"p4", title:"Radiance Vitamin C Serum", price:45.00, category:"Beauty", sellerName:"Lumiere Cosmetics", rating:4.7, reviews:563, imageUrl:"https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80", isNew:true },
  { id:"p5", title:"Zenith Book 14\" Ultrabook", price:1199.00, category:"Electronics", sellerName:"TechNova Official", rating:4.8, reviews:941, imageUrl:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80" },
  { id:"p6", title:"Chronos Classic Automatic", price:350.00, originalPrice:420.00, category:"Accessories", sellerName:"TimePiece Gallery", rating:4.9, reviews:312, imageUrl:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
  { id:"p7", title:"Midnight Silhouette Gown", price:89.99, category:"Fashion", sellerName:"Elegance Boutique", rating:4.5, reviews:178, imageUrl:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80" },
  { id:"p8", title:"Nexus Pro Controller", price:69.99, category:"Gaming", sellerName:"GameOn Store", rating:4.7, reviews:4205, imageUrl:"https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=400&q=80" },
];

const FEATURES = [
  { icon:"🛡️", title:"Buyer Protection", desc:"100% money-back guarantee if your item is not delivered or as described." },
  { icon:"🔒", title:"Secure Payments", desc:"We use state-of-the-art encryption to keep your payment information safe." },
  { icon:"✅", title:"Verified Sellers", desc:"Every seller goes through a strict verification process before joining." },
  { icon:"🚚", title:"Fast Delivery", desc:"Get your items quickly with our optimized logistics network." },
  { icon:"📍", title:"Real-Time Tracking", desc:"Track your orders from the warehouse straight to your doorstep." },
  { icon:"🎧", title:"24/7 Support", desc:"Our customer service team is always here to help you out." },
];

const STEPS = [
  { icon:"👤", title:"Create Account", desc:"Sign up in seconds and get access to exclusive deals." },
  { icon:"🔍", title:"Browse Products", desc:"Explore 50,000+ items across multiple categories." },
  { icon:"🛍️", title:"Place Order", desc:"Add to cart and checkout securely with Buyer Protection." },
  { icon:"📦", title:"Receive Delivery", desc:"Track your package in real-time until it arrives." },
];

const TESTIMONIALS = [
  { name:"Michael Chen", role:"Verified Buyer", rating:5, text:"Etimad is a game changer. I've bought electronics and clothing here, and the buyer protection makes it risk-free. Delivery is always fast.", avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=e2e8f0" },
  { name:"Sarah Jenkins", role:"Seller & Buyer", rating:5, text:"As a small business owner, selling on Etimad has doubled my revenue in 6 months. The seller dashboard is incredibly intuitive.", avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=dde8f0" },
  { name:"David Rodriguez", role:"Verified Buyer", rating:4, text:"Great selection of products you can't find elsewhere. Customer service was very helpful when I needed to do an exchange.", avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=f0e8e0" },
  { name:"Aisha Patel", role:"Verified Buyer", rating:5, text:"The quality of sellers here is outstanding. I've never had an issue with any product, and customer support is top-notch.", avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha&backgroundColor=e8f0e0" }
];

const FAQS = [
  { q: "Is shopping on Etimad secure?", a: "Yes! Every transaction is protected by our secure escrow payment system. Sellers only receive payment after you confirm delivery." },
  { q: "How do I become a seller?", a: "Click on the 'Become a Seller' button, sign up for a seller account, and complete your store setup to start listing products." },
  { q: "What is the return policy?", a: "We offer a 7-day return policy for any damaged or incorrect products. Simply request a return through your buyer dashboard." },
  { q: "How can I track my order?", a: "Once your order is shipped, you will get a tracking ID which you can use in your dashboard to see real-time updates." }
];

export default function Home() {
  const { user, logout, switchRole } = useAuth();
  const { cartCount, refreshCartCount } = useCart();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [liveProducts, setLiveProducts] = useState([]);

  const [scrolled, setScrolled] = useState(false);
  const [navSearch, setNavSearch] = useState("");
  const [heroSearch, setHeroSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [testiIndex, setTestiIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [toasts, setToasts] = useState([]);
  const [counts, setCounts] = useState({
    totalProducts: 0,
    verifiedSellers: 0,
    happyBuyers: 0,
    ordersCompleted: 0
  });

  const productsSectionRef = useRef(null);
  const categoriesSectionRef = useRef(null);
  const toastIdCounter = useRef(0);

  // Scroll event for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stats number animation
  useEffect(() => {
    const duration = 2000;
    const stepTime = 30;
    const steps = duration / stepTime;
    
    const targets = {
      totalProducts: 50000,
      verifiedSellers: 8000,
      happyBuyers: 1200000,
      ordersCompleted: 3500000
    };
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCounts(targets);
        clearInterval(timer);
      } else {
        const ratio = currentStep / steps;
        setCounts({
          totalProducts: Math.floor(targets.totalProducts * ratio),
          verifiedSellers: Math.floor(targets.verifiedSellers * ratio),
          happyBuyers: Math.floor(targets.happyBuyers * ratio),
          ordersCompleted: Math.floor(targets.ordersCompleted * ratio)
        });
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, []);

  // Toast handler
  const showToast = (title, msg) => {
    toastIdCounter.current += 1;
    const id = toastIdCounter.current;
    setToasts(prev => [...prev, { id, title, msg, exiting: false }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 300);
    }, 3000);
  };

  const handleNavSearch = () => {
    if (navSearch.trim()) {
      showToast("Search", `Searching for: ${navSearch}`);
    } else {
      showToast("Search", "Please enter a search query.");
    }
  };

  const handleHeroSearch = () => {
    if (heroSearch.trim()) {
      showToast("Search", `Searching for: ${heroSearch}`);
    } else {
      showToast("Search", "Please enter a search query.");
    }
  };

  const handleNewsletter = () => {
    if (newsletterEmail.trim()) {
      showToast("Newsletter", "Thank you for subscribing!");
      setNewsletterEmail("");
    } else {
      showToast("Newsletter", "Please enter a valid email.");
    }
  };

  // Fetch products from database, fallback to mock if empty
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        if (res.data && res.data.length > 0) {
          // Map backend products to layout expectations
          const mapped = res.data.map(p => ({
            id: p._id,
            title: p.title || p.name,
            price: p.price,
            category: p.category || "General",
            sellerName: p.seller ? p.seller.name : "Verified Seller",
            rating: p.rating || 4.7,
            reviews: p.reviews || 12,
            imageUrl: p.image ? `${API.defaults.baseURL.replace("/api", "")}${p.image}` : "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
            isNew: true
          }));
          setLiveProducts(mapped);
        } else {
          setLiveProducts(PRODUCTS);
        }
      } catch (err) {
        setLiveProducts(PRODUCTS);
      }
    };
    fetchProducts();
  }, []);

  // Sync cart count when user logs in or role switches
  useEffect(() => {
    if (user) {
      refreshCartCount();
    }
  }, [user]);

  const addToCart = async (id) => {
    if (!user) {
      showToast("Authentication Required", "Please log in to add items to cart.");
      // Open cart drawer which has sign in prompt
      setCartOpen(true);
      return;
    }
    try {
      await API.post("/cart/add", { productId: id, quantity: 1 });
      refreshCartCount();
      showToast("Success", "Product added to cart successfully");
    } catch (err) {
      showToast("Error", "Could not add item to cart.");
    }
  };

  const toggleWishlist = (id) => {
    const prod = PRODUCTS.find(p => p.id === id);
    if (wishlist.includes(id)) {
      setWishlist(prev => prev.filter(item => item !== id));
      showToast("Wishlist", `${prod.title} removed from wishlist!`);
    } else {
      setWishlist(prev => [...prev, id]);
      showToast("Wishlist", `${prod.title} added to wishlist!`);
    }
  };

  const testiPrev = () => {
    setTestiIndex(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const testiNext = () => {
    setTestiIndex(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const toggleFAQ = (index) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M+";
    if (num >= 1000) return (num / 1000).toFixed(0) + "k+";
    return num;
  };

  return (
    <div className="landing-page-body">
      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Etimad</div>
          <div className="nav-search">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted)", flexShrink: 0 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input 
              type="search" 
              placeholder="Search 50,000+ products..." 
              id="nav-search-input" 
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNavSearch()}
            />
            <button className="nav-search-btn" onClick={handleNavSearch}>Search</button>
          </div>
          <div className="nav-actions">
            <button className="nav-icon-btn" title="Wishlist" onClick={() => {
              if (user) {
                showToast("Wishlist", "Wishlist feature coming soon!");
              } else {
                showToast("Wishlist", "Please sign in to view your wishlist.");
              }
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <span className={`nav-badge ${wishlist.length > 0 ? "visible" : ""}`} id="wishlist-count">{wishlist.length}</span>
            </button>
            <button className="nav-icon-btn" title="Cart" onClick={() => setCartOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <span className={`nav-badge ${user && cartCount > 0 ? "visible" : ""}`} id="wishlist-count">{cartCount}</span>
            </button>
            <div className="divider"></div>
            {!user ? (
              <>
                <button className="btn btn-ghost btn-sm" onClick={() => navigate("/login")}>Log In</button>
                <button className="btn btn-primary btn-sm" onClick={() => navigate("/signup")}>Sign Up</button>
              </>
            ) : (
              <>
                <button className="btn btn-ghost btn-sm" onClick={() => navigate(getDashboardRoute(user.role))}>Dashboard</button>
                {user.role !== "admin" && (
                  <button className="btn btn-ghost btn-sm" onClick={async () => {
                    try {
                      const updatedUser = await switchRole();
                      showToast("Success", `Switched role to ${updatedUser.role}`);
                      navigate(getDashboardRoute(updatedUser.role));
                    } catch (err) {
                      showToast("Error", "Failed to switch role");
                    }
                  }}>Switch Account</button>
                )}
                <button className="btn btn-outline btn-sm text-red-500 hover:bg-red-50" style={{ border: "1px solid rgb(239, 68, 68)", color: "rgb(239, 68, 68)", padding: "0.25rem 0.75rem", borderRadius: "0.375rem" }} onClick={() => {
                  logout();
                  showToast("Logout", "Logged out successfully");
                  navigate("/");
                }}>Logout</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                The fastest growing marketplace in 2025
              </div>
              <h1>Shop from <span className="grad">50,000+</span> Products Across <span className="grad">8,000+</span> Trusted Sellers</h1>
              <p className="hero-sub">Etimad is your ultimate destination for verified electronics, fashion, and home goods. Experience secure payments, buyer protection, and lightning-fast delivery.</p>
              <div className="hero-search-form" style={{ marginBottom: "32px" }}>
                <div className="hero-search-wrap" style={{ width: "100%" }}>
                  <svg className="hero-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <input 
                    className="hero-search-input" 
                    type="search" 
                    id="hero-search" 
                    placeholder="Search products, brands, categories..." 
                    style={{ width: "100%" }}
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleHeroSearch()}
                  />
                </div>
              </div>
              <div className="hero-btns">
                <button className="btn btn-primary btn-lg" onClick={() => productsSectionRef.current?.scrollIntoView({ behavior: "smooth" })}>
                  Start Shopping
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
                <button className="btn btn-outline btn-lg" onClick={() => navigate("/seller-signup")}>Become a Seller</button>
              </div>
              <div className="hero-social-proof">
                <div className="avatars">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=1&backgroundColor=e2e8f0" alt="" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=2&backgroundColor=dde8f0" alt="" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=3&backgroundColor=f0e8e0" alt="" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=4&backgroundColor=e8f0e0" alt="" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=5&backgroundColor=f0e2e8" alt="" />
                </div>
                <div style={{ textAlign: "left" }}>
                  <div className="stars">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  </div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Trusted by 1.2M+ users</span>
                </div>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-img-wrap">
                <div className="hero-img-glow"></div>
                <img className="hero-img" src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop" alt="Etimad Marketplace" />
                <div className="hero-float float-top">
                  <div className="float-icon green">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>Buyer Protection</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>100% Secure</div>
                  </div>
                </div>
                <div className="hero-float hero-float-2 float-bottom">
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: "4px" }}>Latest Order</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "32px", height: "32px", background: "var(--secondary)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>🎧</div>
                      <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>SonicBass ANC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="stats-bar">
          <div className="stats-inner">
            <div className="stat-item"><span className="stat-num">{formatNumber(counts.totalProducts)}</span><span className="stat-label">Total Products</span></div>
            <div className="stat-item"><span className="stat-num">{formatNumber(counts.verifiedSellers)}</span><span className="stat-label">Verified Sellers</span></div>
            <div className="stat-item"><span className="stat-num">{formatNumber(counts.happyBuyers)}</span><span className="stat-label">Happy Buyers</span></div>
            <div className="stat-item"><span className="stat-num">{formatNumber(counts.ordersCompleted)}</span><span className="stat-label">Orders Completed</span></div>
          </div>
        </div>

        {/* CATEGORIES */}
        <section className="categories-section" id="categories-section" ref={categoriesSectionRef}>
          <div className="section-inner">
            <div className="section-header-row">
              <div className="left">
                <h2>Explore Popular Categories</h2>
                <p>Browse through our wide selection of products across various categories. Find exactly what you need from trusted sellers.</p>
              </div>
              <a href="#" className="view-all" onClick={(e) => { e.preventDefault(); showToast("Categories", "Showing all categories!"); }}>
                View All Categories
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
            <div className="categories-grid" id="categories-grid">
              {CATEGORIES.map(cat => (
                <div key={cat.id} className="cat-card" onClick={() => showToast(cat.name, `Browsing category ${cat.name} coming soon!`)}>
                  <div className="cat-icon">{cat.icon}</div>
                  <div className="cat-name">{cat.name}</div>
                  <div className="cat-count">{cat.itemCount}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="products-section" id="products-section" ref={productsSectionRef}>
          <div className="section-inner">
            <div className="section-header">
              <h2>Featured Products</h2>
              <p>Handpicked premium items from our top-rated sellers. Quality guaranteed.</p>
            </div>
            <div className="filter-tabs" id="filter-tabs">
              {["All", "Electronics", "Fashion", "Beauty", "Accessories", "Gaming"].map(cat => (
                <button
                  key={cat}
                  className={`filter-tab ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="products-grid" id="products-grid">
              {liveProducts.filter(prod => activeCategory === "All" || prod.category === activeCategory).map(prod => (
                <div key={prod.id} className="product-card">
                  <div className="product-img-wrap">
                    <img className="product-img" src={prod.imageUrl} alt={prod.title} />
                    {prod.isNew && <span className="product-badge badge-new">New</span>}
                    {prod.originalPrice && <span className="product-badge badge-sale">Sale</span>}
                    <button 
                      className={`wishlist-btn ${wishlist.includes(prod.id) ? "active" : ""}`} 
                      onClick={() => toggleWishlist(prod.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                  </div>
                  <div className="product-body">
                    <div className="product-meta">
                      <span className="product-cat">{prod.category}</span>
                      <span className="product-rating">
                        <svg xmlns="http://www.w3.org/2000/svg" className="star" width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        {prod.rating} ({prod.reviews})
                      </span>
                    </div>
                    <div className="product-title">{prod.title}</div>
                    <div className="product-seller" onClick={() => showToast("Seller Profile", `Visiting ${prod.sellerName}'s store!`)}>by {prod.sellerName}</div>
                    <div className="product-footer">
                      <div>
                        <span className="product-price">${prod.price.toFixed(2)}</span>
                        {prod.originalPrice && <span className="product-price-orig">${prod.originalPrice.toFixed(2)}</span>}
                      </div>
                      <button className="add-cart-btn" onClick={() => addToCart(prod.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="view-all-wrap">
              <button className="btn btn-outline btn-lg" onClick={() => showToast("Products", "Loading all products...")}>
                View All Products
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="why-section">
          <div className="section-inner">
            <div className="section-header">
              <h2>Why Choose Etimad?</h2>
              <p>We've built a marketplace focused on trust, security, and convenience so you can shop with complete peace of mind.</p>
            </div>
            <div className="features-grid" id="features-grid">
              {FEATURES.map((feat, i) => (
                <div key={i} className="feature-card">
                  <div className="feature-icon">{feat.icon}</div>
                  <h3 className="feature-title">{feat.title}</h3>
                  <p className="feature-desc">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-section">
          <div className="section-inner">
            <div className="section-header">
              <h2>How It Works</h2>
              <p>Your journey from browsing to unboxing, simplified into four easy steps.</p>
            </div>
            <div className="steps-wrap">
              <div className="steps-line"><div className="steps-progress"></div></div>
              <div className="steps-grid" id="steps-grid">
                {STEPS.map((step, i) => (
                  <div key={i} className="step-item">
                    <div className="step-circle">
                      {step.icon}
                      <span className="step-num">{i + 1}</span>
                    </div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testi-section">
          <div className="section-inner">
            <div className="section-header">
              <h2>What Our Community Says</h2>
              <p>Don't just take our word for it. Hear from buyers and sellers who use Etimad every day.</p>
            </div>
            <div className="testi-slider">
              <div className="testi-track">
                <div className="testi-cards" id="testi-cards" style={{ transform: `translateX(-${testiIndex * 100}%)`, display: "flex", transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}>
                  {TESTIMONIALS.map((testi, i) => (
                    <div key={i} className="testi-card" style={{ flex: "0 0 100%" }}>
                      <div className="testi-stars">
                        {Array.from({ length: testi.rating }).map((_, starIdx) => (
                          <svg key={starIdx} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        ))}
                      </div>
                      <p className="testi-text">"{testi.text}"</p>
                      <div className="testi-author">
                        <img className="testi-avatar" src={testi.avatar} alt={testi.name} />
                        <div>
                          <h4 className="testi-name">{testi.name}</h4>
                          <span className="testi-role">{testi.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="testi-controls">
                <button className="testi-btn" onClick={testiPrev}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button className="testi-btn" onClick={testiNext}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section">
          <div className="section-inner">
            <div className="section-header">
              <h2>Frequently Asked Questions</h2>
              <p>Got questions? We've got answers. If you need further assistance, our support team is available 24/7.</p>
            </div>
            <div className="faq-list" id="faq-list">
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className={`faq-item ${isOpen ? "open" : ""}`} id={`faq-item-${i}`}>
                    <button className="faq-q" onClick={() => toggleFAQ(i)}>
                      <span>{faq.q}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                    <div className="faq-a" style={{ maxHeight: isOpen ? "200px" : "0px", transition: "max-height 0.35s ease, padding 0.35s ease" }}>
                      <div className="faq-a-inner">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="newsletter-section">
          <div className="newsletter-inner">
            <div className="newsletter-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <h2>Get Exclusive Deals & Offers</h2>
            <p>Subscribe to our newsletter and be the first to know about massive discounts, new seller launches, and special events.</p>
            <div className="newsletter-form">
              <input 
                className="newsletter-input" 
                type="email" 
                id="newsletter-email" 
                placeholder="Enter your email address" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNewsletter()}
              />
              <button className="newsletter-submit" onClick={handleNewsletter}>
                Subscribe
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
            <p className="newsletter-privacy">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="logo">Etimad</span>
              <p>The premier marketplace connecting millions of buyers with verified sellers. Quality, trust, and exceptional service in every transaction.</p>
              <div className="footer-contact">
                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> support@etimad.com</span>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.59 1.25h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8a16 16 0 0 0 6 6l.83-.83a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> +1 (800) 123-4567</span>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Dubai, United Arab Emirates</span>
              </div>
              <div className="socials">
                <button className="social-btn" title="Facebook">f</button>
                <button className="social-btn" title="Instagram">in</button>
                <button className="social-btn" title="X">𝕏</button>
                <button className="social-btn" title="TikTok">♪</button>
                <button className="social-btn" title="YouTube">▶</button>
              </div>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); productsSectionRef.current?.scrollIntoView({ behavior: "smooth" }); }}>All Products</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); categoriesSectionRef.current?.scrollIntoView({ behavior: "smooth" }); }}>Categories</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast("Sellers", "Become a seller page coming soon!"); }}>Become a Seller</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast("Register", "Create account page coming soon!"); }}>Create Account</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast("Login", "Login page coming soon!"); }}>Sign In</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Categories</h4>
              <ul className="footer-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory("Electronics"); productsSectionRef.current?.scrollIntoView({ behavior: "smooth" }); }}>Electronics</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory("Fashion"); productsSectionRef.current?.scrollIntoView({ behavior: "smooth" }); }}>Fashion</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory("Home & Living"); showToast("Categories", "Home & Living category coming soon!"); }}>Home & Living</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory("Beauty"); productsSectionRef.current?.scrollIntoView({ behavior: "smooth" }); }}>Beauty</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory("Gaming"); productsSectionRef.current?.scrollIntoView({ behavior: "smooth" }); }}>Gaming</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Customer Support</h4>
              <ul className="footer-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); productsSectionRef.current?.scrollIntoView({ behavior: "smooth" }); }}>Browse Products</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast("Support", "Order tracking coming soon!"); }}>Track Order</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast("Support", "Returns & refunds coming soon!"); }}>Returns & Refunds</a></li>
                <li><a href="mailto:support@etimad.com">Contact Us</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); showToast("Support", "Disputes panel coming soon!"); }}>Disputes</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Etimad Marketplace. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#" onClick={(e) => { e.preventDefault(); showToast("Legal", "Privacy policy coming soon!"); }}>Privacy Policy</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast("Legal", "Terms of service coming soon!"); }}>Terms of Service</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast("Legal", "Cookie policy coming soon!"); }}>Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* TOAST CONTAINER */}
      <div className="toast-container" id="toast-container">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className="toast" 
            style={toast.exiting ? { animation: "slideOut 0.3s ease forwards" } : undefined}
          >
            <strong>{toast.title}</strong>
            {toast.msg}
          </div>
        ))}
      </div>

      {/* CART DRAWER */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}