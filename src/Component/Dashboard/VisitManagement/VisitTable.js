import { MoreVert } from "@material-ui/icons";
import React, { useContext } from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { createContextVisit } from "./VisitContext";
import { updateVisit } from "./visitsapis";
import swal from "sweetalert";
import { authContext } from "../../../Context/authContext";
import moment from "moment";
import { Link } from "react-router-dom";
var $ = require("jquery");




const VisitTable = () => {
  const { distLoading, visit, getAllVisit, handleView } = useContext(createContextVisit);
  const { checkAdmin } = useContext(authContext);

  if (distLoading) {
    return (
      <div className="loading-gif">
        <img
          src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
          alt="some" />
      </div>
    );
  }




  const buttonOptions = {
    Distributor: { text: "Distributor", className: "bg-success" },
    Executive: { text: "Executive" },
    Manager: { text: "Manager", className: "bg-info" },
  };
  const buttonOptionsStatus = {
    Pending: { text: "Pending", className: "bg-warning" },
    Complete: { text: "Complete", className: "bg-success" },
    Active: { text: "Active", className: "bg-info" },
  };
  const handlePayment = (id, assigned_to) => {
    updateVisit({ id, assigned_to }).then(() => {
      getAllVisit();
    });
  };
  const handleStatus = (id, status) => {
    updateVisit({ id, status }).then(() => {
      getAllVisit();
    });
  };


  if (!distLoading) {
    setTimeout(() => {
      $("#datatablej").DataTable();
    }, 1);
  }


  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="table-responsive">
          <table id="datatablej" className="text-center table-hover mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Distributor</th>
                <th>Executive</th>
                {checkAdmin() ? <th>Manager</th> : ""}
                <th>Location</th>
                <th>Added On</th>
                {(checkAdmin()) ? <th>Assigned</th> : ''}
                <th>Status</th>
                {(checkAdmin()) ? <th>Action</th> : ''}
              </tr>
            </thead>
            <tbody>
              {visit.map((items, i) => {
                const {
                  _id,
                  executive,
                  distributor,
                  manager,
                  assigned_to,
                  location,
                  customer,
                  status,
                  createdAt,
                } = items;

                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{customer ? customer.customer_name : "No Data"}</td>
                    <td>{distributor ? distributor.name : "No Data"}</td>
                    <td>{executive ? executive.name : "No Data"}</td>
                    {checkAdmin() ? <td>{manager ? manager.name : "No Data"}</td> : null}
                    <td>{location.substring(0, 30) + '...'}</td>
                    <td>{moment(createdAt).format('MMM-D-YYYY')}</td>
                    {checkAdmin() ? <td><b>{assigned_to}</b></td> : null}
                    <td><span
                      className={`badge light ${status === "Pending"
                        ? "badge-warning"
                        : status === "Active"
                          ? "badge-info"
                          : "badge-success"
                        }`}>
                      {status}
                    </span></td>
                    {checkAdmin() ? (
                      <td>
                        <div className="btn-group dropend p-0 mx-auto">
                          <li
                            type="button"
                            className="rounded dropdown-toggle"
                            data-bs-toggle="dropdown">
                            <MoreVert />
                          </li>
                          <ul
                            className="dropdown-menu dropdown-menu-dark"
                            aria-labelledby="navbarDarkDropdownMenuLink">
                            {
                              checkAdmin() ? <Link to='/visits/view' className="dropdown-item"
                                Change Status onClick={() => handleView(items)}>
                                View
                              </Link> : null
                            }
                            <li
                              className="dropdown-item"
                              onClick={() => {
                                swal({
                                  title: "Change Status To!",
                                  icon: "info",
                                  buttons: { ...buttonOptionsStatus },
                                }).then((val) => {
                                  if (val === "Pending")
                                    handleStatus(_id, "Pending");
                                  if (val === "Complete")
                                    handleStatus(_id, "Complete");
                                  if (val === "Active")
                                    handleStatus(_id, "Active");
                                });
                              }}>Change Status
                            </li>
                            {
                              status !== 'Complete' && status !== 'Active' ? <li
                                className="dropdown-item"
                                onClick={() => {
                                  swal({
                                    title: "Change Assigned To!",
                                    icon: "info",
                                    buttons: { ...buttonOptions },
                                  }).then((val) => {
                                    if (val === "Manager")
                                      handlePayment(_id, "Manager");
                                    if (val === "Executive")
                                      handlePayment(_id, "Executive");
                                    if (val === "Distributor")
                                      handlePayment(_id, "Distributor");
                                  });
                                }}>
                                Change Assigned
                              </li> : null
                            }
                          </ul>
                        </div>
                      </td>
                    ) : (
                      ""
                    )}
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

export default VisitTable;
