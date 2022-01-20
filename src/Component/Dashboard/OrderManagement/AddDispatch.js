import React, { useContext } from 'react';
import { createContextOrder } from './OrderContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { addDispatch, updateOrders } from './orderapis';
import { toast } from 'react-toastify';
import { authContext } from '../../../Context/authContext';





const AddDispatch = () => {
  const { viewOrder } = useContext(createContextOrder);
  const { checkAdmin, token: { ID }, logout } = useContext(authContext);
  var { order_id, cylinder_name, _id,
    filled_cylinders, empty_cylinders, amount, discount,
    manager, executive, distributor, customer, location, createdAt
  } = viewOrder;
  const history = useHistory();

  if (!order_id) {
    window.location.href = checkAdmin() ? '/order_approval' : '/manager_order_approval';
  }


  const schema = yup.object().shape({
    vechile_no: (checkAdmin()) ? yup
      .string()
      .required('This Field is Required').max(50).matches(/^[A-Z]{2}\s[0-9]{2}\s[A-Z]{2}\s[0-9]{4}$/, 'Not a valid Vechile number').trim() : null,
    driver_name: checkAdmin() ? yup
      .string()
      .required('This Field is Required').max(50).trim() : null,
    comment: checkAdmin() ? yup
      .string().max(255).trim() : null,
    discount: yup.number().notRequired().test('check', 'Discount cannot be greater than Original amount', (val) => {
      return val < (amount * 1);
    })
  });
  const { register, handleSubmit, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      discount: discount && discount
    }
  });





  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    const { discount } = data;
    btntextChnage('Processing...');
    amount = checkAdmin() ? discount ? (amount - discount) : amount : amount;
    const operation = checkAdmin()
      ? { id: _id, admin_approval: 'Approved', amount, discount }
      : { id: _id, manager_approval: 'Approved', amount, discount }
    updateOrders(operation, ID).then(() => {
      if (checkAdmin()) {
        addDispatch({
          ...data,
          forOrder: _id,
        }, ID).then(() => {
          btntextChnage('Redirecting...');
          toast.success('Sucessfully Order Approved');
          setTimeout(() => {
            history.push("/order");
          }, 2000);
        });
      } else {
        btntextChnage('Redirecting...');
        toast.success('Sucessfully Order Approved');
        setTimeout(() => {
          history.push("/manager_order");
        }, 2000);
      }
    }).catch((err) => {
      btntextChnage('Try Again');
      if (err.response.status === 401) {
        toast.error(err.response.data.message);
        logout();
      }
      else if (err.response) toast.error(err.response.data.message);
    });
  }








  return <main>
    <div className='row'>
      <div className='col-md-6'>
        <p><b>OrderID:</b> {order_id}</p>
        <p><b>Cylinder Name:</b> {(cylinder_name) ? cylinder_name.cylinder_name : 'No Data'}</p>
        <p><b>Filled Cylinders:</b> {filled_cylinders}</p>
        <p><b>Empty Cylinders:</b> {empty_cylinders}</p>
        <p><b>Total Amount:</b> ₹{amount}</p>
        <p><b>Date:</b> {createdAt ? moment(createdAt).format('DD-MMM-YYYY') : 'No Data'}</p>
      </div>
      <div className='col-md-6'>
        <p><b>Manager:</b> {manager ? manager.name : ''}</p>
        <p><b>Executive:</b> {executive ? executive.name : ''}</p>
        <p><b>Distributor:</b> {distributor ? distributor.name : ''}</p>
        <p><b>Customer:</b> {customer ? customer.customer_name : ''}</p>
        <p><b>Location:</b> {location}</p>
      </div>
    </div>

    <section>
      <form onSubmit={handleSubmit(handleS)}>
        <div className="form-row">
          {
            checkAdmin() ? <>
              <div className="col-md-6 mb-3">
                <label>Vechile Number</label>
                <input
                  type="text" className="form-control"
                  name='vechile_no'
                  ref={register}
                />
                {errors.vechile_no && <p className="text-danger small p-1">{errors.vechile_no.message}</p>}
              </div>
              <div className="col-md-6 mb-3">
                <label>Driver Name</label>
                <input
                  type="text" className="form-control"
                  name='driver_name'
                  ref={register}
                />
                {errors.driver_name && <p className="text-danger small p-1">{errors.driver_name.message}</p>}
              </div>
              <div className="col-md-6 mb-3">
                <label>Comment</label>
                <input
                  type="text" className="form-control"
                  name='comment'
                  ref={register}
                />
                {errors.comment && <p className="text-danger small p-1">{errors.comment.message}</p>}
              </div>
            </>
              : null}
          <div className="col-md-6 mb-3">
            <label>Discount</label>
            <input
              type="number" className="form-control"
              name='discount'
              ref={register}
            />
            {errors.discount && <p className="text-danger small p-1">{errors.discount.message}</p>}
          </div>
          <div className="col-md-12 text-right">
            <Link to={`${checkAdmin() ? '/order_approval' : '/manager_order_approval'}`}><button className="btn btn-dark">Cancel</button></Link>&nbsp;
            <button id='addbtn' style={{ width: '100px' }} className="btn btn-primary"> Approve </button>
          </div>
        </div>
      </form>
    </section>
  </main>
}

export default AddDispatch;
