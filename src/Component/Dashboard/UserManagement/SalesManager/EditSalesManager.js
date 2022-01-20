import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { createContextManager } from './ManagerContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from "react-select";
import { updateManager } from './managerapis';
import { RHFInput } from 'react-hook-form-input';
import { authContext } from '../../../../Context/authContext';
import { toast, ToastContainer } from 'react-toastify';


const EditSalesManager = () => {
  const history = useHistory();
  const { token, logout } = useContext(authContext);
  const { setEditData, editData, branches, getManagers } = useContext(createContextManager);
  if (!editData.editId) {
    window.location.href = '/salesmanager';
  }



  // ******************** Schema Validaitons ******************************
  const schema = yup.object().shape({
    employee_id: yup
      .string().max(8)
      .required(),
    name: yup
      .string().required()
      .max(30, 'Must be within Range').trim(),
    email_id: yup
      .string()
      .email().required(),
    contact_no: yup
      .string().matches(/^\d{10}$/, 'Not a Valid Number')
      .required(),
    password: yup.string(),
    branches: yup.array().min(1, 'Please select alteast One').required()
  });


  const newArr = editData.branches[0].map((el) => {
    return { label: el.label, value: el.value };
  });
  const { register, handleSubmit, errors, setValue } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      ...editData,
      branches: newArr
    }
  });




  // ******************** Redirecting & Submitting ******************************
  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    const { ID } = token;
    const { employee_id, name, email_id, contact_no, password, branches } = data;
    const branche = branches.map((el) => {
      return el.value;
    });
    btntextChnage('Processing...');
    updateManager({
      id: editData.editId,
      employee_id,
      name,
      email_id,
      contact_no,
      password,
      branches: branche
    }, ID).then(() => {
      btntextChnage('Redirecting...');
      getManagers();
      toast.success('Successfully Implemented')
      setTimeout(() => {
        history.push('/salesmanager');
        setEditData({ branches: [] });
      }, 2000);
    }).catch((err) => {
      btntextChnage('Try Again!!!')
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.message);
        logout();
      }
      else if (err.response) toast.error(err.response.data.message);
    });
  }


  const handleClick = (e) => {
    e.preventDefault();
    setEditData({ branches: [] });
    history.push('/salesmanager');
  }




  // ****************** Options for Multi-Select ***********************************
  const options = branches.map((el) => {
    return { label: el.branch, value: el._id }
  });



  // ****************** Renders ***********************************
  return <form className="needs-validation" onSubmit={handleSubmit(handleS)}>
    <ToastContainer position='bottom-center' autoClose='2000' />
    <div className="form-row">
      <div className="col-md-6 mb-3">
        <label>Employee ID</label>
        <input
          type="number" className="form-control" id="validationTooltip01"
          placeholder="Employee Id"
          name='employee_id'
          ref={register}
        />
        {errors.employee_id && <p className="text-danger small p-1">{errors.employee_id.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Name</label>
        <input
          type="text" className="form-control" id="validationTooltip01"
          placeholder="Name"
          name='name'
          ref={register}
        />
        {errors.name && <p className="text-danger small p-1">{errors.name.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Email ID</label>
        <input
          type="text" className="form-control" id="validationTooltip01"
          placeholder="Email Id"
          name='email_id'
          ref={register}
        />
        {errors.email_id && <p className="text-danger small p-1">{errors.email_id.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Contact Number</label>
        <input
          type="text" className="form-control" id="validationTooltip01"
          placeholder="Contact Number"
          name='contact_no'
          ref={register}
        />
        {errors.contact_no && <p className="text-danger small p-1">{errors.contact_no.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Password Number</label>
        <input
          type="text" className="form-control" id="validationTooltip01"
          placeholder="Password"
          name='password'
          ref={register}
        />
        {errors.password && <p className="text-danger small p-1">{errors.password.message}</p>}
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
        {errors.branches && <p className="text-danger small p-1">{errors.branches.message}</p>}
      </div>

      <div className="col-md-12 text-right">
        <button onClick={handleClick} className="btn btn-dark">Cancel</button>
        &nbsp;
        <button id='addbtn' style={{ width: '100px' }} type='submit' className="btn btn-primary"> Update </button>
      </div>
    </div>
  </form>
}

export default EditSalesManager;
