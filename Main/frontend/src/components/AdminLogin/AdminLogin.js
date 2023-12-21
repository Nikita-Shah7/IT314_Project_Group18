import React, { useState } from 'react';
import ButtonComponent from "../Button/ButtonComponent.jsx";
import { useNavigate } from 'react-router-dom';
import { admin as adminAxios } from '../AxiosCreate';
import { toast } from 'react-toastify';
import './AdminLogin.scss';
import 'react-toastify/dist/ReactToastify.css';


export default function AdminLogin() {
    const [loading, setLoading] = useState(false);
    const [adminname, setAdminName] = useState('');
    const [password, setPasswd] = useState('');
    const navigate = useNavigate();

    const handleAdminLogin = async () => {
        const data = {
            admin_name: adminname,
            password,
        };
        // console.log(data);
        setLoading(true);
        await adminAxios.get(`/${adminname}`)
            .then(async (response) => {
                // console.log(response.data.data.password,password)
                // const passwordsMatch = await bcrypt.compare(password, response.data.data.password);
                const passwordsMatch = password === response.data.data.password
                if (!passwordsMatch) {
                    setLoading(false);
                    // enqueueSnackbar('Invalid Password !!', { variant: 'error' });
                    setPasswd('');
                    toast.error("Password is incorrect.");
                } else {
                    setLoading(false);
                    // enqueueSnackbar('Admin Logged In successfully', { variant: 'success' });
                    localStorage.setItem("isAdminAuth", true)
                    // console.log(response.data.accessToken)
                    // Here, i store the accessToken in localStorage to access it from "deleteBook" route
                    // However, it is not a good practice to do so
                    localStorage.setItem("accessToken", response.data.accessToken)
                    toast.success("Admin login successful.");
                    navigate('/');
                }
            })
            .catch((error) => {
                setLoading(false);
                // alert('An error happened. Please Check console');
                // if (error.response.data.message == 'Admin doesn\'t exists !!')
                //     enqueueSnackbar(error.response.data.message, { variant: 'error' });
                // else enqueueSnackbar('ERROR', { variant: 'error' });
                console.log("ERROR MESSAGE ::", error)
                toast.error("Admin name not found.");
                // console.log("ERROR MESSAGE ::", error.response.data.message)
            });
    }


    return (
        <div className="adminlogin-container">
            <h3>Admin Login</h3>
            <div className='loginBoxStyle'>
                <input
                    type="text"
                    placeholder="Enter Your Admin Name"
                    className='inputStyle'
                    value={adminname}
                    onChange={(e) => setAdminName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter Your Password"
                    className='inputStyle'
                    value={password}
                    onChange={(e) => setPasswd(e.target.value)}
                />
                <div className='button-div'>
                    <ButtonComponent color={"primary"} message={"LOGIN"} func={handleAdminLogin} />
                    <ButtonComponent color={"secondary"} message={"BACK"} func={() => navigate('/')} />
                </div>
            </div>
        </div>
    );
}

