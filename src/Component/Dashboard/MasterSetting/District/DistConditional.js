import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import AddDistrict from './AddDistrict';
import DistTable from './DistTable';


const DistConditional = () => {
  const loc = useLocation();
  const { setChangeText } = useContext(authContext);


  if (loc.pathname === '/district/add-district') {
    setChangeText('Add District')
    return <AddDistrict />
  }
  if (loc.pathname === '/district/edit-district') {
    setChangeText('Edit District')
    return <AddDistrict />
  }

  return <DistTable>
    {setChangeText('District')}
  </DistTable>
}

export default DistConditional;
