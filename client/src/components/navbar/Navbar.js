import React from "react";
import logo from "../../assests/logo.png";
import styles from "./Navbar.module.css";

function Navbar({prop}) {
  return (
    <>
      <nav className="navbar sticky-top" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container-fluid">
          <div className={styles.logoBox}>
            <a className="navbar-brand" href="/">
              <img
                src={logo}
                alt="Logo"
                width="50"
                height="50"
                class="d-inline-block align-text-top"
              />
            </a>
            <p className={styles.mainTitle}> SNAP 2024</p>
          </div>
          <div className={styles.navLinks}>
            <button className={styles.buttonStyle}>{prop}</button>
            <button className="btn btn-outline-success" type="submit">
              Log Out
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
