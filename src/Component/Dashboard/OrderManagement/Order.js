import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { authContext } from '../../../Context/authContext';
import OrderConditional from './OrderConditional';
import { OrderContext } from './OrderContext';



const Order = () => {
  const { changeTitle, changeText, checkAdmin } = useContext(authContext);
  changeTitle('Order');
  const loc = useLocation();



  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title">
          {changeText}
        </h5>
      </div>
      {
        ((loc.pathname === '/order') || (loc.pathname === '/manager_order'))
          ? <div className="col-md-2 text-right add-to-center">
            <Link to={`${checkAdmin() ? '/order/add' : '/manager_order/add'}`}>
              <button className="btn add-btn"><i class="fa fa-plus"></i> Add</button>
            </Link>
          </div>
          : ''
      }
    </div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <OrderContext>
            <OrderConditional />
          </OrderContext>
        </div>
      </div>
    </div>
}

export default Order;
