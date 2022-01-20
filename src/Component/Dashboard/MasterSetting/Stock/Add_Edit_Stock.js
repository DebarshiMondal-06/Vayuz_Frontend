import React, { useContext } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { addStock, updateStock } from './stockapis';
import { createContextStock } from './StockContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';




const Add_Edit_Stock = () => {
  const loc = useLocation();
  const history = useHistory();
  const { getStock, editData } = useContext(createContextStock);




  // ***************** Schema *************************************
  const schema = yup.object().shape({
    cylinder_name: yup.string().required(),
  });
  const { register, handleSubmit, errors, } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      ...editData
    }
  });




  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    btntextChnage('Processing...');
    const operation = (loc.pathname === '/stock/add') ? addStock : updateStock;
    operation({
      id: editData.editId || null,
      ...data,
    }).then(() => {
      btntextChnage('Redirecting...');
      getStock();
      toast.success('Successfully Implemented');
      setTimeout(() => {
        history.push("/stock");
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


  // const districtOption = district.map((items) => {
  //   return { label: items.district, value: items._id };
  // })


  return <form className="needs-validation" onSubmit={handleSubmit(handleS)}>
    <div className="form-row">
      <ToastContainer autoClose='2500' position='bottom-center' />
      <div className="col-md-6 mb-3">
        <label>Cylinder Name</label>
        <input ref={register} name='cylinder_name' type="text" className="form-control" />
        {errors.cylinder_name && <p className="text-capitalize text-danger small p-1">{errors.cylinder_name.message}</p>}
      </div>

      <div className="col-md-12 text-right">
        <Link to='/stock'><button className="btn btn-dark">Cancel</button></Link>&nbsp;
        <button id='addbtn' style={{ width: '100px' }} type='submit' className="btn btn-primary">
          {(loc.pathname === '/stock/add') ? 'Add' : 'Update'}
        </button>
      </div>
    </div>
  </form>
}

export default Add_Edit_Stock;
