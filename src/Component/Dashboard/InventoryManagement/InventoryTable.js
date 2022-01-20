import { MoreVert } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { createContextInventory } from "./InventoryContext";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import moment from "moment";
import { authContext } from "../../../Context/authContext";
var $ = require("jquery");



const InventoryTable = () => {
  const { inventory, loading, editHandleInventory, viewHandleInventory } = useContext(
    createContextInventory
  );
  const { checkAdmin } = useContext(authContext);

  if (loading) {
    return (
      <div className="loading-gif">
        <img
          src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
          alt="some"
        />
      </div>
    );
  }
  if (!loading) {
    setTimeout(() => {
      $("#dataTablej").DataTable({
        responsive: true,
        orderCellsTop: false,
        bRetrieve: true,
        initComplete: function () {
          this.api()
            .columns(".select-filter")
            .every(function () {
              var column = this;
              var select = $('<select class="form-control form-control-sm col mx-3 my-2" ><option value=""></option></select>')
                .appendTo($('#invenfilter'))
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
          <div className="col">Cylinder Type</div>
          <div className="col">Weight</div>
        </div>
        <div className="row pb-3" id="invenfilter">
        </div>
        <div className="table-responsive">
          <table id="dataTablej" className="text-center mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th class="select-filter">Cylinder Name</th>
                <th>Filled Opening Stock</th>
                <th>Filled Available Stock</th>
                <th>Filled Closing Stock</th>
                <th>Empty Opening Stock</th>
                <th>Empty Available Stock</th>
                <th>Empty Closing Stock</th>
                <th>Added on</th>
                {(checkAdmin()) ? <th>Action</th> : ''}
              </tr>
            </thead>
            <tbody>
              {inventory.map((items, i) => {
                console.log(items);
                const {
                  _id,
                  cylinder_type,
                  filledOpeningStock,
                  filledClosingStock,
                  filledAvailableStock,
                  emptyOpeningStock,
                  emptyAvailableStock,
                  emptyClosingStock,
                  createdAt,
                } = items;

                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{cylinder_type ? cylinder_type.cylinder_name : 'No Data'}</td>
                    <td>{filledOpeningStock}</td>
                    <td>{filledAvailableStock}</td>
                    <td>{filledClosingStock ? filledClosingStock : '--'}</td>
                    <td>{emptyOpeningStock}</td>
                    <td>{emptyAvailableStock}</td>
                    <td>{emptyClosingStock ? emptyClosingStock : '--'}</td>
                    <td>{moment(createdAt).format("DD/MMM/YY")}</td>
                    {
                      (checkAdmin()) ? <td>
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
                            aria-labelledby="navbarDarkDropdownMenuLink">
                            <li>
                              <Link
                                to={`${checkAdmin()
                                  ? "/inventory/edit"
                                  : "/manager_inventory/edit"
                                  }`}
                                onClick={() => editHandleInventory(_id, items)}
                                className="dropdown-item">
                                Edit
                            </Link>
                            </li>
                            <li>
                              <Link
                                to={`${checkAdmin()
                                  ? "/inventory/view"
                                  : "/manager_inventory/view"
                                  }`}
                                onClick={() => viewHandleInventory(items)}
                                className="dropdown-item">
                                View
                            </Link>
                            </li>
                          </ul>
                        </div>
                      </td> : ''
                    }
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

export default InventoryTable;
