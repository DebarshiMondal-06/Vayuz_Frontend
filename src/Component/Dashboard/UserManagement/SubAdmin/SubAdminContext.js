import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { getAllStaff } from './subadminapi';


const createContextSubAdmin = createContext();



const SubAdminContext = ({ children }) => {
  const loc = useLocation();
  const [staff, setStaff] = useState([]);
  const [viewSubAdmin, setViewSubAdmin] = useState([]);
  const [editData, setEditData] = useState({
    editId: '',
    staff_roles: []
  });
  const [distLoading, setDistLoading] = useState(true);
  useEffect(() => {
    if (loc.pathname === '/subadmin') {
      setEditData({ staff_roles: [] });
    }
  }, [loc]);


  const getStaffs = () => {
    getAllStaff().then((el) => {
      setDistLoading(false);
      setStaff(el.data.result);
    });
  }

  const editHandleSubAdmin = (editId, items) => {
    const {
      staff_roles
    } = items;
    const data = staff_roles.map((el) => {
      return { label: el, value: el };
    });
    setEditData({ ...items, staff_roles: data, password: '', editId });
  }

  const viewHandleSubAdmin = (items) => {
    setViewSubAdmin({ ...items });
  }

  useEffect(() => {
    getStaffs();
  }, []);





  return <createContextSubAdmin.Provider value={{
    staff,
    editData,
    getStaffs,
    editHandleSubAdmin,
    viewHandleSubAdmin,
    viewSubAdmin,
    setDistLoading,
    distLoading,
    setEditData
  }}>
    {children}
  </createContextSubAdmin.Provider>
};

export { createContextSubAdmin, SubAdminContext };
