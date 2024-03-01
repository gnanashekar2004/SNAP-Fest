import React from "react";
import logo from "../../assests/logo.png";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

function Navbar({prop}) {
  let navigate = useNavigate();
  const handle_logout = ()=>{
    localStorage.removeItem('student_id');
    localStorage.removeItem('admin_id');
    localStorage.removeItem('ext_part_id');
    localStorage.removeItem('org_id');
    navigate("/");
  }
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
            <button className="btn btn-outline-success" type="submit" onClick={handle_logout}>
              Log Out
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
