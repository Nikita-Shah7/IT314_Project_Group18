import React, { useState } from "react";
import "./ButtonComponent.scss";


function ButtonComponent(props) {

    // console.log(props);
    let buttonClass = 'buttonComponent';    

    if (props.color === 'primary') {
        buttonClass += ' primary';
      } else if (props.color === 'secondary') {
        buttonClass += ' secondary';
      } else if (props.color === 'tertiary') {
        buttonClass += ' tertiary';
      } else if (props.color === 'button4') {
        buttonClass += ' button4';
      } else if (props.color === 'button5') {
        buttonClass += ' button5';
      }

    return (
        <div className="buttonComponent">
            <button
                className={buttonClass}
                onClick={props.func}>
                {props.message}
            </button>
        </div>
    );
}

export default ButtonComponent;