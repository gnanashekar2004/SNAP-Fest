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


export const extstdsignuphandle = async (values) => {
    const res = await axios.post(`ext_part/`, values.inputs).catch((err)=>{
        alert("invalid credentials");
        localStorage.removeItem("ext_part_id");
    });
    if(res.status!==200){
        console.log("Unexpected error occured");
    };
    const resdata = await res.data;
    return resdata;
};

export const extstdloginhandle = async(values)=>{
    const res = await axios.put(`ext_part/login`, values.inputs).catch((err)=>{
        alert("invalid credentials");
        localStorage.removeItem("ext_part_id");
    });
    if(res.status!==200){
        console.log("Unexpected error occured");
    };
    const resdata = await res.data;
    return resdata;
}

export const studloginhandle = async(values)=>{
    const res = await axios.put(`students/login`, values.inputs).catch((err)=>{
        alert("invalid credentials");
        localStorage.removeItem("student_id");
    });
    if(res.status!==200){
        console.log("Unexpected error occured");
    };
    const resdata = await res.data;
    return resdata;

}

export const orgloginhandle = async(values)=>{
    const res = await axios.put(`orgs/login`, values.inputs).catch((err)=>{
        alert("invalid credentials");
        localStorage.removeItem("org_id");
    });
    if(res.status!==200){
        console.log("Unexpected error occured");
    };
    const resdata = await res.data;
    return resdata;
    
}

export const orgsignuphandle = async(values)=>{
    const res = await axios.post(`orgs/`, values.inputs).catch((err)=>{
        alert("invalid credentials");
        localStorage.removeItem("org_id");
    });
    if(res.status!==200){
        console.log("Unexpected error occured");
    };
    const resdata = await res.data;
    return resdata;
}

export const admloginhandle = async(values)=>{
    const res = await axios.put(`admins/login`, values.inputs).catch((err)=>{
        alert("invalid credentials");
        localStorage.removeItem("admin_id");
    });
    if(res.status!==200){
        console.log("Unexpected error occured");
    };
    const resdata = await res.data;
    return resdata;
}
