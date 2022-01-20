import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import ManagerConditional from './ManagerConditional';
import { ManagerContext } from './ManagerContext';



const SalesManager = () => {
  const { changeTitle,changeText } = useContext(authContext);
  changeTitle('Sales Manager');
  const loc = useLocation();



  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title">{changeText} </h5>
      </div>
      {
        (loc.pathname === '/salesmanager' || loc.pathname === '/') ? <div className="col-md-2 text-right add-to-center">
          <Link to='/salesmanager/add'><button className="btn add-btn">Add SalesManager
        </button></Link>
        </div> : ''
      }
    </div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <ManagerContext>
            <ManagerConditional />
          </ManagerContext>
        </div>
      </div>
    </div>
}

export default SalesManager;
