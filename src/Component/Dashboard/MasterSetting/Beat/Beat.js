import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import BeatConditional from './BeatConditional';
import { BeatContext } from './BeatContext';



const Beat = () => {
  const { changeTitle, changeText } = useContext(authContext);
  changeTitle('Beat');

  const loc = useLocation();

  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title"> {changeText} </h5>
      </div>
      {
        (loc.pathname === '/beat') ? <div className="col-md-2 text-right add-to-center">
          <Link to='/beat/add'><button className="btn add-btn" type="submit">Add Beat
        </button></Link>
        </div> : ''
      }
    </div>
    
      <div className="main-card mb-3 card">
        <div className="card-body">
          <BeatContext>
            <BeatConditional />
          </BeatContext>
        </div>
      </div>
    </div>
  
}

export default Beat;
