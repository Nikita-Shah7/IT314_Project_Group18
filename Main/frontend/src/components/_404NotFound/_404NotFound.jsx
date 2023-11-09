import React from 'react';
import image from './404imagee.png'

function _404NotFound() {
    return (
        <div className="error-page" height={350}
            width={700} align="center" top="50%">
            <div className="centered-div"> 
                <img src={image} alt='404NotFound' height="500vh" />
            </div>
        </div>
    );
}

export default _404NotFound;