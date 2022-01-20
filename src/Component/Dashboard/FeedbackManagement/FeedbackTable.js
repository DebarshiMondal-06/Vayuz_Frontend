import { MoreVert } from "@material-ui/icons";
import React, { useContext } from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { createFeedbackContext } from "./FeedbackContext";
import swal from "sweetalert";
import moment from "moment";
import { updateFeedback } from "./feedbackapis";
import { authContext } from "../../../Context/authContext";
var $ = require("jquery");



const FeedbackTable = () => {
  const { token } = useContext(authContext);
  const { feedback, distLoading, getAllFeedback } = useContext(createFeedbackContext);

  const handleStatus = (id, is_active) => {
    const { ID } = token;
    updateFeedback({ id, is_active }, ID).then(() => {
      getAllFeedback();
    }).catch((err) => console.log(err.response.data));
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


  const buttonOptions = {
    InProgress: { text: "InProgress", className: 'bg-info' },
    Closed: { text: "Closed", className: "bg-danger" },
  };


  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="table-responsive">
          <table id="dataTabler" className="text-center table-hover mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Name</th>
                <th>FeedBack Text</th>
                <th>Added On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-capitalize text-center">
              {feedback.map((items, i) => {
                const { _id, role, is_active, message, createdAt, distributor, executive, manager } = items;

                var dataName;
                if (role === 'distributor') {
                  dataName = distributor ? distributor.name : '--'
                } else if (role === 'manager') {
                  dataName = manager ? manager.name : '--'
                } else if (role === 'executive') {
                  dataName = executive ? executive.name : '--'
                }


                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{role}</td>
                    <td>
                      {dataName}
                    </td>
                    <td>{message.substring(0, 150)}</td>
                    <td>{moment(createdAt).format('ddd, MMM Do YYYY')}</td>
                    <td>
                      <span className={`badge ${(is_active === 'InProgress') ? 'bg-info' : ''}`}>
                        {is_active}
                      </span></td>
                    <td>
                      <div className="btn-group dropend p-0 mx-auto">
                        <li
                          type="button"
                          className="rounded dropdown-toggle"
                          data-bs-toggle="dropdown">
                          <MoreVert />
                        </li>
                        <ul className="dropdown-menu dropdown-menu-dark"
                          aria-labelledby="navbarDarkDropdownMenuLink">
                          <li
                            className="dropdown-item"
                            onClick={() => {
                              swal({
                                title: "Change Status To!",
                                icon: "info",
                                buttons: { ...buttonOptions },
                              }).then((val) => {
                                if (val === "InProgress")
                                  handleStatus(_id, "InProgress");
                                if (val === "Closed")
                                  handleStatus(_id, "Closed");
                              });
                            }}>
                            Change Status
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

export default FeedbackTable;

