/* eslint-disable array-callback-return */
import React, { useContext, useState } from "react";
import { createContextReport } from "./ReportsContext";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import moment from "moment";
import { ExportCSV } from "../ExcelEmport";
var $ = require("jquery");


const ReportTable = () => {
  const { distLoading, reports, getReports } = useContext(
    createContextReport
  );
  const [dataDate, setDataDate] = useState('month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  const handleFilter = (data) => {
    setDataDate(data);
    getReports();
  }
  var filterDate = [];
  if (startDate && endDate) {
    filterDate = reports.filter((items) => {
      var data;
      const formatedDate = moment(items.createdAt).format('YYYY-MM-DD');
      var check = moment(formatedDate).isBetween(startDate, endDate);
      if (check) {
        data = items;
      }
      return data;
    });
  } else {
    filterDate = reports;
  }


  const cylinders_data_wise = (cylinder) => {
    var sum = 0;
    cylinder.filter((el) => {
      var check = moment(el.created_on).isSame(moment(), dataDate);
      if (check) {
        sum = sum + el.quantity;
      }
    });
    return sum;
  }

  var manipulate_excel = [];
  manipulate_excel = filterDate.map((items) => {
    const { customer_created_on, cylinder_33, cylinder_17, cylinder_21 } = items;
    var data2 = [];
    customer_created_on.filter((el) => {
      var check = moment(el).isSame(moment(), dataDate);
      if (check) {
        data2.push(el);
      }
      return null;
    });
    var existing_customer = items.customer_till_date - data2.length;
    return {
      Manager: items.manager && items.manager.name,
      Executive: items.executive && items.executive.name,
      Distributor: items.distributor && items.distributor.name,
      Exisiting_outlets: existing_customer,
      New_Outlets: data2.length,
      Total_Outlets: existing_customer + data2.length,
      Cylinder_33: cylinders_data_wise(cylinder_33),
      Cylinder_17: cylinders_data_wise(cylinder_17),
      Cylinder_21: cylinders_data_wise(cylinder_21),
      Filters: dataDate ? dataDate : '--',
      StartDate: startDate ? startDate : '--',
      EndDate: endDate ? endDate : '--'
    };
  })

  var arr = [];
  var formatedMaxDate;
  if (reports && reports.length > 0) {
    reports.filter((el) => {
      el.customer_created_on.map((el) => {
        var formatD = moment(el).format('YYYY-MM-DD');
        arr.push(formatD);
      });
    })
    arr.sort();
    arr = arr.reverse();
    formatedMaxDate = arr[0];
  }




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
        <div style={{ display: 'flex', float: 'right' }}>
          <ExportCSV csvData={manipulate_excel} fileName="Unigas_ReportSales" />
        </div>
        <br />
        <div className="row mb-3">
          <div className="col-4">
            <div className="row">
              <table border="0" cellSpacing="5" cellPadding="5">
                <tbody style={{ display: 'flex' }}>
                  <tr>
                    <td>StartDate:</td>
                    <td><input value={startDate} max={formatedMaxDate} type="date" onChange={(e) => setStartDate(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td>EndDate:</td>
                    <td><input type="date" max={formatedMaxDate} value={endDate} onChange={(e) => setEndDate(e.target.value)} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', float: 'right' }} className='mb-3'>
          <span className='btn btn-info' onClick={() => handleFilter('day')}>Day</span>&nbsp;
          <span className='btn btn-secondary' onClick={() => handleFilter('week')}>Weekly</span>&nbsp;
          <span className='btn btn-warning' onClick={() => handleFilter('year')}>Yearly</span>&nbsp;
          <span className='btn btn-primary' onClick={() => window.location.reload()}>Reset</span>
        </div>
        <div></div>
        <h6 style={{ padding: '20px 0px', float: 'left', letterSpacing: 1 }}>
          <span className="badge bg-secondary text-white">
            <span className="font-weight-normal text-capitalize">You are Viewing by:</span> &nbsp;
            {dataDate}</span>
        </h6>
        <div className="table-responsive">
          <table id="dataTable" className="mb-0 table">
            <thead>
              <tr>
                <th>#</th>
                <th>Distributor</th>
                <th>Executive</th>
                <th>Manager</th>
                <th>Existing Outlets</th>
                <th>New Outlets</th>
                <th>Total Outlets</th>
                <th>Commercial 33kg</th>
                <th>Residential 22kg</th>
                <th>Commercial 17kg</th>
                <th>Total</th>

              </tr>
            </thead>
            <tbody>
              {
                filterDate.map((ele, i) => {
                  const { customer_created_on, cylinder_33, cylinder_17, cylinder_21 } = ele;
                  var data1 = [];
                  customer_created_on.filter((el) => {
                    var check = moment(el).isSame(moment(), dataDate);
                    if (check) {
                      data1.push(el);
                    }
                    return null;
                  });
                  var sum_33 = cylinders_data_wise(cylinder_33);
                  var sum_21 = cylinders_data_wise(cylinder_21);
                  var sum_17 = cylinders_data_wise(cylinder_17);


                  var existing_customer = ele.customer_till_date - data1.length;
                  return <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{ele.distributor && ele.distributor.name}</td>
                    <td>{ele.executive && ele.executive.name}</td>
                    <td>{ele.manager && ele.manager.name}</td>
                    <td>{existing_customer}</td>
                    <td>{data1.length}</td>
                    <td>{existing_customer + data1.length}</td>
                    <td>{sum_33}</td>
                    <td>{sum_21}</td>
                    <td>{sum_17}</td>
                    <td>{sum_33 + sum_17 + sum_21}</td>
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

export default ReportTable;
