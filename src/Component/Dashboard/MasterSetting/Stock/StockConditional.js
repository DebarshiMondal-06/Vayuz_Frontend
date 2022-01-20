import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { authContext } from "../../../../Context/authContext";
import AddEditStock from './Add_Edit_Stock';
import StockTable from './StockTable';



const StockConditional = () => {
  const loc = useLocation();
  const { setChangeText } = useContext(authContext);

  if (loc.pathname === '/stock/add') {
    setChangeText('Add Stock')
    return <AddEditStock />
  }
  if (loc.pathname === '/stock/edit') {
    setChangeText('Edit Stock')
    return <AddEditStock />
  }

  return <StockTable>
    {setChangeText('Stock')}
  </StockTable>
}

export default StockConditional;
