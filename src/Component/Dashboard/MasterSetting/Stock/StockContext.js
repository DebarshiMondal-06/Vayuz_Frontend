import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getAllStock } from './stockapis';


const createContextStock = createContext();


const StockContext = ({ children }) => {
  const loc = useLocation();
  const [stock, setStock] = useState([]);
  const [distLoading, setDistLoading] = useState(true);
  const [editData, setEditData] = useState({
    editId: '',
  });

  useEffect(() => {
    if (loc.pathname === '/stock') {
      setEditData({});
    }
  }, [loc])



  const getStock = () => {
    getAllStock().then((el) => {
      setDistLoading(false);
      setStock(el.data.result);
    });
  }
  // const getAllDistrict = () => {
  //   getAllDist().then((el) => {
  //     setDistrict(el.data.result);
  //   })
  // }
  const editHandleStock = (id, items) => {
    // const { district } = items;
    setEditData({
      editId: id,
      ...items,
      // district: { label: district.district, value: district._id },
    });
  }

  useEffect(() => {
    getStock();
    // getAllDistrict();
  }, []);


  return <createContextStock.Provider value={{
    editData,
    stock,
    editHandleStock,
    setDistLoading,
    distLoading,
    getStock,
    // district
  }}>
    {children}
  </createContextStock.Provider>
};

export { createContextStock, StockContext };
