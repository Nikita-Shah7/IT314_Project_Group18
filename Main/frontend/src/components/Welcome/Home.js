import React from "react";
import ButtonComponent from "../Button/ButtonComponent";
import { useNavigate } from "react-router-dom";
import './Home.scss';

export default function Home(props) {
  const isAdmin = localStorage.getItem("isAdminAuth") === "true";
  let navigate = useNavigate();
  function navigatetoMenu() {
    { !isAdmin ? navigate('/menu') : navigate('/adminmenu') }
  }
  return (
    <>
      <div className="home-container">
        <div className="home-content">
          <h2>
            {/* Welcome { !localStorage.getItem("isAdminAuth") ? (`${props.userName}`) :("Admin") }, */}
            Welcome{!localStorage.getItem("isAdminAuth") ? ("") : (" Admin")},
          </h2>
          <p>Enjoy delicious food of your choices, <br />
            by ordering it from our digital menu and pay for it online.
          </p>
          <ButtonComponent color={"primary"} message={"View Menu"} func={navigatetoMenu} />
        </div>
      </div>
    </>
  );
}
