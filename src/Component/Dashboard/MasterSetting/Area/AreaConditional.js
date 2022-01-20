import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import AddArea from './AddArea';
import AreaTable from './AreaTable';



const AreaConditinal = () => {
  const { setChangeText } = useContext(authContext);
  const loc = useLocation();

  if (loc.pathname === '/area/add') {
    setChangeText('Add Area')
    return <AddArea />
  }
  if (loc.pathname === '/area/edit') {
    setChangeText('Edit Area')
    return <AddArea />
  }

  return <AreaTable>
    {setChangeText('Area')}
  </AreaTable>
}

export default AreaConditinal;
