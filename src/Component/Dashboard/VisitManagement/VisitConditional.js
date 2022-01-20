import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { authContext } from '../../../Context/authContext';
import ViewVisit from './ViewVisit';
import VisitTable from './VisitTable';



const VisitConditional = () => {
  const loc = useLocation();
  const { setChangeText } = useContext(authContext);

  if (loc.pathname === '/visits/view') {
    setChangeText('View Visit')
    return <ViewVisit />
  }


  return <VisitTable>
    {setChangeText('Visit')}
  </VisitTable>
}

export default VisitConditional;
