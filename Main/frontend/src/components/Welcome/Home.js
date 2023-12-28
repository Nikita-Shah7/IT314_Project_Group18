import React, { useState, useEffect } from "react";
import ButtonComponent from "../Button/ButtonComponent";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader"; // Import the Loader component
import {Header} from "../Header/Header"
import {Footer} from "../Footer/Footer"

import './Home.scss';

export default function Home(props) {
  const [loading, setLoading] = useState(true); // Add loading state
  const isAdmin = localStorage.getItem("isAdminAuth") === "true";
  let navigate = useNavigate();

  useEffect(() => {
    // Simulate an async operation (e.g., checking user authentication)
    const checkAuthentication = async () => {
      // Replace the setTimeout with your actual async operation
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };

    checkAuthentication();
  }, []);

  function navigatetoMenu() {
    !isAdmin ? navigate('/menu') : navigate('/adminmenu');
  }

  return (
    <>
      {loading ? (
        // Show loader while checking authentication
        <Loader />
      ) : (
        // Render the content once authentication check is complete
        <div className="home-container">
          <div className="home-content">
            <h2>
              Welcome{!localStorage.getItem("isAdminAuth") ? (` ${props.userName}`) : (" Admin")},
            </h2>
            <p>
              Enjoy delicious food of your choices, <br />
              by ordering it from our digital menu and pay for it online.
            </p>
            <ButtonComponent color={"primary"} message={"View Menu"} func={navigatetoMenu} />
          </div>
        </div>
      )}
    </>
  );
}
