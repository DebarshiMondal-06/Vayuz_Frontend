import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import AddBeat from './AddBeat';
import BeatTable from './BeatTable';



const BeatConditinal = () => {
  const { setChangeText } = useContext(authContext);
  const loc = useLocation();

  if (loc.pathname === '/beat/add') {
    setChangeText('Add Beat')
    return <AddBeat />
  }
  if (loc.pathname === '/beat/edit') {
    setChangeText('Edit Beat')
    return <AddBeat />
  }

  return <BeatTable>
    {setChangeText('Beat')}
  </BeatTable>
}

export default BeatConditinal;
