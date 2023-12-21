import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import Dialog from "@mui/material/Dialog";
import ButtonComponent from "../Button/ButtonComponent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { cartItems, table as tableAxios } from "../AxiosCreate";

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

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const vacantTable = async () => {
    setOpen(false);
    const data = {
      "table_id": localStorage.getItem("table_id"),
      "capacity": localStorage.getItem("table_capacity"),
      "availability_status": "Available"
    }

    setLoading(true)
    await tableAxios.put(`/${localStorage.getItem("table_id")}`, data)
      .then(async (response) => {
        // console.log(response.data.data)
        localStorage.removeItem("table_id");
        localStorage.removeItem("table_capacity");
        console.log("table vacant successfull..!!");
        
        await cartItems.delete(`/cart_table/${localStorage.getItem("table_id")}`)
          .then((response) => {
            setLoading(false);
          })
          .catch((error) => {
            console.log("ERROR MESSAGE ::", error)
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log("ERROR MESSAGE ::", error)
        setLoading(false);
      });
  };


  return (
    <Dialog sx={{ ...styles.popupContainer }} open={open}>
      <Box
        sx={{
          ...styles.popupContent,
          bgcolor: "#f0f4d4", // Replace the background color
          border: "2px solid #942D2D", // Replace the border color
          marginBottom: "0px", // Add margin bottom
          marginTop: "0px", // Add margin top
        }}>
        <Typography
          variant="h6"
          fontSize={40}
          sx={{
            fontFamily: "Darker Grotesque", // Set font-family
            marginBottom: "0px",
            marginTop: "-100px",
          }}>
          Confirmation
        </Typography>
        <form onSubmit={(e) => e.preventDefault()}>
          <Typography sx={{ marginTop: "50px" }} fontSize={22}>
            {" "}
            Do you want to leave this Table?{" "}
          </Typography>
          <div>
            <ButtonComponent color={"primary"} message={"Yes"} func={vacantTable} />
            <ButtonComponent color={"secondary"} message={"No, continue ordering"} func={() => navigate('/menu')} />
          </div>
        </form>
      </Box>
    </Dialog>
  );
};

export default LeaveTable;
