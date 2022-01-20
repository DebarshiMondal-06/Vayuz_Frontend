import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllEndCustomer, } from '../reportapi';
import { authContext } from '../../../../Context/authContext'
import { useCookies } from 'react-cookie';


const createContextEndCustomerReport = createContext();


const EndCustomerReportContext = ({ children }) => {
  const {  checkAdmin } = useContext(authContext);
  const [cookies] = useCookies();
  var [reports, setReports] = useState([]);
  const [distLoading, setDistLoading] = useState(true);



  const getEndCustomerReports = (data1) => {
    setDistLoading(true);
    getAllEndCustomer().then((el) => {
      setDistLoading(false);
      setReports(el.data.endcustomerreports);
    });
  }

  useEffect(() => {
    getEndCustomerReports();
  }, []);

  reports = reports.filter((items) => {
    var data;
    if (!checkAdmin()) {
      data = items.customer.manager._id === cookies.authToken._id;
    } else {
      data = items;
    }
    return data;
  })


  return <createContextEndCustomerReport.Provider value={{
    reports,
    distLoading,
  }}>
    {children}
  </createContextEndCustomerReport.Provider>
}


export { EndCustomerReportContext, createContextEndCustomerReport };