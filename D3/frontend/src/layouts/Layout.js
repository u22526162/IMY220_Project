// Amadeus Fidos u22526162
import React from "react";
import Header from "../components/Header";

export default function Layout({ children }) {
  return (
    <div className="inner-layout">
      <Header />
      <main>{children}</main>
    </div>
  );
}
