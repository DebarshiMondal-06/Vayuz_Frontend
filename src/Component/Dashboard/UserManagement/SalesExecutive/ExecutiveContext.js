/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllmanager, getAllexecutive } from './executiveapis';
import { authContext } from '../../../../Context/authContext';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';



const createContextExecutive = createContext();


const ExecutiveContext = ({ children }) => {
  const loc = useLocation();
  const { token, logout } = useContext(authContext);
  const [executive, setExecutive] = useState([]);
  const [manager, setManager] = useState([]);
  const [beats] = useState([]);
  const [view, setViewExecutive] = useState([]);
  const [editData, setEditData] = useState({
    editId: '',
    manager: { label: '', value: '' },
    branch: [],
    area: [],
    beat: []
  });
  const [distLoading, setDistLoading] = useState(true);
  useEffect(() => {
    if (loc.pathname === '/manager_salesexecutive' || loc.pathname === '/salesexecutive') {
      setEditData({});
    }
  }, [loc]);



  const getExecutives = () => {
    const { ID } = token;
    getAllexecutive(ID).then((el) => {
      setDistLoading(false);
      setExecutive(el.data.result);
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
      };
    });
  };


  const editHandleExecutive = (editId, items) => {
    const { areas, branches, manager, beats } = items;
    const { name: sales_name, _id } = manager || {};
    const dataArea = areas.map((el) => {
      return { label: el.area, value: el._id };
    });
    const dataBranch = branches.map((el) => {
      return { label: el.branch, value: el._id };
    });
    const dataBeat = beats.map((el) => {
      return { label: el.beat, value: el._id };
    });
    setEditData({
      editId,
      ...items,
      manager: {
        label: sales_name ? sales_name : undefined,
        value: sales_name ? _id : undefined
      },
      branch: dataBranch,
      beat: dataBeat,
      area: dataArea
    });
  }

  const handleView = (item) => {
    setViewExecutive(item);
  }

  useEffect(() => {
    getManager();
    getExecutives();
  }, []);


  // ***************** Pusher for Ractivity *********************************
  var pusher = new Pusher('e4cc26ec9a7880133d57', {
    cluster: 'ap2'
  });
  var channel = pusher.subscribe("executive-channel");
  channel.bind('my-event', function () {
    getExecutives();
  });
  return <createContextExecutive.Provider value={{
    executive,
    editData,
    getExecutives,
    editHandleExecutive,
    setDistLoading,
    distLoading,
    manager,
    beats,
    setEditData,
    handleView,
    view
  }}>
    {children}
  </createContextExecutive.Provider>
};

export { createContextExecutive, ExecutiveContext };
