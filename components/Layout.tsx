import React from "react";
import Head from "next/head";
import NavBar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Head>
        <title>Marsel Store</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
