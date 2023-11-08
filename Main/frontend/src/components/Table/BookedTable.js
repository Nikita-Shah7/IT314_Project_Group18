import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const BookedTable = ({ tableNumber }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f0f4d4"
    >
      <Typography
        variant="h5"
        fontFamily="Darker Grotesque"
        textAlign="center"
        fontSize={70}
      >
        You have booked table No. {tableNumber}
      </Typography>
    </Box>
  );
};

export default BookedTable;
