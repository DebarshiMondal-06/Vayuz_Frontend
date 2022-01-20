import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../Component/Dashboard/Dashboard';
import ErrorPage from '../Component/ErrorPage';
import Forgot from '../Component/ForgotPassword/Forgot';
import Reset from '../Component/ForgotPassword/Reset';
import SignIn from '../Component/SignIn/SignIn';
import AdminRoutes from './AdminRoutes';
import ManagerRoutes from './ManagerRoutes';
import SignInRoutes from './SignInRoutes';


const RoutesBind = () => {
  return <Switch>
    {/* *************** Admin Routers ********************************  */}
    <SignInRoutes exact path='/admin/signin' component={SignIn} />
    <AdminRoutes path='/dashboard' component={Dashboard} />
    <AdminRoutes path='/district' component={Dashboard} />
    <AdminRoutes path='/city' component={Dashboard} />
    <AdminRoutes path='/state' component={Dashboard} />
    <AdminRoutes path='/branch' component={Dashboard} />
    <AdminRoutes path='/area' component={Dashboard} />
    <AdminRoutes path='/beat' component={Dashboard} />
    <AdminRoutes path='/stock' component={Dashboard} />
    <AdminRoutes path='/rate' component={Dashboard} />
    <AdminRoutes path='/subadmin' component={Dashboard} />
    <AdminRoutes path='/salesmanager' component={Dashboard} />
    <AdminRoutes path='/salesexecutive' component={Dashboard} />
    <AdminRoutes path='/distributor' component={Dashboard} />
    <AdminRoutes path='/customer' component={Dashboard} />
    <AdminRoutes path='/order' component={Dashboard} />
    <AdminRoutes path='/dispatch' component={Dashboard} />
    <AdminRoutes path='/inventory' component={Dashboard} />
    <AdminRoutes path='/order_approval' component={Dashboard} />
    <AdminRoutes path='/order_view' component={Dashboard} />
    <AdminRoutes path='/accounts' component={Dashboard} />
    <AdminRoutes path='/visits' component={Dashboard} />
    <AdminRoutes path='/feedback' component={Dashboard} />
    <AdminRoutes path='/cms' component={Dashboard} />
    <AdminRoutes path='/page*' component={Dashboard} />
    <AdminRoutes path='/setting' component={Dashboard} />
    <AdminRoutes path='/notifications' component={Dashboard} />
    <AdminRoutes path='/sales_reports' component={Dashboard} />
    <AdminRoutes path='/end_customer_reports' component={Dashboard} />
    <AdminRoutes path='/debtor_ageing' component={Dashboard} />




    {/* ******************* Manager Routes ********************************* */}
    <SignInRoutes exact path='/manager/signin' component={SignIn} />
    <ManagerRoutes path='/manager_salesexecutive' component={Dashboard} />
    <ManagerRoutes path='/manager_dashboard' component={Dashboard} />
    <ManagerRoutes path='/manager_setting' component={Dashboard} />
    <ManagerRoutes path='/manager_notifications' component={Dashboard} />
    <ManagerRoutes path='/manager_distributor' component={Dashboard} />
    <ManagerRoutes path='/manager_customer' component={Dashboard} />
    <ManagerRoutes path='/manager_order' component={Dashboard} />
    <ManagerRoutes path='/manager_order_approval' component={Dashboard} />
    <ManagerRoutes path='/manager_dispatch' component={Dashboard} />
    <ManagerRoutes path='/manager_order_view' component={Dashboard} />
    <ManagerRoutes path='/manager_inventory' component={Dashboard} />
    <ManagerRoutes path='/manager_visit' component={Dashboard} />
    <ManagerRoutes path='/manager_profile' component={Dashboard} />
    <ManagerRoutes path='/manager_salesreport' component={Dashboard} />
    <ManagerRoutes path='/manager_endcustomer' component={Dashboard} />
    <ManagerRoutes path='/manager_debtorageing' component={Dashboard} />

    <ManagerRoutes path='/manager_page*' component={Dashboard} />



    <Route exact path='/forgotpassword' component={Forgot} />
    <Route path='/resetpassword' component={Reset} />
    <Route path='*' component={ErrorPage} />
  </Switch>
};

export default RoutesBind;



