import { MoreVert } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { createContextCustomer } from "./CustomerContext";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import moment from "moment";
import { updateCustomer } from "./customerapi";
import { authContext } from "../../../../Context/authContext";
import { toast } from "react-toastify";
var $ = require("jquery");

const CustomerTable = () => {

  const { checkAdmin, cookie, token, logout } = useContext(authContext);
  const {
    customer,
    distLoading,
    getCustomers,
    editHandleCustomer,
    handleView
  } = useContext(createContextCustomer);

  const handleStatus = (id, status) => {
    const { ID } = token;
    var isactive = status === "Active" ? "InActive" : "Active";
    updateCustomer({ id, isactive }, ID).then(() => {
      getCustomers();
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
        <img
          src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
          alt="some"
        />
      </div>
    );
  }
  if (!distLoading) {
    setTimeout(() => {
      $("#customerTable").DataTable({
        responsive: true,
        orderCellsTop: false,
        bRetrieve: true,
        initComplete: function () {
          this.api()
            .columns(".select-filter")
            .every(function () {
              var column = this;
              var select = $('<select class="form-control form-control-sm col mx-3 my-2" ><option value=""></option></select>')
                .appendTo($('#customerfilter'))
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



  var filterCustomer = [];
  if (!checkAdmin()) {
    filterCustomer = customer.filter((items) => {
      const { authToken } = cookie;
      var data;
      if (items.manager) {
        data = items.manager._id === authToken._id;
      } else {
        data = null;
      }
      return data;
    });
  } else {
    filterCustomer = customer;
  }


  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="row">
          <div className="col">Branch</div>
          <div className="col">Status</div>
        </div>
        <div className="row pb-3" id="customerfilter">
        </div>
        <div className="table-responsive">
          <table
            id="customerTable"
            className="text-center table-hover mb-0 table"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Company</th>
                <th>Manager</th>
                <th>Executive</th>
                <th className="select-filter">Branch</th>
                <th>Distributor</th>
                <th>Customer</th>
                <th>Area</th>
                <th>Added On</th>
                <th className="select-filter">Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filterCustomer.map((items, i) => {
                const {
                  _id,
                  company_name,
                  customer_name,
                  executive,
                  area,
                  distributor,
                  createdAt,
                  isactive,
                  manager,
                  branch,
                } = items;

                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <b>{company_name}</b>
                    </td>
                    <td>{manager && manager.name ? manager.name : "No Data"}</td>
                    <td>{executive && executive.name ? executive.name : "No Data"}</td>
                    <td>{branch && branch.branch ? branch.branch : "No Data"}</td>
                    <td>{distributor && distributor.name ? distributor.name : "No Data"}</td>
                    <td>
                      <b>{customer_name}</b>
                    </td>
                    <td>{area ? area.area : "No Data"}</td>
                    <td>{moment(createdAt).format("DD-MMM-YYYY")}</td>
                    <td
                      className={`m-3 badge light ${isactive === "InActive"
                        ? "badge-danger"
                        : "badge-success"
                        }`}>
                      {isactive}
                    </td>
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
                          <li>
                            <Link
                              to={`${checkAdmin()
                                ? "/customer/view"
                                : "/manager_customer/view"
                                }`}
                              onClick={() => handleView(items)}
                              className="dropdown-item">
                              View
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`${checkAdmin()
                                ? "/customer/edit"
                                : "/manager_customer/edit"
                                }`}
                              onClick={() => editHandleCustomer(_id, items)}
                              className="dropdown-item">
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
            <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th> </th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
