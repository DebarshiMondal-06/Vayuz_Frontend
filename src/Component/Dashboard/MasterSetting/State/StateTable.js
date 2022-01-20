import { MoreVert } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { updateState } from "./stateapis";
import { createContextState } from "./StateContext";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import moment from 'moment';
var $ = require("jquery");

const DistTable = () => {
  const { states, editHandleState, getState, distLoading } = useContext(
    createContextState
  );

  const handleStatus = (id, status) => {
    var isactive = status === "Active" ? "InActive" : "Active";
    updateState({ id, isactive }).then((el) => {
      getState();
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

  if (states) {
    setTimeout(() => {
      $("#dataTable").DataTable();
    }, 1);
  }

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="table-responsive">
          <table id="dataTable" className="mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>State</th>
                <th>Added on</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {states.map((items, i) => {
                const { isactive, _id, createdAt, state } = items;
                return (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td style={{ textTransform: 'capitalize' }}>{state}</td>
                    <td>{moment(createdAt).format('ddd, MMM Do YYYY')}</td>
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
                              to="/state/edit-state"
                              onClick={() => editHandleState(_id, state)}
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
