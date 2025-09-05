import React from "react";

export default function SplashHeader() {
  return (
        <div style={{ display: 'flex', padding: '10px' }}>
            <div className="logo-holder">
                <Image src="../../public/assets/images/Logo4.png" alt="Logo" width={50} height={100} />
                <h1>Graphyt</h1>
            </div>
        </div>
  );
}