import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const loginBoxStyle = {
    width: '90%',
    maxWidth: '380px',
    padding: '20px',
    backgroundColor: '#f0f4d4',
    border: '2px solid #982c2c',
    borderRadius: '0',
    margin: '0 auto',
    marginTop: '40px',
    marginBottom: '50px',
};

const inputStyle = {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: '15px',
    border: '1px solid #982c2c',
    borderRadius: '4px',
    padding: '10px',
};

const centerDivStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
};

const loginTextStyle = {
    color: '#982c2c',
    marginTop: '100px',
    marginBottom: '2px',
    textAlign: 'center',
    justifyContent: 'center'
};

export default function SignUpBox() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9!#$%&'*+-/=?^_`{|}~]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const isValid = emailRegex.test(email);
        setEmailError(isValid ? '' : 'Invalid email address');
        toast.error("Invalid email address");
        return isValid;
    };

    const validateName = (name) => {
        if (!name.trim()) {
            setNameError('Name cannot be empty');
            return false;
        }

        const hasNoNumbers = !/[0-9]/.test(name);
        setNameError(hasNoNumbers ? '' : 'Name cannot contain numbers');
        return hasNoNumbers;
    };

    const handleSubmit = () => {
        const isNameValid = validateName(name);
        const isEmailValid = validateEmail(email);

        if (isNameValid && isEmailValid) {
            setName('');
            setEmail('');
        }
    };

    return (
        <div style={centerDivStyle}>
            <Typography variant="h4" gutterBottom align='center' style={loginTextStyle}>
                User SignUp
            </Typography>
            <div style={loginBoxStyle}>
                <input
                    type="text"
                    placeholder="Enter Your Name"
                    style={inputStyle}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {nameError && <Typography variant="caption" color="error">{nameError}</Typography>}
                <input
                    type="text"
                    placeholder="Enter Your Email"
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <Typography variant="caption" color="error">{emailError}</Typography>}

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ backgroundColor: '#982c2c', borderRadius: '0' }}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ backgroundColor: '#982c2c', borderRadius: '0' }}
                            onClick={() => navigate('/')}
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>

                <Grid container justifyContent="center" alignItems="center" spacing={2} mt={4}>
                    <Grid item>
                        <Box borderTop={1} borderColor="maroon" p={2} width={{ xs: '80px', sm: '94px' }}>

                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" sx={{ mb: 4 }}>
                            OR
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box borderTop={1} borderColor="maroon" p={2} width={{ xs: '80px', sm: '90px' }}>

                        </Box>
                    </Grid>
                </Grid>


                <Grid container spacing={1} justifyContent="center" alignItems="center">
                    <Grid item>
                        <span>Previously Visited ?</span>
                    </Grid>
                    <Grid item>
                        <Link href="signin" style={{ display: 'flex', alignItems: 'center' }}>
                            <LoginIcon style={{ marginRight: '8px' }} />
                            Login
                        </Link>
                    </Grid>
                </Grid>

                <Grid container spacing={1} justifyContent="center" alignItems="center">
                    <Grid item>
                        <span>Admin Login</span>
                    </Grid>
                    <Grid item>
                        <Link href="adminlogin" style={{ display: 'flex', alignItems: 'center' }}>
                            <SupervisorAccountIcon style={{ marginRight: '8px', marginTop: '8px' }} />
                            Login
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}


