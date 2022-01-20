import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getAllDist, getAllState } from './distapis';


const createContextDist = createContext();


const DistContext = ({ children }) => {
  const loc = useLocation();
  const [data, setData] = useState([]);
  const [states, setState] = useState([]);
  const [editData, setEditData] = useState({
    editId: '',
    district: '',
    state: { label: '', value: '' }
  });
  const [distLoading, setDistLoading] = useState(true);
  useEffect(() => {
    if (loc.pathname === '/district') {
      setEditData({});
    }
  }, [loc]);

  

  const getDistrict = () => {
    getAllDist().then((el) => {
      setDistLoading(false);
      setData(el.data.result);
    });
  }
  const getState = () => {
    getAllState().then((el) => {
      setState(el.data.result);
    });
  }
  const editHandle = (id, dist, state) => {
    editData.state = {
      label: state ? state.state : undefined,
      value: state ? state._id : undefined
    };
    setEditData({ ...editData, editId: id, district: dist });
  }



  useEffect(() => {
    getDistrict();
    getState();
  }, []);


  return <createContextDist.Provider value={{
    data,
    states,
    getDistrict,
    editData,
    editHandle,
    setDistLoading,
    distLoading
  }}>
    {children}
  </createContextDist.Provider>
};

export { createContextDist, DistContext };
