import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import AddState from './AddState';
import StateTable from './StateTable';
import { authContext } from '../../../../Context/authContext';


const DistConditional = () => {
  const loc = useLocation();
  const { setChangeText } = useContext(authContext);

  if (loc.pathname === '/state/add-state') {
    setChangeText('Add State')
    return <AddState />
  }
  if (loc.pathname === '/state/edit-state') {
    setChangeText('Edit State')
    return <AddState />
  }

  return <StateTable>
    {setChangeText('State')}
  </StateTable>
}

export default DistConditional;
