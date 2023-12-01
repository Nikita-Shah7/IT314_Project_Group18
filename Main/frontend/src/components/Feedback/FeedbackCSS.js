
const colors = {
    orange: "#942D2D",
    grey: "#a9a9a9",
    maroon: "#942D2D"
  };

  
const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#EBF2D5",
      marginTop: "5rem",
    },
    title: {
      marginBottom: "20px", // Add space below the title
    },
    ratingSectionsContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "35%",
    },
    ratingSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flex: 1,
    },
    stars: {
      display: "flex",
      flexDirection: "row",
    },
    textarea: {
      fontFamily: ["Lucida Console", "Courier New", "monospace"],
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "20px 0",
      minHeight: "35vh",
      minWidth: "30vw",
    },
    button: {
      border: "1px solid #942D2D",
      borderRadius: 5,
      width: 200,
      padding: 10,
    },
    imageContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%", // Make sure it spans the entire width
    },
    leftImage: {
      // width: "400px",
      // height: "400px",
      //alignSelf: "flex-start", // Align to the top (left corner)
      width: "300px",
      height: "300px",
      position: "absolute",
      top: "325px",
      left: "1px",
    },
}

export {styles};
export {colors};