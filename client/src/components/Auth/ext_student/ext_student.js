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
                    navigate("/ext_part/home");
                })
                .catch((err)=>console.log(err));
        }   
        else{
            extstdsignuphandle(data)
                .then((res)=>{
                    localStorage.setItem('ext_part_id', res.id);
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