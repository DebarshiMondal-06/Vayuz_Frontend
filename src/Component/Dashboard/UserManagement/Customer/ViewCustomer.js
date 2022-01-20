import moment from 'moment';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import { createContextCustomer } from './CustomerContext';



const ViewCustomer = () => {
  const { view } = useContext(createContextCustomer);
  const { checkAdmin } = useContext(authContext);
  const loc = useLocation();
  const {
    createdAt,
    executive,
    branch,
    isactive,
    manager,
    area, beat,
    company_name,
    company_contact,
    customer_name, customer_contact,
    email } = view;


  if ((loc.pathname === '/customer/view' || loc.pathname === '/manager_customer/view') && !email) {
    window.location.href = checkAdmin() ? '/customer' : '/manager_customer';
  }

  return (
    <div class="row">
      <div class="col-md-12">
        <div class="main-card mb-3">
          <div class="">
            <p>
              <span class="text-right">
                {
                  isactive === 'Active' ?
                    <button class="mb-2 btn btn-success active">
                      {isactive}
                    </button>
                    : <button class="mb-2 btn btn-danger active">
                      {isactive}
                    </button>
                }
              </span>
              <br />
            </p>
            <div class="alert alert-light fade show" role="alert">
              <strong>
                <span class="float-right"><i class="metismenu-state-icon pe-7s-date caret-left"></i> {moment(createdAt).format('MMM Do YYYY')}
                  <i class="metismenu-state-icon pe-7s-clock caret-left"></i> {moment(createdAt).format('h:mm:ss a')}
                </span>
              </strong><br />
            </div>
            <div class="row">
              <div class="col-md-6">
                <small>Company Name</small>
                <div class="alert alert-light fade show" role="alert">
                  {company_name}
                </div>
              </div>
              <div class="col-md-6">
                <small>Company Contact</small>
                <div class="alert alert-light fade show" role="alert">
                  {company_contact}
                </div>
              </div>
              <div class="col-md-6">
                <small>Customer Name</small>
                <div class="alert alert-light fade show" role="alert">
                  {customer_name}
                </div>
              </div>
              <div class="col-md-6">
                <small>Customer Contact</small>
                <div class="alert alert-light fade show" role="alert">
                  {customer_contact}
                </div>
              </div>
              <div class="col-md-6">
                <small>Email</small>
                <div class="alert alert-light fade show" role="alert">
                  {email}
                </div>
              </div>
              <div class="col-md-6">
                <small> Manager </small>
                <div class="alert alert-light fade show" style={{ display: 'flex' }} role="alert">
                  {manager ? manager.name : 'No Data'}
                </div>
              </div>
              <div class="col-md-6">
                <small> Executive </small>
                <div class="alert alert-light fade show" style={{ display: 'flex' }} role="alert">
                  {executive ? executive.name : 'No Data'}
                </div>
              </div>
              <div class="col-md-6">
                <small> Branch </small>
                <div class="alert alert-light fade show" style={{ display: 'flex' }} role="alert">
                  {branch ? branch.branch : 'No Data'}
                </div>
              </div>
              <div class="col-md-6">
                <small> Area </small>
                <div class="alert alert-light fade show" style={{ display: 'flex' }} role="alert">
                  {area ? area.area : 'No Data'}
                </div>
              </div>
              <div class="col-md-6">
                <small> Beat </small>
                <div class="alert alert-light fade show" style={{ display: 'flex' }} role="alert">
                  {beat ? beat.beat : 'No Data'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCustomer;
