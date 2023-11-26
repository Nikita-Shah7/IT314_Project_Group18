import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const textColor = "#982c2c"; // Define the text color

  const linkStyle = {
    color: textColor,
    textDecoration: "none", // Remove underline from links
  };

  const isSmallScreen = useMediaQuery("(max-width:750px)");

  const navigate = useNavigate();
  const handleAdminLogin = () => {
    if(localStorage.getItem("isAdminAuth")) {
      localStorage.removeItem("isAdminAuth");
      localStorage.removeItem("accessToken");      
    }
    navigate('/adminlogin');
  }

  return (
    <Box sx={{ marginBottom: 0, flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#f0f4d4", boxShadow: "none" }}
      >
      { !localStorage.getItem("isAdminAuth") ?
        (
          <Toolbar>
          {/* Left section with restaurant name and logo */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            {/* You can replace 'logo.png' with your actual logo */}
            <img
              src="logo.png"
              alt="Restaurant Logo"
              style={{ width: 40, height: 40, marginRight: 8 }}
            />
            <Typography variant="h6" component="div" sx={{ color: textColor }}>
              Restaurant
            </Typography>
          </Box>

          {/* Middle section with hyperlinks centered in the middle of the screen */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: isSmallScreen ? "wrap" : "no-wrap",
              width: "100%",
            }}
          >
            <Link href="/" color="inherit" sx={{ m: 2, ...linkStyle }}>
              Home
            </Link>
            <Link href="/menu" color="inherit" sx={{ m: 2, ...linkStyle }}>
              Menu
            </Link>
            { !localStorage.getItem("table_id") ? <></> :
              <Link href="/cart" color="inherit" sx={{ m: 2, ...linkStyle }}>
                Cart
              </Link>
            }
            <Link href="/tablebooking" color="inherit" sx={{ m: 2, ...linkStyle }}>
              Book a Table
            </Link>
            <Link href="/table" color="inherit" sx={{ m: 2, ...linkStyle }}>
              DinnTable
            </Link>
            <Link href="/aboutus" color="inherit" sx={{ m: 2, ...linkStyle }}>
              About
            </Link>
          </Box>

          {/* Right section with the login button */}
          <Button
            color="inherit"
            sx={{
              borderRadius: "0",
              color: textColor,
              backgroundColor: "white",
              border: "1px solid #982c2c",
              minWidth: 150,
            }}
            onClick={handleAdminLogin}
          >
            Login/SignUp
          </Button>
        </Toolbar>
        ) : (
          <Toolbar>
          {/* Left section with restaurant name and logo */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            {/* You can replace 'logo.png' with your actual logo */}
            <img
              src="logo.png"
              alt="Restaurant Logo"
              style={{ width: 40, height: 40, marginRight: 8 }}
            />
            <Typography variant="h6" component="div" sx={{ color: textColor }}>
              Restaurant
            </Typography>
          </Box>

          {/* Middle section with hyperlinks centered in the middle of the screen */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: isSmallScreen ? "wrap" : "no-wrap",
              width: "100%",
            }}
          >
            <Link href="/" color="inherit" sx={{ m: 2, ...linkStyle }}>
              Home
            </Link>
            <Link href="/admincategory" color="inherit" sx={{ m: 2, ...linkStyle }}>
              Category
            </Link>            
            <Link href="/adminmenu" color="inherit" sx={{ m: 2, ...linkStyle }}>
              Menu
            </Link>            
            <Link href="/admintable" color="inherit" sx={{ m: 2, ...linkStyle }}>
              DinnTable
            </Link>
            <Link href="/adminanalysis" color="inherit" sx={{ m: 2, ...linkStyle }}>
              SalesAnalysis
            </Link>
            <Link href="/adminfeedback" color="inherit" sx={{ m: 2, ...linkStyle }}>
              Feedbacks
            </Link>            
            <Link href="/aboutus" color="inherit" sx={{ m: 2, ...linkStyle }}>
              About
            </Link>
          </Box>

          {/* Right section with the login button */}
          <Button
            color="inherit"
            sx={{
              borderRadius: "0",
              color: textColor,
              backgroundColor: "white",
              border: "1px solid #982c2c",
              minWidth: 150,
            }}
            onClick={handleAdminLogin}
          >
            LogOut
          </Button>
        </Toolbar>
        )}        
      </AppBar>
    </Box>
  );
}
