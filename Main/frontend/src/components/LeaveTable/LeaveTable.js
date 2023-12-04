import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const styles = {
  popupContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    animation: "fadeIn 0.5s",
    zIndex: 999,
  },
  popupContent: {
    background: "#fff",
    padding: "125px",
    maxWidth: "600px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    animation: "slideIn 0.5s",
    textAlign: "center",
  },
};

const LeaveTable = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  // const handleYes = () => {
  //   // window.location.href = 'https://github.com/Nikita-Shah7/IT314_Project_Group18/tree/main';
  //   return <RestaurantMenu />;
  // };

  // const handleNo = () => {
  //   // window.location.href = 'https://github.com/Nikita-Shah7/IT314_Project_Group18/tree/main';
  //   return <RestaurantMenu />;
  // };

  return (
    <Dialog sx={{ ...styles.popupContainer }} open={open} onClose={handleClose}>
      <Box
        sx={{
          ...styles.popupContent,
          bgcolor: "#f0f4d4", // Replace the background color
          border: "2px solid #942D2D", // Replace the border color
          marginBottom: "0px", // Add margin bottom
          marginTop: "0px", // Add margin top
        }}
      >
        <Typography
          variant="h6"
          fontSize={40}
          sx={{
            fontFamily: "Darker Grotesque", // Set font-family
            marginBottom: "0px",
            marginTop: "-100px",
          }}
        >
          Confirmation
        </Typography>
        <form>
          <Typography sx={{ marginTop: "50px" }} fontSize={22}>
            {" "}
            Do you want to leave this Table?{" "}
          </Typography>

          <div>
            <Button
              onClick={() => handleClose()}
              color="secondary"
              variant="contained" 
              fullWidth
              sx={{
                marginTop: "40px",
                color: "#FFF",
                bgcolor: "#942D2D",
                fontFamily: "Darker Grotesque", // Set font-family
              }}
            >
              <Typography fontSize={20}>Yes, I am full now</Typography>
            </Button>
            <Button 
            href = "/menu"
              // onClick={() => handleNo()}
              color="secondary"
              variant="contained" 
              fullWidth
              sx={{
                marginTop: "20px",
                marginBottom: "-50px",
                color: "#FFF",
                bgcolor: "#000",
                fontFamily: "Darker Grotesque", // Set font-family
              }}
            > 
              <Typography fontSize={20}>No, continue ordering</Typography>
            </Button>
          </div>
        </form>
      </Box>
    </Dialog>
  );
};

export default LeaveTable;
