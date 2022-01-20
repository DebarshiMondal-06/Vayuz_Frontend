import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { authContext } from "../../../../Context/authContext";
import AddEditRate from './Add_Edit_Rate';
import RateTable from './RateTable';



const RateConditional = () => {
  const loc = useLocation();
  const { setChangeText } = useContext(authContext);

  if (loc.pathname === '/rate/add') {
    setChangeText('Add Rate')
    return <AddEditRate />
  }
  if (loc.pathname === '/rate/edit') {
    setChangeText('Edit Rate')
    return <AddEditRate />
  }

  return <RateTable>
    {setChangeText('Rate')}
  </RateTable>
}

export default RateConditional;
