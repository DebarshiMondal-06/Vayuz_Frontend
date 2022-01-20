import React, { useContext } from "react";
import { createContextOrder } from "./OrderContext";
import moment from 'moment';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
var $ = require("jquery");



const ViewDispatch = () => {
  const { distLoading, dispatch } = useContext(
    createContextOrder,
  );


  if (distLoading) {
    return (
      <div className="loading-gif">
        <img
          src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
          alt="some"
        />
      </div>
    );
  }

  setTimeout(() => {
    $("#dataTablej").DataTable();
  }, 1);

  
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="table-responsive">
          <table id="dataTablej" className="mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>OrderID</th>
                <th>Vechile No</th>
                <th>Driver Name</th>
                <th>Comments</th>
                <th>Added on</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {dispatch.map((items, i) => {
                const { forOrder, createdAt, vechile_no, comment, driver_name } = items;
                const { order_id } = forOrder || {};

                return <tr key={i}>
                  <td>{i + 1}</td>
                  <th>{order_id}</th>
                  <td>{vechile_no}</td>
                  <td>{driver_name}</td>
                  <td>{comment ? comment : '--'}</td>
                  <td>{moment(createdAt).format('DD-MMM-YYYY')}</td>
                  <td>{moment(createdAt).format('h:mm:ss a')}</td>
                </tr>
              })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewDispatch;
