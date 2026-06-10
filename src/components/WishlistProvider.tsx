"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface WishlistContextType {
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error loading wishlist", e);
    }
  }, []);

  // Save to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Error saving wishlist", e);
    }
  }, [wishlist]);

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.includes(productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
