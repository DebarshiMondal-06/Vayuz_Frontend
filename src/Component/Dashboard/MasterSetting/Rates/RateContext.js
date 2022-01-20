import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getAllState } from '../City/cityapis';
import { getAllRate } from './rateapis';
import { getAllStock } from '../Stock/stockapis';


const createContextRate = createContext();


const RateContext = ({ children }) => {
  const loc = useLocation();
  const [rate, setRate] = useState([]);
  const [cylinders, setCylinders] = useState([]);
  const [state, setState] = useState([]);
  const [distLoading, setDistLoading] = useState(true);
  const [editData, setEditData] = useState({
    editId: '',
  });

  useEffect(() => {
    if (loc.pathname === '/rate') {
      setEditData({});
    }
  }, [loc])



  const getRate = () => {
    getAllRate().then((el) => {
      setRate(el.data.message);
      setDistLoading(false);
    });
  };
  const getCylinders = () => {
    getAllStock().then((el) => {
      setCylinders(el.data.result);
      setDistLoading(false);
    });
  };
  const getAllStates = () => {
    getAllState().then((el) => {
      setState(el.data.result);
    })
  }



  const editHandleRate = (id, items) => {
    const { district, cylinder_type } = items;
    const { state } = district || {};
    setEditData({
      editId: id,
      ...items,
      state: {
        label: state ? state.state : undefined,
        value: state ? state._id : undefined
      },
      district: {
        label: district ? district.district : undefined,
        value: district ? district._id : undefined
      },
      cylinder_type: {
        label: cylinder_type ? cylinder_type.cylinder_name : undefined,
        value: cylinder_type ? cylinder_type._id : undefined
      },
    });
  }

  useEffect(() => {
    getCylinders();
    getAllStates();
    getRate();
  }, []);


  return <createContextRate.Provider value={{
    editData,
    rate,
    getRate,
    cylinders,
    state,
    editHandleRate,
    setDistLoading,
    distLoading,
  }}>
    {children}
  </createContextRate.Provider>
};

export { createContextRate, RateContext };
