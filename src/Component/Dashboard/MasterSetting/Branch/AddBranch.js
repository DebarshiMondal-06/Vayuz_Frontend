import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { addbranch, findbycity, updatebranch } from './branchapis';
import { createContextBranch } from './BranchContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from "react-select";
import { RHFInput } from 'react-hook-form-input';
import { toast, ToastContainer } from 'react-toastify';



const AddBranch = () => {
  const history = useHistory();
  const loc = useLocation();
  const { getbranch, allcity, editData } = useContext(createContextBranch);
  if (loc.pathname === '/branch/edit-branch' && !editData.editId) {
    window.location.href = '/branch';
  }
  const [Ids, setIds] = useState({
    state_id: '',
    district_id: ''
  });
  const { state_id, district_id } = Ids;



  // ***************** Schema *************************************
  const schema = yup.object().shape({
    branch: yup
      .string()
      .required().max(100).lowercase(),
    city: yup.object().required('City is required*'),
    state: yup.string().required(),
    pincode: yup.string().required(),
    district: yup.string().required()
  });
  const { register, handleSubmit, errors, setValue, watch } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      ...editData
    }
  });



  // **************** Getting Data ******************************
  const getData = (city) => {
    if (city) {
      findbycity(city).then((el) => {
        const { pincode, district, state, district_id, state_id } = el.data;
        setValue('state', state);
        setValue('district', district);
        setValue('pincode', pincode);
        setIds({ ...Ids, state_id, district_id });
      });
    }
  }
  const city = watch('city');
  useEffect(() => {
    if (city && city.value !== undefined) {
      const { label } = city;
      getData(label);
    } else {
      setValue('city', undefined);
    }
    // eslint-disable-next-line
  }, [city]);





  // *************************** Submitting *******************************
  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    btntextChnage('Processing...');
    const { city, branch, pincode } = data;
    const operation = (loc.pathname === '/branch/add-branch') ? addbranch : updatebranch
    operation({
      id: editData.editId || '',
      fordistrict: district_id,
      forcity: city.value,
      branch: branch,
      forstate: state_id,
      pincode
    }).then(() => {
      btntextChnage('Redirecting...');
      toast.success('Successfully Implemented')
      getbranch();
      setTimeout(() => {
        history.push('/branch');
      }, 2000);
    }).catch((err) => {
      btntextChnage('Try Again!');
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.message);
        // logout();
      }
      else if (err.response) toast.error(err.response.data.message)
    });
  }



  // ********************  Options **********************************
  const cityOption = allcity.map((ele) => {
    return { label: ele.city, value: ele._id };
  });



  // ************************* Renders ********************************
  return <form className="needs-validation" onSubmit={handleSubmit(handleS)}>
    <ToastContainer autoClose='2500' position='bottom-center' />
    <div className="form-row">
      <div className="col-md-6 mb-3">
        <label>Branch Name</label>
        <input type="text" className="form-control" ref={register} name='branch' />
        {errors.branch && <p className="text-capitalize text-danger small p-1">{errors.branch.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Select City</label>
        <RHFInput
          as={<Select options={cityOption} />}
          name="city"
          setValue={setValue}
          register={register}
        />
        {errors.city && <p className="text-capitalize text-danger small p-1">{errors.city.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>pincode</label>
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
        <Link to='/branch'><button className="btn btn-dark">Cancel</button></Link>&nbsp;
        <button id='addbtn' style={{ width: '100px' }} type='submit' className="btn btn-primary">
          {(loc.pathname === '/branch/add-branch') ? 'Add' : 'Update'}
        </button>
      </div>
    </div>
  </form>
}

export default AddBranch;

