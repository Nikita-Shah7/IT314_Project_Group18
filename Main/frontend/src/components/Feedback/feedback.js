import React, { useEffect, useState } from "react";
import { styles, colors } from "./FeedbackCSS.js";
import { FaStar } from "react-icons/fa";
import image from './flower.png';
import { feedback as feedbackAxios } from '../AxiosCreate.jsx';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LeaveTable from "../LeaveTable/LeaveTable.js";
import ButtonComponent from "../Button/ButtonComponent.jsx";


export default function Feedback() {

  const [loading, setLoading] = useState(true);
  const [starate1, setStarate1] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [starate2, setStarate2] = useState(0);
  const [hoverFoodValue, setHoverFoodValue] = useState(undefined);
  const [comments, setComments] = useState("");
  const stars = Array(5).fill(0);



  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("table_id")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    // console.log(starate1)
    // console.log(starate2)
    // console.log(comments)
  }, [starate1, starate2, comments]);

  const handleClick = (value) => {
    setStarate1(value);
  };

  const handleFoodClick = (value) => {
    setStarate2(value);
  };

  const handleComment = (event) => {
    setComments(event.target.value);
  }

  async function handleSubmit() {
    const date_time = new Date();
    const data = {
      starate1,
      starate2,
      comments,
      date_time,
    }
    await feedbackAxios.post('/', data)
      .then(() => {
        setComments("");
        setStarate1(0);
        setStarate2(0);
        toast.success("Feedback submitted.");
        // console.log("feedback successfull!!");
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        console.log("ERROR MESSAGE ::", error)
        setLoading(false);
        toast.error("Feedback not received.");
      });
  }


  return (
    <>
      <LeaveTable />
      <div style={styles.container}>
        <h2 style={styles.title}>Feedback</h2>
        <div style={styles.ratingSectionsContainer}>
          <div style={styles.ratingSection}>
            <p>Rate Our services:</p>
            <div style={styles.stars}>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    onClick={() => handleClick(index + 1)}
                    color={(hoverValue || starate1) > index ? colors.orange : colors.grey}
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
            <p>Rate Our Food:</p>
            <div style={styles.stars}>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    onClick={() => handleFoodClick(index + 1)}
                    color={(hoverFoodValue || starate2) > index ? colors.orange : colors.grey}
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
          required value={comments}
          placeholder="Share your experience with us!"
          style={styles.textarea} onChange={handleComment}
        > </textarea>
        <p> </p>
        <ButtonComponent color={"primary"} message={"Submit"} func={handleSubmit} />
        <ButtonComponent color={"secondary"} message={"Back"} func={() => navigate('/')} />
        <div style={styles.imageContainer}>
          <img src={image} alt="Flower_Image" style={styles.leftImage} />
        </div>
      </div>
    </>
  );
}



// export default Feedback;

