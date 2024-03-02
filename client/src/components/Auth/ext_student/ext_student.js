import react from 'react'
import { extstdloginhandle,extstdsignuphandle } from '../../../api_helpers/api_helpers'
import AuthForm from '../authform' 
import { useNavigate } from 'react-router-dom';

const Participant_auth=()=>{
    let navigate = useNavigate();
    const getdata=(data)=>{
        console.log(data);
        if(data.signup==false){
            extstdloginhandle(data)
                .then((res)=>{
                    localStorage.setItem('ext_part_id', res[0].id);
                    localStorage.setItem('user_type', 1);
                    localStorage.removeItem('admin_id');
                    localStorage.removeItem('student_id');
                    localStorage.removeItem('org_id');
                    navigate("/ext_part/home");
                })
                .catch((err)=>console.log(err));
        }   
        else{
            extstdsignuphandle(data)
                .then((res)=>{
                    localStorage.setItem('ext_part_id', res.id);
                    localStorage.setItem('user_type', 1);
                    localStorage.removeItem('admin_id');
                    localStorage.removeItem('student_id');
                    localStorage.removeItem('org_id');
                    navigate("/ext_part/home");
                })
                .catch((err)=>console.log(err));
        }     
    };

    return (
        <div>
            <AuthForm onSubmit={getdata} isAdmin={false} isorg={false} />
        </div>
    );
};

export default Participant_auth;