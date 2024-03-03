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
    localStorage.setItem('user_type', 0);
    navigate("/");
  }
  let navigte = useNavigate();
  const handleProfile = ()=>{
    let user_type = Number(localStorage.getItem('user_type'));
    if (user_type == 1){
      // ext_part
      navigate("/ext_part/profile");
    }
    else if (user_type == 2){
      // Student
      navigate("/student/profile");
    }
    else if (user_type == 3){
      // organizer
      navigate("/organizer/profile");
    }
    else if (user_type == 4){
      // admin
      navigate("/admin/profile");
    }
    else {
      //

    }
  }
  const handleHome = ()=>{
    let user_type = Number(localStorage.getItem('user_type'));
    if (user_type == 1){
      // ext_part
      navigate("/ext_part/home");
    }
    else if (user_type == 2){
      // Student
      navigate("/students/home");
    }
    else if (user_type == 3){
      // organizer
      navigate("/orgs/home");
    }
    else if (user_type == 4){
      // admin
      navigate("/admin/home");
    }
    else {
      //

    }
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
            <button onClick={()=>handleHome()} className={styles.buttonStyle}>Home</button>
            <button onClick={()=>handleProfile()} className={styles.buttonStyle}>{prop}</button>
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
