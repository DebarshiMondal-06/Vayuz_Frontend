import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import AddEditSubAdmin from './AddEditSubAdmin';
import SubAdminTable from './SubAdminTable';
import ViewSubAdmin from './ViewSubAdmin';


const SubAdminConditional = () => {
  const { setChangeText } = useContext(authContext);
  const loc = useLocation();

  if (loc.pathname === '/subadmin/add') {
    setChangeText('Add Sub Admin')
    return <AddEditSubAdmin />
  }
  if (loc.pathname === '/subadmin/edit') {
    setChangeText('Edit Sub Admin')
    return <AddEditSubAdmin />
  }
  if (loc.pathname === '/subadmin/view') {
    setChangeText('View SubAdmin')
    return <ViewSubAdmin />
  }


  return <SubAdminTable>
    {setChangeText('Sub Admin')}
  </SubAdminTable>
}

export default SubAdminConditional;
