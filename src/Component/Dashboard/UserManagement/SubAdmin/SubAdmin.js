import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import SubAdminConditional from './SubAdminConditional';
import { SubAdminContext } from './SubAdminContext';
import { authContext } from '../../../../Context/authContext';


const SubAdmin = () => {
  const { changeTitle, changeText } = useContext(authContext);
  changeTitle('Sub Admin');
  const loc = useLocation();


  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title"> {changeText} </h5>
      </div>
      {
        (loc.pathname === '/subadmin')
          ? <div className="col-md-2 text-right add-to-center">
            <Link to='/subadmin/add'><button className="btn add-btn">Add SubAdmin</button></Link>
          </div>
          : ''
      }
    </div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <SubAdminContext>
            <SubAdminConditional />
          </SubAdminContext>
        </div>
      </div>
    </div>
}

export default SubAdmin;
