import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import StateConditional from './StateConditional';
import { StateContext } from './StateContext';



const State = () => {
  const { changeTitle, changeText } = useContext(authContext);
  changeTitle('State');
  const loc = useLocation();



  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title">
          {changeText}
        </h5>
      </div>
      {
        (loc.pathname === '/state') ? <div className="col-md-2 text-right add-to-center">
          <Link to='/state/add-state'><button className="btn add-btn" type="submit">Add State
        </button></Link>
        </div> : ''
      }
    </div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <StateContext>
            <StateConditional />
          </StateContext>
        </div>
      </div>
    </div>
  
}

export default State;
