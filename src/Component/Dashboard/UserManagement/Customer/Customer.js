import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import CustomerConditional from './CustomerConditional';
import { CustomerContext } from './CustomerContext';



const Customer = () => {
  const { changeTitle, changeText, checkAdmin } = useContext(authContext);
  changeTitle('Customer');
  const loc = useLocation();



  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title">
          {changeText}
        </h5>
      </div>
      {
        ((loc.pathname === '/customer') || (loc.pathname === '/manager_customer'))
          ? <div className="col-md-2 text-right add-to-center">
            <Link to={`${checkAdmin() ? '/customer/add' : '/manager_customer/add'}`}>
              <button className="btn add-btn"><i class="fa fa-plus"></i> Add</button>
            </Link>
          </div>
          : ''
      }
    </div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <CustomerContext>
            <CustomerConditional />
          </CustomerContext>
        </div>
      </div>
    </div>
}

export default Customer;
