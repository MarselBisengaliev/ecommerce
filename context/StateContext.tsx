import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { toast } from "react-hot-toast";

type ContextType = {
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  cartItems: any;
  totalPrice: any;
  totalQuantities: any;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: ProductType, quantity: number) => void;
} | null;

const Context = createContext<ContextType>(null);

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>();
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);

  const onAdd = (product: ProductType, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    if (checkProductInCart) {
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price * quantity
      );
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities + quantity
      );

      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to cart`);
  };

  const incQty = (): void => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = (): void => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
