import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { admin as adminAxios } from '../AxiosCreate';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginBoxStyle = {
    width: '380px',
    padding: '20px',
    backgroundColor: '#f0f4d4',
    border: '2px solid #982c2c',
    borderRadius: '0',
    margin: '0 auto',
    marginTop: '180px',
    marginBottom: '50px',
    transform: 'translateY(-50%)',
};

const inputStyle = {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: '15px',
    border: '1px solid #982c2c',
    borderRadius: '4px',
    padding: '10px',
};


const loginTextStyle = {
    color: '#982c2c',
    marginBottom: '25px',
    marginTop: '120px'
};


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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom align='center' style={loginTextStyle}>
                Admin Login
            </Typography>
            <div style={loginBoxStyle}>
                <input
                    type="text"
                    placeholder="Enter Your Admin Name"
                    style={inputStyle}
                    value={adminname}
                    onChange={(e) => setAdminName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter Your Password"
                    style={inputStyle}
                    value={password}
                    onChange={(e) => setPasswd(e.target.value)}
                />


                <Button
                    variant="contained"
                    sx={{ width: '205px', backgroundColor: '#982c2c', margin: '0 auto', marginTop: '15px', marginBottom: '25px', display: 'block', borderRadius: '0' }}
                    onClick={handleAdminLogin}
                >
                    LOGIN
                </Button>
                <Button
                    variant="contained"
                    sx={{ width: '205px', backgroundColor: '#982c2c', margin: '0 auto', marginTop: '15px', marginBottom: '25px', display: 'block', borderRadius: '0' }}
                    onClick={() => navigate('/')}
                >
                    BACK
                </Button>
            </div>
        </div>
    );
}

