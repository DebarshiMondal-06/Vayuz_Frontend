import moment from 'moment';
import React, { useContext } from 'react';
import { authContext } from '../../../Context/authContext';
import { createContextOrder } from './OrderContext';
import OrderDeliveryComp from './OrderDeliveryComp';



const OrderView = () => {
  const { viewOrder } = useContext(createContextOrder);
  const { checkAdmin } = useContext(authContext);

  const { order_id, status, payment_status, cylinder_name,
    filled_cylinders, empty_cylinders, amount,
    manager, executive, distributor, customer, branch, location, dispatch,
    createdAt, actual_cylinders_return, admin_approval, payment_mode, delivery_date, payment_date, discount
  } = viewOrder;



  if (!order_id) {
    window.location.href = checkAdmin() ? '/order' : '/manager_order';
  }
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="main-card mb-3">
          <div className="">
            <p>
              <span className="text-left"><strong>OrderID: {order_id}</strong></span>
              <span className="text-right">
                {
                  status && status === 'Delivered' ?
                    <button className="mb-2 btn btn-success active">
                      {status}
                    </button>
                    : <button className="mb-2 btn btn-danger active">
                      {status}
                    </button>
                }
              </span>
            </p>
            <div className="alert alert-light fade show" role="alert">
              <strong> {(cylinder_name) ? cylinder_name.cylinder_name : 'No Data'}</strong><br />
              <span> Filled {filled_cylinders}</span> &nbsp; <span> Empty {empty_cylinders}</span>
              <span className="float-right"><i className="metismenu-state-icon pe-7s-date caret-left"></i> {moment(createdAt).format('MMM Do YYYY')}
                <i className="metismenu-state-icon pe-7s-clock caret-left"></i> {moment(createdAt).format('h:mm:ss a')}</span>
            </div>
            <div className="row">
              <div className="col-md-6">
                <small>Executive</small>
                <div className="alert alert-light fade show" role="alert">
                  {executive ? executive.name : 'No Data'}
                </div>
              </div>
              <div className="col-md-6">
                <small>Manager</small>
                <div className="alert alert-light fade show" role="alert">
                  {manager ? manager.name : 'No Data'}
                </div>
              </div>
              <div className="col-md-6">
                <small>Distributor</small>
                <div className="alert alert-light fade show" role="alert">
                  {distributor ? distributor.name : 'No Data'}
                </div>
              </div>
              <div className="col-md-6">
                <small>Customer</small>
                <div className="alert alert-light fade show" role="alert">
                  {customer ? customer.customer_name : 'No Data'}
                </div>
              </div>
              <div className="col-md-6">
                <small>Branch</small>
                <div className="alert alert-light fade show" role="alert">
                  {branch ? branch.branch : 'No Data'}
                </div>
              </div>
              <div className="col-md-6">
                <small>Location</small>
                <div className="alert alert-light fade show" role="alert">
                  {location}
                </div>
              </div>
              <div className="col-md-6">
                <small>Total Amount</small>
                <div className="alert alert-light fade show" role="alert">
                  ₹{(amount + discount) || 0}
                </div>
              </div>
              <div className="col-md-6">
                <small>Discount {admin_approval !== 'Approved' ? '(Not Yet Processed)' : null}</small>
                <div className="alert alert-light fade show" role="alert">
                  ₹{discount || 0}
                </div>
              </div>
              <div className="col-md-6">
                <small>Payment Status</small>
                {
                  payment_status && payment_status !== 'Paid'
                    ? <div className={`alert ${payment_status === 'Credit' ? 'alert-warning' : 'alert-danger'}`} role="alert">
                      {payment_status}
                    </div>
                    : <div className="alert alert-success fade show" role="alert">
                      {payment_status}
                    </div>
                }
              </div>

              {
                (payment_status !== 'Pending' && payment_date)
                  ? <div className="col-md-6">
                    <small>Payment Details</small>
                    <div className="alert alert-light fade show" role="alert">
                      <b> Payment On:</b> {payment_date
                        ? <span>{moment(payment_date).format('MMM Do YYYY')}&nbsp;
                          <i className="metismenu-state-icon pe-7s-clock caret-left"></i> {moment(payment_date).format('h:mm:ss a')}</span>
                        : null}
                      &nbsp;&nbsp;{payment_status === 'Paid' ? <span><b> Mode of Payment:</b> {payment_mode} </span> : null}
                    </div>
                  </div>
                  : null
              }
              {
                dispatch && <div className="col-md-6">
                  <small>Dispatch Details</small>
                  <div className="alert alert-light fade show" role="alert">
                    <b>Driver Name</b>: {dispatch.driver_name}, &nbsp;<b> Vechile Number</b>: {dispatch.vechile_no}, <br />
                    <b>Comment</b>: {dispatch.comment}
                  </div>
                </div>
              }
              {
                actual_cylinders_return ? <section className="col-md-12" style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className="col-md-6">
                    <small>Actual Empty Clyinders Return</small>
                    <div className="alert alert-light fade show" role="alert">
                      {actual_cylinders_return}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <small>Others Details</small>
                    <div className="alert alert-light fade show" role="alert">
                      <b> Delivered On:</b> {delivery_date ? moment(delivery_date).format('MMM Do YYYY') : null}
                    </div>
                  </div>
                </section> : null
              }

              {
                (!actual_cylinders_return && admin_approval === 'Approved')
                  ? <OrderDeliveryComp payment_stat={payment_status} />
                  : null
              }


              <div className="col-md-12 text-right price mt-4">
                <span>Total Payable Amount</span>
                <button className="mb-2 mr-2 price border-0 btn-transition btn btn-outline-link"> ₹{amount}</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderView;
