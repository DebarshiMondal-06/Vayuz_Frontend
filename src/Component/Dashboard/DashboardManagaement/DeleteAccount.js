import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'
import { authContext } from '../../../Context/authContext';



const DeleteAccount = () => {
  const { checkAdmin, logout } = useContext(authContext);
  const [reason, setReason] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [cookie] = useCookies([]);
  useEffect(() => {
    if (reason.length > 10) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [reason]);



  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (e) => {
    const ID = cookie.authToken ? cookie.authToken._id : null;
    e.preventDefault();
    btntextChnage('Processing...');
    var future = new Date();
    future.setDate(future.getDate() + 30);
    axios({
      method: 'put',
      url: `${process.env.REACT_APP_URL}/users/salesmanager`,
      data: {
        id: ID, delete_reason: reason,
        is_active: 'InActive', expires_delete: future
      }
    }).then(() => {
      btntextChnage('Redirecting...');
      logout();
    });
  }



  return <section>
    <h2 className='h3'>Please Choose a reason to delete your account!</h2>
    <br />
    <form className='row'>
      <div className='col-md-6'>
        <select className="form-control"
          onChange={(e) => setReason(e.target.value)}>
          <option value='' selected>Choose a Reason!</option>
          <option value="Not like Unigas"> Not like Unigas </option>
          <option value="Service Not Staisfied">Service Not Staisfied</option>
          <option value="My Reason Not listed"> My Reason Not listed </option>
        </select>
      </div>
      <div className="col-md-12 text-right">
        <Link to={`${checkAdmin() ? '/setting' : '/manager_setting'}`}>
          <button className="btn btn-dark">Cancel</button>
        </Link> &nbsp;
        <button disabled={disabled} id='addbtn' onClick={handleS} style={{ width: '100px' }} className="btn btn-primary">
          Delete
        </button>
      </div>
    </form>
  </section>
}

export default DeleteAccount
