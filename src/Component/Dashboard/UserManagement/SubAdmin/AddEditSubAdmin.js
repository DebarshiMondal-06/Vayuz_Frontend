import React, { useContext } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { createContextSubAdmin } from './SubAdminContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from "react-select";
import { addStaffs, updateStaff } from './subadminapi';
import { RHFInput } from 'react-hook-form-input';
import { toast, ToastContainer } from 'react-toastify';


const AddEditSubAdmin = () => {
  const loc = useLocation();
  const history = useHistory();
  const { getStaffs, editData } = useContext(createContextSubAdmin);




  // ******************** Schema Validaitons ******************************
  const schema = yup.object().shape({
    employee_id: yup
      .string().max(8).required().matches(/^[0-9]*$/, 'Employee ID should be a Number'),
    admin_name: yup
      .string().required()
      .max(20, 'Must be within Range').matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, 'Not a Valid Name'),
    email: yup
      .string()
      .email().required().lowercase(),
    contact: yup
      .string().matches(/^\d{10}$/, 'Not a Valid Number')
      .required(),
    password: (loc.pathname === '/subadmin/add')
      ? yup.string().required().min(6, 'Password should be 6 character long')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/, 'At least one uppercase letter, one lowercase letter and one number')
      : yup.string(),
    staff_roles: yup.array().min(1, 'Please select alteast one value').required()
  });
  const { register, handleSubmit, setValue, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      ...editData
    }
  });




  //************************* */ Redirecting and Submitting ****************************
  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    const { employee_id, admin_name, email, contact,
      password, staff_roles } = data;
    const staffRoles = staff_roles.map((el) => {
      return el.value;
    });
    btntextChnage('Processing...');
    const operation = (loc.pathname === '/subadmin/add') ? addStaffs : updateStaff;
    operation({
      id: editData.editId || null,
      employee_id,
      admin_name,
      email,
      contact,
      password,
      staff_roles: staffRoles,
      role: 'staff'
    }).then(() => {
      btntextChnage('Redirecting...');
      toast.success('Successfully Implemented')
      getStaffs();
      setTimeout(() => {
        history.push('/subadmin');
      }, 2000);
    }).catch(() => btntextChnage('Try Again!!!'));
  }



  //********************  */ Options value for Multi select ****************************
  const options = [
    { label: 'Sales Manager', value: 'Sales Manager' },
    { label: 'Sales Executive', value: 'Sales Executive' },
    { label: 'Distributor', value: 'Distributor' },
    { label: 'Customer', value: 'Customer' },
    { label: 'State', value: 'State' },
    { label: 'District', value: 'District' },
    { label: 'City', value: 'City' },
    { label: 'Branch', value: 'Branch' },
    { label: 'Area', value: 'Area' },
    { label: 'Beat', value: 'Beat' },
    { label: 'Stock', value: 'Stock' },
    { label: 'Order', value: 'Order' },
    { label: 'Inventory', value: 'Inventory' },
    { label: 'Visit', value: 'Visit' },
  ]





  // ******************* Renders ********************************************
  return <form className="needs-validation" onSubmit={handleSubmit(handleS)}>
    <ToastContainer autoClose='2500' position='bottom-center' />
    <div className="form-row">
      <div className="col-md-6 mb-3">
        <label>Employee ID</label>
        <input
          type="text" className="form-control" name='employee_id' ref={register} />
        {errors.employee_id && <p className="text-capitalize text-danger small p-1">{errors.employee_id.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Name</label>
        <input
          type="text" className="form-control" name='admin_name' ref={register} />
        {errors.admin_name && <p className="text-capitalize text-danger small p-1">{errors.admin_name.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Email ID</label>
        <input
          type="text" className="form-control" name='email' ref={register} />
        {errors.email && <p className="text-capitalize text-danger small p-1">{errors.email.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Contact Number</label>
        <input
          type="text" className="form-control" name='contact' ref={register} />
        {errors.contact && <p className="text-capitalize text-danger small p-1">{errors.contact.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Password</label>
        <input
          type="text" className="form-control" name='password' ref={register} />
        {errors.password && <p className="text-capitalize text-danger small p-1">{errors.password.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>SubAdmin Role</label>
        <RHFInput
          as={<Select isMulti options={options} />}
          name="staff_roles" setValue={setValue} register={register} />
        {errors.staff_roles && <p className="text-capitalize text-danger small p-1">{errors.staff_roles.message}</p>}
      </div>


      <div className="col-md-12 text-right">
        <Link to='/subadmin'><button className="btn btn-dark">Cancel</button></Link>&nbsp;
        <button id='addbtn' style={{ width: '100px' }} type='submit' className="btn btn-primary">
          {loc.pathname === '/subadmin/add' ? "Add" : 'Update'}
        </button>
      </div>
    </div>
  </form>
}

export default AddEditSubAdmin;
