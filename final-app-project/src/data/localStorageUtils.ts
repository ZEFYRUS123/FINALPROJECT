// localStorageUtils.ts

// Определение интерфейса для объекта товара
export interface CartItem {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
  }
// Функция для сохранения данных корзины в локальное хранилище
export const saveCartToLocalStorage = (cartItems: CartItem[]): void => {
    try {
      const serializedCart = JSON.stringify(cartItems);
      localStorage.setItem('cart', serializedCart);
    } catch (error) {
      console.error('Error saving cart to local storage:', error);
    }
  };
  
  // Функция для загрузки данных корзины из локального хранилища
  export const loadCartFromLocalStorage = (): CartItem[] => {
    try {
      const serializedCart = localStorage.getItem('cart');
      if (serializedCart === null) {
        return [];
      }
      return JSON.parse(serializedCart);
    } catch (error) {
      console.error('Error loading cart from local storage:', error);
      return [];
    }
  };
  