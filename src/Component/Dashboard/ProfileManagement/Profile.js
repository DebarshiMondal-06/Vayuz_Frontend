import React, { useContext } from 'react';
import { authContext } from '../../../Context/authContext';
import ProfileConditional from './ProfileConditional';
import { ProfileContext } from './ProfileContext';



const Inventory = () => {
  const { changeTitle } = useContext(authContext);
  changeTitle('Profile');

  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title">
          Profile
        </h5>
      </div>
    </div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <ProfileContext>
            <ProfileConditional />
          </ProfileContext>
        </div>
      </div>
    </div>
}

export default Inventory;
