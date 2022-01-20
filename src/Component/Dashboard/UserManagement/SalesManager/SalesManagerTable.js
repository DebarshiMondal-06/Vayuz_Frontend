import { MoreVert } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { createContextManager } from "./ManagerContext";
import { managerStatus } from "./managerapis";
import moment from 'moment';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { authContext } from "../../../../Context/authContext";
import { toast } from "react-toastify";
var $ = require("jquery");





const SalesManagerTable = () => {
  const { editHandleManager, getManagers, distLoading, manager, editHandleView } = useContext(
    createContextManager
  );
  const { token, logout } = useContext(authContext);

  const handleStatus = (id, status) => {
    const { ID } = token;
    var is_active = status === "Active" ? "InActive" : "Active";
    managerStatus({ id, is_active }, ID).then(() => {
      getManagers();
    }).catch((err) => {
      if (err.response.status === 401) {
        toast.error(err.response.data.message);
        logout();
      }
    });
  };


  if (distLoading) {
    return (
      <div className="loading-gif">
        <img src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif" alt="some" />
      </div>
    );
  }
  // @dataTable integrate BY ATUL,****************  Thanks Atul, for the Datatable 😆 *************,
  if (!distLoading) {
    setTimeout(() => {
      $("#salesManager").DataTable({
        responsive: true,
        orderCellsTop: false,
        bRetrieve: true,
        initComplete: function () {
          this.api()
            .columns(".select-filter")
            .every(function () {
              var column = this;
              var select = $('<select class="form-control form-control-sm col-3 mx-3 my-2" ><option value=""></option></select>')
                .appendTo($('#managerfilter'))
                .on("change", function () {
                  var val = $.fn.dataTable.util.escapeRegex($(this).val());

                  column.search(val ? "^" + val + "$" : "", true, false).draw();
                });

              return column
                .data()
                .unique()
                .sort()
                .each(function (d, j) {
                  select.append('<option value="' + d + '">' + d + "</option>");
                });
            });
        },
      });
    }, 1);
  }


  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="row">
          <div className="col-3">Status</div>
        </div>
        <div className="row pb-3" id="managerfilter">
        </div>
        <div className="table-responsive">
          <table id="salesManager" className="table-hover mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email ID</th>
                <th>Contact Number</th>
                <th>Added On</th>
                <th className="select-filter">Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {manager.map((items, i) => {
                const {
                  contact_no,
                  is_active,
                  _id,
                  createdAt,
                  name,
                  employee_id,
                  email_id,
                } = items;
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <th>{employee_id}</th>
                    <td>{name}</td>
                    <td>{email_id}</td>
                    <td>{contact_no}</td>
                    <td>{moment(createdAt).format('DD-MMM-YYYY')}</td>
                    <td
                      className={`m-3 badge light ${is_active === "InActive"
                        ? "badge-danger"
                        : "badge-success"
                        }`}
                    >
                      {is_active}
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
                              to="/salesmanager/view"
                              onClick={() => editHandleView(items)}
                              className="dropdown-item">
                              View
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/salesmanager/edit"
                              onClick={() => editHandleManager(_id, items)}
                              className="dropdown-item">
                              Edit
                            </Link>
                          </li>
                          <li>
                            <span
                              onClick={() => handleStatus(_id, is_active)}
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

export default SalesManagerTable;
