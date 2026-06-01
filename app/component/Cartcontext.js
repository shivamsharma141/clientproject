"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const CartContext = createContext(null);

const PROMO_CODES = {
  GAAV15: 15,
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("gaav_cart");
      if (savedCart) setCartItems(JSON.parse(savedCart));
    } catch (error) {
      console.error("Cart load error:", error);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("gaav_cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Cart save error:", error);
    }
  }, [cartItems, hydrated]);

  const addToCart = useCallback((product, variantIndex) => {
    const variant = product.variants[variantIndex];
    const itemId = `${product.id}-${variantIndex}`;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.itemId === itemId);
      if (existingItem) {
        return prev.map((item) =>
          item.itemId === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
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
          price: variant.price,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) => prev.filter((item) => item.itemId !== itemId));
  }, []);

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

  const applyPromoCode = useCallback((code) => {
    const upper = code.trim().toUpperCase();
    if (PROMO_CODES[upper] !== undefined) {
      setPromoCode(upper);
      setPromoDiscount(PROMO_CODES[upper]);
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try GAAV15.");
      setPromoApplied(false);
      setPromoDiscount(0);
    }
  }, []);

  const removePromoCode = useCallback(() => {
    setPromoCode("");
    setPromoDiscount(0);
    setPromoApplied(false);
    setPromoError("");
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountAmount = promoApplied
    ? Math.round(cartSubtotal * promoDiscount / 100)
    : 0;

  const cartTotal = cartSubtotal - discountAmount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartSubtotal,
        cartTotal,
        discountAmount,
        promoCode,
        promoDiscount,
        promoApplied,
        promoError,
        applyPromoCode,
        removePromoCode,
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