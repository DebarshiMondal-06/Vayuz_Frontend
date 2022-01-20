import { MoreVert } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { createContextStock } from "./StockContext";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import moment from "moment";
import { updateStock } from "./stockapis";
var $ = require("jquery");



const StockTable = () => {
  const { stock, distLoading, editHandleStock } = useContext(createContextStock);

  const handleStatus = (id, status) => {
    var isactive = status === "Active" ? "InActive" : "Active";
    updateStock({ id, isactive }).then(() => {
      // getCustomers();
    });
  };
  if (distLoading) {
    return <div className="loading-gif">
      <img src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif" alt="some" />
    </div>
  }
  setTimeout(() => {
    $("#dataTablej").DataTable();
  }, 1);



  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="table-responsive">
          <table id="dataTablej" className="text-center mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cylinder Name</th>
                <th>Added On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((items, i) => {
                const { status, _id, cylinder_name, createdAt } = items;

                return <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{cylinder_name}</td>
                  <td>{moment(createdAt).format('DD-MMM-YYYY')}</td>
                  <td><span className={`badge light ${(status === 'InActive') ? 'badge-danger' : 'badge-success'}`}>{status}</span></td>
                  <td>
                    <div className="btn-group dropend p-0 mx-auto">
                      <li type="button" className="rounded dropdown-toggle" data-bs-toggle="dropdown">
                        <MoreVert />
                      </li>
                      <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                        <li><Link to='/stock/edit' onClick={() => editHandleStock(_id, items)} className="dropdown-item" >Edit</Link></li>
                        <li><span onClick={() => handleStatus(_id, status)} className="dropdown-item">Change Status</span></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockTable;
