import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./Footer.css"

const footerStyle = {
  backgroundColor: "#982c2c",
  color: "white",
  padding: "20px",
  marginTop: "0px",
};

const sectionStyle = {
  marginTop: "50px",
  marginBottom: "50px",
};

const iconStyle = {
  fontSize: "32px",
  margin: "0 10px",
  color: "white",
};

const textFieldStyle = {
  background: "white",
};

export default function Footerbox() {
  return (
    <>
      {/* <div style={{ display: 'flex' }}>
                <img src="\flower.png" alt="flower" height="125px" />
            </div> */}
      <footer style={footerStyle}>
        <Grid container spacing={3} style={sectionStyle}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center">
              About Us
            </Typography>
            <Typography variant="body2" align="center">
            Discover a new era of dining at Automn, where culinary mastery meets cutting-edge automation. Elevate your experience with our seamless reservation system and efficient order processing. Embrace the future of flavor and convenience, exclusively at Automn.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center">
              Find Us
            </Typography>
            <div align="center">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon style={iconStyle} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon style={iconStyle} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon style={iconStyle} />
              </a>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center">
              Contact Us
            </Typography>
            <Typography variant="body2" align="center">
              Gmail: Automn123@gmail.com
              <br></br>
              Ph: 1800 11 1825
              <br></br>
              25, Reliance Cross Road, Near DAIICT, 
              <br></br>
              Gandhinagar - 382007
            </Typography>
          </Grid>
        </Grid>

       
      </footer>
    </>
  );
}
