import React, { createContext, useState } from 'react'
import { useCookies } from 'react-cookie';
// import { getManagerOne } from './profileapis';
// import { authContext } from '../../../Context/authContext'
const profileContext = createContext();




const ProfileContext = ({ children }) => {
  const [editData, setEditData] = useState({
    editId: '',
    name: '',
    contact_no: ''
  });
  const [cookie] = useCookies();

  const getImage = () => {
    const ID = (cookie.authToken && cookie.authToken._id) ? cookie.authToken._id : null;
    return `${process.env.REACT_APP_URL}/users/get_image?id=${ID}`;
  }


  const handleEdit = (editId, items) => {
    setEditData({ editId, name: items.name, contact_no: items.contact_no })
  }



  return <profileContext.Provider value={{
    editData,
    handleEdit,
    getImage
  }}>
    {children}
  </profileContext.Provider>
}

export { ProfileContext, profileContext };
