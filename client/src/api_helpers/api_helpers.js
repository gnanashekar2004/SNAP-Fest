import axios from 'axios';

export const getAllEVents = async()=>{
    const res = await axios.get("/events/")
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    console.log(res);
    const data = await res.data;
    return data;
};

export const getEventsOrganized = async(id)=>{
    const res = await axios.get(`/orgs/events/${id}`)
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    console.log(res);
    const data = await res.data;
    return data;
};