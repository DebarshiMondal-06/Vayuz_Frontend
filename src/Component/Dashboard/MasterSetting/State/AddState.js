import React, { useContext } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { addState, updateState } from './stateapis';
import { createContextState } from './StateContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


import { toast, ToastContainer } from 'react-toastify';



const AddDistrict = () => {
  const loc = useLocation();
  const history = useHistory();
  const { getState, editData } = useContext(createContextState);
  const { editId, stateVal } = editData;
  const schema = yup.object().shape({
    state: yup
      .string()
      .required('This Field is Required').max(50).trim().lowercase()
  });
  const { register, handleSubmit, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      state: stateVal
    }
  });




  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    btntextChnage('Processing...');
    const { state } = data;
    const operation = (loc.pathname === '/state/add-state') ? addState : updateState;
    operation({ id: editId || null, state }).then((el) => {
      getState();
      btntextChnage('Redirecting...');
      toast.success('Successfully Implemented');
      setTimeout(() => {
        history.push("/state");
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



  return <form onSubmit={handleSubmit(handleS)}>
    <ToastContainer position='bottom-center' autoClose='2500' />
    <div className="form-row">
      <div className="col-md-6 mb-3">
        <label>State Name</label>
        <input
          type="text" className="form-control" style={{ textTransform: 'capitalize' }}
          name='state'
          ref={register}
        />
        {errors.state && <p className="text-danger small p-1">{errors.state.message}</p>}
      </div>
      <div className="col-md-12 text-right">
        <Link to='/state'><button className="btn btn-dark">Cancel</button></Link>&nbsp;
        <button id='addbtn' style={{ width: '100px' }} className="btn btn-primary"> {(loc.pathname === '/state/add-state') ? 'Add' : 'Update'} </button>
      </div>
    </div>
  </form>
}

export default AddDistrict;
