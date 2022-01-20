import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import AreaConditional from './AreaConditional';
import { AreaContext } from './AreaContext';



const Area = () => {
  const { changeTitle, changeText } = useContext(authContext);
  changeTitle('Area');
  const loc = useLocation();


  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title"> {changeText} </h5>
      </div>
      {
        (loc.pathname === '/area') ? <div className="col-md-2 text-right add-to-center">
          <Link to='/area/add'><button className="btn add-btn" type="submit">Add Area
        </button></Link>
        </div> : ''
      }
    </div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <AreaContext>
            <AreaConditional />
          </AreaContext>
        </div>
      </div>
    </div>
}

export default Area;
