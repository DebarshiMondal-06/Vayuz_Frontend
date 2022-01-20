import React, { useContext } from 'react'
import { authContext } from '../../../Context/authContext';
import VisitConditional from './VisitConditional';
import { VisitContext } from './VisitContext';





const Visit = () => {
  const { changeTitle } = useContext(authContext);
  changeTitle('Visit');


  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title"> Visits </h5>
      </div>
    </div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <VisitContext>
            <VisitConditional />
          </VisitContext>
        </div>
      </div>
    </div>
}

export default Visit;
