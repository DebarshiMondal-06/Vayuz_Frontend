import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getAllbeats, getAllarea } from './beatapis';


const createContextBeat = createContext();


const BeatContext = ({ children }) => {
  const loc = useLocation();
  const [data, setState] = useState([]);
  const [allarea, setAllarea] = useState([]);
  const [editData, setEditData] = useState({
    editId: '',
    beat: ''
  });
  const [distLoading, setDistLoading] = useState(true);
  useEffect(() => {
    if (loc.pathname === "/beat") {
      setEditData({});
    }
  }, [loc]);



  const getbeat = () => {
    getAllbeats().then((el) => {
      setDistLoading(false);
      setState(el.data.result);
    });
  }
  const getarea = () => {
    getAllarea().then((el) => {
      setAllarea(el.data.result);
    });
  }

  const editHandlebeat = (id, area, beat) => {
    editData.area = {
      label: area ? area.area : undefined,
      value: area ? area._id : undefined
    };
    setEditData({
      ...editData,
      editId: id,
      beat
    });
  }


  useEffect(() => {
    getbeat();
    getarea();
  }, []);


  return <createContextBeat.Provider value={{
    data,
    editData,
    getbeat,
    allarea,
    editHandlebeat,
    setDistLoading,
    distLoading
  }}>
    {children}
  </createContextBeat.Provider>
};

export { createContextBeat, BeatContext };
