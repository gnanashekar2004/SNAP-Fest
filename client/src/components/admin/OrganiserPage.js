import react, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import User from "../user/User";
import { getAllOrgs, getAllWaitingOrgs } from "../../api_helpers/api_helpers";
import { useNavigate } from "react-router-dom";

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
    const [orgs, setorgs] = useState([]);
    useEffect(()=>{
        getAllOrgs().then((data)=>setorgs(data))
        .catch((err)=>console.log(err));
    }, [orgs]);
    console.log(orgs);
    const [waiting_orgs, setwaiting_orgs] = useState([]);
    useEffect(()=>{
        getAllWaitingOrgs().then((data)=>setwaiting_orgs(data))
        .catch((err)=>console.log(err));
    }, [waiting_orgs]);
    let navigate = useNavigate();

    return (
        <>
            <Navbar prop="Profile"/>
            <div style={customStyle}>
                <h4>All organizers</h4>
                { orgs && orgs.map((org, index)=>
                    <User id={org.id} name={org.name} type={3} email={org.email} button1={"delete"}/>
                )}
                <h4>waiting organizers</h4>
                { waiting_orgs && waiting_orgs.map((org, index)=>
                    <User id={org.id} name={org.name} type={5} email={org.email} button1={"approve"}/>
                )}
            </div>
            <button className="btn btn-success" onClick={()=>navigate("/add/orgs")} style={buttonStyle}>Add a new Organizer</button>
        </>
    );
}

export default OrganiserPage;