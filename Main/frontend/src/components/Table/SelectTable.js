import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import Sheet from "@mui/material/Table";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonComponent from "../Button/ButtonComponent.jsx";
import Loader from "../Loader/Loader.js";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

import { table as tableAxios } from "../AxiosCreate";
import BookedTable from "./BookedTable";


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


const SelectTable = ({ totalMembers }) => {
  console.log("nik in selectTable...")
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tablesData, setTablesData] = useState([]);

  useEffect(() => {
    tableAxios.get(`capacity/${totalMembers}`)
      .then((response) => {
        // console.log([response.data][0].data);
        setTablesData([response.data][0].data)
        setLoading(false)
      })
      .catch((error) => {
        console.log("ERROR MESSAGE ::", error)
        setLoading(false);
      });
  }, []);

  const handleSelectTable = (tableNumber) => {
    setSelectedTable(tableNumber);
    setShowConfirmation(true);
  };

  const handleConfirm = async (confirmation) => {
    if (confirmation) {
      localStorage.setItem("table_id", selectedTable);
      let data = {};
      await tableAxios.get(`${selectedTable}`)
        .then((response) => {
          setLoading(false)
          data = response.data.data;
        })
        .catch((error) => {
          console.log("ERROR MESSAGE ::", error)
          setLoading(false);
        });

      data = {
        ...data,
        "availability_status": "Occupied",
      }
      await tableAxios.put(`${selectedTable}`, data)
        .then((response) => {
          localStorage.setItem("table_capacity", data.capacity);
          setLoading(false)
        })
        .catch((error) => {
          console.log("ERROR MESSAGE ::", error)
          setLoading(false);
        });
    }
    setShowConfirmation(false);
  };

  if (localStorage.getItem("table_id")) {
    return (
      <BookedTable tableNumber={selectedTable} />
    );
  } else {
    return (
      <>
      {loading ? (
        <Loader />
      ) : (
      <Box minHeight="100vh" marginBottom="0px">
        <Box className="container">
          <Typography
            variant="h5"
            fontFamily="Darker Grotesque"
            marginBottom="20px"
            marginTop="0px"
            textAlign="center"
            fontSize={35}
          >
            Please Select a Table
          </Typography>
          <div style={{ maxHeight: "650px", overflowY: "auto" }}>
            <Sheet
              sx={{
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "local, local, scroll, scroll",
              }}
            >
              <Table
                // stickyHeader
                style={{
                  width: "100%",
                  // border: "2px solid #942D2D",
                  // borderRadius: "16px", // Rounded corners for the table
                  borderCollapse: "separate", // Add this property to fix rounded corners 
                  marginBottom: "0px"
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "2px solid #942D2D",
                        fontFamily: "David Libre",
                        padding: "15px 10px",
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20,
                        borderTopLeftRadius: "16px", // Rounded top-left corner
                        borderTopRightRadius: "16px",
                        borderBottomRightRadius: "16px",
                        borderBottomLeftRadius: "16px",
                        borderCollapse: "separate",
                      }}
                    >
                      Table Number
                    </th>
                    <th
                      style={{
                        border: "2px solid #942D2D",
                        fontFamily: "Darker Grotesque",
                        padding: "15px 10px",
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20,
                        borderTopLeftRadius: "16px", // Rounded top-left corner
                        borderTopRightRadius: "16px",
                        borderBottomRightRadius: "16px",
                        borderBottomLeftRadius: "16px",
                        borderCollapse: "separate",
                      }}
                    >
                      Capacity
                    </th>
                    <th
                      style={{
                        border: "2px solid #942D2D",
                        fontFamily: "David Libre",
                        padding: "15px 10px",
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20,
                        borderTopLeftRadius: "16px", // Rounded top-left corner
                        borderTopRightRadius: "16px",
                        borderBottomRightRadius: "16px",
                        borderBottomLeftRadius: "16px",
                        borderCollapse: "separate",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tablesData.map((table) => (
                    <tr
                      key={table.table_id}
                      style={{
                        border: "2px solid #942D2D",
                      }}
                    >
                      <td
                        style={{
                          border: "2px solid #942D2D",
                          padding: "15px 10px",
                          
                          textAlign: "center",
                          verticalAlign: "middle",
                          borderTopLeftRadius: "16px", // Rounded top-left corner
                          borderTopRightRadius: "16px",
                          borderBottomRightRadius: "16px",
                          borderBottomLeftRadius: "16px",
                          borderCollapse: "separate",
                        }}
                      >
                        {table.table_id}
                      </td>
                      <td
                        style={{
                          border: "2px solid #942D2D",
                          padding: "15px 10px",
                          
                          textAlign: "center",
                          verticalAlign: "middle",
                          borderTopLeftRadius: "16px", // Rounded top-left corner
                          borderTopRightRadius: "16px",
                          borderBottomRightRadius: "16px",
                          borderBottomLeftRadius: "16px",
                          borderCollapse: "separate",
                        }}
                      >
                        {table.capacity}
                      </td>
                      <td
                        style={{
                          border: "2px solid #942D2D",
                          padding: "15px 60px",
                          textAlign: "center",
                          verticalAlign: "middle",
                          borderTopLeftRadius: "16px", // Rounded top-left corner
                          borderTopRightRadius: "16px",
                          borderBottomRightRadius: "16px",
                          borderBottomLeftRadius: "16px",
                          borderCollapse: "separate",
                          width: "380px",
                          }}>
                        <ButtonComponent color={"primary"} message={"Select Table"} func={() => handleSelectTable(table.table_id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Sheet>
          </div>
          <Dialog
            sx={{ ...styles.popupContainer }}
            open={showConfirmation}
            onClose={() => setShowConfirmation(false)}
          >
            <Box
              sx={{
                ...styles.popupContent,
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
                  Do you want to dine at this Table?{" "}
                </Typography>
                <div>
                  <ButtonComponent color={"primary"} message={"Yes"} func={() => handleConfirm(true)} />
                  <ButtonComponent color={"secondary"} message={"No"} func={() => handleConfirm(false)} />
                </div>
              </form>
            </Box>
          </Dialog>
        </Box>
      </Box>)}
      </>
    );
  }
};

export default SelectTable;
