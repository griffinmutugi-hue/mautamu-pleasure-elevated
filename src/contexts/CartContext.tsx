import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface CartData {
  items: CartItem[];
  updatedAt: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const STORAGE_KEY = 'mautamu_cart';
const CartContext = createContext<CartContextType | undefined>(undefined);

// Merge duplicate items by id - sum quantities
const mergeDuplicates = (items: CartItem[]): CartItem[] => {
  const merged = new Map<number, CartItem>();
  
  for (const item of items) {
    const existing = merged.get(item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      merged.set(item.id, { ...item });
    }
  }
  
  return Array.from(merged.values());
};

// Load cart from localStorage with merge check
const loadCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    
    const parsed = JSON.parse(saved);
    
    // Handle both old format (array) and new format (object with items)
    let items: CartItem[] = [];
    if (Array.isArray(parsed)) {
      items = parsed;
    } else if (parsed?.items && Array.isArray(parsed.items)) {
      items = parsed.items;
    }
    
    // Merge duplicates and persist if changes were made
    const merged = mergeDuplicates(items);
    if (merged.length !== items.length) {
      saveCart(merged);
    }
    
    return merged;
  } catch {
    return [];
  }
};

// Save cart to localStorage atomically - ALWAYS merge before saving
const saveCart = (items: CartItem[]): boolean => {
  try {
    // Merge duplicates before every save to prevent duplicates from ever existing
    const mergedItems = mergeDuplicates(items);
    const cartData: CartData = {
      items: mergedItems,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartData));
    return true;
  } catch {
    return false;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());
  const updateLock = useRef(false);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    saveCart(items);
  }, [items]);

  // Atomic update helper with lock
  const atomicUpdate = useCallback((
    updater: (currentItems: CartItem[]) => CartItem[],
    successMessage?: string,
    errorMessage: string = "Couldn't update cart — try again."
  ) => {
    if (updateLock.current) return;
    updateLock.current = true;

    try {
      // Read current state from localStorage for true atomicity
      const currentItems = loadCart();
      const newItems = updater(currentItems);
      
      // Persist immediately
      const saved = saveCart(newItems);
      
      if (saved) {
        setItems(newItems);
        if (successMessage) {
          toast({
            title: successMessage,
          });
        }
      } else {
        toast({
          title: errorMessage,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: errorMessage,
        variant: "destructive",
      });
    } finally {
      updateLock.current = false;
    }
  }, []);

  const addToCart = useCallback((product: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    atomicUpdate(
      (currentItems) => {
        const existingIndex = currentItems.findIndex(item => item.id === product.id);
        
        if (existingIndex >= 0) {
          // Increment quantity for existing product
          const updated = [...currentItems];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity
          };
          return updated;
        } else {
          // Add new product
          return [...currentItems, { ...product, quantity }];
        }
      },
      "Added to cart"
    );
  }, [atomicUpdate]);

  const removeFromCart = useCallback((id: number) => {
    atomicUpdate(
      (currentItems) => currentItems.filter(item => item.id !== id),
      "Removed from cart"
    );
  }, [atomicUpdate]);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    atomicUpdate(
      (currentItems) => 
        currentItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        ),
      "Quantity updated"
    );
  }, [atomicUpdate, removeFromCart]);

  const clearCart = useCallback(() => {
    atomicUpdate(
      () => [],
      "Cart cleared"
    );
  }, [atomicUpdate]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
