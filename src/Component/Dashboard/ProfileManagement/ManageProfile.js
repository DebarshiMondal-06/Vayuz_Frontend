import React, { useContext } from 'react'
import { useCookies } from 'react-cookie';
import { profileContext } from './ProfileContext'
import { Link } from 'react-router-dom';
import { authContext } from '../../../Context/authContext';


const ManageProfile = () => {
  const { handleEdit, getImage } = useContext(profileContext);
  const { loading, data } = useContext(authContext);
  const [cookie] = useCookies();
  const ID = (cookie.authToken && cookie.authToken._id) ? cookie.authToken._id : null;


  if (loading) {
    return (
      <div className="loading-gif">
        <img
          src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
          alt="some"
        />
      </div>
    );
  }

  return (
    <section>
      <div className="row">
        <div className="col-lg-3">
          <p><img src={getImage()} className="img-responsive profile-pic" alt='some' /></p>
        </div>
        <div className="col-lg-8">
          <h1 className="profile-name">{data.name}</h1>
          <p className="mb-0"> ID: {data.employee_id}</p>
          <p className="mb-0"> <i className="metismenu-state-icon pe-7s-call caret-left"> +91 {data.contact_no}</i></p>
          <p className="mb-0"> <i className="metismenu-state-icon pe-7s-mail caret-left">&nbsp;{data.email_id}</i></p>
        </div>
      </div>
      <div style={{ float: 'right' }}>
        <Link to='/manager_profile/edit' onClick={() => handleEdit(ID, data)}>
          <button className='btn btn-info'>
            Edit Profile
          </button>
        </Link>
      </div>
    </section >
  )
}

export default ManageProfile;
