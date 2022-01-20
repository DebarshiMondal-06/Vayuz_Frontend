import React, { useContext } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { addDistrict, updateDistrict } from './distapis';
import { createContextDist } from './DistContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from "react-select";
import { RHFInput } from 'react-hook-form-input';
import { toast, ToastContainer } from 'react-toastify';



const AddDistrict = () => {
  const history = useHistory();
  const { states, getDistrict, editData } = useContext(createContextDist);
  const { editId } = editData;
  const loc = useLocation();



  // ***************** Schema *************************************
  const schema = yup.object().shape({
    district: yup
      .string()
      .required('This Field is Required').max(100).lowercase(),
    state: yup.object().required('State is required*')
  });
  const { register, handleSubmit, errors, setValue } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      ...editData,
      state: editData.state ? editData.state : undefined
    }
  });



  // **************** Submitting ************************************
  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    btntextChnage('Processing...');
    const { state, district } = data;
    const operation = (loc.pathname === '/district/add-district') ? addDistrict : updateDistrict;
    operation({ id: editId, district, state: state.value }).then(() => {
      btntextChnage('Redirecting...');
      toast.success('Successfully Implemented');
      getDistrict();
      setTimeout(() => {
        history.push('/district');
      }, 2000);
    }).catch((err) => {
      btntextChnage('Try Again!!!');
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.message);
        // logout();
      }
      else if (err.response) toast.error(err.response.data.message)
    });
  }



  // *************** Options for State ****************************
  const stateOption = states.map((el) => {
    return { label: el.state, value: el._id };
  });



  // ********************** Render **********************************
  return <form className="needs-validation" onSubmit={handleSubmit(handleS)}>
    <ToastContainer autoClose='2500' position='bottom-center' />
    <div className="form-row">
      <div className="col-md-6 mb-3">
        <label>District Name</label>
        <input
          type="text" className="form-control" id="validationTooltip01"
          placeholder="District name"
          name='district'
          style={{ textTransform: 'capitalize' }}
          ref={register}
        />
        {errors.district && <p className="text-danger small p-1">{errors.district.message}</p>}
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
      <div className="col-md-12 text-right">
        <Link to='/district'><button className="btn btn-dark">Cancel</button></Link>&nbsp;
        <button id='addbtn' style={{ width: '100px' }} type='submit' className="btn btn-primary">{loc.pathname === '/district/add-district' ? 'Add' : 'Update'}</button>
      </div>
    </div>
  </form>
}

export default AddDistrict;
