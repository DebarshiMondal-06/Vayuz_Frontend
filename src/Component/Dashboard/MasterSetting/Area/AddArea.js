import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { findbybranch, addarea, updatearea } from './areaapis';
import { createContextArea } from './AreaContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from "react-select";
import { RHFInput } from 'react-hook-form-input';
import { toast, ToastContainer } from 'react-toastify';



const AddArea = () => {
  const history = useHistory();
  const loc = useLocation();
  const { allbranch, getarea, editData } = useContext(createContextArea);
  if (loc.pathname === '/area/edit' && !editData.editId) {
    window.location.href = '/area';
  }
  const [Ids, setIds] = useState({
    city_id: '',
    state_id: '',
    district_id: ''
  });
  const { city_id, state_id, district_id, } = Ids;



  // ***************** Schema *************************************
  const schema = yup.object().shape({
    area: yup
      .string()
      .required().max(100).trim().lowercase(),
    branch: yup.object().required('Branch is required*'),
    city: yup.string().required(),
    pincode: yup.string().required(),
    district: yup.string().required(),
    state: yup.string().required()
  });
  const { register, handleSubmit, errors, setValue, watch } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      ...editData
    }
  });



  // ***************** Fetching Data **********************************
  const getData = (branch) => {
    if (branch) {
      findbybranch(branch).then((el) => {
        const { pincode, district, state,
          district_id, state_id, city_id, city
        } = el.data;
        setValue('city', city);
        setValue('pincode', pincode);
        setValue('district', district);
        setValue('state', state);
        setIds({ ...Ids, city_id, state_id, district_id });
      });
    }
  }
  const branchData = watch('branch');
  useEffect(() => {
    if (branchData && branchData.value !== undefined) {
      const { label } = branchData;
      getData(label);
    } else {
      setValue('branch', undefined);
    }
    // eslint-disable-next-line
  }, [branchData]);



  // ************************** Submitting Data *********************************
  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    btntextChnage('Processing...');
    const { area, branch, pincode } = data;
    const operation = (loc.pathname === '/area/add') ? addarea : updatearea
    operation({
      id: editData.editId || '',
      area,
      fordistrict: district_id,
      forcity: city_id,
      forbranch: branch.value,
      forstate: state_id,
      pincode
    }).then(() => {
      getarea();
      btntextChnage('Redirecting...');
      toast.success('Successfully Implemented');
      setTimeout(() => {
        history.push('/area');
      }, 2000);
    }).catch((err) => {
      btntextChnage('Try Again');
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.message);
        // logout();
      }
      else if (err.response) toast.error(err.response.data.message)
    })
  }


  const branchOption = allbranch.map((el) => {
    return { label: el.branch, value: el._id };
  })


  // *********************** Renders *******************************
  return <form className="needs-validation" onSubmit={handleSubmit(handleS)}>
    <ToastContainer autoClose='2500' position='bottom-center' />
    <div className="form-row">
      <div className="col-md-6 mb-3">
        <label>Area Name</label>
        <input type="text" className="form-control" ref={register} name='area' />
        {errors.area && <p className="text-capitalize text-danger small p-1">{errors.area.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Select Branch</label>
        <RHFInput
          as={<Select options={branchOption} />}
          name="branch"
          setValue={setValue}
          register={register}
        />
        {errors.branch && <p className="text-capitalize text-danger small p-1">{errors.branch.message}</p>}
      </div>


      <div className="col-md-6 mb-3">
        <label>City</label>
        <input ref={register} readOnly name='city' type="text" className="form-control" />
        {errors.city && <p className="text-capitalize text-danger small p-1">{errors.city.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Pincode</label>
        <input ref={register} readOnly name='pincode' type="text" className="form-control" />
        {errors.pincode && <p className="text-capitalize text-danger small p-1">{errors.pincode.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>District</label>
        <input ref={register} readOnly name='district' type="text" className="form-control" />
        {errors.district && <p className="text-capitalize text-danger small p-1">{errors.district.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>State</label>
        <input ref={register} readOnly name='state' type="text" className="form-control" />
        {errors.state && <p className="text-capitalize text-danger small p-1">{errors.state.message}</p>}
      </div>

      <div className="col-md-12 text-right">
        <Link to='/area'><button className="btn btn-dark">Cancel</button></Link>&nbsp;
      <button id='addbtn' style={{ width: '100px' }} type='submit' className="btn btn-primary">
          {(loc.pathname === '/area/add') ? 'Add' : 'Update'}
        </button>
      </div>
    </div>
  </form>
}

export default AddArea;

