import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import AddDistributor from './AddDistributor';
import DistributorTable from './DistributorTable';
import { authContext } from '../../../../Context/authContext';
import ViewDistributor from './ViewDistributor';




const DistributorConditional = () => {
  const { setChangeText, checkAdmin } = useContext(authContext);
  const loc = useLocation();

  const setPathFunction = (text, Comp) => {
    setChangeText(text);
    return <Comp />
  }


  if (checkAdmin()) {
    if (loc.pathname === '/distributor/add') return setPathFunction('Add Distributor', AddDistributor);
    if (loc.pathname === '/distributor/edit') return setPathFunction('Edit Distributor', AddDistributor);
    if (loc.pathname === '/distributor/view') return setPathFunction('View Distributor', ViewDistributor);
  } else {
    if (loc.pathname === '/manager_distributor/add') return setPathFunction('Add Distributor', AddDistributor);
    if (loc.pathname === '/manager_distributor/edit') return setPathFunction('Edit Distributor', AddDistributor);
    if (loc.pathname === '/manager_distributor/view') return setPathFunction('View Distributor', ViewDistributor);
  }
  return <DistributorTable>
    {setChangeText('Distributor')}
  </DistributorTable>
}

export default DistributorConditional;
