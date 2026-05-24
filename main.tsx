import React from "react";
import { ProductProvider, useProducts } from "./ProductContext";
import Storefront from "./Storefront";
import Dashboard from "./Dashboard";
import { motion, AnimatePresence } from "motion/react";
import { 
  Store, 
  Settings, 
  ShoppingBag, 
  FlameKindling,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Info,
  PhoneCall,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Coffee
} from "lucide-react";

function AppInner() {
  const { currentView, setCurrentView, products, toast } = useProducts();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans antialiased text-slate-800 selection:bg-pink-100">
      
      {/* GLOBAL TOAST POPUP NOTIFICATION */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full font-sans"
            id="global-toast-notification"
          >
            <div className={`mx-4 p-4 rounded-2xl shadow-xl flex items-start gap-3 border ${
              toast.type === "success" 
                ? "bg-emerald-50 border-emerald-200 text-emerald-900" 
                : toast.type === "error"
                ? "bg-rose-50 border-rose-200 text-rose-900"
                : "bg-blue-50 border-blue-200 text-blue-900"
            }`}>
              {toast.type === "success" && <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
              {toast.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
              {toast.type === "info" && <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />}
              
              <div className="flex-1">
                <p className="text-xs font-semibold leading-relaxed font-sans">{toast.message}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">Auto-saved to local memory</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MASTER RESPONSIVE HEADER NAV BAR */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs" id="master-nav-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Logo Brand Section */}
            <div 
              className="flex items-center gap-3 cursor-pointer select-none group"
              onClick={() => setCurrentView("storefront")}
              id="brand-logo"
            >
              <div className="h-12 w-12 rounded-2xl overflow-hidden bg-white border border-slate-200/80 flex items-center justify-center p-0.5 shadow-xs group-hover:scale-105 transition-transform duration-300 shrink-0">
                <img 
                  src="/src/assets/images/672214969_1395561929277756_3559394562313236996_n.jpg" 
                  alt="Monster Kitchen Logo" 
                  className="w-full h-full object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-sans font-black text-xl tracking-tight text-slate-900">
                    <span className="text-pink-600">Monster</span> <span className="text-sky-500">Kitchen</span>
                  </span>
                  <span className="bg-pink-50 text-pink-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-mono hidden sm:inline">
                    CDO
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block -mt-0.5 tracking-wide uppercase font-sans font-bold">
                  Baking & Food Supplies
                </span>
              </div>
            </div>

            {/* View Switcher Controls (Storefront Selector & Dashboard Settings Selector) */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl relative" id="header-view-links">
              
              {/* Customer View tab */}
              <button
                onClick={() => setCurrentView("storefront")}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  currentView === "storefront"
                    ? "bg-white text-pink-650 shadow-sm border border-slate-100/50"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                id="view-storefront-tab"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Customer View</span>
              </button>

              {/* Admin View tab */}
              <button
                onClick={() => setCurrentView("admin")}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  currentView === "admin"
                    ? "bg-white text-pink-650 shadow-sm border border-slate-100/50"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                id="view-admin-tab"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Admin View</span>
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* RENDER CURRENT ACTIVE VIEW VIEWPORT */}
      <div className="flex-1" id="main-viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {currentView === "storefront" ? <Storefront /> : <Dashboard />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FOOTER AND LOCAL CDO STORE BRAND META INFO */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 font-sans" id="store-footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Vision details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl overflow-hidden bg-white border border-slate-700 flex items-center justify-center p-0.5 shadow-xs shrink-0">
                <img 
                  src="/src/assets/images/672214969_1395561929277756_3559394562313236996_n.jpg" 
                  alt="Monster Kitchen Logo" 
                  className="w-full h-full object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-sans font-extrabold text-lg text-white">
                <span className="text-pink-500">Monster</span> <span className="text-sky-400">Kitchen</span> CDO
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We provide professional-grade flour, chocolate callets, compound blocks, decorative boxes, cake turntable equipment, and high-quality baking ingredients for bakers across Northern Mindanao.
            </p>
            <div className="space-y-1 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Synchronized Store State (VFS/RAM)</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-pink-400" />
                <span>Secured Local Storage Sync</span>
              </div>
            </div>
          </div>

          {/* Localized Branches Grid */}
          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">Cagayan de Oro Branch Outlets</h4>
            <div className="space-y-3.5 text-xs text-slate-300">
              
              {/* Branch 1 */}
              <div className="flex gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Main Flagship Store (Downtown CDO)</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Florentino Street, near Limketkai Center, CDO</div>
                  <div className="text-[10px] text-pink-300 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5" /> 8:00 AM - 6:00 PM • (088) 856-4500
                  </div>
                </div>
              </div>

              {/* Branch 2 */}
              <div className="flex gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Carmen Branch</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Coconuts Drive, CDO (Behind Carmen Market Plaza)</div>
                  <div className="text-[10px] text-pink-300 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5" /> 8:30 AM - 5:30 PM • (088) 858-3022
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Customer support center details */}
          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">Help & Connections</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have questions regarding specific baking specifications, recipe quantities, wholesale accounts, or commercial orders? Get in touch with our CDO sales consultants.
            </p>
            
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2 bg-slate-800 hover:bg-pink-600 hover:text-white rounded-lg transition-colors cursor-pointer text-slate-400">
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-pink-600 hover:text-white rounded-lg transition-colors cursor-pointer text-slate-400">
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <div className="flex items-center gap-2 pl-2 border-l border-slate-700 text-xs font-mono text-slate-300">
                <PhoneCall className="w-4 h-4 text-emerald-500" />
                <span>CDO Helpline: (088) 856-4500</span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 flex items-center gap-1">
              <Coffee className="w-3.5 h-3.5" />
              <span>Created for Monster Kitchen, Cagayan de Oro City.</span>
            </div>
          </div>

        </div>

        {/* Brand Copyright */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© 2026 Monster Kitchen Cagayan de Oro. All rights reserved. Your premier baking and confection supplies shop.</p>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <AppInner />
    </ProductProvider>
  );
}
