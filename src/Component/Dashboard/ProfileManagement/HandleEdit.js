import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { profileContext } from './ProfileContext';
import { useCookies } from 'react-cookie';
import { authContext } from '../../../Context/authContext';
import { toast, ToastContainer } from 'react-toastify';







const HandleEdit = () => {
  const [cookie] = useCookies();
  const [image, setImage] = useState();
  const { editData, getImage } = useContext(profileContext);
  const { getCurrentManager } = useContext(authContext);
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('This Field is Required').max(50).trim(),
    contact_no: yup.string().required()
  });
  const { register, handleSubmit, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      ...editData
    }
  });



  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    const { name, contact_no } = data;
    btntextChnage('Processing...');
    const Id = cookie.authToken ? cookie.authToken._id : '';
    const formData = new FormData();
    formData.append('profile', image);
    formData.append('id', Id);
    formData.append('name', name);
    formData.append('contact_no', contact_no);
    fetch(`${process.env.REACT_APP_URL}/auth/update_manager`, {
      method: 'put',
      body: formData
    }).then(() => {
      btntextChnage('Redirecting...');
      getCurrentManager();
      getImage();
      setTimeout(() => {
        window.location.href = '/manager_profile'
      }, 2500);
    }).catch((err) => {
      btntextChnage('Try Again!!!')
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.message);
        // logout();
      }
      else if (err.response) toast.error(err.response.data.message);
      else toast.error('Please Try Again');
    });
  }





  return <form onSubmit={handleSubmit(handleS)}>
    <ToastContainer position='bottom-center' autoClose={2500} />
    <div className="form-row">
      <div className="col-md-6 mb-3">
        <label>Name</label>
        <input
          type="text" className="form-control"
          name='name'
          ref={register} />
        {errors.name && <p className="text-danger small p-1">{errors.name.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Contact</label>
        <input
          type="text" className="form-control"
          name='contact_no'
          ref={register} />
        {errors.contact_no && <p className="text-danger small p-1">{errors.contact_no.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Profile Image</label><br />
        <input
          type="file" accept='image'
          name='profile' onChange={(e) => setImage(e.target.files[0])} />
      </div>

      <div className="col-md-12 text-right">
        <Link to='/manager_profile'><button className="btn btn-dark">Cancel</button></Link>&nbsp;
        <button id='addbtn' style={{ width: '100px' }} className="btn btn-primary"> Update </button>
      </div>
    </div>
  </form >
}

export default HandleEdit;
