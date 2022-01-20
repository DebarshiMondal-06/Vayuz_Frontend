import React, { useContext } from 'react'
import { authContext } from '../../../../Context/authContext';
import { EndCustomerReportContext } from './EndCustomerContext';
import EndCustomerReportTable from './EndCustomerTable';



const EndCustomer = () => {
  const { changeTitle } = useContext(authContext);
  changeTitle('Report');



  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title">
          End Customer Reports
        </h5>
      </div>
    </div>

    <div className="main-card mb-3 card">
      <div className="card-body">
        <EndCustomerReportContext>
          <EndCustomerReportTable />
        </EndCustomerReportContext>
      </div>
    </div>
  </div>
}

export default EndCustomer;
