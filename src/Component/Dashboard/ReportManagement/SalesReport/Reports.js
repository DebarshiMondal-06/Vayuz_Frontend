import React, { useContext } from 'react'
import { authContext } from '../../../../Context/authContext';
import { ReportContext } from './ReportsContext';
import ReportTable from './ReportTable';



const Reports = () => {
  const { changeTitle } = useContext(authContext);
  changeTitle('Report');



  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title">
          Sales Reports
        </h5>
      </div>
    </div>

    <div className="main-card mb-3 card">
      <div className="card-body">
        <ReportContext>
          <ReportTable />
        </ReportContext>
      </div>
    </div>
  </div>
}

export default Reports;
