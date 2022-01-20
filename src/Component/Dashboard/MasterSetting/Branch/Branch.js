import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import BranchConditional from './BranchConditional';
import { BranchContext } from './BranchContext';
import { authContext } from '../../../../Context/authContext';



const Branch = () => {
  const { changeTitle, changeText } = useContext(authContext);
  changeTitle('Branch');

  const loc = useLocation();

  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title"> {changeText} </h5>
      </div>
      {
        (loc.pathname === '/branch') ? <div className="col-md-2 text-right add-to-center">
          <Link to='/branch/add-branch'><button className="btn add-btn" type="submit">Add Branch
        </button></Link>
        </div> : ''
      }
    </div>
   
      <div className="main-card mb-3 card">
        <div className="card-body">
          <BranchContext>
            <BranchConditional />
          </BranchContext>
        </div>
      </div>
    </div>
  
}

export default Branch;
