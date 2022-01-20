import { MoreVert } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { createContextRate } from "./RateContext";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import moment from 'moment';
var $ = require("jquery");



const RateTable = () => {
  const { editHandleRate, rate, distLoading } = useContext(
    createContextRate
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

  if (rate && rate.length >= 1) {
    setTimeout(() => {
      $("#dataTable").DataTable();
    }, 1);
  }



  return (
    <div className="row text-center">
      <div className="col-lg-12">
        <div className="table-responsive">
          <table id="dataTable" className="mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cylinder Name</th>
                <th>GST (%)</th>
                <th>Base Price (₹)</th>
                <th>State</th>
                <th>District</th>
                <th>Default</th>
                <th>Added on</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rate.map((items, i) => {
                const { _id, createdAt, cylinder_type, district, gst, base_price, default_type } = items;
                const { cylinder_name } = cylinder_type || {};
                const { state } = district || {};
                return (
                  <tr style={{ textTransform: 'capitalize' }} key={i}>
                    <th>{i + 1}</th>
                    <td>{cylinder_name ? cylinder_name : 'No Data'}</td>
                    <td>{gst}</td>
                    <td>{base_price}</td>
                    <td>{state ? state.state : '--'}</td>
                    <td>{district ? district.district : '--'}</td>
                    <td>{default_type}</td>
                    <td>{moment(createdAt).format('ddd, MMM Do YYYY')}</td>
                    <td>
                      <div className="btn-group dropend p-0 mx-auto">
                        <li type="button" className="rounded dropdown-toggle"
                          data-bs-toggle="dropdown"> <MoreVert />
                        </li>
                        <ul className="dropdown-menu dropdown-menu-dark"
                          aria-labelledby="navbarDarkDropdownMenuLink">
                          <li>
                            <Link to="/rate/edit" className="dropdown-item"
                              onClick={() => editHandleRate(_id, items)}>
                              Edit
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RateTable;
