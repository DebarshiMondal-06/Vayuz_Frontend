import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { fetchAllPageName, fetchAllPage } from '../cmsapis';
const CMS = createContext();




const CMSContext = ({ children }) => {
  const loc = useLocation();
  const [editData, setEditData] = useState({
    editId: '',
    forPageName: {},
    content: ''
  });
  const [distLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataName, setDataName] = useState([]);

  useEffect(() => {
    if (loc.pathname === '/cms') {
      setEditData({ content: '', forPageName: '', editId: '' });
    }
  }, [loc]);


  const fetchCMS = () => {
    fetchAllPage().then((el) => {
      setLoading(false);
      setData(el.data.resultData);
    });
  }
  const fetchAllPageNames = () => {
    fetchAllPageName().then((el) => {
      setDataName(el.data.resultData);
    })
  }

  const handleEdit = (editId, item) => {
    setLoading(true);
    const { forPageName, content } = item;
    editData.forPageName = {
      label: forPageName.pageName,
      value: forPageName._id
    }
    setEditData({ ...editData, editId, content });
  }

  useEffect(() => {
    fetchAllPageNames();
    fetchCMS();
  }, []);

  return <CMS.Provider value={{
    data,
    setLoading,
    distLoading,
    fetchCMS,
    dataName,
    handleEdit,
    editData
  }}>
    {children}
  </CMS.Provider>
}
export { CMSContext, CMS };