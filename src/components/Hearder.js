import React from "react";
import logo from "../images/logo.svg";

export default function Header() {
  return (
    <>
      <header className="header">
        <img className="logo" src={logo} alt="logo" />
        <div className="header__line"></div>
      </header>
    </>
  );
}
