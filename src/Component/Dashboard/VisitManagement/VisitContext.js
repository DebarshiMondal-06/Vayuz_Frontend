import React, { createContext, useEffect, useState } from 'react';
import { getVisit } from './visitsapis';
import Pusher from 'pusher-js';



const createContextVisit = createContext();


const VisitContext = ({ children }) => {
  const [visit, setVisit] = useState([]);
  const [distLoading, setDistLoading] = useState(true);
  const [visitView, setVisitView] = useState({});




  const getAllVisit = () => {
    getVisit().then((ele) => {
      setDistLoading(false);
      setVisit(ele.data.result);
    });
  }
  const handleView = (items) => {
    setVisitView(items);
  }


  useEffect(() => {
    getAllVisit();
  }, []);


  // *********************** PUSHER For Reactivity **********************************
  var pusher = new Pusher('e4cc26ec9a7880133d57', {
    cluster: 'ap2'
  });
  var channel = pusher.subscribe("visit-channel-unigas");
  channel.bind('my-event', function () {
    getAllVisit();
  });

  
  return <createContextVisit.Provider value={{
    visit,
    getAllVisit,
    setDistLoading,
    distLoading,
    handleView,
    visitView
  }}>
    {children}
  </createContextVisit.Provider>
};

export { createContextVisit, VisitContext };
