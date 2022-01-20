import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { updateState } from './stateapis';
import { createContextState } from './StateContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


const EditDistrict = () => {
  const history = useHistory();
  const { getState, editData } = useContext(createContextState);
  const { editId, stateVal } = editData;
  const schema = yup.object().shape({
    state: yup
      .string()
      .required('This Field is Required').max(50).trim()
  });
  const { register, handleSubmit, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      state: stateVal
    }
  });



  const btntextChnage = (val) => {
    document.getElementById('editbtn').textContent = val;
  }
  const handleEdit = (data) => {
    const { state } = data;
    btntextChnage('Processing...');
    updateState({ id: editId, state }).then((el) => {
      btntextChnage('Redirecting...');
      getState();
      setTimeout(() => {
        history.push("/state");
      }, 2000);
    }).catch(() => btntextChnage('Try Again'));
  }



  if (!editId) {
    window.location.href = '/state';
  }




  return <form className="needs-validation" onSubmit={handleSubmit(handleEdit)}>
    <div className="form-row">
      <div className="col-md-6 mb-3">
        <label>State Name</label>
        <input
          type="text" className="form-control"
          ref={register}
          name='state'
        />
        {errors.state && <p className="text-warning small p-0">{errors.state.message}</p>}
      </div>
      <div className="col-md-12 text-right">
        <Link to='/state'><button className="btn btn-dark">Cancel</button></Link>&nbsp;
        <button id='editbtn' type='submit' className="btn btn-primary">Update</button>
      </div>
    </div>
  </form>
}

export default EditDistrict;
