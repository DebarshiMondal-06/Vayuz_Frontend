/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
import { authContext } from '../../../Context/authContext';
import { getOrders } from '../OrderManagement/orderapis';


const createContextAccount = createContext();


const AccountContext = ({ children }) => {
  const [orders, setOrder] = useState([]);
  const [distLoading, setDistLoading] = useState(true);
  const { token: { ID }, logout } = useContext(authContext);

  const getAllOrder = () => {
    getOrders(ID).then((ele) => {
      setDistLoading(false);
      setOrder(ele.data.orders);
    }).catch(() => logout());
  }


  useEffect(() => {
    getAllOrder();
  }, []);


  return <createContextAccount.Provider value={{
    orders,
    setDistLoading,
    distLoading
  }}>
    {children}
  </createContextAccount.Provider>
};

export { createContextAccount, AccountContext };
