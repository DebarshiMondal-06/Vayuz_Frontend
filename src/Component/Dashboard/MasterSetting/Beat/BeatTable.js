import { MoreVert } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { updatebeat } from "./beatapis";
import { createContextBeat } from "./BeatContext";
import moment from 'moment';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
var $ = require("jquery");



const BeatTable = () => {
  const { data, editHandlebeat, getbeat, distLoading } = useContext(
    createContextBeat
  );

  const handleStatus = (id, status) => {
    var isactive = status === "Active" ? "InActive" : "Active";
    updatebeat({ id, isactive }).then((el) => {
      getbeat();
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
    $("#dataTablek").DataTable();
  }, 1);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="table-responsive">
          <table id="dataTablek" className="mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Beat</th>
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
                const { beat, forarea, createdAt, isactive, _id } = items;
                const { area, forbranch } = forarea || {};
                const { forcity, branch } = forbranch || {};

                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <th style={{textTransform: 'capitalize'}}>{beat}</th>
                    <td style={{textTransform: 'capitalize'}}>{area ? area : <b>No Data</b>}</td>
                    <td style={{textTransform: 'capitalize'}}>{branch ? branch : <b>No Data</b>}</td>
                    <td style={{textTransform: 'capitalize'}}>{forcity ? forcity.pincode : <b>No Data</b>}</td>
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
                              to="/beat/edit"
                              onClick={() => editHandlebeat(_id, forarea, beat)}
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

export default BeatTable;
