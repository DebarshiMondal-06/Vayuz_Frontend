import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import CityConditional from './CityConditional';
import { CityContext } from './CityContext';



const City = () => {
  const { changeTitle, changeText } = useContext(authContext);
  changeTitle('City');

  const loc = useLocation();
  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title"> {changeText} </h5>
      </div>
      {
        (loc.pathname === '/city') ? <div className="col-md-2 text-right add-to-center">
          <Link to='/city/add-city'><button className="btn add-btn" type="submit">Add City
        </button></Link>
        </div> : ''
      }
    </div>
    
      <div className="main-card mb-3 card">
        <div className="card-body">
          <CityContext>
            <CityConditional />
          </CityContext>
        </div>
      </div>
    </div>
  
}

export default City;
