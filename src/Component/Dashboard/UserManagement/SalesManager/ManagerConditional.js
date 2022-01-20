import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import AddSalesManager from './AddSalesManager';
import EditSalesManager from './EditSalesManager';
import SalesManagerTable from './SalesManagerTable';
import ViewSalesManager from './ViewSalesManager';



const ManagerConditional = () => {
  const { setChangeText } = useContext(authContext);
  const loc = useLocation();

  if (loc.pathname === '/salesmanager/add') {
    setChangeText('Add Manager')
    return <AddSalesManager />
  }
  if (loc.pathname === '/salesmanager/edit') {
    setChangeText('Edit Manager')
    return <EditSalesManager />
  }
  if (loc.pathname === '/salesmanager/view') {
    setChangeText('View Manager')
    return <ViewSalesManager />
  }

  return <SalesManagerTable>
    {setChangeText('Sales Manager')}
  </SalesManagerTable>
}

export default ManagerConditional;
