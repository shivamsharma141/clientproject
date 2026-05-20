"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const CartContext = createContext(null);

// ── Discount Helpers ───────────────────────────────────────────
const isExcludedFromDiscount = (label) =>
  label.startsWith('250') || label.startsWith('500');

const getDiscountedPrice = (label, price, category) => {
  if (category !== 'ghee') return null;
  if (isExcludedFromDiscount(label)) return null;
  return Math.round(price * 0.85);
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // ✅ Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("gaav_cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Cart load error:", error);
    }
    setHydrated(true);
  }, []);

  // ✅ Save cart to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("gaav_cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Cart save error:", error);
    }
  }, [cartItems, hydrated]);

  // ✅ Add to Cart
  const addToCart = useCallback((product, variantIndex) => {
    const variant = product.variants[variantIndex];

    // ✅ Unique item ID (product + variant)
    const itemId = `${product.id}-${variantIndex}`;

    // ✅ Discounted price agar applicable ho, warna original
    const finalPrice =
      getDiscountedPrice(variant.label, variant.price, product.category) ??
      variant.price;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.itemId === itemId);

      if (existingItem) {
        // ✅ Increase quantity if already exists
        return prev.map((item) =>
          item.itemId === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // ✅ Add new item with discounted price
      return [
        ...prev,
        {
          itemId,
          productId: product.id,
          name: product.name,
          categoryLabel: product.categoryLabel,
          icon: product.icon || null,
          image: product.image || null,
          variantLabel: variant.label,
          price: finalPrice,        // ✅ Discounted price store hogi
          originalPrice: variant.price, // ✅ Original price bhi save (optional, useful for display)
          quantity: 1,
        },
      ];
    });
  }, []);

  // ✅ Remove item
  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.itemId !== itemId)
    );
  }, []);

  // ✅ Update quantity
  const updateQuantity = useCallback((itemId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.itemId === itemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  // ✅ Total Count
  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // ✅ Total Price (discounted price pe calculate hoga)
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}