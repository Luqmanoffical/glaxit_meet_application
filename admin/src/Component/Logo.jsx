import React from 'react';
import logo from "../assets/logo-1.png"

function Logo({ width = '100px' }) {
  return (
    <div>
      <img src={logo} style={{ background: 'none', width: width }} alt="Logo" />
    </div>
  );
}

export default Logo;
