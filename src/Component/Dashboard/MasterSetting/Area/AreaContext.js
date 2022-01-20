import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getAllarea, getAllbranch } from './areaapis';


const createContextArea = createContext();


const AreaContext = ({ children }) => {
  const loc = useLocation();
  const [data, setState] = useState([]);
  const [allbranch, setAllBranch] = useState([]);
  const [editData, setEditData] = useState({
    editId: '',
    area: ''
  });
  const [distLoading, setDistLoading] = useState(true);
  useEffect(() => {
    if (loc.pathname === "/area") {
      setEditData({});
    }
  }, [loc]);



  const getarea = () => {
    getAllarea().then((el) => {
      setDistLoading(false);
      setState(el.data.result);
    });
  }
  const getCities = () => {
    getAllbranch().then((el) => {
      setAllBranch(el.data.result);
    });
  }

  const editHandleArea = (id, branch, area) => {
    editData.branch = {
      label: branch ? branch.branch : undefined,
      value: branch ? branch._id : undefined
    };
    setEditData({
      ...editData,
      editId: id,
      area
    });
  }


  useEffect(() => {
    getarea();
    getCities();
  }, []);


  return <createContextArea.Provider value={{
    data,
    editData,
    getarea,
    allbranch,
    editHandleArea,
    setDistLoading,
    distLoading
  }}>
    {children}
  </createContextArea.Provider>
};

export { createContextArea, AreaContext };
