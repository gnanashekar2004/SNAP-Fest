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

// get all organizers
export const getAllOrgs = async()=>{
    const res = await axios.get("/orgs")
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    console.log(res);
    const data = await res.data;
    return data;
};
export const getAllWaitingOrgs = async()=>{
    const res = await axios.get("/orgs/waiting/users")
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    console.log(res);
    const data = await res.data;
    return data;
};
export const getAllStudents = async()=>{
    const res = await axios.get("/students")
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    console.log(res);
    const data = await res.data;
    return data;
};
export const getAllExt_parts = async()=>{
    const res = await axios.get("/ext_part")
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    console.log(res);
    const data = await res.data;
    return data;
};
// get all halls
export const getAllHalls = async()=>{
    const res = await axios.get("/halls")
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    console.log(res);
    const data = await res.data;
    return data;
};

export const approveOrg = async(values)=>{
    console.log(values);
    const res = await axios.post(`/admins/approve/orgs`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
};
// get accom
export const getAccom = async(id)=>{
    console.log(`id = ${id}`);
    const res = await axios.get(`/halls/accom/${id}`)
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    console.log(res);
    
    let data = await res.data[0];
    if (res.data.length == 0){
        data = {
            id: id,
            hall: "Accomodation not given",
            food: "Accomodation not given"
        }
    }
    return data;
};

// set accom
export const setAccom = async(values)=>{
    console.log(values);
    const res = await axios.post(`/ext_part/accom`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
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

export const getEventsParticipated = async(id)=>{
    const res = await axios.get(`/parts/events/${id}`)
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    console.log(res);
    const data = await res.data;
    return data;
};

export const getEventWinners = async(id)=>{
    const res = await axios.get(`/events/winners/${id}`)
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    console.log(res);
    const data = await res.data;
    return data;
};
export const getEventVolunteers = async(id)=>{
    const res = await axios.get(`/events/volunteers/${id}`)
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    console.log(res);
    const data = await res.data;
    return data;
};
export const getEventParticipants = async(id)=>{
    const res = await axios.get(`/events/participants/${id}`)
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    console.log(res);
    const data = await res.data;
    return data;
};


// get events volunteered by student
export const getEventsVolunteered = async(id)=>{
    const res = await axios.get(`/students/volunteer/${id}`)
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    console.log(res);
    const data = await res.data;
    return data;
};

// declare winners
export const declareWinners = async(values)=>{
    console.log(values);
    const res = await axios.put(`/orgs/winner`, values).catch((err)=>{
        console.log(err);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
}

// registering for events
export const registerForEvent = async(values)=>{
    console.log(values);
    const res = await axios.put(`parts/`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
}

// organize an event
export const organizeEvent = async(values)=>{
    console.log(values);
    const res = await axios.put(`orgs/event`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
}
// deorganize event
export const deorganizeEvent = async(values)=>{
    console.log(values);
    const res = await axios.post(`orgs/event`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
}

// deregistering for events
export const de_registerForEvent = async(values)=>{
    console.log(values);
    const res = await axios.post(`parts/deregister`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
}

// register as a volunteer
export const registerAsVolunteer = async(values)=>{
    console.log(values);
    const res = await axios.put(`students/volunteer/register`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
};
// deregister as volunteer
export const de_registerAsVolunteer = async(values)=>{
    console.log(values);
    const res = await axios.post(`students/volunteer/delete`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
}

// auths
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
        alert(err.response.data.message);
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


// delete organizer
export const deleteOrganizer = async(values)=>{
    console.log(values);
    const res = await axios.post(`admins/organizer`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
}

export const deleteStudent = async(values)=>{
    console.log(values);
    const res = await axios.post(`admins/student`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
}

export const deleteExt_part = async(values)=>{
    console.log(values);
    const res = await axios.post(`admins/ext_part`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
}

export const deleteEvent = async(values)=>{
    console.log(values);
    const res = await axios.post(`events/delete`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
}


/// add event
export const addEvent = async(values)=>{
    console.log(values);
    const res = await axios.post(`events/`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
}

export const addOrg = async(values)=>{
    console.log(values);
    const res = await axios.post(`orgs/`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
}
export const addStudents = async(values)=>{
    console.log(values);
    const res = await axios.post(`students/`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
}
export const addExtPart = async(values)=>{
    console.log(values);
    const res = await axios.post(`ext_part/`, values).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data;
    return resdata;
}

// get users by id
export const getExtPartById = async(id)=>{

    const res = await axios.get(`ext_part/${id}`).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data[0];
    return resdata;
}
export const getStudentById = async(id)=>{

    const res = await axios.get(`students/${id}`).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data[0];
    return resdata;
}
export const getOrgById = async(id)=>{

    const res = await axios.get(`orgs/${id}`).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data[0];
    return resdata;
}
export const getAdminById = async(id)=>{

    const res = await axios.get(`admins/${id}`).catch((err)=>{
        console.log(err.response.data.message);
        alert(err.response.data.message);
    });
    const resdata = await res.data[0];
    return resdata;
}