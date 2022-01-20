/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { addRate, getDistrict_By_State, updateRate } from './rateapis';
import { createContextRate } from './RateContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RHFInput } from 'react-hook-form-input';
import Select from "react-select";
import { toast, ToastContainer } from 'react-toastify';




const Add_Edit_Rate = () => {
  const loc = useLocation();
  const history = useHistory();
  const [district, setDistrict] = useState([]);
  const { getRate, editData, state, cylinders } = useContext(createContextRate);
  const [check, setCheck] = useState(false);




  // ***************** Schema *************************************
  const schema = yup.object().shape({
    cylinder_type: yup.object().required(),
    district: !check ? yup.object().required() : null,
    state: !check ? yup.object().required() : null,
    gst: yup.string().required().matches(/^[0-9]*$/, 'Provide a valid GST value'),
    base_price: yup.string().required().matches(/^[0-9]*$/, 'Provide a Valid Price'),
  });
  const { register, handleSubmit, errors, setValue, watch } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      ...editData
    }
  });


  useEffect(() => {
    if (editData.default_type === 'YES') {
      setCheck(!check);
    }
  }, [editData]);



  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    const { district, cylinder_type } = data;
    btntextChnage('Processing...');
    const operation = (loc.pathname === '/rate/add') ? addRate : updateRate;
    operation({
      id: editData.editId || null,
      ...data,
      default_type: check ? 'YES' : 'NO',
      district: !check ? district.value : null,
      cylinder_type: cylinder_type.value
    }).then(() => {
      btntextChnage('Redirecting...');
      getRate();
      toast.success('Successfully Implemented');
      setTimeout(() => {
        history.push("/rate");
      }, 2000);
    }).catch((err) => {
      btntextChnage('Try Again');
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.message);
        // logout();
      }
      else if (err.response) toast.error(err.response.data.message);
    });
  }


  const getState = watch('state');
  useEffect(() => {
    if (getState && getState.value !== undefined) {
      console.log(getState);
      getDistrict_By_State({ state_id: getState.value }).then((ele) => {
        if (ele.data && ele.data.result.length > 0) {
          setDistrict(ele.data.result);
        } else {
          setValue('district', undefined);
          setDistrict([]);
        }
      });
    }
  }, [getState]);
  const stateOption = state.map((items) => {
    return { label: items.state, value: items._id };
  });
  const districtOption = district.map((items) => {
    return { label: items.district, value: items._id };
  });
  const cylindersOption = cylinders.map((items) => {
    return { label: items.cylinder_name, value: items._id };
  });





  return <form className="needs-validation" onSubmit={handleSubmit(handleS)}>
    <div className="form-row">
      <ToastContainer autoClose='2500' position='bottom-center' />

      <div className="col-md-6 mb-3">
        <label>Cylinder</label>
        <RHFInput
          as={<Select options={cylindersOption} className="text-capitalize" />}
          name="cylinder_type"
          setValue={setValue}
          register={register} />
        {errors.cylinder_type && <p className="text-capitalize text-danger small p-1">{errors.cylinder_type.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Gst (%)</label>
        <input ref={register} name='gst' type="text" className="form-control" />
        {errors.gst && <p className="text-capitalize text-danger small p-1">{errors.gst.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Base Price (₹)</label>
        <input ref={register} name='base_price' type="text" className="form-control" />
        {errors.base_price && <p className="text-capitalize text-danger small p-1">{errors.base_price.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>State</label>
        <RHFInput
          as={<Select isDisabled={check} options={stateOption} className="text-capitalize" />}
          name="state"
          setValue={setValue}
          register={register} />
        {errors.state && <p className="text-capitalize text-danger small p-1">{errors.state.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>District</label>
        <RHFInput
          as={<Select options={districtOption} isDisabled={check} className="text-capitalize" />}
          name="district"
          setValue={setValue}
          register={register} />
        {errors.district && <p className="text-capitalize text-danger small p-1">{errors.district.message}</p>}
      </div>

      <div className="col-md-6 mt-4 p-2 text-right">
        <label>Set as Default</label>
        &nbsp;&nbsp;
        <input name='default' checked={check} onClick={() => setCheck(!check)} style={{ transform: "scale(1.5)", marginTop: 10 }}
          className="p-3" type="checkbox" />
      </div>


      <div className="col-md-12 text-right mt-2">
        <Link to='/rate'><button className="btn btn-dark">Cancel</button></Link>&nbsp;
        <button id='addbtn' style={{ width: '100px' }} type='submit' className="btn btn-primary">
          {(loc.pathname === '/rate/add') ? 'Add' : 'Update'}
        </button>
      </div>
    </div>
  </form>
}

export default Add_Edit_Rate;
