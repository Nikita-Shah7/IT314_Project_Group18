import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonComponent from "../Button/ButtonComponent";
import TextField from "@mui/material/TextField";
import SelectTable from "./SelectTable";

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

const EnterMembers = () => {
  const [totalMember, setTotalMember] = useState(0);
  const [totalMembers, setTotalMembers] = useState(null);

  const navigate = useNavigate();
  
  const handleConfirm = () => {
    if (
      totalMember <= 0 ||
      !Number.isInteger(totalMember)
    ) {
      alert("Please enter a valid positive integer number of members.");
    }
    else {
      setTotalMembers(totalMember);
    }
  };

  if(totalMembers) {
    return (<SelectTable totalMembers={totalMembers} />);
  } else {
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
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              type="number"
              variant="outlined"
              value={totalMember}
              onChange={(e) => setTotalMember(parseInt(e.target.value))}
              fullWidth
              inputProps={{ style: { background: "#FFF" } }}
              placeholder="Enter Total Members"
            />
            <ButtonComponent color={"primary"} message={"Confirm"} func={handleConfirm} />
            <ButtonComponent color={"secondary"} message={"Back"} func={() => navigate('/')} />
          </form>
        </Box>
      </Box>
    );
  }
};

export default EnterMembers;
