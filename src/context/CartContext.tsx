import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { CartItem, Product } from '../types/Product';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) setCart(JSON.parse(storedCart))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    // Check if item already exists in cart with same color/size
    const existingIndex = cart.findIndex(
      item =>
        item.id === product.id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
    )

    if (existingIndex >= 0) {
      // Update quantity & totalPrice
      const updatedCart = [...cart]
      updatedCart[existingIndex].quantity += quantity
      updatedCart[existingIndex].totalPrice = updatedCart[existingIndex].unitPrice * updatedCart[existingIndex].quantity
      setCart(updatedCart)
    } else {
      const unitPrice = product.basePrice
      const newItem: CartItem = {
        ...product,
        quantity,
        selectedColor,
        selectedSize,
        unitPrice,
        totalPrice: unitPrice * quantity,
      }
      setCart([...cart, newItem])
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}