import moment from 'moment';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { authContext } from '../../../../Context/authContext';
import { createContextDistributor } from './DistributorContext';



const ViewDistributor = () => {
  const { view } = useContext(createContextDistributor);
  const { checkAdmin } = useContext(authContext);
  const loc = useLocation();
  const { contact1,
    createdAt,
    name,
    executive,
    branch,
    manager,
    areas, beats,
    company,
    gstin,
    is_active,
    pan,
    email } = view;

  if ((loc.pathname === '/distributor/view' || loc.pathname === '/manager_distributor/view') && !email) {
    window.location.href = checkAdmin() ? '/distributor' : '/manager_distributor';
  }
  return (
    <div class="row">
      <div class="col-md-12">
        <div class="main-card mb-3">
          <div class="">
            <p>
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
                <small>Name</small>
                <div class="alert alert-light fade show" role="alert">
                  {name}
                </div>
              </div>
              <div class="col-md-6">
                <small>Company</small>
                <div class="alert alert-light fade show" role="alert">
                  {company}
                </div>
              </div>
              <div class="col-md-6">
                <small>Contact</small>
                <div class="alert alert-light fade show" role="alert">
                  {contact1}
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
                <small> GSTIN </small>
                <div class="alert alert-light fade show" style={{ display: 'flex' }} role="alert">
                  {gstin ? gstin : 'No Data'}
                </div>
              </div>
              <div class="col-md-6">
                <small> PAN </small>
                <div class="alert alert-light fade show" style={{ display: 'flex' }} role="alert">
                  {pan ? pan : 'No Data'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewDistributor;
