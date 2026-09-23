"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
  type Dispatch,
} from "react";
import type { CartItem, Product, ProductColor } from "@/types";
import { generateCartItemKey } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* State & Actions                                                     */
/* ------------------------------------------------------------------ */

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { key: string } }
  | { type: "UPDATE_QUANTITY"; payload: { key: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "HYDRATE"; payload: CartItem[] };

const initialState: CartState = {
  items: [],
  isOpen: false,
};

/* ------------------------------------------------------------------ */
/* Reducer                                                             */
/* ------------------------------------------------------------------ */

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = generateCartItemKey(
        action.payload.productId,
        action.payload.size,
        action.payload.color.slug
      );
      const existing = state.items.find(
        (item) =>
          generateCartItemKey(item.productId, item.size, item.color.slug) ===
          key
      );

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            generateCartItemKey(item.productId, item.size, item.color.slug) ===
            key
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }

      return { ...state, items: [...state.items, action.payload] };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            generateCartItemKey(item.productId, item.size, item.color.slug) !==
            action.payload.key
        ),
      };

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              generateCartItemKey(
                item.productId,
                item.size,
                item.color.slug
              ) !== action.payload.key
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          generateCartItemKey(item.productId, item.size, item.color.slug) ===
          action.payload.key
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "OPEN_CART":
      return { ...state, isOpen: true };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    case "HYDRATE":
      return { ...state, items: action.payload };

    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  dispatch: Dispatch<CartAction>;
  addToCart: (product: Product, size: string, color: ProductColor) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  /* Hydrate from localStorage */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("qubi-cart");
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) {
          dispatch({ type: "HYDRATE", payload: parsed });
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  /* Persist to localStorage */
  useEffect(() => {
    try {
      localStorage.setItem("qubi-cart", JSON.stringify(state.items));
    } catch {
      /* ignore */
    }
  }, [state.items]);

  function addToCart(product: Product, size: string, color: ProductColor) {
    const item: CartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      size,
      color,
      quantity: 1,
      image: product.images[0]?.src ?? "",
      slug: product.slug,
    };
    dispatch({ type: "ADD_ITEM", payload: item });
  }

  function removeFromCart(key: string) {
    dispatch({ type: "REMOVE_ITEM", payload: { key } });
  }

  function updateQuantity(key: string, quantity: number) {
    dispatch({ type: "UPDATE_QUANTITY", payload: { key, quantity } });
  }

  const cartTotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  function openCart() {
    dispatch({ type: "OPEN_CART" });
  }

  function closeCart() {
    dispatch({ type: "CLOSE_CART" });
  }

  function toggleCart() {
    dispatch({ type: "TOGGLE_CART" });
  }

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        dispatch,
        addToCart,
        removeFromCart,
        updateQuantity,
        openCart,
        closeCart,
        toggleCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
