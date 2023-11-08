import React from "react";
import Typography from "@mui/material/Typography";  
import Button from "@mui/material/Button";

export default function Home(props) {
  return (
    <>
      <div
        style={{
          backgroundColor: "#f0f4d4",
          minHeight: "92vh", 
          minWidth: "92vh",
          marginBottom: "0px",  
          backgroundImage: `url("/Group 8516.png") ` ,
          backgroundSize:"cover", 
          backgroundPosition : "Top", 
           height : "101vh"
         
        }}
      > 
      
     
    
        <div >
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Darker Grotesque",
              color: "#000",
              marginTop: "0px", // Adjust this value to control the distance from the top
              marginLeft: "150px",
              marginBottom: "0px",
              fontSize: 60,
            }}
          >
            Welcome {props.userName},
          </Typography>
        </div>

        <div>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Darker Grotesque",
              color: "#000",
              marginTop: "0px",
              marginLeft: "160px",
              marginBottom: "0px",
              fontSize: 25,
            }}
          >
            Enjoy delicious food of your choices, <br></br>
            by ordering it from our digital menu and pay for it online.
          </Typography>
        </div> 

        <Button
                  //onClick={() => handleConfirm(false)}
                   color="primary"
                  
                  Width = {10}
                  sx={{
                    marginTop: "180px", 
                    marginLeft: "150px",
                    marginBottom: "0px",
                    color: "#FFF", 
                    bgcolor: "#942D2D",
                    fontFamily: "Darker Grotesque", // Set font-family  
                    hoverColor: "#000"
                  }}
                > 
                
                  <Typography fontSize={20} >View Profile</Typography>
                </Button>
      </div>
    </>
  );
}
