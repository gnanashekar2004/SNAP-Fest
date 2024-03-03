import react from 'react'
import { studloginhandle } from '../../../api_helpers/api_helpers'
import AuthForm from '../authform' 
import { useNavigate } from 'react-router-dom';

const Student_auth=()=>{
    let navigate = useNavigate();
    const getdata=(data)=>{
        console.log(data);
        studloginhandle(data)
            .then((res)=>{
                localStorage.setItem('student_id', res[0].id);
                localStorage.setItem('user_type', 2);
                localStorage.removeItem('ext_part_id');
                localStorage.removeItem('admin_id');
                localStorage.removeItem('org_id');
                navigate("/students/home");
            })
            .catch((err)=>console.log(err));
    };

    return (
        <div>
            <AuthForm onSubmit={getdata} isAdmin={true} isorg={false}/>
        </div>
    );
};

export default Student_auth;