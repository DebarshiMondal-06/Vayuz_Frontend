import { MoreVert } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { updatearea } from "./areaapis";
import { createContextArea } from "./AreaContext";
import moment from 'moment';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
var $ = require("jquery");



const AreaTable = () => {
  const { data, editHandleArea, getarea, distLoading } = useContext(
    createContextArea
  );

  const handleStatus = (id, status) => {
    var isactive = status === "Active" ? "InActive" : "Active";
    updatearea({ id, isactive }).then((el) => {
      getarea();
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
    $("#dataTabler").DataTable();
  }, 1);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="table-responsive">
          <table id="dataTabler" className="mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Area</th>
                <th>Branch</th>
                <th>Pincode</th>
                <th>Added on</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((items, i) => {
                const { area, forbranch, createdAt, isactive, _id } = items;
                const { branch, forcity } = forbranch || {};
                const { pincode } = forcity || {};

                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <th>{area}</th>
                    <td>{branch || <b>No Data</b>}</td>
                    <td>{pincode || <b>No Data</b>}</td>
                    <td>{moment(createdAt).format('ddd, MMM Do YYYY')}</td>
                    <td>
                      <span
                        className={`badge light ${
                          isactive === "InActive"
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
                              to="/area/edit"
                              onClick={() => editHandleArea(_id, forbranch, area)}
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

export default AreaTable;
