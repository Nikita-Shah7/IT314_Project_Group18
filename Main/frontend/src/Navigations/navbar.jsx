import React from "react";
import { Link } from "react-router-dom";

import Shop from '../components/Home/Home'
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Shop </Link>
        <Link to="/contact"> Contact </Link>
        <Link to="/cart">
          <Shop size={32} />
        </Link>
      </div>
    </div>
  );
};
