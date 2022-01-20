import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { createContextCustomer } from './CustomerContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from "react-select";
import { addCustomer, getDistributorFromExecutive, updateCustomer } from './customerapi';
import { RHFInput } from 'react-hook-form-input';
import {
  getAreaFromBranch, getbeatFromArea,
  getBranchFromExecutive, getExecutiveFromManager
} from '../Distributor/distributorapi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authContext } from '../../../../Context/authContext';
import { useCookies } from 'react-cookie';




const Add_Edit_Customer = () => {
  const loc = useLocation();
  const history = useHistory();
  const { checkAdmin, token: { role, ID }, logout } = useContext(authContext);
  const [cookie] = useCookies();
  const { getCustomers, manager, editData } = useContext(createContextCustomer);
  const [Distributor, setDistributor] = useState([]);
  const [loading, setloading] = useState(false);
  const [Branch, setBranch] = useState([]);
  const [Executive, setExecutive] = useState([]);
  const [Area, setArea] = useState([]);
  const [Beat, setBeat] = useState([]);

  if ((loc.pathname === '/customer/edit' || loc.pathname === '/manager_customer/edit') && !editData.editId) {
    window.location.href = checkAdmin() ? '/customer' : '/manager_customer';
  }



  // ******************** Schema Validaitons ******************************
  const schema = yup.object().shape({
    company_name: yup
      .string().required('Company Name Required*').max(200).trim(),
    company_contact: yup
      .string().matches(/^\d{10}$/, 'Not a Valid Number')
      .required('Company Contact Required*'),
    customer_name: yup
      .string().required('Customer Name Required*')
      .max(50, 'Not more than 50 char long').matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, 'Not a Valid Name').trim(),
    customer_contact: yup
      .string().matches(/^\d{10}$/, 'Not a Valid Number')
      .required('Customer Contact Required*'),
    email: yup.string().email().required().trim(),
    password: (loc.pathname === '/customer/add' || loc.pathname === '/manager_customer/add')
      ? yup.string().required().min(6, 'Password should be 6 character long')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/, 'At least 1 uppercase letter, 1 lowercase letter, 1 number and 1 Special Char')
      : yup.string().notRequired(),
    distributor: yup.object().required(),
    branch: yup.object().required(),
    manager: yup.object().required(),
    executive: yup.object().required(),
    area: yup.object().required(),
    beat: yup.object().required(),
    gstin: yup.string().required()
      .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Not a Valid GSTIN Number'),
  });
  const { register, handleSubmit, setValue, errors, watch } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      ...editData
    }
  });



  // ******************  Data Fetching *********************************************
  useEffect(() => {
    if (!editData.manager && !checkAdmin()) {
      const obj = { label: cookie.authToken.name, value: cookie.authToken._id };
      setValue('manager', obj);
    }
    // eslint-disable-next-line
  }, [cookie]);

  const dataManager = watch('manager');
  useEffect(() => {
    if (dataManager && dataManager.value !== undefined) {
      setloading(true);
      getExecutiveFromManager({ manager: dataManager.value }, role, ID).then((ele) => {
        if (Executive.length > 0) setValue('executive', undefined);
        if (ele.data.result) {
          setloading(false);
          setExecutive(ele.data.result);
        }
      });
    } else {
      setValue('executive', undefined);
    }
    // eslint-disable-next-line
  }, [dataManager]);

  const dataExecutive = watch('executive');
  useEffect(() => {
    if (dataExecutive && dataExecutive.value !== undefined) {
      getBranchFromExecutive({ executive: dataExecutive.value }, role, ID).then((ele) => {
        if (Branch.length > 0) setValue('branch', undefined);
        if (ele.data.result) {
          setBranch(ele.data.result);
        }
      });
      getDistributorFromExecutive({ executiveId: dataExecutive.value }, role, ID).then((el) => {
        if (Distributor.length > 0) setValue('distributor', undefined);
        if (el.data.result) {
          setDistributor(el.data.result);
        }
      });
    } else {
      setDistributor([]);
      setValue('distributor', undefined);
      setBranch([]);
      setValue('branch', undefined);
    }
    // eslint-disable-next-line
  }, [dataExecutive]);

  const dataBranch = watch('branch');
  useEffect(() => {
    if (dataBranch && dataBranch.value !== undefined) {
      getAreaFromBranch({ branch: dataBranch.value }, role, ID).then((ele) => {
        if (Area.length > 0) setValue('area', undefined);
        if (Beat.length > 0) setValue('beat', undefined);
        if (ele.data.result) {
          setArea(ele.data.result);
        }
      });
    } else {
      setValue('area', undefined);
      setValue('beat', undefined);
      setArea([]);
      setBeat([]);
    }
    // eslint-disable-next-line
  }, [dataBranch]);

  const dataArea = watch('area');
  useEffect(() => {
    if (dataArea && dataArea.value !== undefined) {
      getbeatFromArea({ area: dataArea.value }, role, ID).then((ele) => {
        if (ele.data.result) {
          if (Beat.length > 0) setValue('beat', undefined);
          setBeat(ele.data.result);
        } else {
          setBeat([]);
        }
      });
    } else {
      setBeat([]);
      setValue('beat', undefined);
    }
    // eslint-disable-next-line
  }, [dataArea]);





  //************************* */ Redirecting and Submitting ****************************
  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    const { branch, distributor, manager, area, beat, executive } = data;
    btntextChnage('Processing...');
    const operation = (loc.pathname === '/customer/add' || loc.pathname === '/manager_customer/add')
      ? addCustomer : updateCustomer
    operation({
      ...data,
      id: editData.editId || null,
      distributor: distributor.value,
      branch: branch.value,
      manager: manager.value,
      executive: executive.value,
      area: area.value,
      beat: beat.value,
      createdBy: (checkAdmin() ? 'Admin' : 'Manager')
    }, ID).then(() => {
      btntextChnage('Redirecting...');
      getCustomers();
      toast.success('Successfully Implemented');
      setTimeout(() => {
        checkAdmin()
          ? history.push('/customer')
          : history.push('/manager_customer');
      }, 2000);
    }).catch((err) => {
      btntextChnage('Try Again!!!')
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.message);
        logout();
      }
      else if (err.response) toast.error(err.response.data.message);
      else toast.error('Please Try Again');
    });
  }



  //********************  */ Options value for Multi select ****************************
  const optionManager = manager.map((el) => {
    return { label: el.name, value: el._id };
  });
  const optionsExecutive = Executive.map((ele) => {
    return { label: ele.name, value: ele._id };
  });
  const branchOptions = Branch.map((el) => {
    return { label: el.branch, value: el._id };
  });
  const optionDistributor = Distributor.map((el) => {
    return { label: el.name, value: el._id }
  });
  const optionsArea = Area.map((ele) => {
    return { label: ele.area, value: ele._id };
  });
  const optionsBeat = Beat.map((ele) => {
    return { label: ele.beat, value: ele._id };
  });




  // ******************* Renders ********************************************
  return <form onSubmit={handleSubmit(handleS)}>
    <div className="form-row">
      <div className="col-md-6 mb-3">
        <label>Company</label>
        <input type="text" className="form-control" name='company_name' ref={register} />
        {errors.company_name && <p className="text-capitalize text-danger small p-1">{errors.company_name.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Company Contact</label>
        <input type="text" className="form-control" name='company_contact' ref={register}
        />
        {errors.company_contact && <p className="text-capitalize text-danger small p-1">{errors.company_contact.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Customer Name</label>
        <input type="text" className="form-control" name='customer_name' ref={register} />
        {errors.customer_name && <p className="text-capitalize text-danger small p-1">{errors.customer_name.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Customer Contact</label>
        <input type="text" className="form-control" name='customer_contact' ref={register} />
        {errors.customer_contact && <p className="text-capitalize text-danger small p-1">{errors.customer_contact.message}</p>}
      </div>
      {
        (checkAdmin())
          ? <div className="col-md-6 mb-3">
            <label>Sales Manager</label>
            <RHFInput as={<Select options={optionManager} />}
              name="manager" setValue={setValue} register={register} />
            {errors.manager && <p className="text-danger small p-1">{errors.manager.message}</p>}
          </div>
          : <div className="col-md-6 mb-3">
            <label>Sales Manager</label>
            <RHFInput as={<Select isDisabled placeholder='Search or Select' />}
              name="manager" setValue={setValue} register={register} />
            {errors.manager && <p className="text-danger small p-1">{errors.manager.message}</p>}
          </div>
      }

      <div className="col-md-6 mb-3">
        <label>Executive</label>
        <RHFInput
          as={<Select isLoading={loading} options={optionsExecutive}
            noOptionsMessage={() => (!dataManager) ? 'Select Manager' : 'No Avialable Executive For this Manager'} />}
          name="executive" setValue={setValue} register={register} />
        {errors.executive && <p className="text-capitalize text-danger small p-1">{errors.executive.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Branch</label>
        <RHFInput as={<Select options={branchOptions}
          noOptionsMessage={() => (!dataExecutive) ? 'Select Executive' : 'No Avialable Branch For this Executive'} />}
          name="branch" setValue={setValue} register={register} />
        {errors.branch && <p className="text-capitalize text-danger small p-1">{errors.branch.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Distributor</label>
        <RHFInput
          as={<Select options={optionDistributor}
            noOptionsMessage={() => (!dataBranch) ? 'Select Branch' : 'No Avialable Distributor For this Branch'} />}
          name="distributor" setValue={setValue} register={register} />
        {errors.distributor && <p className="text-capitalize text-danger small p-1">{errors.distributor.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Area</label>
        <RHFInput as={<Select options={optionsArea} noOptionsMessage={() => 'Choose Branch'} />}
          name="area" setValue={setValue} register={register} />
        {errors.area && <p className="text-capitalize text-danger small p-1">{errors.area.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Beat</label>
        <RHFInput as={<Select options={optionsBeat} noOptionsMessage={() => 'Choose Area'} />}
          name="beat" setValue={setValue} register={register} />
        {errors.beat && <p className="text-capitalize text-danger small p-1">{errors.beat.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>GSTIN</label>
        <input type="text" className="form-control" name='gstin' ref={register} />
        {errors.gstin && <p className="text-capitalize text-danger small p-1">{errors.gstin.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Customer Email</label>
        <input type="text" className="form-control" name='email' ref={register} />
        {errors.email && <p className="text-capitalize text-danger small p-1">{errors.email.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Password</label>
        <input type="text" className="form-control" name='password' ref={register} />
        {errors.password && <p className="text-capitalize text-danger small p-1">{errors.password.message}</p>}
      </div>

      <div className="col-md-12 text-right">
        <Link to={`${checkAdmin() ? '/customer' : '/manager_customer'}`}>
          <button className="btn btn-dark">Cancel</button>
        </Link> &nbsp;
        <button id='addbtn' style={{ width: '100px' }} type='submit' className="btn btn-primary">
          {(loc.pathname === '/customer/add' || loc.pathname === '/manager_customer/add') ? 'Add' : 'Update'}
        </button>
      </div>
    </div>
  </form>
}

export default Add_Edit_Customer;

