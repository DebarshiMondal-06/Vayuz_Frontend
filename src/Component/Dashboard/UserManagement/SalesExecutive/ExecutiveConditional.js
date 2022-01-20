import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import AddSalesExecutive from './AddExecutive';
import ExecutiveTable from './ExecutiveTable';
import ViewExecutive from './ViewExecutive';





const ExecutiveConditional = () => {
  const { setChangeText, checkAdmin } = useContext(authContext);
  const loc = useLocation();
  const setPathFunction = (text, Comp) => {
    setChangeText(text);
    return <Comp />
  }


  if (checkAdmin()) {
    if (loc.pathname === '/salesexecutive/add') return setPathFunction('Add Executive', AddSalesExecutive);
    if (loc.pathname === '/salesexecutive/edit') return setPathFunction('Edit Executive', AddSalesExecutive);
    if (loc.pathname === '/salesexecutive/view') return setPathFunction('View Executive', ViewExecutive);
  } else {
    if (loc.pathname === '/manager_salesexecutive/add') return setPathFunction('Add Executive', AddSalesExecutive);
    if (loc.pathname === '/manager_salesexecutive/edit') return setPathFunction('Edit Executive', AddSalesExecutive);
    if (loc.pathname === '/manager_salesexecutive/view') return setPathFunction('View Executive', ViewExecutive);
  }

  
  
  return <ExecutiveTable>
    {setChangeText('Sales Executive')}
  </ExecutiveTable>
}

export default ExecutiveConditional;
