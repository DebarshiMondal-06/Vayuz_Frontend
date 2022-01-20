import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import StockConditional from './StockConditional';
import { StockContext } from './StockContext';



const Stock = () => {
  const { changeTitle, changeText } = useContext(authContext);
  changeTitle('Stock');
  const loc = useLocation();



  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title">
          {changeText}
        </h5>
      </div>
      {
        (loc.pathname === '/stock') ? <div className="col-md-2 text-right add-to-center">
          <Link to='/stock/add'><button className="btn add-btn" type="submit">Add Stock
        </button></Link>
        </div> : ''
      }
    </div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <StockContext>
            <StockConditional />
          </StockContext>
        </div>
      </div>
    </div>
}

export default Stock;
