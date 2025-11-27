import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    // Load wishlist from localStorage on initial mount
    const savedWishlist = localStorage.getItem('mautamu_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Persist wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mautamu_wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: WishlistItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Already in wishlist",
          description: `${product.name} is already in your wishlist`,
        });
        return currentItems;
      } else {
        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist`,
        });
        return [...currentItems, product];
      }
    });
  };

  const removeFromWishlist = (id: number) => {
    setItems((currentItems) => {
      const item = currentItems.find(i => i.id === id);
      if (item) {
        toast({
          title: "Removed from wishlist",
          description: `${item.name} removed from your wishlist`,
        });
      }
      return currentItems.filter(item => item.id !== id);
    });
  };

  const isInWishlist = (id: number) => {
    return items.some(item => item.id === id);
  };

  const clearWishlist = () => {
    setItems([]);
    toast({
      title: "Wishlist cleared",
      description: "All items removed from your wishlist",
    });
  };

  const totalItems = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        totalItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
