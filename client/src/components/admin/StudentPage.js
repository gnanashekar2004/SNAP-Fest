import React from 'react';
import Navbar from "../navbar/Navbar";
import User from "../user/User";

const customStyle = {
    paddingLeft:"10%",
    paddingRight: "10%",
    paddingTop: "100px",
    paddingBottom: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
}

const buttonStyle= {
    marginLeft: "20%",
    width: "60%",
    fontSize: "25px"
}

function StudentPage (){
    return (
        <>
            <Navbar prop="Profile"/>
            <div style={customStyle}>
                <User id="1" name="StudentName" button="Delete"/>
                <User id="1" name="StudentName" button="Delete"/>
                <User id="1" name="StudentName" button="Delete"/>
                <User id="1" name="StudentName" button="Delete"/>
                <User id="1" name="StudentName" button="Delete"/>
            </div>
            <button className="btn btn-success" style={buttonStyle}>Add a new Student</button>
        </>
    );
}

export default StudentPage;