import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AuthContext from './AuthContext';

const CartContext = createContext(null);

const baseStorageKey = 'cart_items';

const loadCart = (storageKey) => {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext) || {};
  const userKey = user?.id || user?._id || 'guest';
  const storageKey = `${baseStorageKey}:${userKey}`;
  const [items, setItems] = useState(() => loadCart(storageKey));

  useEffect(() => {
    setItems(loadCart(storageKey));
  }, [storageKey]);

  const persist = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem(storageKey, JSON.stringify(nextItems));
  };

  const addItem = (product, quantity = 1) => {
    const productId = product.id || product._id || product.productId;
    if (!productId) return;
    const existing = items.find((item) => item.productId === productId);
    if (existing) {
      const updated = items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
      persist(updated);
      return;
    }
    const next = [
      ...items,
      {
        productId,
        name: product.name,
        price: Number(product.price ?? 0) || 0,
        imageUrl: product.imageUrl || product.image?.url || '',
        vendorId: product.vendorId || product.vendor?._id || null,
        quantity,
      },
    ];
    persist(next);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    const updated = items.map((item) =>
      item.productId === productId ? { ...item, quantity } : item,
    );
    persist(updated);
  };

  const removeItem = (productId) => {
    const updated = items.filter((item) => item.productId !== productId);
    persist(updated);
  };

  const clear = () => {
    persist([]);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0,
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateQuantity,
      removeItem,
      clear,
      subtotal,
      itemCount,
    }),
    [items, subtotal, itemCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
