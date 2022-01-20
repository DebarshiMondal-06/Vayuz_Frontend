import React, { useContext } from 'react'
import { authContext } from '../../../Context/authContext';
import { FeedbackContext } from './FeedbackContext';
import FeedbackTable from './FeedbackTable';




const Feedback = () => {
  const { changeTitle } = useContext(authContext);
  changeTitle('Feedback');


  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title"> Feedback </h5>
      </div>
    </div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <FeedbackContext>
            <FeedbackTable />
          </FeedbackContext>
        </div>
      </div>
    </div>
}

export default Feedback;
