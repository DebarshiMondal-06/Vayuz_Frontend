import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import DistributorConditional from './DistributorConditional';
import { DistributorContext } from './DistributorContext';



const Distributor = () => {
  const { changeTitle, changeText, checkAdmin } = useContext(authContext);
  changeTitle('Distributor');
  const loc = useLocation();


  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title"> {changeText} </h5>
      </div>
      {
        ((loc.pathname === '/distributor') || (loc.pathname === '/manager_distributor'))
          ? <div className="col-md-2 text-right add-to-center">
            <Link to={`${checkAdmin() ? '/distributor/add' : '/manager_distributor/add'}`}>
              <button className="btn add-btn"><i class="fa fa-plus"></i> Add</button>
            </Link>
          </div>
          : ''
      }
    </div>
      <div className="main-card mb-3 rounded-sm card">
        <div className="card-body">
          <DistributorContext>
            <DistributorConditional />
          </DistributorContext>
        </div>
      </div>
  </div>
}

export default Distributor;
