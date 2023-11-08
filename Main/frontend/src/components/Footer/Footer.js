import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

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
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
              in, consequuntur dolore, sequi pariatur aspernatur sit labore
              architecto porro illo placeat veritatis? Vero repellat nisi
              architecto rerum, fuga accusantium perferendis doloremque.
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
              Newsletter
            </Typography>
            <TextField
              type="email"
              variant="outlined"
              fullWidth
              label="Enter your email"
              InputProps={{
                style: { background: "white", color: "white" },
              }}
            />
          </Grid>
        </Grid>

        {/* Additional Boxes */}
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          p={2}
        >
          <Box
            borderTop={1}
            borderColor="white"
            p={2}
            width={{ xs: 150, sm: 194 }}
          >
            {/* Content for the first box */}
          </Box>
          <Box
            borderTop={1}
            borderColor="white"
            p={2}
            width={{ xs: 150, sm: 104 }}
          >
            {/* Content for the first box */}
          </Box>
          <Box
            borderTop={1}
            borderColor="white"
            p={2}
            width={{ xs: 150, sm: 194 }}
          >
            {/* Content for the second box */}
          </Box>
        </Box>
      </footer>
    </>
  );
}
