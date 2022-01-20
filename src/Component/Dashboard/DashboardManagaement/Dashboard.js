import React, { useContext } from 'react'
import { authContext } from '../../../Context/authContext';
import DashboardConditional from './DashboardConditional';
import { DashboardContext } from './DashboardContext';


const State = () => {
  const { changeTitle, changeText } = useContext(authContext);
  changeTitle('Dashboard');


 

  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title">
          {changeText}
        </h5>
      </div>
    </div>
    <div className="main-card mb-3 card">
      <div className="card-body">
        <DashboardContext>
          <DashboardConditional />
        </DashboardContext>
      </div>
    </div>
  </div>
}

export default State;
