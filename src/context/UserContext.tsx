import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface UserContextType {
  cart: string[]; // List of prompt IDs
  ownedPrompts: string[]; 
  addToCart: (promptId: string) => void;
  removeFromCart: (promptId: string) => void;
  checkout: () => void;
  isOwned: (promptId: string) => boolean;
  isInCart: (promptId: string) => boolean;
  hasProPlan: boolean;
  subscribePro: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<string[]>(() => {
    const saved = localStorage.getItem('promptvault_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [ownedPrompts, setOwnedPrompts] = useState<string[]>(() => {
    const saved = localStorage.getItem('promptvault_owned');
    return saved ? JSON.parse(saved) : [];
  });

  const [hasProPlan, setHasProPlan] = useState<boolean>(() => {
    return localStorage.getItem('promptvault_pro') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('promptvault_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('promptvault_owned', JSON.stringify(ownedPrompts));
  }, [ownedPrompts]);

  useEffect(() => {
    localStorage.setItem('promptvault_pro', hasProPlan.toString());
  }, [hasProPlan]);

  const addToCart = (promptId: string) => {
    if (!cart.includes(promptId) && !ownedPrompts.includes(promptId)) {
      setCart(prev => [...prev, promptId]);
    }
  };

  const removeFromCart = (promptId: string) => {
    setCart(prev => prev.filter(id => id !== promptId));
  };

  const checkout = () => {
    // Simulates a backend purchase, moving items from cart to owned
    setOwnedPrompts(prev => {
      const newOwned = [...prev];
      cart.forEach(id => {
        if (!newOwned.includes(id)) newOwned.push(id);
      });
      return newOwned;
    });
    setCart([]);
    alert("Payment successful! Prompts unlocked.");
  };

  const isOwned = (promptId: string) => ownedPrompts.includes(promptId) || hasProPlan;
  const isInCart = (promptId: string) => cart.includes(promptId);

  const subscribePro = () => {
    setHasProPlan(true);
    alert("Successfully subscribed to Pro! All prompts are unlocked.");
  };

  return (
    <UserContext.Provider value={{ 
      cart, ownedPrompts, addToCart, removeFromCart, checkout, isOwned, isInCart, hasProPlan, subscribePro
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
