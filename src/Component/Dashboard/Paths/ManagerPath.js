import React from 'react'
import { useLocation } from 'react-router-dom';
import Executive from '../UserManagement/SalesExecutive/Executive';
import Distributor from '../UserManagement/Distributor/Distributor';
import Customer from '../UserManagement/Customer/Customer';
import ErrorPage from '../../ErrorPage';
import Order from '../OrderManagement/Order';
import '../../../main.css';
import Inventory from '../InventoryManagement/Inventory';
import Visit from '../VisitManagement/Visit';
import Profile from '../ProfileManagement/Profile';
import CMSPage from '../CMS/CMSPage';
import Dashboard from '../DashboardManagaement/Dashboard';
import Report from '../ReportManagement/SalesReport/Reports';
import EndCustomer from '../ReportManagement/EndCustomer/EndCustomer';
import Debtor from '../ReportManagement/DebtorAgeing/Debtor';



const ManagerPath = () => {
  const loc = useLocation();

  if (loc.pathname === '/manager_dashboard') return <Dashboard />
  if (loc.pathname === '/manager_setting') return <Dashboard />
  if (loc.pathname === '/manager_setting/delete') return <Dashboard />
  if (loc.pathname === '/manager_notifications') return <Dashboard />


  if (loc.pathname === '/manager_salesexecutive') return <Executive />
  if (loc.pathname === '/manager_salesexecutive/add') return <Executive />
  if (loc.pathname === '/manager_salesexecutive/edit') return <Executive />
  if (loc.pathname === '/manager_salesexecutive/view') return <Executive />


  if (loc.pathname === '/manager_distributor') return <Distributor />
  if (loc.pathname === '/manager_distributor/add') return <Distributor />
  if (loc.pathname === '/manager_distributor/edit') return <Distributor />
  if (loc.pathname === '/manager_distributor/view') return <Distributor />


  if (loc.pathname === '/manager_customer') return <Customer />
  if (loc.pathname === '/manager_customer/add') return <Customer />
  if (loc.pathname === '/manager_customer/edit') return <Customer />
  if (loc.pathname === '/manager_customer/view') return <Customer />


  if (loc.pathname === '/manager_order') return <Order />
  if (loc.pathname === '/manager_order_approval') return <Order />
  if (loc.pathname === '/manager_order/add') return <Order />
  if (loc.pathname === '/manager_order/edit') return <Order />
  if (loc.pathname === '/manager_order_view') return <Order />
  if (loc.pathname === '/manager_dispatch') return <Order />


  if (loc.pathname === '/manager_inventory') return <Inventory />
  if (loc.pathname === '/manager_inventory/edit') return <Inventory />
  if (loc.pathname === '/manager_inventory/view') return <Inventory />


  if (loc.pathname === '/manager_visit') return <Visit />


  if (loc.pathname === '/manager_profile') return <Profile />
  if (loc.pathname === '/manager_profile/edit') return <Profile />


  if (loc.pathname === '/manager_salesreport') return <Report />
  if (loc.pathname === '/manager_endcustomer') return <EndCustomer />
  if (loc.pathname === '/manager_debtorageing') return <Debtor />



  if (loc.pathname === '/manager_page') return <CMSPage />



  return <ErrorPage />
}

export default ManagerPath;
