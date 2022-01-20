/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authContext } from '../../../Context/authContext';
import { getFeedback } from './feedbackapis';
import Pusher from 'pusher-js';



const createFeedbackContext = createContext();



const FeedbackContext = ({ children }) => {
  const { token } = useContext(authContext);
  const [feedback, setFeedback] = useState([]);
  const [distLoading, setDistLoading] = useState(true);


  const getAllFeedback = () => {
    const { ID } = token;
    getFeedback(ID).then((el) => {
      setDistLoading(false);
      setFeedback(el.data.result);
    });
  }

  useEffect(() => {
    getAllFeedback();
  }, [])

  // *********************** PUSHER For Reactivity **********************************
  var pusher = new Pusher('e4cc26ec9a7880133d57', {
    cluster: 'ap2'
  });
  var channel = pusher.subscribe("feedback-unigas-channel");
  channel.bind('my-event', function () {
    getAllFeedback();
  });


  return <createFeedbackContext.Provider value={{
    feedback,
    getAllFeedback,
    distLoading
  }}>
    {children}
  </createFeedbackContext.Provider>
}

export { FeedbackContext, createFeedbackContext };
