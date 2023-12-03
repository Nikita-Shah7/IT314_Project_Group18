import React from 'react';
import image from './imagee2.svg'; // Import your SVG file
import './_404NotFound.css'; // Import your CSS file for styling

function _404NotFound() {
  return (
    <div className="error-page">
      <div className="centered-div">
        <img src={image} alt='404NotFound' className="error-image" />
      </div>
      <div className="content">
        <h1>Whoops, Nothing Delicious Here</h1>
        <p className="error-text">
          Seems like the page you are trying to find is no longer here.
        </p>
      </div>
    </div>
  );
}

export default _404NotFound;
