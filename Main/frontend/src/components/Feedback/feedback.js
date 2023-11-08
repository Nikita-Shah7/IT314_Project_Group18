import React, { useState } from "react";

import { FaStar } from "react-icons/fa";


const colors = {
  orange: "#942D2D",
  grey: "#a9a9a9",
  maroon: "#942D2D"
};


function feedback() {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [currentFoodValue, setCurrentFoodValue] = useState(0);
  const [hoverFoodValue, setHoverFoodValue] = useState(undefined);
  const stars = Array(5).fill(0);


  const handleClick = (value) => {
    setCurrentValue(value);
  };


  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };


  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };


  const handleFoodClick = (value) => {
    setCurrentFoodValue(value);
  };


  const handleFoodMouseOver = (newHoverValue) => {
    setHoverFoodValue(newHoverValue);
  };


  const handleFoodMouseLeave = () => {
    setHoverFoodValue(undefined);
  };


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Feedback</h2>
      <div style={styles.ratingSectionsContainer}>
        <div style={styles.ratingSection}>
        <p style={{ marginRight: "35px" }}>Rate Our services:</p>
          <div style={styles.stars}>
            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={24}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                  style={{
                    marginRight: 10,
                    cursor: "pointer"
                  }}
                />
              );
            })}
          </div>
        </div>
        <div style={styles.ratingSection}>
          <p style={{ marginRight: "55px" }}>Rate Our Food:</p>
          <div style={styles.stars}>
            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={24}
                  onClick={() => handleFoodClick(index + 1)}
                  onMouseOver={() => handleFoodMouseOver(index + 1)}
                  onMouseLeave={handleFoodMouseLeave}
                  color={(hoverFoodValue || currentFoodValue) > index ? colors.orange : colors.grey}
                  style={{
                    marginRight: 10,
                    cursor: "pointer"
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      <p> </p>
      <textarea
        placeholder="Share your experience with us !"
        style={styles.textarea}
      />
      <p> </p>
      <button
        style={{
          ...styles.button,
          backgroundColor: colors.maroon,
          borderColor: colors.maroon
        }}
      >
        Submit
      </button>
      <p> </p>
      <p> </p>
      <p> </p>
      <div style={styles.imageContainer}>
        <img src='./flower.png' alt="Flower_Image" style={styles.leftImage} />
        {/* <img src="/screenshot-20231107-231707-1@2x.png" alt="Food_Image" style={styles.rightImage} /> */}
      </div>
    </div>
  );
}


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#EBF2D5",
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
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 200,
    width: 400,
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
 



};


export default feedback;



