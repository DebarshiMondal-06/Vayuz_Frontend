import moment from 'moment';
import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { createContextInventory } from './InventoryContext';



const ViewInventory = () => {
  const { ViewInventory } = useContext(createContextInventory);

  const { filledOpeningStock, emptyOpeningStock, emptyClosingStock,
    cylinder_type, dispatchQty, receiptQty, filledClosingStock, createdAt
  } = ViewInventory;



  return (
    <div class="row">
      <div class="col-md-12">
        <div class="main-card mb-3">
          <ToastContainer position='bottom-right' autoClose={2500} />
          <div class="">
            <div class="alert alert-light fade show" role="alert">
              <strong> {(cylinder_type) ? cylinder_type.cylinder_name : 'No Data'}</strong><br />
              <span class="float-right"><i class="metismenu-state-icon pe-7s-date caret-left"></i> {moment(createdAt).format('MMM Do YYYY')}
                <i class="metismenu-state-icon pe-7s-clock caret-left"></i> {moment(createdAt).format('h:mm:ss a')}</span>
            </div>
            <div class="row">
              <div class="col-md-6">
                <small>Filled Opening Stock</small>
                <div class="alert alert-light fade show" role="alert">
                  {filledOpeningStock}
                </div>
              </div>
              <div class="col-md-6">
                <small>Empty Opening Stock</small>
                <div class="alert alert-light fade show" role="alert">
                  {emptyOpeningStock}
                </div>
              </div>
              <div class="col-md-6">
                <small>Filled Closing Stock</small>
                <div class="alert alert-light fade show" role="alert">
                  {filledClosingStock ? filledClosingStock : 'No Data'}
                </div>
              </div>
              <div class="col-md-6">
                <small>Empty Closing Stock</small>
                <div class="alert alert-light fade show" role="alert">
                  {emptyClosingStock ? emptyClosingStock : 'No Data'}
                </div>
              </div>
              <div class="col-md-6">
                <small>Disptach Quantity</small>
                <div class="alert alert-light fade show" role="alert">
                  {dispatchQty ? dispatchQty : 'Will be available at 19:00 hrs'}
                </div>
              </div>
              <div class="col-md-6">
                <small>Recipt Quantity</small>
                <div class="alert alert-light fade show" role="alert">
                  {receiptQty ? receiptQty : 'Will be available at 19:00 hrs'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewInventory;
