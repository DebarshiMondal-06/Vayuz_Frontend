import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import AddCity from './AddCity';
import CityTable from './CityTable';
import { authContext } from '../../../../Context/authContext';



const CityConditional = () => {
  const { setChangeText } = useContext(authContext);
  const loc = useLocation();

  if (loc.pathname === '/city/add-city') {
    setChangeText('Add City')
    return <AddCity />
  }
  if (loc.pathname === '/city/edit-city') {
    setChangeText('Edit City')
    return <AddCity />
  }

  return <CityTable>
    {setChangeText("City")}
  </CityTable>
}

export default CityConditional;
