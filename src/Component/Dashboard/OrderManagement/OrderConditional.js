import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import OrderTable from './OrderTable';
import { authContext } from '../../../Context/authContext';
import AddEditOrder from './AddEditOrder';
import OrderView from './OrderView';
import ViewDispatch from './ViewDispatch';
import AddDispatch from './AddDispatch';




const OrderConditional = () => {
  const loc = useLocation();
  const { setChangeText, checkAdmin } = useContext(authContext);


  const setPathFunction = (text, Comp) => {
    setChangeText(text);
    return <Comp />
  }

  if (checkAdmin()) {
    if (loc.pathname === '/order/add') return setPathFunction('Add Order', AddEditOrder);
    if (loc.pathname === '/order/edit') return setPathFunction('Edit Order', AddEditOrder);
    if (loc.pathname === '/order_approval') return setPathFunction('Order Approval', OrderTable);
    if (loc.pathname === '/order_view') return setPathFunction('Order View', OrderView);
    if (loc.pathname === '/dispatch') return setPathFunction('Dispatch Details', ViewDispatch);
    if (loc.pathname === '/dispatch/add') return setPathFunction('Create Dispatch', AddDispatch);
  } else {
    if (loc.pathname === '/manager_order/add') return setPathFunction('Add Order', AddEditOrder);
    if (loc.pathname === '/manager_order/edit') return setPathFunction('Edit Order', AddEditOrder);
    if (loc.pathname === '/manager_order_approval') return setPathFunction('Order Approval', OrderTable);
    if (loc.pathname === '/manager_order_view') return setPathFunction('Order View', OrderView);
    // if (loc.pathname === '/manager_dispatch') return setPathFunction('Dispatch Details', ViewDispatch);
    if (loc.pathname === '/manager_dispatch') return setPathFunction('Approve', AddDispatch);

  }

  return <OrderTable>
    {setChangeText('Order')}
  </OrderTable>
}

export default OrderConditional;
