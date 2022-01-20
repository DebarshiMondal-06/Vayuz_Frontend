/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
// import { useHistory } from 'react-router-dom';
import { getAllbranch, getAllmanager } from './managerapis';
import { toast } from 'react-toastify';



const createContextManager = createContext();


const ManagerContext = ({ children }) => {
  const { token, logout } = useContext(authContext);
  const loc = useLocation();
  const [manager, setManager] = useState([]);
  const [branches, setBranch] = useState([]);
  const [view, setViewManager] = useState([]);
  const [editData, setEditData] = useState({
    editId: '',
    contact_no: '',
    name: '',
    email_id: '',
    employee_id: '',
    branches: []
  });
  const [distLoading, setDistLoading] = useState(true);
  useEffect(() => {
    if (loc.pathname === '/salesmanager') {
      setEditData({ branches: [] });
    }
  }, [loc]);



  const getManagers = () => {
    const { ID } = token;
    getAllmanager(ID).then((el) => {
      setDistLoading(false);
      setManager(el.data.result);
    }).catch((err) => {
      if (err.response.status === 401) {
        toast.error(err.response.data.message);
        logout();
      }
    });
  }
  const getBranches = () => {
    getAllbranch().then((items) => {
      setBranch(items.data.result);
    });
  }
  const editHandleManager = (editId, items) => {
    const {
      contact_no,
      name,
      employee_id,
      email_id,
      branches
    } = items;
    const data = branches.map((el) => {
      return { label: el.branch, value: el._id };
    });
    editData.branches.push(data);
    setEditData({ ...editData, editId, contact_no, name, email_id, employee_id });
  }
  const editHandleView = (items) => {
    setViewManager(items);
  }


  useEffect(() => {
    getBranches();
    getManagers();
  }, []);





  return <createContextManager.Provider value={{
    manager,
    editData,
    getManagers,
    editHandleView,
    editHandleManager,
    setDistLoading,
    distLoading,
    view,
    branches,
    setEditData
  }}>
    {children}
  </createContextManager.Provider>
};

export { createContextManager, ManagerContext };
