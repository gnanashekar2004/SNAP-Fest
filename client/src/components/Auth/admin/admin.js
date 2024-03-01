import react from 'react'
import { admloginhandle } from '../../../api_helpers/api_helpers'
import AuthForm from '../authform' 
import { useNavigate } from 'react-router-dom';

const Admin_auth=()=>{
    let navigate = useNavigate();
    const getdata=(data)=>{
        console.log(data);
        admloginhandle(data)
            .then((res)=>{
                localStorage.setItem('admin_id', res[0].id);
                navigate("/admin/home");
            })
            .catch((err)=>console.log(err));
    };

    return (
        <div>
            <AuthForm onSubmit={getdata} isAdmin={true} isorg={false}/>
        </div>
    );
};

export default Admin_auth;