import React, { useContext } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { createContextManager } from './ManagerContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from "react-select";
import { addManager } from './managerapis';
import { RHFInput } from 'react-hook-form-input';
import { toast } from 'react-toastify';
import { authContext } from '../../../../Context/authContext';


const AddSalesManager = () => {
  const loc = useLocation();
  const history = useHistory();
  const { branches, getManagers } = useContext(createContextManager);
  const { token, logout } = useContext(authContext);




  // ******************** Schema Validaitons ******************************
  const schema = yup.object().shape({
    employee_id: yup
      .string().max(8).required().matches(/^[0-9]*$/, 'Employee ID should be a Number'),
    name: yup
      .string().required()
      .max(30, 'Must be within Range').trim(),
    email: yup
      .string()
      .email().required().lowercase(),
    contact: yup
      .string().matches(/^\d{10}$/, 'Not a Valid Number')
      .required(),
    password: (loc.pathname === '/salesmanager/add')
      ? yup.string().required().min(6, 'Password should be 6 character long')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/, 'At least one uppercase letter, one lowercase letter and one number and one Special Char')
      : yup.string(),
    branches: yup.array().min(1, 'Please select alteast one value').required()
  });
  const { register, handleSubmit, setValue, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema)
  });




  //************************* */ Redirecting and Submitting ****************************
  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    const { ID } = token;
    const { employee_id, name, email, contact, password, branches } = data;
    const branche = branches.map((el) => {
      return el.value;
    });
    btntextChnage('Processing...');
    addManager({
      employee_id,
      name,
      email_id: email,
      contact_no: contact,
      password,
      branches: branche
    }, ID).then((el) => {
      console.log(el);
      btntextChnage('Redirecting...');
      getManagers();
      toast.success('Successfully Implemented');
      setTimeout(() => {
        history.push('/salesmanager');
      }, 2000);
    }).catch((err) => {
      btntextChnage('Try Again!!!')
      if (err.response.status === 401) {
        toast.error(err.response.data.message);
        logout();
      }
      else if (err.response) toast.error(err.response.data.message);
    });
  }



  //********************  */ Options value for Multi select ****************************
  const options = branches.map((el) => {
    return { label: el.branch, value: el._id }
  });




  // ******************* Renders ********************************************
  return <form onSubmit={handleSubmit(handleS)}>
    <div className="form-row">
      <div className="col-md-6 mb-3">
        <label>Employee ID</label>
        <input
          type="text" className="form-control"
          name='employee_id'
          ref={register}
        />
        {errors.employee_id && <p className="text-capitalize text-danger small p-1">{errors.employee_id.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Name</label>
        <input
          type="text" className="form-control"
          name='name'
          ref={register}
        />
        {errors.name && <p className="text-capitalize text-danger small p-1">{errors.name.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Email ID</label>
        <input
          type="text" className="form-control"
          name='email'
          ref={register}
        />
        {errors.email && <p className="text-capitalize text-danger small p-1">{errors.email.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Contact Number</label>
        <input
          type="text" className="form-control"
          name='contact'
          ref={register}
        />
        {errors.contact && <p className="text-capitalize text-danger small p-1">{errors.contact.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Password Number</label>
        <input
          type="text" className="form-control"
          name='password'
          ref={register}
        />
        {errors.password && <p className="text-capitalize text-danger small p-1">{errors.password.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Branches</label>
        <RHFInput
          as={<Select
            isMulti
            options={options}
          />}
          name="branches"
          setValue={setValue}
          register={register}
        />
        {errors.branches && <p className="text-capitalize text-danger small p-1">{errors.branches.message}</p>}
      </div>

      <div className="col-md-12 text-right">
        <Link to='/salesmanager'><button className="btn btn-dark">Cancel</button></Link>&nbsp;
        <button id='addbtn' style={{ width: '100px' }} type='submit' className="btn btn-primary">Add</button>
      </div>
    </div>
  </form>
}

export default AddSalesManager;
