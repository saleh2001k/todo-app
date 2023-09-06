 import React from "react";
 import { Link } from "react-router-dom";
 import "./Header.scss";

function Header() {
  return (
    <header>
      <h2>

      <Link to="/">Home</Link>
      <Link data-testid="go-settings" to="/settings">
        Settings
      </Link></h2>
    </header>
  );
}

export default Header;
