import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getAllState } from './stateapis';


const createContextState = createContext();


const StateContext = ({ children }) => {
  const loc = useLocation();
  const [states, setState] = useState([]);
  const [editData, setEditData] = useState({
    editId: '',
    stateVal: ''
  });
  const [distLoading, setDistLoading] = useState(true);
  useEffect(() => {
    if (loc.pathname === '/state') {
      setEditData({});
    }
  }, [loc]);



  const getState = () => {
    getAllState().then((el) => {
      setDistLoading(false);
      setState(el.data.result);
    });
  }
  const editHandleState = (id, stateVal) => {
    setEditData({ editId: id, stateVal });
  }
  useEffect(() => {
    getState();
  }, []);


  
  return <createContextState.Provider value={{
    states,
    editData,
    getState,
    editHandleState,
    setDistLoading,
    distLoading
  }}>
    {children}
  </createContextState.Provider>
};

export { createContextState, StateContext };
