import { MoreVert } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { createContextOrder } from "./OrderContext";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import moment from "moment";
import { authContext } from '../../../Context/authContext';
import { useCookies } from "react-cookie";
var $ = require("jquery");



const OrderTable = () => {
  const { editHandleOrder, distLoading, orders, viewHandleOrder } = useContext(createContextOrder);
  const { checkAdmin } = useContext(authContext);
  const [cookie] = useCookies();
  const loc = useLocation();
  const history = useHistory();



  // ******************* Changing Status *************************
  const handleStatus = (items) => {
    viewHandleOrder(items);
    history.push('/order_view');
  }
  const handleOrderStatus = (items) => {
    if (checkAdmin()) {
      viewHandleOrder(items);
      history.push('/dispatch/add');
    } else {
      viewHandleOrder(items);
      history.push('/manager_dispatch');
    }
  }


  if (distLoading) {
    return <div className="loading-gif">
      <img src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif" alt="some" />
    </div>
  }

  if (orders) {
    setTimeout(() => {
      $("#dataTablej").DataTable();
    }, 500);
  }



  var filterOrder = [];
  filterOrder = orders.filter((el) => {
    if (loc.pathname === '/manager_order') {
      return el.manager._id === cookie.authToken._id;
    }
    if (loc.pathname === '/manager_order_approval') {
      return el.manager._id === cookie.authToken._id;
    }
    return orders;
  });




  // *********************** Renders *************************************
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="table-responsive">
          <table id="dataTablej" className="text-center table-hover mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>OrderID</th>
                <th>Executive</th>
                <th>Branch</th>
                <th>Distributor Name</th>
                <th>Distributor Company</th>
                <th>Customer Company</th>
                <th>Payment Status</th>
                <th>Amount</th>
                <th>Added On</th>
                <th>
                  {
                    (loc.pathname === '/order' || loc.pathname === '/manager_order') ? 'Status' : 'Order Status'
                  }
                </th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filterOrder.map((items, i) => {
                const { _id, order_id, customer, executive, payment_status,
                  distributor, createdAt, branch, status, amount, admin_approval, manager_approval
                } = items;
                return <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{order_id}</td>
                  <td>{(executive && executive.name) ? executive.name : 'No Data'}</td>
                  <td>{(branch && branch.branch) ? branch.branch : 'No Data'}</td>
                  <td>{(distributor && distributor.name) ? distributor.name : 'No Data'}</td>
                  <td>{(distributor && distributor.name) ? distributor.company : 'No Data'}</td>
                  <td>{(customer && customer.company_name) ? customer.company_name : 'No Data'}</td>
                  <td style={{ letterSpacing: '0.6px' }}>
                    <span className={`badge light ${(payment_status === 'Paid')
                      ? 'badge-success'
                      : (payment_status === 'Credit') ? 'badge-warning' : null}`}>
                      {payment_status}
                    </span>
                  </td>
                  <td>{amount}</td>
                  <td>{moment(createdAt).format('DD-MMM-YYYY')}</td>
                  {
                    (loc.pathname === '/order' || loc.pathname === '/manager_order')
                      ? <td><span className={`badge light ${(status === 'Undelivered') ? 'badge-danger' : 'badge-success'}`}>{status}</span></td>
                      : <td>
                        {
                          (checkAdmin())
                            ? <span className={`badge light ${(admin_approval === 'Pending') ? 'badge-warning' : ''}`}>{admin_approval}</span>
                            : <span className={`badge light ${(manager_approval === 'Pending') ? 'badge-warning' : ''}`}>{manager_approval}</span>
                        }
                      </td>
                  }
                  <td>
                    <div className="btn-group dropend p-0 mx-auto">
                      <li type="button" className="rounded dropdown-toggle" data-bs-toggle="dropdown">
                        <MoreVert />
                      </li>
                      <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                        <li><Link to={`${checkAdmin() ? '/order_view' : '/manager_order_view'}`} onClick={() => viewHandleOrder(items)} className="dropdown-item">
                          View
                        </Link>
                        </li>

                        {
                          (!checkAdmin() && status === 'Undelivered')
                            ? <li><Link to={`${checkAdmin() ? '/order/edit' : '/manager_order/edit'}`} onClick={() => editHandleOrder(_id, items)} className="dropdown-item" >
                              Edit</Link>
                            </li>
                            : null
                        }
                        {
                          (checkAdmin() && status === 'Undelivered')
                            ? <li><Link to={`${checkAdmin() ? '/order/edit' : '/manager_order/edit'}`} onClick={() => editHandleOrder(_id, items)} className="dropdown-item" >
                              Edit</Link>
                            </li>
                            : null
                        }

                        <li>
                          {
                            (loc.pathname === '/order' || loc.pathname === '/manager_order')
                              ? (checkAdmin() && status !== 'Delivered') ? <span onClick={() => handleStatus(items)} className="dropdown-item">Change Delivery Status</span> : ''
                              : <span onClick={() => handleOrderStatus(items)} className="dropdown-item">
                                Change Order Status
                              </span>
                          }
                        </li>

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

export default OrderTable;
