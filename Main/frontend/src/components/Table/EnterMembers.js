import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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

const EnterMembers = ({ onMembersConfirmed }) => {
  const [totalMembers, setTotalMembers] = useState("");

  const handleConfirm = () => {
    if (
      totalMembers === "" ||
      totalMembers <= 0 ||
      !Number.isInteger(parseFloat(totalMembers))
    ) {
      alert("Please enter a valid positive integer number of members.");
    } else {
      onMembersConfirmed(parseInt(totalMembers));
    }
  };

  return (
    <Box sx={{ ...styles.popupContainer }}>
      <Box
        sx={{
          ...styles.popupContent,
          bgcolor: "#f0f4d4", // Replace the background color
          border: "2px solid #942D2D", // Replace the border color
          marginBottom: "120px", // Add margin bottom
          marginTop: "20px", // Add margin top
        }}
      >
        <Typography
          variant="h6"
          fontSize={40}
          sx={{
            fontFamily: "Darker Grotesque", // Set font-family
            marginBottom: "40px",
          }}
        >
          Enter Total Members
        </Typography>
        <form>
          <TextField
            type="number"
            variant="outlined"
            value={totalMembers}
            onChange={(e) => setTotalMembers(e.target.value)}
            fullWidth
            inputProps={{ style: { background: "#FFF" } }}
            placeholder="Enter Total Members"
          />
          <Button
            type="button"
            onClick={handleConfirm}
            fullWidth
            sx={{
              marginTop: "20px",
              color: "#FFF",
              bgcolor: "#942D2D",
              fontFamily: "Darker Grotesque", // Set font-family
            }}
          >
            <Typography fontSize={20}>Confirm</Typography>
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EnterMembers;
