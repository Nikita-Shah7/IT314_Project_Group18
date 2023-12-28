import React, { useState, useEffect } from 'react';
import './about.css';
import cover from '../../assets/about-1.png';
import aboutAsset from '../../assets/assetAbout.png';
import { Chef } from './Chef';
import Loader from '../Loader/Loader'; // Import the Loader component
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import twitter from '../../assets/twitter.png';
import assetbel from '../../assets/asssetbel.png';

export function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an async operation (e.g., fetching data)
    const fetchData = async () => {
      // Replace the setTimeout with your actual async operation
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        // Show loader while fetching data
        <Loader />
      ) : (
        // Render the content once data is fetched
        <div>
          <div className='coverimg'>
            <img src={cover} alt='cover' />
            <div className='aboutrest'>ABOUT THE RESTAURANT</div>
            <div className='textabout'>
              We love what can happen around the restaurant table. And since 1998 we’ve been committed to empowering that experience. From helping restaurants of all sizes thrive, to enabling diners to find and book the perfect table for every occasion, our story is one of human connection—among diners and restaurants, and between restaurants and their communities. With our passion for hospitality, we take pride in bringing together people and the restaurants they love in the moments that matter.
            </div>
            <div className='assetabout'>
              <img src={aboutAsset} alt='asset_element' />
            </div>
          </div>
          <div>
            <Chef />
            {/* <Chef/>
              <Chef/> */}
          </div>
          <div className='flexdays' style={{ marginBottom: '50px' }}>
            <div className='days'>
              <div className='open'>Opening Hours</div>
              <div>Monday-Wednesday: 11AM-9PM</div>
              <div>Thursday-Saturday: 11PM-10PM</div>
              <div>Happy Hour: Everyday 2PM-6PM</div>
            </div>
            {/* <div>
                <div className='open'>Connect With Us</div>
                <div className='social'>
                    <a href='https://www.facebook.com/'><img src={facebook} alt='facebook' width={80} height={80} /></a>
                    <a href='https://www.instagram.com'><img src={instagram} alt='instagram' width={80} height={80}/></a>
                    <a href='https://twitter.com'><img src={twitter} alt='twitter' width={80} height={80}/></a>
                </div>
            </div> */}
            <div className='assetbel'>
              <img src={assetbel} alt='' width={100} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
