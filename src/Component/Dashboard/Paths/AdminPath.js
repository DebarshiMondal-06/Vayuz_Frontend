import React from 'react'
import { useLocation } from 'react-router-dom';
import Area from '../MasterSetting/Area/Area';
import Branch from '../MasterSetting/Branch/Branch';
import City from '../MasterSetting/City/City';
import District from '../MasterSetting/District/District';
import State from '../MasterSetting/State/State';
import Beat from '../MasterSetting/Beat/Beat';
import SalesManager from '../UserManagement/SalesManager/SalesManager';
import Executive from '../UserManagement/SalesExecutive/Executive';
import Distributor from '../UserManagement/Distributor/Distributor';
import Customer from '../UserManagement/Customer/Customer';
import ErrorPage from '../../ErrorPage';
import Order from '../OrderManagement/Order';
import Stock from '../MasterSetting/Stock/Stock';
import Rate from '../MasterSetting/Rates/Rate';
import Account from '../AccountManagement/Account';
import Inventory from '../InventoryManagement/Inventory'
import Visit from '../VisitManagement/Visit';
import SubAdmin from '../UserManagement/SubAdmin/SubAdmin';
import Feedback from '../FeedbackManagement/Feedback';
import Viewpages from '../CMS/Viewpages';
import Dashboard from '../DashboardManagaement/Dashboard';
import CMSPage from '../CMS/CMSPage';
import Report from '../ReportManagement/SalesReport/Reports';
import EndCustomer from '../ReportManagement/EndCustomer/EndCustomer';
import Debtor from '../ReportManagement/DebtorAgeing/Debtor';


const AdminPath = () => {
  const loc = useLocation();

  if (loc.pathname === '/dashboard') return <Dashboard />
  if (loc.pathname === '/notifications') return <Dashboard />
  if (loc.pathname === '/setting') return <Dashboard />
  if (loc.pathname === '/setting/delete') return <Dashboard />


  if (loc.pathname === '/district') return <District />
  if (loc.pathname === '/district/add-district') return <District />
  if (loc.pathname === '/district/edit-district') return <District />

  if (loc.pathname === '/city') return <City />
  if (loc.pathname === '/city/add-city') return <City />
  if (loc.pathname === '/city/edit-city') return <City />

  if (loc.pathname === '/state') return <State />
  if (loc.pathname === '/state/add-state') return <State />
  if (loc.pathname === '/state/edit-state') return <State />

  if (loc.pathname === '/branch') return <Branch />
  if (loc.pathname === '/branch/add-branch') return <Branch />
  if (loc.pathname === '/branch/edit-branch') return <Branch />

  if (loc.pathname === '/area') return <Area />
  if (loc.pathname === '/area/edit') return <Area />
  if (loc.pathname === '/area/add') return <Area />

  if (loc.pathname === '/beat') return <Beat />
  if (loc.pathname === '/beat/add') return <Beat />
  if (loc.pathname === '/beat/edit') return <Beat />

  if (loc.pathname === '/stock') return <Stock />
  if (loc.pathname === '/stock/add') return <Stock />
  if (loc.pathname === '/stock/edit') return <Stock />

  if (loc.pathname === '/rate') return <Rate />
  if (loc.pathname === '/rate/add') return <Rate />
  if (loc.pathname === '/rate/edit') return <Rate />

  if (loc.pathname === '/subadmin') return <SubAdmin />
  if (loc.pathname === '/subadmin/add') return <SubAdmin />
  if (loc.pathname === '/subadmin/edit') return <SubAdmin />
  if (loc.pathname === '/subadmin/view') return <SubAdmin />


  if (loc.pathname === '/salesmanager') return <SalesManager />
  if (loc.pathname === '/salesmanager/add') return <SalesManager />
  if (loc.pathname === '/salesmanager/edit') return <SalesManager />
  if (loc.pathname === '/salesmanager/view') return <SalesManager />


  if (loc.pathname === '/salesexecutive') return <Executive />
  if (loc.pathname === '/salesexecutive/add') return <Executive />
  if (loc.pathname === '/salesexecutive/edit') return <Executive />
  if (loc.pathname === '/salesexecutive/view') return <Executive />


  if (loc.pathname === '/distributor') return <Distributor />
  if (loc.pathname === '/distributor/add') return <Distributor />
  if (loc.pathname === '/distributor/edit') return <Distributor />
  if (loc.pathname === '/distributor/view') return <Distributor />


  if (loc.pathname === '/customer') return <Customer />
  if (loc.pathname === '/customer/add') return <Customer />
  if (loc.pathname === '/customer/edit') return <Customer />
  if (loc.pathname === '/customer/view') return <Customer />


  if (loc.pathname === '/order') return <Order />
  if (loc.pathname === '/order/add') return <Order />
  if (loc.pathname === '/order/edit') return <Order />
  if (loc.pathname === '/order_approval') return <Order />
  if (loc.pathname === '/order_view') return <Order />
  if (loc.pathname === '/dispatch') return <Order />
  if (loc.pathname === '/dispatch/add') return <Order />


  if (loc.pathname === '/inventory') return <Inventory />
  if (loc.pathname === '/inventory/add') return <Inventory />
  if (loc.pathname === '/inventory/edit') return <Inventory />
  if (loc.pathname === '/inventory/view') return <Inventory />


  if (loc.pathname === '/accounts') return <Account />


  if (loc.pathname === '/visits') return <Visit />
  if (loc.pathname === '/visits/view') return <Visit />


  if (loc.pathname === '/feedback') return <Feedback />

  if (loc.pathname === '/cms') return <Viewpages />
  if (loc.pathname === '/cms/add') return <Viewpages />
  if (loc.pathname === '/cms/edit') return <Viewpages />


  if (loc.pathname === '/sales_reports') return <Report />
  if (loc.pathname === '/end_customer_reports') return <EndCustomer />
  if (loc.pathname === '/debtor_ageing') return <Debtor />


  if (loc.pathname === '/page') return <CMSPage />






  return <ErrorPage />
}

export default AdminPath;
