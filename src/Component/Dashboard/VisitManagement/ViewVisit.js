import moment from 'moment';
import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
// import { authContext } from '../../../Context/authContext';
import { createContextVisit } from './VisitContext';



const ViewVisit = () => {
  const { visitView } = useContext(createContextVisit);

  const { createdAt, status, helpId, manager, executive, distributor,
    customer, message, subject, assigned_to, location, distance, start_time, end_time
  } = visitView;



  return (
    <div class="row">
      <div class="col-md-12">
        <div class="main-card mb-3">
          <ToastContainer position='bottom-right' autoClose={2500} />
          <div class="">
            <p>
              <span class="text-left"><strong>HelpID: #{helpId}</strong></span>
              <span class="text-right">
                {
                  status && status === 'Complete' ?
                    <button class="mb-2 btn btn-success active">
                      {status}
                    </button>
                    : <button class="mb-2 btn btn-danger active">
                      {status}
                    </button>
                }
              </span>
            </p>
            <div class="alert alert-light fade show" role="alert">
              Assigned To: <strong> {assigned_to}</strong>
              <span class="float-right"><i class="metismenu-state-icon pe-7s-date caret-left"></i> {moment(createdAt).format('MMM Do YYYY')}
                &nbsp;&nbsp;&nbsp;<i class="metismenu-state-icon pe-7s-clock caret-left"></i> {moment(createdAt).format('h:mm:ss a')}</span>
            </div>
            <div class="row" style={{ textTransform: 'capitalize' }}>
              <div class="col-md-6">
                <small>Manager</small>
                <div class="alert alert-light fade show" role="alert">
                  {manager && manager.name}
                </div>
              </div>
              <div class="col-md-6">
                <small>Execuitve</small>
                <div class="alert alert-light fade show" role="alert">
                  {executive && executive.name}
                </div>
              </div>
              <div class="col-md-6">
                <small>Distributor</small>
                <div class="alert alert-light fade show" role="alert">
                  {distributor && distributor.name}
                </div>
              </div>
              <div class="col-md-6">
                <small>Customer</small>
                <div class="alert alert-light fade show" role="alert">
                  {customer && customer.customer_name}
                </div>
              </div>
              <div class="col-md-6">
                <small>Subject</small>
                <div class="alert alert-light fade show" role="alert">
                  {subject}
                </div>
              </div>
              <div class="col-md-6">
                <small>Message</small>
                <div class="alert alert-light fade show" role="alert">
                  {message}
                </div>
              </div>
              <div class="col-md-6">
                <small>Location</small>
                <div class="alert alert-light fade show" role="alert">
                  {location}
                </div>
              </div>
              {
                status === 'Complete' ? <>  <div class="col-md-6">
                  <small>Distance Covered (Km)</small>
                  <div class="alert alert-light fade show" role="alert">
                    {distance && distance > `${1.00}` ? distance : '0'}
                  </div>
                </div>
                  <div class="col-md-6">
                    <small>Start Time</small>
                    <div class="alert alert-light fade show" role="alert">
                      {moment(start_time).format('MMM Do YYYY') + ' , ' + moment(start_time).format('h:mm:ss a')}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <small>Time of Visit</small>
                    <div class="alert alert-light fade show" role="alert">
                      {moment(end_time).format('MMM Do YYYY') + ' , ' + moment(end_time).format('h:mm:ss a')}
                    </div>
                  </div> </>
                  : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewVisit;
