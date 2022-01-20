import React, { useContext } from 'react';
import { CMS } from './context/CMSContext';
import moment from 'moment';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Link } from 'react-router-dom';
import { MoreVert } from '@material-ui/icons';
import { updateOne } from './cmsapis';
var $ = require("jquery");



const CMSTable = () => {
  const { data, handleEdit, fetchCMS, distLoading } = useContext(CMS);
  const handleStatus = (editID, stat) => {
    var status = stat === "Active" ? "InActive" : "Active";
    updateOne({ editID, status }).then(() => {
      fetchCMS();
    });
  }

  setTimeout(() => {
    $("#dataTabler").DataTable();
  }, 1);



  if (distLoading) {
    return (
      <div className="loading-gif">
        <img src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif" alt="some" />
      </div>
    );
  }

  

  return <div className="row">
    <div className="col-lg-12">
      <div className="table-responsive">
        <table id="dataTabler" className="text-center table-hover mb-0 table">
          <thead>
            <tr>
              <th>#</th>
              <th>Page Name</th>
              <th>Added On</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((items, i) => {
              const {
                _id,
                forPageName,
                createdAt,
                status
              } = items;

              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{forPageName ? forPageName.pageName : ''}</td>
                  <td>{moment(createdAt).format('ddd, MMM Do YYYY')}</td>
                  <td><span className={`badge light ${(status === 'Active') ? 'badge-success' : 'badge-danger'}`}>{status}</span></td>

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
                            to="/cms/edit"
                            onClick={() => handleEdit(_id, items)}
                            className="dropdown-item"
                          >
                            Edit
                            </Link>
                        </li>
                        <li>
                          <span
                            onClick={() => handleStatus(_id, status)}
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
}


export default CMSTable;

