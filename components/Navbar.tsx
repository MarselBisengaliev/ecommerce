import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

type Props = {};

const NavBar = (props: Props) => {
  return <div className="navbar-container">
    <p className="logo">
      <Link href="/">Mrs Headphones</Link>
    </p>

    <button type="button" className="cart-icon" onClick={() => {}}>
      <AiOutlineShopping/>
      <span className="cart-item-qty">1</span>
    </button>
  </div>;
};

export default NavBar;
