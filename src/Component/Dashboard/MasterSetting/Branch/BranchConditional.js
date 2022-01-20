import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import AddBranch from './AddBranch';
import BranchTable from './BranchTable';
import { authContext } from '../../../../Context/authContext';


const BranchConditinal = () => {
  const { setChangeText } = useContext(authContext);
  const loc = useLocation();

  if (loc.pathname === '/branch/add-branch') {
    setChangeText('Add Branch')
    return <AddBranch />
  }
  if (loc.pathname === '/branch/edit-branch') {
    setChangeText('Edit Branch')
    return <AddBranch />
  }

  return <BranchTable>
    {setChangeText('Branch')}
  </BranchTable>
}

export default BranchConditinal;
