/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllbranch } from "../../MasterSetting/Branch/branchapis";
import { getAllmanager } from "../SalesExecutive/executiveapis";
import { getAllCustomer } from "./customerapi";
import { authContext } from '../../../../Context/authContext';
import Pusher from 'pusher-js';
import { toast } from "react-toastify";





const createContextCustomer = createContext();



const CustomerContext = ({ children }) => {
  const { token, logout } = useContext(authContext);
  const loc = useLocation();
  const [customer, setCustomers] = useState([]);
  const [manager, setManager] = useState([]);
  const [branchm, setBranch] = useState([]);
  const [view, setViewCustomer] = useState([]);
  const [editData, setEditData] = useState({
    editId: "",
  });
  const [distLoading, setDistLoading] = useState(true);
  useEffect(() => {
    if (loc.pathname === "/customer" || loc.pathname === "/manager_customer") {
      setEditData({});
    }
  }, [loc]);

  const getCustomers = () => {
    const { ID } = token;
    getAllCustomer(ID).then((el) => {
      setDistLoading(false);
      setCustomers(el.data.result);
    }).catch((err) => {
      if (err.response.status === 401) {
        toast.error(err.response.data.message);
        logout();
      }
    });
  };
  const getManager = () => {
    const { ID } = token;
    getAllmanager(ID).then((items) => {
      setManager(items.data.result);
    }).catch((err) => {
      if (err.response.status === 401) {
        toast.error(err.response.data.message);
        logout();
      }
    });
  };
  const getbranch = () => {
    getAllbranch().then((items) => {
      setDistLoading(false);
      setBranch(items.data.result);
    });
  };
  const editHandleCustomer = (editId, items) => {
    const {
      company_name,
      company_contact,
      customer_name,
      customer_contact,
      distributor,
      email,
      manager,
      executive,
      branch,
      area,
      beat,
      gstin
    } = items;

    editData.distributor = {
      label: distributor && distributor.name ? distributor.name : undefined,
      value: distributor && distributor.name ? distributor._id : undefined,
    };
    editData.manager = {
      label: manager && manager.name ? manager.name : undefined,
      value: manager && manager.name ? manager._id : undefined,
    };
    editData.executive = {
      label: executive && executive.name ? executive.name : undefined,
      value: executive && executive.name ? executive._id : undefined,
    };
    editData.branch = {
      label: branch && branch.branch ? branch.branch : undefined,
      value: branch && branch.branch ? branch._id : undefined,
    };
    editData.area = {
      label: area ? area.area : undefined,
      value: area ? area._id : undefined,
    };
    editData.beat = {
      label: beat ? beat.beat : undefined,
      value: beat ? beat._id : undefined,
    };
    setEditData({
      ...editData,
      editId,
      company_contact,
      customer_name,
      customer_contact,
      company_name,
      email,
      gstin
    });
  };

  const handleView = (items) => {
    setViewCustomer(items);
  }


  useEffect(() => {
    getManager();
    getCustomers();
    getbranch();
  }, []);



  // *********************** PUSHER For Reactivity **********************************
  var pusher = new Pusher('e4cc26ec9a7880133d57', {
    cluster: 'ap2'
  });
  var channel = pusher.subscribe("customer-channel");
  channel.bind('my-event', function () {
    getCustomers();
  });

  return (
    <createContextCustomer.Provider
      value={{
        customer,
        manager,
        editData,
        handleView,
        view,
        getCustomers,
        editHandleCustomer,
        setDistLoading,
        distLoading,
        setEditData,
        branchm,
      }}
    >
      {children}
    </createContextCustomer.Provider>
  );
};

export { createContextCustomer, CustomerContext };
