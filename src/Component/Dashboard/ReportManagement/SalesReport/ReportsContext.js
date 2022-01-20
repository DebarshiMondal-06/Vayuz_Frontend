import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllReports } from '../reportapi';
import { authContext } from '../../../../Context/authContext'
import { useCookies } from 'react-cookie';


const createContextReport = createContext();


const ReportContext = ({ children }) => {
  const { checkAdmin } = useContext(authContext);
  const [cookies] = useCookies();
  const [stock] = useState([]);
  var [reports, setReports] = useState([]);
  const [distLoading, setDistLoading] = useState(true);



  const getReports = (data1) => {
    setDistLoading(true);
    getAllReports().then((el) => {
      setDistLoading(false);
      setReports(el.data.reports);
    });
  }

  useEffect(() => {
    getReports();
  }, []);

  reports = reports.filter((items) => {
    var data;
    if (!checkAdmin()) {
      data = items.manager._id === cookies.authToken._id;
    } else {
      data = items;
    }
    return data;
  })



  return <createContextReport.Provider value={{
    stock,
    reports,
    distLoading,
    getReports
  }}>
    {children}
  </createContextReport.Provider>
}


export { ReportContext, createContextReport };