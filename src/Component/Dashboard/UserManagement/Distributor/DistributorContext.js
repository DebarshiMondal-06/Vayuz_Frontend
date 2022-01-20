/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { authContext } from "../../../../Context/authContext";
import { getAllbranch } from "../../MasterSetting/Branch/branchapis";
import { getAllmanager } from "../SalesExecutive/executiveapis";
import { getAllDistributor } from "./distributorapi";
import Pusher from 'pusher-js';
import { toast } from "react-toastify";




const createContextDistributor = createContext();

const DistributorContext = ({ children }) => {
  const loc = useLocation();
  const { token, logout } = useContext(authContext);
  const [distributor, setDistributor] = useState([]);
  const [manager, setManager] = useState([]);
  const [branchm, setBranch] = useState([]);
  const [view, setViewData] = useState([]);
  const [editData, setEditData] = useState({
    editId: "",
    contact1: "",
    company: "",
    name: "",
    email: "",
    pan: "",
    gstin: "",
    beat: [],
    area: [],
  });
  const [distLoading, setDistLoading] = useState(true);
  useEffect(() => {
    if (
      loc.pathname === "/manager_distributor" ||
      loc.pathname === "/distributor"
    ) {
      setEditData({});
    }
  }, [loc]);

  const getbranch = () => {
    getAllbranch().then((items) => {
      setDistLoading(false);
      setBranch(items.data.result);
    });
  };

  const getDistributors = () => {
    const { ID } = token;
    getAllDistributor(ID).then((el) => {
      setDistLoading(false);
      setDistributor(el.data.result);
    }).catch((err) => {
      if (err.response.status === 401) {
        toast.error(err.response.data.message);
        logout();
      };
    });
  };
  const getManagers = () => {
    const { ID } = token;
    getAllmanager(ID).then((items) => {
      setManager(items.data.result);
    }).catch((err) => {
      if (err.response.status === 401) {
        toast.error(err.response.data.message);
        logout();
      };
    });
  };



  const editHandleDistributor = (editId, items) => {
    const {
      contact1,
      name,
      email,
      company,
      pan,
      gstin,
      branch,
      areas,
      executive,
      manager,
      beats,
    } = items;
    const dataBeat = beats.map((el) => {
      return { label: el.beat, value: el._id };
    });
    const dataArea = areas.map((el) => {
      return { label: el.area, value: el._id };
    });
    editData.branch = {
      label: branch.branch ? branch.branch : undefined,
      value: branch.branch ? branch._id : undefined,
    };
    editData.manager = {
      label: manager.name ? manager.name : undefined,
      value: manager.name ? manager._id : undefined,
    };
    editData.executive = {
      label: executive.name ? executive.name : undefined,
      value: executive.name ? executive._id : undefined,
    };

    setEditData({
      ...editData,
      beat: dataBeat,
      area: dataArea,
      editId,
      contact1,
      name,
      email,
      company,
      pan,
      gstin,
    });
  };
  const handleView = (items) => {
    setViewData(items);
  }


  useEffect(() => {
    getManagers();
    getDistributors();
    getbranch();
  }, []);


  // ***********************888 PUSHER For Reactivity **********************************
  var pusher = new Pusher('e4cc26ec9a7880133d57', {
    cluster: 'ap2'
  });
  var channel = pusher.subscribe("distributor-channel");
  channel.bind('my-event', function () {
    getDistributors();
  });
  return (
    <createContextDistributor.Provider
      value={{
        distributor,
        editData,
        getDistributors,
        editHandleDistributor,
        setDistLoading,
        handleView,
        view,
        distLoading,
        manager,
        setEditData,
        branchm,
      }}
    >
      {children}
    </createContextDistributor.Provider>
  );
};

export { createContextDistributor, DistributorContext };
