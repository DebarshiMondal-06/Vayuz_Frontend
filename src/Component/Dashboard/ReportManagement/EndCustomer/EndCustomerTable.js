import React, { useContext } from "react";
import { createContextEndCustomerReport } from "./EndCustomerContext";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { ExportCSV } from "../ExcelEmport";
var $ = require("jquery");



const EndCustomerTable = () => {
  const { distLoading, reports, } = useContext(createContextEndCustomerReport);



  var manipulate_excel = [];
  manipulate_excel = reports.map((items) => {
    const { customer, invoice, total_collection, total_discount, total_pending,
      cylinder_33, cylinder_17, cylinder_21 } = items;
    const { manager, executive, distributor } = customer || {};

    return {
      Manager: manager && manager.name,
      Executive: executive && executive.name,
      Distributor: distributor && distributor.name,
      Invoice: invoice,
      TotalCollection: total_collection,
      TotalPending: total_pending,
      TotalDiscount: total_discount,
      Cylinder_33: cylinder_33,
      Cylinder_17: cylinder_17,
      Cylinder_21: cylinder_21,
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
          <ExportCSV csvData={manipulate_excel} fileName="Unigas_EndCustomer_Report" />
        </div>
        <br />
        <div className="table-responsive">
          <table id="dataTable" className="mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Distributor</th>
                <th>Executive</th>
                <th>Manager</th>
                <th>Invoice</th>
                <th>Collection</th>
                <th>Pending</th>
                <th>Discount</th>
                <th>Commercial 33kg</th>
                <th>Residential 22kg</th>
                <th>Commercial 17kg</th>

              </tr>
            </thead>
            <tbody>
              {
                reports.map((ele, i) => {
                  const { customer, invoice, total_collection, total_discount, total_pending,
                    cylinder_33, cylinder_17, cylinder_21 } = ele;
                  const { manager, executive, distributor } = customer || {};

                  return <tr key={i}>
                    <th>{i + 1}</th>
                    <td style={{ width: '200px' }}>{customer ? customer.customer_name : 'No Data'}</td>
                    <td>{distributor ? distributor.name : 'No Data'}</td>
                    <td>{executive ? executive.name : 'No Data'}</td>
                    <td>{manager ? manager.name : 'No Data'}</td>
                    <td>{invoice}</td>
                    <td>{total_collection}</td>
                    <td>{total_pending}</td>
                    <td>{total_discount}</td>
                    <td>{cylinder_33}</td>
                    <td>{cylinder_21}</td>
                    <td>{cylinder_17}</td>
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

export default EndCustomerTable;
