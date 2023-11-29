import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';

export default function Header() {
    const textColor = '#982c2c';
    const maroonColor = '#800000';

    const linkStyle = {
        color: textColor,
        textDecoration: 'none', // Removing underline from links
    };

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ marginBottom: 10, flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#f0f4d4', boxShadow: 'none' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Left section with restaurant name and logo */}
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', }}>
                        <img src="logo.png" alt="Restaurant Logo" style={{ width: 40, height: 40, marginRight: 8 }} />
                        <Typography variant="h6" component="div" sx={{ color: textColor, }}>
                            Restaurant
                        </Typography>
                    </Box>

                    {/* Center section with hyperlinks or dropdown menu */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'no-wrap',
                        width: '100%',
                    }}>
                        {!isSmallScreen && (
                            <>
                                <Link href="/home" color="inherit" sx={{ m: 2, ...linkStyle }}>
                                    Home
                                </Link>
                                <Link href="/menu" color="inherit" sx={{ m: 2, ...linkStyle }}>
                                    Menu
                                </Link>
                                <Link href="/about" color="inherit" sx={{ m: 2, ...linkStyle }}>
                                    About Us
                                </Link>
                            </>
                        )}
                        {isSmallScreen && (
                            <>
                                <Box sx={{ marginLeft: 'auto' }}>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        color="inherit"
                                        aria-label="menu"
                                        onClick={handleMenuClick}
                                        sx={{ color: maroonColor }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    getContentAnchorEl={null}
                                >
                                    <MenuItem onClick={handleMenuClose}>
                                        <Link href="/home" color="inherit" sx={{ ...linkStyle }}>
                                            Home
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleMenuClose}>
                                        <Link href="/menu" color="inherit" sx={{ ...linkStyle }}>
                                            Menu
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleMenuClose}>
                                        <Link href="/about" color="inherit" sx={{ ...linkStyle }}>
                                            About Us
                                        </Link>
                                    </MenuItem>
                                    {/* Login/SignUp button in the dropdown menu */}
                                    <MenuItem onClick={handleMenuClose}>
                                        <Button color="inherit" sx={{ borderRadius: '0', color: textColor, backgroundColor: 'white', border: '1px solid #982c2c', minWidth: 150 }}>
                                            Login/SignUp
                                        </Button>
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Box>

                    {/* Right section with the login button (outside the menu) */}
                    {!isSmallScreen && (
                        <Button color="inherit" sx={{ borderRadius: '0', color: textColor, backgroundColor: 'white', border: '1px solid #982c2c', minWidth: 150 }}>
                            Login/SignUp
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
