import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { addbeat, findbyarea, updatebeat } from './beatapis';
import { createContextBeat } from './BeatContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from "react-select";
import { RHFInput } from 'react-hook-form-input';
import { toast, ToastContainer } from 'react-toastify';



const AddBeat = () => {
  const loc = useLocation();
  const history = useHistory();
  const { allarea, getbeat, editData } = useContext(createContextBeat);
  const [Ids, setIds] = useState({
    city_id: '', state_id: '',
    district_id: '', branch_id: ''
  });
  const { city_id, state_id, district_id, branch_id } = Ids;



  // ****************** Schema Validation ****************************
  const schema = yup.object().shape({
    beat: yup
      .string()
      .required().max(100).trim().lowercase(),
    area: yup.object().required('Area is required*'),
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


  // ******************* Fetching Data *****************************
  const getData = (area) => {
    if (area) {
      findbyarea(area).then((el) => {
        const { pincode, city, branch_id, district,
          state, district_id, state_id, city_id } = el.data;
        setValue('city', city);
        setValue('pincode', pincode);
        setValue('district', district);
        setValue('state', state);
        setIds({ ...Ids, branch_id, city_id, state_id, district_id });
      });
    }
  }
  const dataArea = watch('area');
  useEffect(() => {
    if (dataArea && dataArea.value !== undefined) {
      const { label } = dataArea;
      getData(label);
    } else {
      setValue('area', undefined);
    }
    // eslint-disable-next-line
  }, [dataArea]);





  // ********************* Submitting Data *****************************
  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    btntextChnage('Processing...');
    const { area, beat, pincode } = data;
    console.log(data);
    const operation = (loc.pathname === '/beat/add') ? addbeat : updatebeat
    operation({
      id: editData.editId || null,
      forarea: area.value,
      forbranch: branch_id,
      fordistrict: district_id,
      forcity: city_id,
      beat,
      forstate: state_id,
      pincode
    }).then(() => {
      btntextChnage('Redirecting...');
      toast.success('Successfully Implemented');
      getbeat();
      setTimeout(() => {
        history.push('/beat');
      }, 2000);
    }).catch((err) => {
      btntextChnage('Try Again!');
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.message);
        // logout();
      }
      else if (err.response) toast.error(err.response.data.message);
    });
  }

  // ************** OPtions *******************
  const areaOption = allarea.map((el) => {
    return { label: el.area, value: el._id };
  })



  // *********************** Renders *******************************
  return <form className="needs-validation" onSubmit={handleSubmit(handleS)}>
    <ToastContainer position='bottom-center' autoClose='2500' />
    <div className="form-row">
      <div className="col-md-6 mb-3">
        <label>Beat Name</label>
        <input type="text" className="form-control" ref={register} name='beat' />
        {errors.beat && <p className="text-capitalize text-danger small p-1">{errors.beat.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Select Area</label>
        <RHFInput
          as={<Select options={areaOption} />}
          name="area"
          setValue={setValue}
          register={register}
        />
        {errors.area && <p className="text-capitalize text-danger small p-1">{errors.area.message}</p>}
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
        <Link to='/beat'><button className="btn btn-dark">Cancel</button></Link>&nbsp;
        <button id='addbtn' style={{ width: '100px' }} type='submit' className="btn btn-primary">
          {(loc.pathname === '/beat/add') ? 'Add' : 'Update'}
        </button>
      </div>
    </div>
  </form>
}

export default AddBeat;

