import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getAllCity, getAllDistrict, getAllState } from './cityapis';


const createContextCity = createContext();


const CityContext = ({ children }) => {
  const loc = useLocation();
  const [data, setData] = useState([]);
  const [district, setDistrict] = useState([]);
  const [state, setState] = useState([]);
  const [editData, setEditData] = useState({
    editId: '',
    city: '',
    pincode: '',
    district: { label: '', value: '' },
    state: { label: '', value: '' }
  });
  const [distLoading, setDistLoading] = useState(true);
  useEffect(() => {
    if (loc.pathname === "/city") {
      setEditData({});
    }
  }, [loc]);



  const getCity = () => {
    getAllCity().then((el) => {
      setDistLoading(false);
      setData(el.data.result);
    });
  }
  const getStates = () => {
    getAllState().then((el) => {
      setDistLoading(false);
      setState(el.data.result);
    });
  }
  const getDistrict = () => {
    // setDistLoading(false);
    getAllDistrict().then((el) => {
      setDistrict(el.data.result);
    });
  }
  const editHandleCity = (editId, fordist, city, pincode, state) => {
    editData.district = {
      label: fordist ? fordist.district : undefined,
      value: fordist ? fordist._id : undefined
    };
    editData.state = {
      label: state ? state.state : undefined,
      value: state ? state._id : undefined
    };
    setEditData({ ...editData, editId, city, pincode });
  }

  useEffect(() => {
    getStates();
    getCity();
    getDistrict();
  }, []);


  return <createContextCity.Provider value={{
    data,
    district,
    getCity,
    state,
    editData,
    editHandleCity,
    setDistLoading,
    distLoading
  }}>
    {children}
  </createContextCity.Provider>
};

export { createContextCity, CityContext };
