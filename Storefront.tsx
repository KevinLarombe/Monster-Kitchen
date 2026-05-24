import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductCategory, CartItem } from "./types";

interface ProductContextType {
  products: Product[];
  cart: CartItem[];
  currentView: "storefront" | "admin";
  searchTerm: string;
  selectedCategory: string | "All";
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setCurrentView: (view: "storefront" | "admin") => void;
  
  // Product management actions
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleAvailability: (id: string) => void;
  resetToDefaults: () => void;

  // Cart actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Toast System
  toast: { message: string; type: "success" | "info" | "error" } | null;
  showToast: (message: string, type?: "success" | "info" | "error") => void;
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Premium Dark Chocolate Chips (60% Cacao)",
    description: "High-quality, easy-to-melt dark chocolate drops. Crafted specifically for cookies, brownies, and fine glaze toppings. Perfect for premium bakers.",
    price: 380,
    category: ProductCategory.INGREDIENTS,
    isAvailable: true,
    imageUrl: "/src/assets/images/large_361a4276-6cdb-4e19-9fd6-3fb303a62bef.jpg",
    weightOrSize: "283g",
    brand: "Ghirardelli",
    isFeatured: true
  },
  {
    id: "prod-2",
    name: "Anchor Unsalted Sweet Cream Butter",
    description: "Pure, high-fat grass-fed butter imported from New Zealand. Enhances the flavor, aroma, and tenderness of cakes, croissants, and shortbread cookies.",
    price: 195,
    category: ProductCategory.DAIRY,
    isAvailable: true,
    imageUrl: "src/assets/images/anchor-philippines-products-anchor-buttery-unsalted-header.png",
    weightOrSize: "200g",
    brand: "Anchor",
    isFeatured: true
  },
  {
    id: "prod-3",
    name: "Japanese Bread Flour (Super King)",
    description: "Ultra-fine, high-protein bread flour that gives your milk breads, panettones, and brioches an extremely soft, fluffy crumb with supreme rise potential.",
    price: 145,
    category: ProductCategory.INGREDIENTS,
    isAvailable: false,
    imageUrl: "/src/assets/images/100589_1.jpg",
    weightOrSize: "1kg",
    brand: "Monster Select",
    isFeatured: false
  },
  {
    id: "prod-4",
    name: "Non-Stick Silicone Macaron Baking Mat",
    description: "Heat-resistant silicone baking mat with pre-marked concentric circles for precise piping of cookies and macarons. Oven safe up to 240°C.",
    price: 299,
    category: ProductCategory.TOOLS,
    isAvailable: true,
    imageUrl: "src/assets/images/sg-11134201-81zws-mn5bc6fcvk7814@resize_w900_nl.jpg",
    weightOrSize: "40 x 30cm",
    brand: "Monster Kitchen Essentials",
    isFeatured: false
  },
  {
    id: "prod-5",
    name: "Professional Rotating Aluminum Cake Stand",
    description: "Premium heavy-duty cast aluminum turntable with non-slip base silicone layer. Ensures exceptionally smooth 360-degree rotation for pristine frosting finishes.",
    price: 1425,
    category: ProductCategory.TOOLS,
    isAvailable: true,
    imageUrl: "src/assets/images/f7ea2dcde6ce5255bac8a2b6708d416d.jpg",
    weightOrSize: "12-inch Diameter",
    brand: "Monster Kitchen Essentials",
    isFeatured: true
  },
  {
    id: "prod-6",
    name: "Kraft Cupcake Box with Large View Window",
    description: "Eco-friendly, food-grade kraft paper box with cardboard inserts to firmly secure six cupcakes. Perfectly displays and carries your artisan confectionery.",
    price: 70,
    category: ProductCategory.PACKAGING,
    isAvailable: true,
    imageUrl: "src/assets/images/shopping.jpg",
    weightOrSize: "Pack of 10",
    brand: "EcoPack",
    isFeatured: false
  },
  {
    id: "prod-7",
    name: "French Premium Whipping Cream (35.1% Fat)",
    description: "Premium professional whipping cream from Normandy. Possesses superior whipping speed and incredible stability for piping details, filling mousses, and ganaches.",
    price: 265,
    category: ProductCategory.DAIRY,
    isAvailable: true,
    imageUrl: "src/assets/images/6944108e7e9c5_design-sans-titre-2.png",
    weightOrSize: "1 Liter",
    brand: "Elle & Vire",
    isFeatured: true
  },
  {
    id: "prod-8",
    name: "Scalloped Edge Gold Foil Cake Board Set",
    description: "Thick, grease-resistant, double-sided gold-laminated cardboard bases to support tiered birthday cake creations with modern elegance and grace.",
    price: 90,
    category: ProductCategory.PACKAGING,
    isAvailable: true,
    imageUrl: "src/assets/images/12-Pack-Gold-Foil-Round-Cake-Boards-10-Inch-Scalloped-Cardboard-Dessert-Base_c268d157-ca50-4ac4-a0b0-a4686a221a35.6727da968b74f1a0aad9c087d1ed942b.jpg",
    weightOrSize: "Pack of 5 (10\")",
    brand: "CandyWrap",
    isFeatured: false
  },
  {
    id: "prod-9",
    name: "Madagascar Pure Bourbon Vanilla Extract",
    description: "Deeply rich, highly aromatic vanilla extract aged in organic alcohol. Gives an exceptionally sweet, velvety background note to professional cookies and creams.",
    price: 1045,
    category: ProductCategory.INGREDIENTS,
    isAvailable: true,
    imageUrl: "src/assets/images/713nLlfF8aL._SY679_.jpg",
    weightOrSize: "59ml",
    brand: "Nielsen-Massey",
    isFeatured: false
  },
  {
    id: "prod-10",
    name: "High-Precision Pocket Baking Scale",
    description: "Digital scale with accuracy of 0.1g up to 3kg. Perfect for precise weighing of yeast, salt, spices, and small portions of gelatin powder.",
    price: 375,
    category: ProductCategory.TOOLS,
    isAvailable: false,
    imageUrl: "src/assets/images/ph-11134207-7ra0n-mde2t3omy99qd6@resize_w900_nl.jpg",
    weightOrSize: "Max 3kg / d=0.1g",
    brand: "DigiScale",
    isFeatured: false
  }
];

