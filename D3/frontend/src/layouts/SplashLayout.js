// Amadeus Fidos u22526162
import React from "react";
import SplashHeader from "../components/SplashHeader";

export default function SplashLayout({ children }) {
  return (
    <div className="inner-layout">
      <SplashHeader />
      <main>{children}</main>
    </div>
  );
}
