import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllDebtor } from '../reportapi';
import { authContext } from '../../../../Context/authContext'
import { useCookies } from 'react-cookie';


const DebtorReport = createContext();


const DebtorContext = ({ children }) => {
  const { checkAdmin } = useContext(authContext);
  const [cookies] = useCookies();
  var [debtor, setDebtor] = useState([]);
  const [distLoading, setDistLoading] = useState(true);



  const DebtorReports = (data1) => {
    setDistLoading(true);
    getAllDebtor().then((el) => {
      setDistLoading(false);
      setDebtor(el.data.result);
    });
  }

  useEffect(() => {
    DebtorReports();
  }, []);

  debtor = debtor.filter((items) => {
    var data;
    if (!checkAdmin()) {
      data = items.manager._id === cookies.authToken._id;
    } else {
      data = items;
    }
    return data;
  })


  return <DebtorReport.Provider value={{
    debtor,
    distLoading,
  }}>
    {children}
  </DebtorReport.Provider>
}


export { DebtorContext, DebtorReport };