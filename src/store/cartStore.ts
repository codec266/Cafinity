import { create } from 'zustand';

export type CartItem = { 
  id: string; 
  name: string; 
  desc: string; 
  price: number; 
  qty: number; 
  image: string; 
};

interface CartStore {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  updateQty: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  
  addToCart: (item) => set((state) => {
    const existing = state.cart.find(c => c.id === item.id);
    if (existing) {
      return { cart: state.cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c) };
    }
    return { cart: [...state.cart, { ...item, qty: 1 }] };
  }),

  updateQty: (id, delta) => set((state) => {
    const updatedCart = state.cart.map(item => 
      item.id === id ? { ...item, qty: item.qty + delta } : item
    );
    
    return { 
      cart: updatedCart.filter(item => item.qty > 0) 
    };
  }),

  removeItem: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),

  clearCart: () => set({ cart: [] }),
}));