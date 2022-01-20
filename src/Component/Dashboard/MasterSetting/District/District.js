import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import DistConditional from './DistConditional';
import { DistContext } from './DistContext';



const District = () => {
  const { changeTitle, changeText } = useContext(authContext);
  changeTitle('District');
  const loc = useLocation();


  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title"> {changeText}</h5>
      </div>
      {
        (loc.pathname === '/district') ? <div className="col-md-2 text-right add-to-center">
          <Link to='/district/add-district'><button className="btn add-btn" type="submit">Add District
        </button></Link>
        </div> : ''
      }
    </div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <DistContext>
            <DistConditional />
          </DistContext>
        </div>
      </div>
    </div>
  
}

export default District;
