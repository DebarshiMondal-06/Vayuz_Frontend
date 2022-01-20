import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getAllInventory } from '../InventoryManagement/inventroyapi';
import { getAllStock } from '../OrderManagement/orderapis'


const createContextInventory = createContext();


const InventoryContext = ({ children }) => {
    const loc = useLocation();
    const [inventory, setInventory] = useState([]);
    const [stock, setStock] = useState([]);
    const [editData, setEditData] = useState({
        editId: '',
    });
    const [ViewInventory, setViewInventory] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (loc.pathname === '/inventory' || loc.pathname === '/manager_inventory') {
            setEditData({});
        }
    }, [loc]);



    const getInventory = () => {
        getAllInventory().then((el) => {
            setLoading(false);
            setInventory(el.data.inventory);
        });
    }
    const editHandleInventory = (id, items) => {
        setEditData({
            editId: id,
            ...items
        });
    }
    const getAllStocks = () => {
        getAllStock().then((el) => {
            setStock(el.data.result);
        });
    }


    const viewHandleInventory = (items) => {
        setViewInventory({ ...items });
    }

    useEffect(() => {
        getAllStocks();
        getInventory();
    }, []);


    return <createContextInventory.Provider value={{
        inventory,
        editData,
        getInventory,
        editHandleInventory,
        viewHandleInventory,
        stock,
        ViewInventory,
        setLoading,
        loading
    }}>
        {children}
    </createContextInventory.Provider>
};

export { createContextInventory, InventoryContext };
