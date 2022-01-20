import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import RateConditional from './RateConditional';
import { RateContext } from './RateContext';



const Rate = () => {
  const { changeTitle, changeText } = useContext(authContext);
  changeTitle('Rate');
  const loc = useLocation();



  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title">
          {changeText}
        </h5>
      </div>
      {
        (loc.pathname === '/rate') ? <div className="col-md-2 text-right add-to-center">
          <Link to='/rate/add'><button className="btn add-btn" type="submit">Add Rate
        </button></Link>
        </div> : null
      }
    </div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <RateContext>
            <RateConditional />
          </RateContext>
        </div>
      </div>
    </div>
}

export default Rate;