const normalizeImageUrl = (url?: string): string => {
  if (!url) return "/api/placeholder/400/300";
  
  let trimmed = url.trim();
  
  // Convert Windows backslashes to forward slashes
  trimmed = trimmed.replace(/\\/g, "/");
  
  // If user entered just a filename with no folder paths, e.g. "100589_1.jpg"
  if (!trimmed.includes("/") && !trimmed.startsWith("http") && !trimmed.startsWith("data:")) {
    return `/src/assets/images/${trimmed}`;
  }

  // Handle common relative/absolute asset paths so they render correctly in the browser
  if (trimmed.startsWith("src/assets/")) {
    return "/" + trimmed;
  }
  if (trimmed.startsWith("assets/")) {
    return "/src/" + trimmed;
  }
  if (trimmed.startsWith("/assets/")) {
    return "/src" + trimmed;
  }
  
  return trimmed;
};

const LOCAL_STORAGE_KEY = "monster_kitchen_products";
const CART_STORAGE_KEY = "monster_kitchen_cart";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<"storefront" | "admin">("storefront");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | "All">("All");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  // Load products & cart from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts) as Product[];
        const autoCorrected = parsed.map((prod) => {
          return { ...prod, imageUrl: normalizeImageUrl(prod.imageUrl) };
        });
        setProducts(autoCorrected);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(autoCorrected));
      } catch (e) {
        console.error("Failed to parse local stored products, reverting to defaults", e);
        setProducts(DEFAULT_PRODUCTS);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      }
    } else {
      setProducts(DEFAULT_PRODUCTS);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    }

    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse local cart data", e);
        setCart([]);
      }
    }
  }, []);

  // Sync state to localStorage when changes occur
  const saveProductsToStorage = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProducts));
  };

  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
  };

  // Toast System
  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
    setToast({ message, type });
  };

  // clear toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Actions
  const addProduct = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      imageUrl: normalizeImageUrl(productData.imageUrl),
      id: "prod-" + Date.now().toString(),
    };
    const updated = [newProduct, ...products];
    saveProductsToStorage(updated);
    showToast(`Successfully added "${newProduct.name}"!`, "success");
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    const updated = products.map((prod) => {
      if (prod.id === id) {
        const merged = { ...prod, ...updatedProduct };
        if (updatedProduct.imageUrl !== undefined) {
          merged.imageUrl = normalizeImageUrl(updatedProduct.imageUrl);
        }
        return merged;
      }
      return prod;
    });
    saveProductsToStorage(updated);
    
    // Also sync with current cart items if pricing/name/availability changed
    const item = products.find(p => p.id === id);
    if (item && updatedProduct.isAvailable === false) {
      // Remove from cart if it becomes out of stock
      const updatedCart = cart.filter(ci => ci.product.id !== id);
      if (updatedCart.length !== cart.length) {
        saveCartToStorage(updatedCart);
      }
    } else if (item) {
      // Update cart product structure
      const updatedCart = cart.map(ci => {
        if (ci.product.id === id) {
          return { ...ci, product: { ...ci.product, ...updatedProduct } };
        }
        return ci;
      });
      saveCartToStorage(updatedCart);
    }

    showToast(`Product "${updatedProduct.name || 'details'}" successfully updated!`, "success");
  };

  const deleteProduct = (id: string) => {
    const prodToDelete = products.find((p) => p.id === id);
    const updated = products.filter((p) => p.id !== id);
    saveProductsToStorage(updated);

    // Remove from cart as well
    const updatedCart = cart.filter(ci => ci.product.id !== id);
    saveCartToStorage(updatedCart);

    showToast(`Deleted "${prodToDelete?.name || 'Product'}"`, "info");
  };

  const toggleAvailability = (id: string) => {
    const updated = products.map((prod) => {
      if (prod.id === id) {
        const newStatus = !prod.isAvailable;
        showToast(
          `"${prod.name}" marked as ${newStatus ? "Available" : "Out of Stock"}`,
          newStatus ? "success" : "info"
        );
        return { ...prod, isAvailable: newStatus };
      }
      return prod;
    });
    saveProductsToStorage(updated);

    // If marked unavailable, clean out of cart
    const prod = products.find(p => p.id === id);
    if (prod && prod.isAvailable) { // it WAS available, now turned off
      const updatedCart = cart.filter(ci => ci.product.id !== id);
      if (updatedCart.length !== cart.length) {
        saveCartToStorage(updatedCart);
      }
    }
  };

  const resetToDefaults = () => {
    saveProductsToStorage(DEFAULT_PRODUCTS);
    saveCartToStorage([]);
    showToast("Reverted catalog & inventory to original shop defaults", "info");
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    if (!product.isAvailable) {
      showToast(`Cannot add "${product.name}" - Currently out of stock!`, "error");
      return;
    }

    const existingCartIndex = cart.findIndex((item) => item.product.id === product.id);
    let newCart = [...cart];

    if (existingCartIndex > -1) {
      newCart[existingCartIndex].quantity += quantity;
    } else {
      newCart.push({ product, quantity });
    }

    saveCartToStorage(newCart);
    showToast(`Added ${quantity} x "${product.name}" to cart!`, "success");
  };

  const removeFromCart = (productId: string) => {
    const originalItem = cart.find(ci => ci.product.id === productId);
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCartToStorage(newCart);
    if (originalItem) {
      showToast(`Removed "${originalItem.product.name}" from cart`, "info");
    }
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newCart = cart.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCartToStorage(newCart);
  };

  const clearCart = () => {
    saveCartToStorage([]);
    showToast("Cleared cart items", "info");
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        currentView,
        searchTerm,
        selectedCategory,
        setSearchTerm,
        setSelectedCategory,
        setCurrentView,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleAvailability,
        resetToDefaults,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toast,
        showToast,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
