import React, { useContext } from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { createContextAccount } from "./AccountContext";
import moment from "moment";
var $ = require("jquery");

const AccountTable = () => {
  const { distLoading, orders } = useContext(createContextAccount);

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
  setTimeout(() => {
    $("#mytableg").DataTable({
      responsive: true,
      orderCellsTop: false,
      bRetrieve: true,
      initComplete: function () {
        this.api()
          .columns(".select-filter")
          .every(function () {
            var column = this;
            var select = $('<select class="form-control form-control-sm col mx-3 my-2" ><option value=""></option></select>')
              .appendTo($('#test'))
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



  // *********************** Renders *************************************
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="row">
          <div className="col">Manager</div>
          <div className="col">Executive</div>
          <div className="col">Branch</div>
          <div className="col">Distributor</div>
          <div className="col">Customer</div>
        </div>
        <div className="row pb-3" id="test">
        </div>
        <div className="table-responsive">
          <table>

            <tbody>
            </tbody>
          </table>
          <table id="mytableg" className="text-center table-hover mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>OrderID</th>
                <th class="select-filter">Manager</th>
                <th class="select-filter">Executive</th>
                <th class="select-filter">Branch</th>
                <th class="select-filter">Distributor</th>
                <th class="select-filter">Customer</th>
                <th>Payment Status</th>
                <th>Payment Id</th>
                <th>Counts Days</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((items, i) => {
                var a;
                var today = moment().format('YYYY M DD');
                var delivery = moment(items.delivery_date).format('YYYY M DD');
                if (today > delivery && items.payment_status !== 'Paid') {
                  a = moment(items.delivery_date, "YYYY, M, DD").fromNow(true);
                } else {
                  a = 0;
                }

                const {
                  order_id,
                  customer,
                  executive,
                  payment_status,
                  distributor,
                  manager,
                  branch,
                  payment_id,
                } = items;
                return (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{order_id}</td>
                    <td>{manager ? manager.name : "No Data"}</td>
                    <td>{executive ? executive.name : "No Data"}</td>
                    <td>{branch ? branch.branch : "No Data"}</td>
                    <td>{distributor ? distributor.name : "No Data"}</td>
                    <td>{customer ? customer.customer_name : "No Data"}</td>
                    <td style={{ letterSpacing: "0.6px" }}>
                      <span className={`${payment_status === "Paid"
                        ? "badge light badge-success"
                        : ""}`}>
                        {payment_status}
                      </span>
                    </td>
                    <td>{payment_id.substring(0, 30)}</td>
                    <td>
                      {
                        a
                      }

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

export default AccountTable;
