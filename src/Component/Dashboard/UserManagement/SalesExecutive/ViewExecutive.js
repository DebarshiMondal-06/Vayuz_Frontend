import moment from 'moment';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import { createContextExecutive } from './ExecutiveContext';

const ViewExecutive = () => {
  const { view } = useContext(createContextExecutive);
  const loc = useLocation();
  const { checkAdmin } = useContext(authContext);
  const { contact_no,
    createdAt,
    name,
    employee_id,
    is_active,
    branches,
    sales_managers,
    areas, beats,
    email_id } = view;
  if ((loc.pathname === '/salesexecutive/view' || loc.pathname === '/manager_salesexecutive/view') && !email_id) {
    window.location.href = checkAdmin() ? '/salesexecutive' : '/manager_salesexecutive';
  }
  return (
    <div class="row">
      <div class="col-md-12">
        <div class="main-card mb-3">
          <div class="">
            <p>
              <span class="text-left"><strong>Employeee ID: {employee_id}</strong></span>
              <span class="text-right">
                {
                  is_active === 'Active' ?
                    <button class="mb-2 btn btn-success active">
                      {is_active}
                    </button>
                    : <button class="mb-2 btn btn-danger active">
                      {is_active}
                    </button>
                }
              </span>
            </p>
            <br />
            <div class="alert alert-light fade show" role="alert">
              <strong>
                <span class="float-right"><i class="metismenu-state-icon pe-7s-date caret-left"></i> {moment(createdAt).format('MMM Do YYYY')}
                  <i class="metismenu-state-icon pe-7s-clock caret-left"></i> {moment(createdAt).format('h:mm:ss a')}
                </span>
              </strong><br />
            </div>
            <div class="row">
              <div class="col-md-6">
                <small>Name</small>
                <div class="alert alert-light fade show" role="alert">
                  {name}
                </div>
              </div>
              <div class="col-md-6">
                <small>Email ID</small>
                <div class="alert alert-light fade show" role="alert">
                  {email_id}
                </div>
              </div>
              <div class="col-md-6">
                <small>Contact</small>
                <div class="alert alert-light fade show" role="alert">
                  {contact_no}
                </div>
              </div>
              <div class="col-md-6">
                <small> Branch </small>
                <div class="alert alert-light fade show" style={{ display: 'flex' }} role="alert">
                  {branches && branches.map((items) => {
                    return <div>
                      <span className='badge bg-success text-white'>
                        {items.branch}
                      </span>&nbsp;
                      <br />
                    </div>
                  })}
                </div>
              </div>
              <div class="col-md-6">
                <small> Area </small>
                <div class="alert alert-light fade show" style={{ display: 'flex' }} role="alert">
                  {areas && areas.map((items) => {
                    return <div>
                      <span className='badge bg-success text-white'>
                        {items.area}
                      </span>&nbsp;
                      <br />
                    </div>
                  })}
                </div>
              </div>
              <div class="col-md-6">
                <small> Beat </small>
                <div class="alert alert-light fade show" style={{ display: 'flex' }} role="alert">
                  {beats && beats.map((items) => {
                    return <div>
                      <span className='badge bg-success text-white'>
                        {items.beat}
                      </span>&nbsp;
                      <br />
                    </div>
                  })}
                </div>
              </div>
              <div class="col-md-6">
                <small> Manager </small>
                <div class="alert alert-light fade show" style={{ display: 'flex' }} role="alert">
                  {sales_managers ? sales_managers.name : 'No Data'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewExecutive;
