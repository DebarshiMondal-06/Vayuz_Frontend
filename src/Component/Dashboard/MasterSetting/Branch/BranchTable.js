import { MoreVert } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { updatebranch } from "./branchapis";
import { createContextBranch } from "./BranchContext";
import moment from 'moment';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
var $ = require("jquery");


const BranchTable = () => {
  const { data, editHandlebranch, getbranch, distLoading } = useContext(
    createContextBranch
  );

  const handleStatus = (id, status) => {
    var isactive = status === "Active" ? "InActive" : "Active";
    updatebranch({ id, isactive }).then((el) => {
      getbranch();
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

  if (!data.length > 0)
    return (
      <div className="no-data">
        <p>No Data for State</p>
      </div>
    );

  setTimeout(() => {
    $("#dataTablej").DataTable();
  }, 1);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="table-responsive">
          <table id="dataTablej" className="mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Branch</th>
                <th>City</th>
                <th>Pincode</th>
                <th>District</th>
                <th>State</th>
                <th>Added on</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((items, i) => {
                const { branch, forcity, createdAt, isactive, _id } = items;
                const { pincode, city, forDistrict } = forcity || {};
                const { district, state } = forDistrict || {};

                return <tr key={i}>
                  <td>{i + 1}</td>
                  <th style={{ textTransform: 'capitalize' }}>{branch}</th>
                  <td style={{ textTransform: 'capitalize' }}>{city ? city : <b>No Data</b>}</td>
                  <td>{pincode ? pincode : <b>No Data</b>}</td>
                  <td style={{ textTransform: 'capitalize' }}>{district ? district : <b>No Data</b>}</td>
                  <td style={{ textTransform: 'capitalize' }}>{state ? state.state : <b>No Data</b>}</td>
                  <td>{moment(createdAt).format('DD-MMM-YYYY')}</td>
                  <td><span className={`badge light ${(isactive === 'InActive') ? 'badge-danger' : 'badge-success'}`}>{isactive}</span></td>
                  <td>
                    <div className="btn-group dropend p-0 mx-auto">
                      <li type="button" className="rounded dropdown-toggle" data-bs-toggle="dropdown">
                        <MoreVert />
                      </li>
                      <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                        <li><Link to='/branch/edit-branch' onClick={() => editHandlebranch(_id, branch, forcity)} className="dropdown-item" >Edit</Link></li>
                        <li><span onClick={() => handleStatus(_id, isactive)} className="dropdown-item">Change Status</span></li>
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

export default BranchTable;
