import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ButtonComponent from "../Button/ButtonComponent";
import Link from "@mui/material/Link";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Header.css"
import Automn_logo from "../../assets/Automn_logo.png"

export default function Header() {
  const textColor = "#942d2d";

  const linkStyle = {
    color: textColor,
    textDecoration: "none",
  };

  const isSmallScreen = useMediaQuery("(max-width:1000px)");
  const isAdmin = localStorage.getItem("isAdminAuth") === "true";
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleAdminLogin = () => {
    if (localStorage.getItem("isAdminAuth")) {
      localStorage.removeItem("isAdminAuth");
      localStorage.removeItem("accessToken");
    }
    navigate("/userlogin");
  };

  return (
    <Box sx={{ marginBottom: 0, flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#EBF2D5", boxShadow: "none" }}
      >
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={Automn_logo}
              alt="Automn Logo"
              style={{ width: 40, height: 40, marginRight: 8 }}
            />
            <Typography variant="h4" component="div" sx={{ color: textColor, fontFamily: 'Dancing Script' }} className="rest-name"
              onClick={() => navigate('/')}>
              Automn
            </Typography>
          </Box>

          {isSmallScreen ? (
            // Hamburger menu for small screens
            <Box
              className="menu-icon"
              onClick={handleDrawerOpen}
              sx={{ cursor: "pointer", fontSize: 24, marginRight: 0 }}
            >
              &#9776;
            </Box>
          ) : (
            // Navigation links for larger screens
            <Box className='navbar'
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "no-wrap",
                width: "100%",
              }}
            >
              <Link href="/" color="inherit" sx={{ m: 2, ...linkStyle }}>
                Home
              </Link>
              {isAdmin ? (
                <>
                  <Link
                    href="/admincategory"
                    color="inherit"
                    sx={{ m: 2, ...linkStyle }}
                  >
                    Category
                  </Link>
                  <Link
                    href="/adminmenu"
                    color="inherit"
                    sx={{ m: 2, ...linkStyle }}
                  >
                    Menu
                  </Link>
                  <Link
                    href="/admintable"
                    color="inherit"
                    sx={{ m: 2, ...linkStyle }}
                  >
                    DinnTable
                  </Link>
                  <Link
                    href="/adminorders"
                    color="inherit"
                    sx={{ m: 2, ...linkStyle }}
                  >
                    Orders
                  </Link>
                  <Link
                    href="/adminanalysis"
                    color="inherit"
                    sx={{ m: 2, ...linkStyle }}
                  >
                    SalesAnalysis
                  </Link>
                  <Link
                    href="/adminfeedback"
                    color="inherit"
                    sx={{ m: 2, ...linkStyle }}
                  >
                    Feedbacks
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/menu"
                    color="inherit"
                    sx={{ m: 2, ...linkStyle }}
                  >
                    Menu
                  </Link>
                  {localStorage.getItem("table_id") && (
                    <Link
                      href="/cart"
                      color="inherit"
                      sx={{ m: 2, ...linkStyle }}
                    >
                      Cart
                    </Link>
                  )}
                  <Link
                    href="/tablebooking"
                    color="inherit"
                    sx={{ m: 2, ...linkStyle }}
                  >
                    Book a Table
                  </Link>
                  <Link
                    href="/adminfeedback"
                    color="inherit"
                    sx={{ m: 2, ...linkStyle }}
                  >
                    Feedbacks
                  </Link>
                </>
              )}
              
              <Link
                href="/aboutus"
                color="inherit"
                sx={{ m: 2, ...linkStyle }}
              >
                About
              </Link>
            </Box>
          )}

          {!isSmallScreen && (
            // "Login/Signup" and "Logout" buttons for larger screens
            <ButtonComponent color={"tertiary"} message={!localStorage.getItem("isAdminAuth")
            ? "Login/SignUp"
            : "LogOut"} func={handleAdminLogin} />
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for small screens */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{ width: "70vw" }}
      >
        <List style={{ backgroundColor: '#942D2D', height: '100%', color: '#EBF2D5' }}>
          <ListItem button onClick={() => navigate("/")}>
            <ListItemText primary="Home" />
          </ListItem>
          {isAdmin ? (
            <>
              <ListItem button onClick={() => navigate("/admincategory")}>
                <ListItemText primary="Category" />
              </ListItem>
              <ListItem button onClick={() => navigate("/adminmenu")}>
                <ListItemText primary="Menu" />
              </ListItem>
              <ListItem button onClick={() => navigate("/admintable")}>
                <ListItemText primary="DinnTable" />
              </ListItem>
              <ListItem button onClick={() => navigate("/adminanalysis")}>
                <ListItemText primary="SalesAnalysis" />
              </ListItem>
              <ListItem button onClick={() => navigate("/adminfeedback")}>
                <ListItemText primary="Feedbacks" />
              </ListItem>
              <ListItem button onClick={() => navigate("/adminorders")}>
                <ListItemText primary="OrderDetails" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button onClick={() => navigate("/menu")}>
                <ListItemText primary="Menu" />
              </ListItem>
              {localStorage.getItem("table_id") && (
                <ListItem button onClick={() => navigate("/cart")}>
                  <ListItemText primary="Cart" />
                </ListItem>
              )}
              <ListItem button onClick={() => navigate("/tablebooking")}>
                <ListItemText primary="Book a Table" />
              </ListItem>
              <ListItem button onClick={() => navigate("/adminfeedback")}>
                <ListItemText primary="Feedback" />
              </ListItem>
              
            </>
          )}
          <ListItem button onClick={() => navigate("/aboutus")}>
            <ListItemText primary="About" />
          </ListItem>
          {/* "Login/Signup" and "Logout" buttons for small screens */}
          <ListItem>
          <ButtonComponent color={"tertiary"} message={!localStorage.getItem("isAdminAuth")
            ? "Login/SignUp"
            : "LogOut"} func={handleAdminLogin} />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
