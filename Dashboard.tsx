import React, { useState } from "react";
import { useProducts } from "./ProductContext";
import { Product, ProductCategory } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  MapPin, 
  Check, 
  X, 
  Clock, 
  Info, 
  Store,
  Sparkles
} from "lucide-react";

// Safe image renderer with beautiful placeholder fallback for offline or 0-byte images
const SafeProductImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`${className} bg-linear-to-tr from-slate-100 to-slate-50 flex flex-col items-center justify-center p-4 text-center select-none`}>
        <div className="p-2.5 bg-pink-50 rounded-2xl text-pink-500 mb-1.5 shadow-xs">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <p className="text-[10px] font-extrabold text-slate-650 uppercase tracking-wide px-1.5 line-clamp-1 w-full">
          {alt}
        </p>
        <span className="text-[9px] text-slate-400 font-mono mt-0.5 uppercase tracking-wider">Ingredient Preview</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      className={className}
      alt={alt}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
    />
  );
};

export default function Storefront() {
  const {
    products,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    showToast
  } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // CDO branches of Monster Kitchen
  const branches = [
    { name: "Main Brand HQ (Florentino Street, CDO)", time: "8:00 AM - 6:00 PM" },
    { name: "Coconuts Drive Branch (Carmen, CDO)", time: "8:30 AM - 5:30 PM" },
    { name: "Gusa Highway Hub (Gusa, CDO)", time: "9:00 AM - 7:00 PM" }
  ];

  // Filter products based on search term & category filter
  const filteredProducts = products.filter((prod) => {
    const matchesSearch = 
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || prod.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });



  return (
    <div className="min-h-screen bg-slate-50/70 pb-20 text-slate-800" id="storefront-root">
      {/* CDO Banner Area */}
      <div className="bg-fuchsia-950 text-sky-100 text-xs py-2 px-4 flex flex-wrap items-center justify-between gap-2 border-b border-fuchsia-900" id="announcement-banner">
        <div className="flex items-center gap-1.5 font-medium">
          <MapPin className="w-3.5 h-3.5 text-sky-400" />
          <span>Proudly serving Cagayan de Oro City | Same-day Pickup Available</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-sky-300">
          <span className="hidden sm:inline">📞 (088) 856-4500</span>
          <span>⏰ Mon - Sat: 8:00 AM - 6:00 PM</span>
        </div>
      </div>

      {/* Hero Header Jumbotron */}
      <section className="relative overflow-hidden bg-gradient-to-br from-fuchsia-950 via-pink-900 to-slate-900 py-16 px-6 text-white text-center sm:text-left" id="hero-section">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d946ef_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-300 border border-pink-400/20 mb-4 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" /> Est. 2003 • Premium Baking Source
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Create Sweet Masterpieces at <span className="text-pink-400 font-sans">Monster</span> <span className="text-sky-300 font-sans">Kitchen</span>
            </h1>
            <p className="text-pink-100 text-base sm:text-lg mb-6 leading-relaxed max-w-xl">
              Cagayan de Oro's leading supplier of premium imported chocolates, culinary flours, packaging layouts, and world-class baking tools.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-pink-300">
              <span className="bg-pink-900/40 py-1.5 px-3 rounded-md border border-pink-850/40 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-pink-400" /> 3 CDO Branches
              </span>
              <span className="bg-pink-900/40 py-1.5 px-3 rounded-md border border-pink-850/40 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-teal-400" /> Fresh Stock Daily
              </span>
            </div>
          </div>
          <div className="hidden md:block bg-pink-950/40 p-5 rounded-2xl border border-pink-800/40 max-w-sm">
            <h3 className="text-pink-300 font-semibold mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-300" /> CDO Store Pickups
            </h3>
            <p className="text-slate-300 text-xs mb-4">
              Place your order online and conveniently pick it up in 1 hour at our storefront!
            </p>
            <div className="space-y-2 border-t border-pink-900/50 pt-3">
              {branches.slice(0, 2).map((b, i) => (
                <div key={i} className="flex justify-between text-[11px] text-slate-300">
                  <span className="font-medium text-white">{b.name}</span>
                  <span className="text-sky-300">{b.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10" id="catalog-section">
        
        {/* Search, Filter, and Action Bar */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8" id="search-bar-container">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search dark chocolate, butter, baking weights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 focus:border-pink-400 focus:bg-white focus:ring-1 focus:ring-pink-300 rounded-xl text-sm transition-all outline-hidden text-slate-800 placeholder-slate-400 font-sans"
              id="product-search-input"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 lg:pb-0" id="category-filter-container">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline">Filters:</span>
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                selectedCategory === "All"
                  ? "bg-pink-600 hover:bg-pink-700 text-white shadow-sm"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              All Products
            </button>
            {Object.values(ProductCategory).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-pink-600 hover:bg-pink-700 text-white shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Counter Info Banner */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 bg-slate-100/50 py-2 px-4 rounded-xl border border-slate-200/50" id="results-descriptor">
          <div>
            Showing <span className="font-semibold text-slate-800">{filteredProducts.length}</span> of {products.length} products
            {selectedCategory !== "All" && <span> under <span className="text-pink-700 font-semibold">"{selectedCategory}"</span></span>}
            {searchTerm && <span> matching <span className="text-pink-700 font-semibold">"{searchTerm}"</span></span>}
          </div>
          <div className="text-[11px] text-slate-500 font-mono hidden sm:block">
            All prices listed in Philippine Peso (PHP ₱)
          </div>
        </div>

        {/* Empty Catalog State */}
        {filteredProducts.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl py-16 px-6 text-center max-w-lg mx-auto shadow-xs" id="empty-catalog-state">
            <div className="inline-flex p-4 rounded-full bg-slate-50 text-slate-400 mb-4 border border-slate-100">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">No baking items found</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
              We couldn't find any products matching your current category or search query. Try clearing filters or searching for another term.
            </p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => { setSelectedCategory("All"); setSearchTerm(""); }}
                className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="products-catalog-grid">
          {filteredProducts.map((p) => {
            return (
              <motion.div
                layout
                id={`product-card-${p.id}`}
                key={p.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col h-full group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {/* Image Placeholder with Overlay Badges */}
                <div 
                  className="relative h-48 bg-slate-100 flex items-center justify-center border-b border-slate-100 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedProduct(p)}
                >
                  <SafeProductImage 
                    src={p.imageUrl} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Visual Category overlay label & Brand */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    <span className="bg-pink-950/80 backdrop-blur-xs text-[10px] uppercase tracking-wider font-bold text-pink-300 py-1 px-2.5 rounded-md">
                      {p.category}
                    </span>
                    <span className="bg-slate-900/40 backdrop-blur-xs text-[9px] font-semibold text-white py-0.5 px-2 rounded-md">
                      {p.brand}
                    </span>
                  </div>

                  {/* Stock Availability Badge */}
                  <div className="absolute bottom-3 right-3">
                    {p.isAvailable ? (
                      <span className="inline-flex items-center gap-1 bg-sky-400 text-slate-950 text-[10px] font-bold py-1 px-2.5 rounded-full shadow-md backdrop-blur-xs">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-rose-500/90 text-white text-[10px] font-bold py-1 px-2.5 rounded-full shadow-md backdrop-blur-xs">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Weight / Pack size indicator */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-semibold tracking-wide py-1 px-2.5 rounded-md shadow-xs">
                    {p.weightOrSize}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Brand & Code */}
                  <div className="text-[10px] text-slate-400 font-mono mb-1.5 uppercase tracking-wider flex items-center justify-between">
                    <span>M-KITCHEN SELECTION</span>
                    <span>#{p.id.split("-")[1] || p.id}</span>
                  </div>

                  {/* Product Name */}
                  <h3 
                    className="text-slate-800 font-bold text-sm tracking-tight mb-2 line-clamp-2 hover:text-pink-700 cursor-pointer min-h-[40px]"
                    onClick={() => setSelectedProduct(p)}
                  >
                    {p.name}
                  </h3>

                  {/* Description snippet */}
                  <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed flex-1">
                    {p.description}
                  </p>

                  <div className="border-t border-slate-100 pt-3 mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-sans">Retail Price</span>
                      <span className="text-xl font-black text-slate-900">
                        ₱{p.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* Verify Supply Button */}
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="text-xs font-bold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 py-1.5 px-3.5 rounded-xl transition-colors cursor-pointer"
                    >
                      Verify Supply
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>



      {/* PRODUCT DETAIL MODAL DIALOG */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs" id="detail-modal-bg">
            <motion.div 
              className="bg-white rounded-3xl overflow-hidden w-full max-w-2xl shadow-2xl border border-slate-200 flex flex-col md:flex-row relative max-h-[90vh]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              id="detail-modal-container"
            >
              {/* Close Button Pin */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-slate-700 p-2 rounded-full shadow-md border border-slate-200 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Product Card Graphic */}
              <div className="md:w-1/2 bg-slate-100 flex items-center justify-center relative min-h-[220px]">
                <SafeProductImage 
                  src={selectedProduct.imageUrl} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
                
                <span className="absolute top-4 left-4 bg-pink-950 text-white font-mono text-[10px] px-2.5 py-1 rounded-md">
                  {selectedProduct.category}
                </span>

                <div className="absolute bottom-4 left-4 space-y-1">
                  <span className="inline-block bg-white/95 backdrop-blur-xs text-slate-900 text-[10px] font-bold px-3 py-1 rounded-md shadow-xs">
                    Weight: {selectedProduct.weightOrSize}
                  </span>
                  <div className="text-[11px] font-bold text-white px-3 py-1 bg-black/45 rounded-md -mt-1 backdrop-blur-xs">
                    Brand: {selectedProduct.brand}
                  </div>
                </div>
              </div>

              {/* Product Card Text Detail */}
              <div className="p-6 md:w-1/2 flex flex-col justify-between overflow-y-auto">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-400">PRODUCT ID: {selectedProduct.id}</span>
                    {selectedProduct.isAvailable ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                        <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                        Available
                      </span>
                    ) : (
                      <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                        Out Of Stock
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-extrabold text-slate-900 mb-2 leading-tight">
                    {selectedProduct.name}
                  </h2>
                  
                  <p className="text-slate-500 text-xs leading-relaxed mb-4">
                    {selectedProduct.description}
                  </p>

                  <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Local Pickup CDO:</span>
                      <span className="font-semibold text-slate-800">1 Hour Average</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Sourcing Grade:</span>
                      <span className="font-semibold text-pink-700">Premium Professional</span>
                    </div>
                  </div>
                </div>

                {/* Foot Technical/Supply Information */}
                <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-slate-500 text-xs">Retail Price:</span>
                    <span className="text-2xl font-black text-slate-900">
                      ₱{selectedProduct.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/50 text-[11px] text-slate-500 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-slate-700 font-semibold mb-0.5">
                      <Info className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                      <span>How to Purchase</span>
                    </div>
                    <span>• Visit or contact any Monster CDO branch to secure this product.</span>
                    <span>• Availability status synchronized in real-time with physical branch inventory registries.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
