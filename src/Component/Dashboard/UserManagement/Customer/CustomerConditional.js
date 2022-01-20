import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import AddEditCustomer from './Add_Edit_Customer';
import CustomerTable from './CustomerTable';
import ViewCustomer from './ViewCustomer';




const CustomerConditional = () => {
  const { setChangeText, checkAdmin } = useContext(authContext);
  const loc = useLocation();

  const setPathFunction = (text, Comp) => {
    setChangeText(text);
    return <Comp />
  }

  if (checkAdmin()) {
    if (loc.pathname === '/customer/add') return setPathFunction('Add Customer', AddEditCustomer);
    if (loc.pathname === '/customer/edit') return setPathFunction('Edit Customer', AddEditCustomer);
    if (loc.pathname === '/customer/view') return setPathFunction('View Customer', ViewCustomer);
  } else {
    if (loc.pathname === '/manager_customer/add') return setPathFunction('Add Customer', AddEditCustomer);
    if (loc.pathname === '/manager_customer/edit') return setPathFunction('Edit Customer', AddEditCustomer);
    if (loc.pathname === '/manager_customer/view') return setPathFunction('View Customer', ViewCustomer);
  }

  return <CustomerTable>
    {setChangeText('Customer')}
  </CustomerTable>
}

export default CustomerConditional;
