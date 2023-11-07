import React from 'react';
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
    marginBottom: '25px',
    marginTop: '120px'
};


export default function LoginBox() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom align='center' style={loginTextStyle}>
                Admin Login
            </Typography>
            <div style={loginBoxStyle}>
                <TextField
                    label="Enter Your Username"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    sx={textFieldStyle}
                />
                <TextField
                    label="Enter Your Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    sx={textFieldStyle}
                />
                <Button
                    variant="contained"
                    sx={{ width: '205px', backgroundColor: '#982c2c', margin: '0 auto', marginTop: '15px', marginBottom: '25px', display: 'block', borderRadius: '0' }}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

