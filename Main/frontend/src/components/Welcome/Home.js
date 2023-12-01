import React from "react";
import Typography from "@mui/material/Typography";  
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import './home.css';

export default function Home(props) {
  let navigate = useNavigate();
  function navigatetoMenu() {
    navigate('/menu')
  }
  return (
    <>
      <div className="imageset"
        style={{ 
          backgroundImage: `url("/Group 8516.png") ` ,
        }}
      > 
      
     
    
        <div >
          <Typography
            className="welcomee"
            variant="body1"
            sx={{
              fontFamily: "Darker Grotesque",
              fontSize: 60,
              marginLeft: '12%',
            }}
          >
            {/* Welcome { !localStorage.getItem("isAdminAuth") ? (`${props.userName}`) :("Admin") }, */}
            Welcome{ !localStorage.getItem("isAdminAuth") ? ("") :(" Admin") },
          </Typography>
        </div>

        <div className="welcometext">
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Darker Grotesque",
              fontSize: 25,
            }}
          >
            Enjoy delicious food of your choices, <br></br>
            by ordering it from our digital menu and pay for it online.
          </Typography>
        </div> 

        <Button
                  className="viewMenu"
                  onClick={navigatetoMenu}
                   color="primary"
                  
                  Width = {10}
                  sx={{
                    marginTop: "10%", 
                    marginLeft: "150px",
                    marginBottom: "0px",
                    color: "#FFF", 
                    bgcolor: "#942D2D",
                    fontFamily: "Darker Grotesque", // Set font-family  
                    hoverColor: "#000",
                    width: '170px',
                    borderRadius: '0px',
                    ":hover": {
                      bgcolor: '#EBF2D5',
                      color: '#942D2D',
                      borderColor: '#942D2D',
                      borderWidth: '4px'
                    } 
                  }
                }
                > 
                
                  <Typography fontSize={20} >View Menu</Typography>
                </Button>
      </div>
    </>
  );
}
