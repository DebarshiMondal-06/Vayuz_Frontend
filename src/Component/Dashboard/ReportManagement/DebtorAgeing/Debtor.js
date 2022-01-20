import React, { useContext } from 'react'
import { authContext } from '../../../../Context/authContext';
import { DebtorContext } from './DebtorContext';
import DebtorTable from './DebtorTable';



const Debtor = () => {
  const { changeTitle } = useContext(authContext);
  changeTitle('Report');



  return <div className="app-main__inner">
    <div className="row mb-3">
      <div className="col-md-10">
        <h5 className="card-title">
          Debtor Ageing
        </h5>
      </div>
    </div>

    <div className="main-card mb-3 card">
      <div className="card-body">
        <DebtorContext>
          <DebtorTable />
        </DebtorContext>
      </div>
    </div>
  </div>
}

export default Debtor;
