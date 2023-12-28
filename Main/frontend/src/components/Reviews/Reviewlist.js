import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { feedback as feedbackAxios } from '../AxiosCreate';
import Review from './Reviews';
import './Review.css';
import ButtonComponent from '../Button/ButtonComponent';
import Loader from '../Loader/Loader'
export default function Reviewlist() {

  // console.log("nik in admin feedback");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackCnt, setFeedbackCnt] = useState(0);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    feedbackAxios.get('/')
      .then((response) => {
        // console.log([response.data][0].data)
        setFeedbackCnt([response.data][0].count);
        setFeedbacks([response.data][0].data)
        setLoading(false);
      })
      .catch((error) => {
        console.log("ERROR MESSAGE ::", error)
        setLoading(false);
      });
  }, [feedbackCnt]);

  const filteredData =
    activeFilter === 'all'
      ? feedbacks
      : feedbacks.filter((item) => {
        if (item.comments) {
          return item.comments.toLowerCase().includes(activeFilter.toLowerCase());
        }
      });

  const reviewlist = filteredData.map((item) => {

    return (
      <Review
        key={item.feedback_id}
        data={item}
        feedbackCnt={feedbackCnt}
        setFeedbackCnt={setFeedbackCnt}
      />
    );
  });

  return (
    <>
    {loading ? (
        <Loader />
      ) : (
      <div className='bg'>
        <h1 className='ti-re'>Reviews : </h1>
        <div className='button-container'>
          <ButtonComponent color={"button4"} message={"All"} func={() => handleFilterClick('all')} />
          <ButtonComponent color={"button4"} message={"Food"} func={() => handleFilterClick('food')} />
          <ButtonComponent color={"button4"} message={"Staff"} func={() => handleFilterClick('staff')} />
          <ButtonComponent color={"button4"} message={"Place"} func={() => handleFilterClick('place')} />
        </div>
        <section className='rev-list'>{reviewlist}</section>
      </div>)}
    </>
  );
}
