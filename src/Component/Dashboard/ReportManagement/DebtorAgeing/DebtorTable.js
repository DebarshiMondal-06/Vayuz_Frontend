import React, { useContext } from "react";
import { DebtorReport } from "./DebtorContext";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import moment from "moment";
import { ExportCSV } from "../ExcelEmport";
var $ = require("jquery");



const DebtorTable = () => {
  const { distLoading, debtor } = useContext(DebtorReport);




  var manipulate_excel = [];
  manipulate_excel = debtor.map((items) => {
    const { amount, order_id, customer, distributor, delivery_date,
      manager } = items;
    var dateFormat = moment(delivery_date).format('DD-MM-YYYY');
    var dateofvisit = moment(dateFormat, 'DD-MM-YYYY')
    var today = moment(moment(), 'DD-MM-YYYY');
    var from = today.diff(dateofvisit, 'days');

    return {
      OrderID: order_id,
      Manager: manager && manager.name,
      Distributor: distributor && distributor.name,
      Customer: customer && customer.customer_name,
      amount: amount,
      Below_2_Days: (from <= 2) ? 'YES' : null,
      Day_3_5: (from >= 3 && from <= 5) ? 'YES' : null,
      Day_6_10: (from >= 6 && from <= 10) ? 'YES' : null,
      Day_11_15: (from >= 11 && from <= 15) ? 'YES' : null,
      Day_16_30: (from >= 16 && from < 30) ? 'YES' : null,
      Above_30: (from >= 30) ? 'YES' : null,
    };
  })



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
      $("#dataTable").DataTable();
    }, 1);
  }




  return (
    <div className="row text-center">
      <div className="col-lg-12">
        <div style={{ display: 'flex', float: 'right', marginBottom: 10 }}>
          <ExportCSV csvData={manipulate_excel} fileName="Unigas_DebtorReport" />
        </div>
        <br />
        <div className="table-responsive">
          <table id="dataTable" className="mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>OrderID</th>
                <th>Manager</th>
                <th>Distributor</th>
                <th>Customer</th>
                <th>Debit</th>
                <th>Below 2days</th>
                <th>3-5 days</th>
                <th>6-10 days</th>
                <th>11-15 days</th>
                <th>16-30 days</th>
                <th>30 above</th>
              </tr>
            </thead>
            <tbody>
              {
                debtor.map((items, i) => {
                  const { amount, order_id, customer, distributor, delivery_date, manager } = items;
                  var dateFormat = moment(delivery_date).format('DD-MM-YYYY');
                  var dateofvisit = moment(dateFormat, 'DD-MM-YYYY')
                  var today = moment(moment(), 'DD-MM-YYYY');
                  var from = today.diff(dateofvisit, 'days');


                  return <tr key={i} onChange={() => console.log('heleee')}>
                    <td>{i + 1}</td>
                    <td>{order_id}</td>
                    <td>{manager && manager.name}</td>
                    <td>{distributor && distributor.name}</td>
                    <td className={`${from > 30 ? 'badge bg-danger text-white mt-3 font-weight-normal' : null}`}>
                      {customer && customer.customer_name}</td>
                    <td><b>₹</b>{amount}</td>
                    <td>
                      {from <= 2 ? <i className="fas fa-check"></i> : '--'}
                    </td>
                    <td>
                      {(from >= 3 && from <= 5) ? <i className="fas fa-check"></i> : '--'}
                    </td>
                    <td>
                      {(from >= 6 && from <= 10) ? <i className="fas fa-check"></i> : '--'}
                    </td>
                    <td>
                      {(from >= 11 && from <= 15) ? <i className="fas fa-check"></i> : '--'}
                    </td>
                    <td>
                      {(from >= 16 && from < 30) ? <i className="fas fa-check"></i> : '--'}
                    </td>
                    <td>
                      {(from >= 30) ? <i className="fas fa-check"></i> : '--'}
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
};

export default DebtorTable;
