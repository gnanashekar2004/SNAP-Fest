import react from 'react'
import { orgloginhandle,orgsignuphandle } from '../../../api_helpers/api_helpers'
import AuthForm from '../authform' 
import { useNavigate } from 'react-router-dom';

const Organizer_auth=()=>{
    let navigate = useNavigate();
    const getdata=(data)=>{
        console.log(data);
        if(data.signup==false){
            orgloginhandle(data)
                .then((res)=>{
                    localStorage.setItem('org_id', res[0].id);
                    localStorage.setItem('user_type', 3);
                    localStorage.removeItem('ext_part_id');
                    localStorage.removeItem('student_id');
                    localStorage.removeItem('admin_id');
                    navigate("/orgs/home");
                })
                .catch((err)=>console.log(err));
        }   
        else{
            orgsignuphandle(data)
                .then((res)=>{
                    localStorage.setItem('org_id', res.id);
                    localStorage.setItem('user_type', 3);
                    localStorage.removeItem('ext_part_id');
                    localStorage.removeItem('student_id');
                    localStorage.removeItem('admin_id');
                    navigate("/orgs/home");
                })
                .catch((err)=>console.log(err));
        }     
    };

    return (
        <div>
            <AuthForm onSubmit={getdata} isAdmin={false} isorg={true}/>
        </div>
    );
};

export default Organizer_auth;