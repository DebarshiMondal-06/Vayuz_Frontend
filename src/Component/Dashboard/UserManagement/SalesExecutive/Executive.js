import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ExecutiveConditional from './ExecutiveConditional';
import { ExecutiveContext } from './ExecutiveContext';
import { authContext } from '../../../../Context/authContext';


const Executive = () => {
  const { changeTitle, changeText, checkAdmin } = useContext(authContext);
  changeTitle('Sales Executive');
  const loc = useLocation();


  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title"> {changeText} </h5>
      </div>
      {
        ((loc.pathname === '/salesexecutive') || (loc.pathname === '/manager_salesexecutive'))
          ? <div className="col-md-2 text-right add-to-center">
            <Link to={`${checkAdmin() ? '/salesexecutive/add' : '/manager_salesexecutive/add'}`}>
              <button className="btn add-btn"><i class="fa fa-plus"></i> Add</button>
            </Link>
          </div>
          : ''
      }
    </div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <ExecutiveContext>
            <ExecutiveConditional />
          </ExecutiveContext>
        </div>
      </div>
    
  </div>
}

export default Executive;
