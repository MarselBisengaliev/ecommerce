import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from './';
import { useStateContext } from "../context/StateContext";

type Props = {};

const NavBar = (props: Props) => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return <div className="navbar-container">
    <p className="logo">
      <Link href="/" >Mrs Headphones</Link>
    </p>

    <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
      <AiOutlineShopping/>
      <span className="cart-item-qty">{totalQuantities}</span>
    </button>

    {showCart && <Cart/>}
  </div>;
};

export default NavBar;
