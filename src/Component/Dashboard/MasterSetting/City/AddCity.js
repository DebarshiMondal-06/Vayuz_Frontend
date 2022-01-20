import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { addCity, getAllDistrict, updateCity } from './cityapis';
import { createContextCity } from './CityContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from "react-select";
import { RHFInput } from 'react-hook-form-input';
import { toast, ToastContainer } from 'react-toastify';


const AddCity = () => {
  const loc = useLocation();
  const history = useHistory();
  const { getCity, state, editData } = useContext(createContextCity);
  const [district, setDistrict] = useState([]);



  // ***************** Schema *************************************
  const schema = yup.object().shape({
    city: yup
      .string()
      .required().max(100),
    district: yup.object().required('District is required*'),
    pincode: yup.string()
      .matches(/^[1-9]{1}[0-9]{2}[0-9]{3}$/, 'Not a Valid Pincode').required()
      .max(6, 'Not a valid Pincode'),
    state: yup.object().required()
  });
  const { register, handleSubmit, errors, setValue, watch } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      ...editData
    }
  });


  const getState = watch('state');
  useEffect(() => {
    if (getState && getState.value !== undefined) {
      getAllDistrict({ state_id: getState.value }).then((ele) => {
        if (ele.data.result) {
          setDistrict(ele.data.result);
        }
      });
    } else {
      setValue('district', undefined);
      setValue('state', undefined);
    }
    // eslint-disable-next-line
  }, [getState]);




  // ******************* Submit ******************************
  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    const { pincode, district, city, state } = data;
    btntextChnage('Processing...');
    const operation = (loc.pathname === '/city/add-city') ? addCity : updateCity;
    operation({
      id: editData.editId || null,
      forDistrict: district.value,
      pincode, city,
      state: state.value
    }).then(() => {
      btntextChnage('Redirecting...');
      toast.success('Successfully Implemented');
      getCity();
      setTimeout(() => {
        history.push("/city");
      }, 2000);
    }).catch((err) => {
      btntextChnage('Try Again');
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.message);
        // logout();
      }
      else if (err.response) toast.error(err.response.data.message);
    });
  };




  // ********************  Options **********************************
  const districtOption = district.map((ele) => {
    return { label: ele.district, value: ele._id };
  });
  const stateOption = state.map((el) => {
    return { label: el.state, value: el._id };
  })



  // ******************** Renders ********************************
  return <form className="needs-validation" onSubmit={handleSubmit(handleS)}>
    <ToastContainer autoClose='2500' position='bottom-center' />
    <div className="form-row">
      <div className="col-md-6 mb-3">
        <label for="validationTooltip01">City Name</label>
        <input
          type="text" className="form-control" id="validationTooltip01"
          placeholder="City name"
          ref={register}
          name='city'
        />
        {errors.city && <p className="text-capitalize text-danger small p-1">{errors.city.message}</p>}
      </div>
      <div className="col-md-6 mb-3">
        <label>Pincode</label>
        <input
          type="Number" className="form-control" id="validationTooltip01"
          placeholder="Pincode name"
          name='pincode'
          ref={register}
        />
        {errors.pincode && <p className="text-capitalize text-danger small p-1">{errors.pincode.message}</p>}
      </div>
      <div className="col-md-6 mb-3">
        <label>State</label>
        <RHFInput
          as={<Select
            options={stateOption}
          />}
          name="state"
          setValue={setValue}
          register={register}
        />
        {errors.state && <p className="text-capitalize text-danger small p-1">{errors.state.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>District</label>
        <RHFInput
          as={<Select
            options={districtOption}
          />}
          name="district"
          setValue={setValue}
          register={register}
        />
        {errors.district && <p className="text-capitalize text-danger small p-1">{errors.district.message}</p>}

      </div>
      <div className="col-md-12 text-right">
        <Link to='/city'><button className="btn btn-dark">Cancel</button></Link>&nbsp;
        <button id='addbtn' style={{ width: '100px' }} type='submit' className="btn btn-primary">
          {loc.pathname === '/city/add-city' ? 'Add' : 'Update'}
        </button>
      </div>
    </div>
  </form>
}

export default AddCity;
