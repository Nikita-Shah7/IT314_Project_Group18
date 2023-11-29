import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const loginBoxStyle = {
    width: '90%',
    maxWidth: '380px',
    padding: '20px',
    backgroundColor: '#f0f4d4',
    border: '2px solid #982c2c',
    borderRadius: '0',
    margin: '0 auto',
    marginTop: '80px',
    marginBottom: '50px',
};

const textFieldStyle = {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: '15px',
    '& .MuiInputBase-input': {
        border: '1px solid #982c2c',
        borderRadius: '4px',
    },
    '& :focus': {
        border: '0px solid #982c2c',
        outline: 'none',
    },
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
    marginBottom: '20px',
    textAlign: 'center',
    justifyContent: 'center'
};

export default function SignUpBox() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9!#$%&'*+-/=?^_`{|}~]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const isValid = emailRegex.test(email);
        setEmailError(isValid ? '' : 'Invalid email address');
        return isValid;
    };

    const validateName = (name) => {
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
                User Validation
            </Typography>
            <div style={loginBoxStyle}>
                <TextField
                    label="Enter Your Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={name}
                    sx={textFieldStyle}
                    onChange={(e) => setName(e.target.value)}
                />
                {nameError && <Typography variant="caption" color="error">{nameError}</Typography>}
                <TextField
                    label="Enter Your Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    sx={textFieldStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <Typography variant="caption" color="error">{emailError}</Typography>}
                <Button
                    variant="contained"
                    sx={{ width: '205px', backgroundColor: '#982c2c', margin: '0 auto', marginTop: '15px', marginBottom: '25px', display: 'block', borderRadius: '0' }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>


                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '60px' }}>
                    <Box borderTop={1} borderColor="maroon" p={2} width={94} ml={3} mb={4} mt={6}>
                        {/* Content for the first box */}
                    </Box>
                    <Typography variant="h6" sx={{ mx: 2, mb: 2 }}>
                        OR
                    </Typography>
                    <Box borderTop={1} borderColor="maroon" p={2} width={90} mb={4} mt={6}>
                        {/* Content for the second box */}
                    </Box>
                </div>


                <Grid container spacing={1} justifyContent="center" alignItems="center">
                    <Grid item>
                        <span>Previously Visited ?</span>
                    </Grid>
                    <Grid item>
                        <Link href="#" style={{ display: 'flex', alignItems: 'center' }}>
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
                        <Link href="#" style={{ display: 'flex', alignItems: 'center' }}>
                            <SupervisorAccountIcon style={{ marginRight: '8px', marginTop: '8px' }} />
                            Login
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

