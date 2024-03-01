import react, { useEffect, useState } from "react";
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

function OrganiserPage (){
    return (
        <>
            <Navbar prop="Profile"/>
            <div style={customStyle}>
                <User id="1" name="OrganiserName" button="Delete"/>
                <User id="1" name="OrganiserName" button="Delete"/>
                <User id="1" name="OrganiserName" button="Delete"/>
                <User id="1" name="OrganiserName" button="Delete"/>
                <User id="1" name="OrganiserName" button="Delete"/>
            </div>
            <button className="btn btn-success" style={buttonStyle}>Add a new Participant</button>
        </>
    );
}

export default OrganiserPage;