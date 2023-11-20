import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



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

const textFieldStyle = {
    backgroundColor: 'white',
    width: '360px',
    ml: '10px',
    borderRadius: '0',

    '& .MuiInputBase-input': {
        border: '1px solid #982c2c', // Default border color
        borderRadius: '4px',
    },
    '& :focus': {
        border: '0px solid #982c2c', // Border color on focus 
        outline: 'none',
    },
};

const loginTextStyle = {
    color: '#982c2c',
    marginBottom: '85px',
    marginTop: '190px'
};


export default function LoginBox() {
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = (email) => {
        // email validation
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        // 10-digit phone number validation
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const handleSubmit = () => {
        // Validate email and phone number
        if (!validateEmail(email)) {
            alert('Invalid email address');
            return;
        }

        if (!validatePhoneNumber(contactNumber)) {
            alert('Invalid phone number');
            return;
        }

        // Resetting input values
        setName('');
        setContactNumber('');
        setEmail('');
        setPassword('');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
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
                <TextField
                    label="Enter Your Contact Number"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    sx={textFieldStyle}
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                />
                <TextField
                    label="Enter Your Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    sx={textFieldStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Enter Your Password"
                    type="password"
                    id="password"
                    name="password"
                    variant="outlined"
                    margin="normal"
                    autoComplete='="current-password
                    required'
                    fullWidth
                    value={password}
                    sx={textFieldStyle}
                    onChange={(e) => setPassword(e.target.value)}

                />
                <Button
                    variant="contained"
                    sx={{ width: '205px', backgroundColor: '#982c2c', margin: '0 auto', marginTop: '15px', marginBottom: '25px', display: 'block', borderRadius: '0' }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>

            </div>
        </div>
    );
}

