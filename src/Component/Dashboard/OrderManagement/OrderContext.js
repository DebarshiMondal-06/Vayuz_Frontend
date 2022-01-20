import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { authContext } from '../../../Context/authContext';
import { getAllmanager } from '../UserManagement/SalesExecutive/executiveapis';
import {
  getManagerApprovedOrders, getAllStock,
  getManagerApproval, getOrders
} from './orderapis';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';


const createContextOrder = createContext();


const OrderContext = ({ children }) => {
  const { logout, token: { ID } } = useContext(authContext);
  const loc = useLocation();
  const [manager, setManager] = useState([]);
  const [stock, setStock] = useState([]);
  const [orders, setOrder] = useState([]);
  const [viewOrder, setViewOrder] = useState({});
  const [editData, setEditData] = useState({
    editId: '',
    stateVal: ''
  });
  const [distLoading, setDistLoading] = useState(true);
  useEffect(() => {
    if (loc.pathname === '/order' || loc.pathname === '/manager_order') {
      setEditData({});
    }
  }, [loc]);
  const handleError = (err) => {
    if (err.response && err.response.status === 401) {
      toast.error(err.response.data.message);
      logout();
    }
  }


  const getAdminOrder = () => {
    setDistLoading(true)
    getOrders(ID).then((ele) => {
      setDistLoading(false);
      setOrder(ele.data.orders);
    }).catch((err) => handleError(err));
  }
  const getManagerApproved = () => {
    setDistLoading(true)
    getManagerApprovedOrders(ID).then((ele) => {
      setDistLoading(false);
      setOrder(ele.data.orders);
    }).catch((err) => handleError(err));
  }
  const getManagerApprovals = () => {
    setDistLoading(true)
    getManagerApproval(ID).then((ele) => {
      setDistLoading(false);
      setOrder(ele.data.orders);
    }).catch((err) => handleError(err));
  }


  const getManager = () => {
    getAllmanager(ID).then((el) => {
      setManager(el.data.result);
    }).catch((err) => handleError(err));
  }
  const getAllStocks = () => {
    getAllStock(ID).then((el) => {
      setStock(el.data.result);
    });
  }


  const editHandleOrder = (id, items) => {
    const { manager, executive, branch, customer, distributor, cylinder_name } = items;
    setEditData({
      editId: id,
      ...items,
      manager: {
        label: (manager && manager.name) ? manager.name : undefined,
        value: (manager && manager.name) ? manager._id : undefined
      },
      executive: {
        label: executive && executive.name ? executive.name : undefined,
        value: executive && executive.name ? executive._id : undefined
      },
      branch: {
        label: branch && branch.branch ? branch.branch : undefined,
        value: branch && branch.branch ? branch._id : undefined
      },
      distributor: {
        label: distributor && distributor.name ? distributor.company : undefined,
        value: distributor && distributor.name ? distributor._id : undefined
      },
      customer: {
        label: (customer && customer.company_name) ? customer.company_name : undefined,
        value: (customer && customer.company_name) ? customer._id : undefined
      },
      cylinder_name: {
        label: cylinder_name ? cylinder_name.cylinder_name : undefined,
        value: cylinder_name ? cylinder_name._id : undefined
      },
    });
  }


  const viewHandleOrder = (items) => {
    setViewOrder({ ...items });
  }


  useEffect(() => {
    if (loc.pathname === '/order') getAdminOrder();
    if (loc.pathname === '/manager_order') getAdminOrder();
    if (loc.pathname === '/order_approval') getManagerApproved();
    if (loc.pathname === '/manager_order_approval') getManagerApprovals();
    getAllStocks();
    getManager();
    // eslint-disable-next-line
  }, [loc.pathname]);


  // *********************** PUSHER For Reactivity **********************************
  var pusher = new Pusher('e4cc26ec9a7880133d57', {
    cluster: 'ap2'
  });
  var channel = pusher.subscribe("order-create-channel");
  channel.bind('my-event', function () {
    if (loc.pathname === '/order') getAdminOrder();
    if (loc.pathname === '/manager_order') getAdminOrder();
    if (loc.pathname === '/order_approval') getManagerApproved();
    if (loc.pathname === '/manager_order_approval') getManagerApprovals();
  });


  return <createContextOrder.Provider value={{
    getAdminOrder,
    getManagerApproved,
    getManagerApprovals,
    manager,
    viewHandleOrder,
    viewOrder,
    stock,
    orders,
    editData,
    editHandleOrder,
    setDistLoading,
    distLoading
  }}>
    {children}
  </createContextOrder.Provider>
};

export { createContextOrder, OrderContext };
