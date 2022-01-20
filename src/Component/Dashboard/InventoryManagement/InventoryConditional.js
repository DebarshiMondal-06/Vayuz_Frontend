import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import InventoryTable from './InventoryTable';
import { authContext } from '../../../Context/authContext';
import AddInventory from './AddInventory';
import ViewInventory from './ViewInventory';

const InventoryConditional = () => {
    const loc = useLocation();
    const { setChangeText } = useContext(authContext);

    if (loc.pathname === '/inventory/add') {
        setChangeText('Add Inventory')
        return <AddInventory />
    }
    if (loc.pathname === '/inventory/edit') {
        setChangeText('Edit Inventory')
        return <AddInventory />
    }
    if (loc.pathname === '/manager_inventory/edit') {
        setChangeText('Edit Inventory')
        return <AddInventory />
    }
    if (loc.pathname === '/inventory/view') {
        setChangeText('View Inventory')
        return <ViewInventory />
    }
    if (loc.pathname === '/manager_inventory/view') {
        setChangeText('View Inventory')
        return <ViewInventory />
    }

    return <InventoryTable>
        {setChangeText('Inventory')}
    </InventoryTable>
}

export default InventoryConditional;
