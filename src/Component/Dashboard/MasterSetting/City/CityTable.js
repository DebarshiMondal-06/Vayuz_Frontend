import { MoreVert } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { updateCity } from "./cityapis";
import { createContextCity } from "./CityContext";
import moment from 'moment';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
var $ = require("jquery");



const DistTable = () => {
  const { data, getCity, editHandleCity, distLoading } = useContext(
    createContextCity
  );

  const handleStatus = (id, status) => {
    var isactive = status === "Active" ? "InActive" : "Active";
    updateCity({ id, isactive }).then((el) => {
      // console.log(el);
      getCity();
    });
  };

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
    $("#dataTablem").DataTable();
  }, 1);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="table-responsive">
          <table id="dataTablem" className="mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>City</th>
                <th>pincode</th>
                <th>District</th>
                <th>Added on</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((items, i) => {
                const {
                  isactive,
                  _id,
                  forDistrict,
                  createdAt,
                  city,
                  pincode,
                  state
                } = items;
                return (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{city}</td>
                    <td>{pincode}</td>
                    <td>{forDistrict ? forDistrict.district : <b>No Data</b>}</td>
                    <td>{moment(createdAt).format('DD-MMM-YYYY')}</td>
                    <td>
                      <span
                        className={`badge light ${isactive === "InActive"
                            ? "badge-danger"
                            : "badge-success"
                          }`}
                      >
                        {isactive}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group dropend p-0 mx-auto">
                        <li
                          type="button"
                          className="rounded dropdown-toggle"
                          data-bs-toggle="dropdown"
                        >
                          <MoreVert />
                        </li>
                        <ul
                          className="dropdown-menu dropdown-menu-dark"
                          aria-labelledby="navbarDarkDropdownMenuLink"
                        >
                          <li>
                            <Link
                              to="/city/edit-city"
                              onClick={() =>
                                editHandleCity(_id, forDistrict, city, pincode, state)
                              }
                              className="dropdown-item"
                            >
                              Edit
                            </Link>
                          </li>
                          <li>
                            <span
                              onClick={() => handleStatus(_id, isactive)}
                              className="dropdown-item"
                            >
                              Change Status
                            </span>
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

export default DistTable;
