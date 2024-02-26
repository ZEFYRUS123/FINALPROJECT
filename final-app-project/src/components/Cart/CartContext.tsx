import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { saveCartToLocalStorage, loadCartFromLocalStorage } from '../../data/localStorageUtils';

interface CartItem {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
} 

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item:CartItem,quantity: number) => void;
    removeFromCart: (itemId : number) => void;
    getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);


export const CartProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(loadCartFromLocalStorage());

    const addToCart = (item: CartItem, quantity: number) => {
        const existingItem = cartItems.find((i) => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += quantity;
            setCartItems([...cartItems]);
        }else {
            const newItem = {...item,quantity};
            setCartItems([...cartItems,newItem]);
        }
    };

    const removeFromCart = (itemId: number) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    useEffect(() => {
        saveCartToLocalStorage(cartItems);        
    },[cartItems]);

    return(
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');  
    }
    return context;
}
