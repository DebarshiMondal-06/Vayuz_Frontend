import React, { useContext } from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { authContext } from '../../../Context/authContext';
import CMSConditional from './CMSConditional';
import { CMSContext } from './context/CMSContext';




const CMS = () => {
  const { changeTitle, changeText, checkAdmin } = useContext(authContext);
  changeTitle('CMS');
  const loc = useLocation();


  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title">
          {changeText}
        </h5>
      </div>
      {
        ((loc.pathname === '/cms') || (loc.pathname === '/manager_cms'))
          ? <div className="col-md-2 text-right add-to-center">
            <Link to={`${checkAdmin() ? '/cms/add' : '/manager_order/add'}`}>
              <button className="btn add-btn"><i class="fa fa-plus"></i> Add </button>
            </Link>
          </div>
          : ''
      }
    </div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <CMSContext>
            <CMSConditional />
          </CMSContext>
        </div>
      </div>
    </div>
}

export default CMS;
