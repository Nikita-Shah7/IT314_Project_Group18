import React, { useState } from 'react';
import data from './data2';
import Review from './Reviews';
import './Review.css';

export default function Reviewlist() {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const filteredData =
    activeFilter === 'all'
      ? data
      : data.filter((item) => item.comments.toLowerCase().includes(activeFilter.toLowerCase()));

  const reviewlist = filteredData.map((item) => {
    return (
      <Review
        key={item.id}
        id={item.id}
        serviceRate={item.sevicerate}
        foodRate={item.foodrate}
        comments={item.comments}
        date={item.date_time.substring(0, 9)}
      />
    );
  });

  return (
    <>
    <div className='bg'>
      <h1 className='ti-re'>Reviews : </h1>
      <div className='button-container'>
        <button onClick={() => handleFilterClick('all')}>All Reviews</button>
        <button onClick={() => handleFilterClick('food')}>Food</button>
        <button onClick={() => handleFilterClick('staff')}>Staff</button>
        <button onClick={() => handleFilterClick('place')}>Place</button>
      </div>
      <section className='rev-list'>{reviewlist}</section>
    </div>
    </>
  );
}
