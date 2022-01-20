import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getAllbranch, getAllcity } from './branchapis';


const createContextBranch = createContext();


const BranchContext = ({ children }) => {
  const loc = useLocation();
  const [data, setState] = useState([]);
  const [allcity, setAllCity] = useState([]);
  const [editData, setEditData] = useState({
    editId: '',
    branch: ''
  });
  const [distLoading, setDistLoading] = useState(true);
  useEffect(() => {
    if (loc.pathname === "/branch") {
      setEditData({});
    }
  }, [loc]);




  const getbranch = () => {
    getAllbranch().then((el) => {
      setDistLoading(false);
      setState(el.data.result);
    });
  }
  const getCities = () => {
    getAllcity().then((el) => {
      setAllCity(el.data.result);
    });
  }

  const editHandlebranch = (id, branch, forcity) => {
    console.log(forcity);
    editData.city = {
      label: forcity ? forcity.city : undefined,
      value: forcity ? forcity._id : undefined
    };
    setEditData({
      ...editData,
      editId: id,
      branch
    });
  }


  useEffect(() => {
    getbranch();
    getCities();
  }, []);


  return <createContextBranch.Provider value={{
    data,
    editData,
    getbranch,
    allcity,
    editHandlebranch,
    setDistLoading,
    distLoading
  }}>
    {children}
  </createContextBranch.Provider>
};

export { createContextBranch, BranchContext };
