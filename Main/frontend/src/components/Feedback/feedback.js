import React, { useState } from "react";
import { styles, colors } from "./FeedbackCSS.js";
import { FaStar } from "react-icons/fa";
import image from './Flower.png';


function Feedback() {
  console.log("nik in feedback");
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
        <img src={image} alt="Flower_Image" style={styles.leftImage} />
      </div>
    </div>
  );
}


export default Feedback;



