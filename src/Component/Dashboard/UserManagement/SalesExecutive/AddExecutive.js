import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { createContextExecutive } from './ExecutiveContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addExecutive, getBranchFromManager, getAreaFromBranch, getbeatFromArea, updateExecutive } from './executiveapis';
import Select from 'react-select';
import { RHFInput } from 'react-hook-form-input';
import { authContext } from '../../../../Context/authContext';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';



const AddSalesExecutive = () => {
  const history = useHistory();
  const loc = useLocation();
  const [cookie] = useCookies();
  const { checkAdmin, logout, token } = useContext(authContext);
  const { manager, getExecutives, editData } = useContext(createContextExecutive);
  const [beat, setBeat] = useState([]);
  const [area, setArea] = useState([]);
  const [Branch, setBranch] = useState([]);
  const [loading, setLoading] = useState(false);
  if ((loc.pathname === '/salesexecutive/edit' || loc.pathname === '/manager_salesexecutive/edit') && !editData.editId) {
    window.location.href = checkAdmin() ? '/salesexecutive' : '/manager_salesexecutive';
  }



  // ************************ Schema Validaitons ******************************
  const schema = yup.object().shape({
    employee_id: yup
      .string().max(8)
      .required().matches(/^[0-9]*$/, 'Only Numbers are allowed!'),
    name: yup
      .string().required()
      .max(20, 'Must be within Range').matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, 'Not a Valid Name'),
    email_id: yup
      .string()
      .email().required().lowercase(),
    contact_no: yup
      .string().matches(/^\d{10}$/, 'Not a Valid Number')
      .required(),
    password: (loc.pathname === '/salesexecutive/add' || loc.pathname === '/manager_salesexecutive/add')
      ? yup.string().min(6, 'Password should be 6 character long')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/, 'At least 1 uppercase letter, 1 lowercase letter, 1 number and 1 Special Char')
      : yup.string(),
    branch: yup.array().min(1, 'Atleast Choose one branch').required(),
    manager: yup.object().required(),
    area: yup.array().min(1, 'Atleast Choose one Area').required(),
    beat: yup.array().min(1, 'Atleast Choose one beat').required()
  });
  const { register, handleSubmit, errors, setValue, watch } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      ...editData
    }
  });




  // ***************** Getting branch, area, beat *************************
  useEffect(() => {
    if (!editData.manager && !checkAdmin()) {
      const obj = { label: cookie.authToken.name, value: cookie.authToken._id };
      setValue('manager', obj);
    }
    // eslint-disable-next-line
  }, [cookie]);

  const dataManager = watch('manager');
  useEffect(() => {
    if (dataManager && dataManager.value) {
      setLoading(true);
      const Id = dataManager.value
      getBranchFromManager({ manager_id: Id }).then((ele) => {
        if (ele.data.result) {
          if (Branch.length > 0) setValue('branch', undefined);
          setLoading(false);
          setBranch(ele.data.result);
        } else {
          setBranch([]);
          setLoading(false);
        }
      });
    } else {
      setValue('branch', undefined);
    }
    // eslint-disable-next-line
  }, [dataManager]);

  const dataBranch = watch('branch');
  useEffect(() => {
    if (dataBranch && dataBranch.length > 0) {
      const newarr = dataBranch.map((el) => el.value);
      getAreaFromBranch({ branch: newarr }).then((ele) => {
        if (area.length > 0) setValue('area', undefined);
        if (ele.data.result) {
          setArea(ele.data.result);
        } else {
          setArea([]);
        }
      });
    } else {
      setArea([]);
      setValue('area', undefined);
    }
    // eslint-disable-next-line
  }, [dataBranch]);

  const dataArea = watch('area');
  useEffect(() => {
    if (dataArea && dataArea.length > 0) {
      const newarr = dataArea.map((el) => el.value);
      getbeatFromArea({ area: newarr }).then((ele) => {
        if (ele.data.result) {
          if (area.length > 0) setValue('beat', undefined);
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





  // ********************** Options Value for MultiSelect ****************
  var options;
  if (checkAdmin()) {
    options = manager.map((el) => {
      return { label: el.name, value: el._id }
    });
  }
  const areaoption = area.map((ele) => {
    return { label: ele.area, value: ele._id };
  });
  const beatoption = beat.map((ele) => {
    return { label: ele.beat, value: ele._id };
  })
  const branchoption = Branch.map((ele) => {
    return { label: ele.branch, value: ele._id };
  });




  // ********************  Adding Executive finally ****************************
  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    const { ID } = token;
    const { branch, manager, area, beat } = data;
    const areas = area.map((el) => el.value);
    const beats = beat.map((el) => el.value);
    const branches = branch.map((el) => el.value);
    const operation = (loc.pathname === '/salesexecutive/add' || loc.pathname === '/manager_salesexecutive/add')
      ? addExecutive : updateExecutive;
    btntextChnage('Processing...');
    operation({
      id: editData.editId || null,
      ...data,
      areas,
      branches,
      beats,
      manager: manager.value,
      createdBy: (checkAdmin() ? 'Admin' : 'Manager')
    }, ID).then(() => {
      btntextChnage('Redirecting...');
      toast.success('Done Successfully!');
      getExecutives();
      setTimeout(() => {
        checkAdmin() ? history.push('/salesexecutive') : history.push('/manager_salesexecutive');
      }, 2000);
    }).catch((err) => {
      btntextChnage('Try Again!!!')
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.message);
        logout();
      }
      else toast.error(err.response.data.message);
    });
  }




  // ************************  renders ***************************************
  return <form className="needs-validation" onSubmit={handleSubmit(handleS)}>
    <div className="form-row">
      <div className="col-md-6 mb-3">
        <label>Employee ID</label>
        <input type="text" className="form-control" placeholder="Employee Id" name='employee_id' ref={register} />
        {errors.employee_id && <p className="text-danger small p-1">{errors.employee_id.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Name</label>
        <input type="text" className="form-control" placeholder="Name" name='name' ref={register} />
        {errors.name && <p className="text-danger small p-1">{errors.name.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Email ID</label>
        <input type="text" className="form-control" placeholder="Email Id" name='email_id' ref={register} />
        {errors.email_id && <p className="text-danger small p-1">{errors.email_id.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Contact Number</label>
        <input type="text" className="form-control" placeholder="Contact Number" name='contact_no' ref={register} />
        {errors.contact_no && <p className="text-danger small p-1">{errors.contact_no.message}</p>}
      </div>

      {
        (checkAdmin())
          ? <div className="col-md-6 mb-3">
            <label>Sales Manager</label>
            <RHFInput as={<Select options={options} placeholder='Search or Select' />}
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
        <label>Branch</label>
        <RHFInput
          as={<Select isMulti options={branchoption} isLoading={loading}
            noOptionsMessage={() => checkAdmin() ? 'Select Manager Frist' : 'No Options'} />}
          name="branch" setValue={setValue} register={register} />
        {errors.branch && <p className="text-danger small p-1">{errors.branch.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Area</label>
        <RHFInput
          as={<Select
            options={areaoption} isMulti noOptionsMessage={() => 'Select Branch Frist'} />}
          name="area" setValue={setValue} register={register} />
        {errors.area && <p className="text-danger small p-1">{errors.area.message}</p>}
      </div>


      <div className="col-md-6 mb-3">
        <label>Beats</label>
        <RHFInput
          as={<Select
            isMulti options={beatoption} noOptionsMessage={() => 'Select Beat Frist'} />}
          name="beat" setValue={setValue} register={register} />
        {errors.beat && <p className="text-danger small p-1">{errors.beat.message}</p>}
      </div>


      <div className="col-md-6 mb-3">
        <label>Password</label>
        <input type="text" className="form-control" name='password' ref={register} />
        {errors.password && <p className="text-danger small p-1">{errors.password.message}</p>}
      </div>

      <div className="col-md-12 text-right">
        <Link to={`${checkAdmin() ? '/salesexecutive' : '/manager_salesexecutive'}`}>
          <button className="btn btn-dark">Cancel</button>
        </Link> &nbsp;
        <button id='addbtn' style={{ width: '100px' }} type='submit' className="btn btn-primary">
          {(loc.pathname === '/salesexecutive/add' || loc.pathname === '/manager_salesexecutive/add') ? 'Add' : 'Update'}
        </button>
      </div>
    </div>
  </form >
}

export default AddSalesExecutive;
