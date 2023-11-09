import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useMediaQuery } from '@mui/material';

export default function Header() {
    const textColor = '#982c2c';

    const linkStyle = {
        color: textColor,
        textDecoration: 'none', // Removing underline from links
    };

    const isSmallScreen = useMediaQuery('(max-width:750px)');

    return (
        <Box sx={{ marginBottom: 10, flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#f0f4d4', boxShadow: 'none' }}>
                <Toolbar>
                    {/* Left section with restaurant name and logo */}
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <img src="logo.png" alt="Restaurant Logo" style={{ width: 40, height: 40, marginRight: 8 }} />
                        <Typography variant="h6" component="div" sx={{ color: textColor }}>
                            Restaurant
                        </Typography>
                    </Box>

                    {/* Middle section with hyperlinks centered in the middle of the screen */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: isSmallScreen ? 'wrap' : 'no-wrap',
                        width: '100%',
                    }}>
                        <Link href="/home" color="inherit" sx={{ m: 2, ...linkStyle }}>
                            Home
                        </Link>
                        <Link href="/menu" color="inherit" sx={{ m: 2, ...linkStyle }}>
                            Menu
                        </Link>
                        <Link href="/about" color="inherit" sx={{ m: 2, ...linkStyle }}>
                            About Us
                        </Link>
                    </Box>

                    {/* Right section with the login button */}
                    <Button color="inherit" sx={{ borderRadius: '0', color: textColor, backgroundColor: 'white', border: '1px solid #982c2c', minWidth: 150 }}>
                        Login/SignUp
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}




