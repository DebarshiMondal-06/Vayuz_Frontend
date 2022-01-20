import { MoreVert } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { Link } from 'react-router-dom';
import { distributorStatus } from "./distributorapi";
import { createContextDistributor } from "./DistributorContext";
import moment from "moment";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { authContext } from "../../../../Context/authContext";
import { toast } from "react-toastify";
var $ = require("jquery");


const DistributorTable = () => {
  const {
    getDistributors,
    distLoading,
    distributor,
    editHandleDistributor,
    handleView
  } = useContext(createContextDistributor);
  const { checkAdmin, cookie, logout, token } = useContext(authContext);



  const handleStatus = (id, status) => {
    const { ID } = token;
    var is_active = status === "Active" ? "InActive" : "Active";
    distributorStatus({ id, is_active }, ID).then(() => {
      getDistributors();
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
      $("#DistributorTable").DataTable({
        responsive: true,
        orderCellsTop: false,
        bRetrieve: true,
        initComplete: function () {
          this.api()
            .columns(".select-filter")
            .every(function () {
              var column = this;
              var select = $('<select class="form-control form-control-sm col mx-3 my-2" ><option value=""></option></select>')
                .appendTo($('#distfilter'))
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


  var filterDistributor = [];
  if (!checkAdmin()) {
    filterDistributor = distributor.filter((items) => {
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
    filterDistributor = distributor;
  }





  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="row">
          <div className="col">Branch</div>
          <div className="col">Status</div>
        </div>
        <div className="row pb-3" id="distfilter">
        </div>
        <div className="table-responsive">
          <table id="DistributorTable" className="mb-0 text-center table-hover table">
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Distributor Name</th>
                <th>Manager</th>
                <th>Executive</th>
                <th>Email</th>
                <th className="select-filter">Branch</th>
                <th>Contact</th>
                <th>Added On</th>
                <th className="select-filter">Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filterDistributor.map((items, i) => {
                const {
                  _id,
                  name,
                  company,
                  is_active,
                  createdAt,
                  email,
                  contact1,
                  branch,
                  manager,
                  executive
                } = items;
                const { branch: branchname } = branch || {};
                const { name: managerName } = manager || {};
                const { name: executiveName } = executive || {};
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <th className="text-capitalize">{company}</th>
                    <td className="text-capitalize">{name}</td>
                    <td>{managerName || <b>No Data</b>}</td>
                    <td>{executiveName || <b>No Data</b>}</td>
                    <td>{email}</td>
                    <td>{branchname || <b>No Data</b>}</td>
                    <td>{contact1}</td>
                    <td>{moment(createdAt).format("DD-MMM-YYYY")}</td>
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
                              to={`${checkAdmin()
                                ? "/distributor/view"
                                : "/manager_distributor/view"
                                }`}
                              onClick={() => handleView(items)}
                              className="dropdown-item">
                              View
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`${checkAdmin()
                                ? "/distributor/edit"
                                : "/manager_distributor/edit"
                                }`}
                              onClick={() => editHandleDistributor(_id, items)}
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
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DistributorTable;
