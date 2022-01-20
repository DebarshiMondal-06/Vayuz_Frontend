import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { createContextDistributor } from './DistributorContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from "react-select";
import { RHFInput } from 'react-hook-form-input';
import {
  Adddistributor, getbeatFromArea, getExecutiveFromManager,
  getBranchFromExecutive, updateDistributor, getAreaFromBranch
} from './distributorapi';
import { toast } from 'react-toastify';
import { authContext } from '../../../../Context/authContext';
import { useCookies } from 'react-cookie';



const AddDistributor = () => {
  const [cookie] = useCookies();
  const loc = useLocation();
  const history = useHistory();
  const { checkAdmin, token: { role, ID }, logout } = useContext(authContext);
  const { manager, getDistributors, editData } = useContext(createContextDistributor);
  const [loading, setloading] = useState(false);
  const [Branch, setBranch] = useState([]);
  const [Executive, setExecutive] = useState([]);
  const [Area, setArea] = useState([]);
  const [Beat, setBeat] = useState([]);

  if ((loc.pathname === '/distributor/edit' || loc.pathname === '/manager_distributor/edit') && !editData.editId) {
    window.location.href = checkAdmin() ? '/distributor' : '/manager_distributor';
  }

  // ********************************* Schema and Validation **************************
  const schema = yup.object().shape({
    company: yup
      .string()
      .required(),
    name: yup
      .string().required()
      .max(50, 'Not more than 50 char long').matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, 'Not a Valid Name'),
    email: yup
      .string()
      .email().required().lowercase(),
    contact1: yup
      .string().matches(/^\d{10}$/, 'Not a Valid Number')
      .required(),
    contact2: yup
      .string().matches(/^[0-9]*$/, 'Not a Valid Number')
      .max(10, 'Not Valid').max(10, 'Not Valid'),
    manager: yup.object().required(),
    branch: yup.object().required(),
    executive: yup.object().required(),
    gstin: yup.string().required().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Not a Valid GSTIN Number'),
    pan: yup.string().max(11).required().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Not a Valid Pan Number'),
    area: yup.array().required(),
    beat: yup.array().required(),
    password: (loc.pathname === '/distributor/add' || loc.pathname === '/manager_distributor/add')
      ? yup.string().required().min(6, 'Password should be 6 character long')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/, 'At least 1 uppercase letter, 1 lowercase letter, 1 number and 1 Special Char')
      : yup.string(),
    no_security_deposits: yup.string().notRequired(),
    security_deposits: yup.string().required('This Field is Required')
  });
  const { register, handleSubmit, setValue, errors, watch } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      ...editData
    }
  });



  // ***************************  Searching Values *******************************
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
      if (Executive.length > 0) setValue('executive', undefined);
      getExecutiveFromManager({ manager: dataManager.value }, role, ID).then((ele) => {
        if (ele.data.result) {
          setloading(false);
          setExecutive(ele.data.result);
        }
      });
    } else {
      setExecutive([]);
      setValue('executive', undefined);
    }
    // eslint-disable-next-line
  }, [dataManager]);

  const dataExecutive = watch('executive');
  useEffect(() => {
    if (dataExecutive && dataExecutive.value !== undefined) {
      setloading(true);
      if (Branch.length > 0) setValue('branch', undefined);
      getBranchFromExecutive({ executive: dataExecutive.value }).then((ele) => {
        if (ele.data.result) {
          setloading(false);
          setBranch(ele.data.result);
        }
      })
    } else {
      setBranch([]);
      setValue('branch', undefined);
    }
    // eslint-disable-next-line
  }, [dataExecutive]);

  const dataBranch = watch('branch');
  useEffect(() => {
    if (dataBranch && dataBranch.value !== undefined) {
      if (Area.length > 0) setValue('area', undefined);
      getAreaFromBranch({ branch: dataBranch.value }, role, ID).then((ele) => {
        if (ele.data.result) {
          setArea(ele.data.result);
        }
      });
    } else {
      setValue('area', undefined);
      setArea([]);
    }
    // eslint-disable-next-line
  }, [dataBranch]);

  const dataArea = watch('area');
  useEffect(() => {
    if (dataArea && dataArea.length > 0) {
      const newarr = dataArea.map((el) => el.value);
      if (Area.length > 0) setValue('beat', undefined);
      getbeatFromArea({ area: newarr }, role, ID).then((ele) => {
        if (ele.data.result) {
          setBeat(ele.data.result);
        }
      });
    } else {
      setBeat([]);
      setValue('beat', undefined);
    }
    // eslint-disable-next-line
  }, [dataArea]);






  //******************************** */ Creating Distributor ***************************************
  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    const {
      branch, manager, executive, area, beat
    } = data;
    const areaArr = area.map((el) => el.value);
    const beatArr = beat.map((el) => el.value);
    btntextChnage('Processing...');
    const operation = (loc.pathname === '/distributor/add' || loc.pathname === '/manager_distributor/add')
      ? Adddistributor : updateDistributor;
    operation({
      id: editData.editId || null,
      ...data,
      branch: branch.value,
      areas: areaArr,
      executive: executive.value,
      manager: manager.value,
      beats: beatArr,
      createdBy: (checkAdmin() ? 'Admin' : 'Manager')
    }, ID).then(() => {
      toast.success('Implemented Successfully!');
      btntextChnage('Redirecting...');
      getDistributors();
      setTimeout(() => {
        checkAdmin()
          ? history.push('/distributor')
          : history.push('/manager_distributor');
      }, 2000);
    }).catch((err) => {
      btntextChnage('Try Again!!!');
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.message);
        logout();
      }
      else toast.error(err.response && err.response.data.message);
    });
  }



  //******************** */ Options for Select *************************
  const options = manager.map((el) => {
    return { label: el.name, value: el._id };
  });
  const branchOptions = Branch.map((el) => {
    return { label: el.branch, value: el._id };
  });
  const optionsExecutive = Executive.map((ele) => {
    return { label: ele.name, value: ele._id };
  });
  const optionsArea = Area.map((ele) => {
    return { label: ele.area, value: ele._id };
  });
  const optionsBeat = Beat.map((ele) => {
    return { label: ele.beat, value: ele._id };
  });




  // ************************ Renders *****************************************
  return <form onSubmit={handleSubmit(handleS)}>
    <div className="form-row">
      <div className="col-md-6 mb-3">
        <label>Company Name</label>
        <input type="text" className="form-control" name='company' ref={register} />
        {errors.company && <p className="text-danger small p-1">{errors.company.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Distributor Name</label>
        <input type="text" className="form-control" name='name' ref={register} />
        {errors.name && <p className="text-danger small p-1">{errors.name.message}</p>}
      </div>

      {
        (checkAdmin())
          ? <div className="col-md-6 mb-3">
            <label>Sales Manager</label>
            <RHFInput as={<Select options={options} />}
              name="manager" setValue={setValue} register={register} />
            {errors.manager && <p className="text-danger small p-1">{errors.manager.message}</p>}
          </div>
          : <div className="col-md-6 mb-3">
            <label>Sales Manager</label>
            <RHFInput as={<Select options={options} isDisabled placeholder='Search or Select' />}
              name="manager" setValue={setValue} register={register} />
            {errors.manager && <p className="text-danger small p-1">{errors.manager.message}</p>}
          </div>
      }

      <div className="col-md-6 mb-3">
        <label>Email</label>
        <input type="email" className="form-control" name='email' ref={register} />
        {errors.email && <p className="text-danger small p-1">{errors.email.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Contact Number 1</label>
        <input type="text" className="form-control" name='contact1' ref={register} />
        {errors.contact1 && <p className="text-danger small p-1">{errors.contact1.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Contact Number 2</label>
        <input type="text" className="form-control" name='contact2' ref={register} />
        {errors.contact2 && <p className="text-danger small p-1">{errors.contact2.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Executive</label>
        <RHFInput
          as={<Select
            options={optionsExecutive} isLoading={loading} className='text-capitalize'
            noOptionsMessage={() => (!dataManager) ? 'Select Manager' : 'No Avialable Executive For this Manager'} />}
          name="executive" setValue={setValue} register={register} />
        {errors.executive && <p className="text-danger small p-1">{errors.executive.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Branch</label>
        <RHFInput
          as={<Select
            options={branchOptions} isLoading={loading}
            noOptionsMessage={() => (!dataExecutive) ? 'Select Executive' : 'No Avialable Branch For this Executive'} />}
          name="branch" setValue={setValue} register={register}
        />
        {errors.branch && <p className="text-danger small p-1">{errors.branch.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>GISTN Number</label>
        <input type="text" className="form-control" name='gstin' ref={register} />
        {errors.gstin && <p className="text-danger small p-1">{errors.gstin.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Pan Number</label>
        <input type="text" className="form-control" name='pan' ref={register} />
        {errors.pan && <p className="text-danger small p-1">{errors.pan.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Area</label>
        <RHFInput
          as={<Select
            options={optionsArea} noOptionsMessage={() => 'Choose Branch'} isMulti />}
          name="area" setValue={setValue} register={register} />
        {errors.area && <p className="text-danger small p-1">{errors.area.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Beat</label>
        <RHFInput
          as={<Select
            options={optionsBeat} isMulti noOptionsMessage={() => 'Choose Area'} />}
          name="beat" setValue={setValue} register={register} />
        {errors.beat && <p className="text-danger small p-1">{errors.beat.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Cylinder/Security Deposit</label>
        <input
          type="text" className="form-control" name='security_deposits' ref={register} />
        {errors.security_deposits && <p className="text-danger small p-1">{errors.security_deposits.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Without Security Deposit</label>
        <input
          type="text" className="form-control" name='no_security_deposits' ref={register} />
        {errors.no_security_deposits && <p className="text-danger small p-1">{errors.no_security_deposits.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Password Number</label>
        <input
          type="text" className="form-control" name='password' ref={register} />
        {errors.password && <p className="text-danger small p-1">{errors.password.message}</p>}
      </div>

      <div className="col-md-12 text-right">
        <Link to={`${checkAdmin() ? '/distributor' : '/manager_distributor'}`}>
          <button className="btn btn-dark">Cancel</button>
        </Link> &nbsp;
        <button id='addbtn' style={{ width: '100px' }} type='submit' className="btn btn-primary">
          {(loc.pathname === '/distributor/add' || loc.pathname === '/manager_distributor/add') ? 'Add' : 'Update'}
        </button>
      </div>
    </div>
  </form>
}

export default AddDistributor;
