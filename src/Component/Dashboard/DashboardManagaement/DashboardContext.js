/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAllexecutive } from '../UserManagement/SalesExecutive/executiveapis';
import { getAllmanager } from '../UserManagement/SalesManager/managerapis';
import { getAllDistributor } from '../UserManagement/Distributor/distributorapi';
import { getAllCustomer } from '../UserManagement/Customer/customerapi';
import { getOrders } from '../OrderManagement/orderapis';
import { toast } from 'react-toastify';
import { authContext } from '../../../Context/authContext';



const dashboardContext = createContext();



const DashboardContext = ({ children }) => {
  const { logout, token: { ID } } = useContext(authContext);
  const [manager, setManager] = useState([]);
  const [executive, setExecutive] = useState([]);
  const [distributor, setDistributor] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [order, setOrder] = useState([]);
  const handleError = (err) => {
    if (err.response.status === 401) {
      toast.error(err.response.data.message);
      logout();
    }
  }



  const getAllData = () => {
    getAllmanager(ID).then((el) => {
      if (el.data.result) {
        setManager(el.data.result);
      }
    }).catch((err) => handleError(err));
    getAllexecutive(ID).then((el) => {
      if (el.data.result) {
        setExecutive(el.data.result);
      }
    }).catch((err) => handleError(err));
    getAllDistributor(ID).then((el) => {
      if (el.data.result) {
        setDistributor(el.data.result);
      }
    }).catch((err) => handleError(err));
    getAllCustomer(ID).then((el) => {
      if (el.data.result) {
        setCustomer(el.data.result);
      }
    }).catch((err) => handleError(err));
    getOrders(ID).then((el) => {
      if (el.data.orders) {
        setOrder(el.data.orders);
      }
    }).catch((err) => handleError(err));
  }


  useEffect(() => {
    getAllData();
  }, []);



  return <dashboardContext.Provider value={{
    manager, executive, distributor, customer, order
  }}>
    {children}
  </dashboardContext.Provider>
}

export { DashboardContext, dashboardContext };
