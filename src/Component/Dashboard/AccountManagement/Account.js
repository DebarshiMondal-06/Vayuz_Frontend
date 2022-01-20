import React, { useContext } from "react";
import { authContext } from "../../../Context/authContext";
import { AccountContext } from "./AccountContext";
import AccountTable from "./AccountTable";

const Account = () => {
  const { changeTitle } = useContext(authContext);
  changeTitle("Accounts");

  return (
    <div className="app-main__inner">
      <div className="row mb-3">
        <div className="col-md-10">
          <h5 className="card-title">Accounts</h5>
        </div>
      </div>
        <div className="main-card mb-3 card">
          <div className="card-body">
            <AccountContext>
              <AccountTable />
            </AccountContext>
          </div>
        </div>
      </div>
  );
};

export default Account;
