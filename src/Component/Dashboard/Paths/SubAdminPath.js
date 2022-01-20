import React from 'react'
import { useLocation } from 'react-router-dom';
import Executive from '../UserManagement/SalesExecutive/Executive';
import Distributor from '../UserManagement/Distributor/Distributor';
import Customer from '../UserManagement/Customer/Customer';
import ErrorPage from '../../ErrorPage';
import Order from '../OrderManagement/Order';
import Inventory from '../InventoryManagement/Inventory';
import Visit from '../VisitManagement/Visit';
import { useCookies } from 'react-cookie';
import SalesManager from '../UserManagement/SalesManager/SalesManager';
import State from '../MasterSetting/State/State';
import Area from '../MasterSetting/Area/Area';
import Branch from '../MasterSetting/Branch/Branch';
import City from '../MasterSetting/City/City';
import District from '../MasterSetting/District/District';
import Beat from '../MasterSetting/Beat/Beat';
import Stock from '../MasterSetting/Stock/Stock';
import Account from '../AccountManagement/Account';
import CMSPage from '../CMS/CMSPage';


const SubAdminPath = () => {
  const loc = useLocation();
  const [cookie] = useCookies();


  if (cookie.authToken && cookie.authToken.staff_roles.includes('Distributor')) {
    if (loc.pathname === '/distributor') return <Distributor />
    if (loc.pathname === '/distributor/add') return <Distributor />
    if (loc.pathname === '/distributor/edit') return <Distributor />
  }

  if (cookie.authToken && cookie.authToken.staff_roles.includes('Sales Manager')) {
    if (loc.pathname === '/salesmanager') return <SalesManager />
    if (loc.pathname === '/salesmanager/add') return <SalesManager />
    if (loc.pathname === '/salesmanager/edit') return <SalesManager />
  }

  if (cookie.authToken && cookie.authToken.staff_roles.includes('Sales Executive')) {
    if (loc.pathname === '/salesexecutive') return <Executive />
    if (loc.pathname === '/salesexecutive/add') return <Executive />
    if (loc.pathname === '/salesexecutive/edit') return <Executive />
  }

  if (cookie.authToken && cookie.authToken.staff_roles.includes('Customer')) {
    if (loc.pathname === '/customer') return <Customer />
    if (loc.pathname === '/customer/add') return <Customer />
    if (loc.pathname === '/customer/edit') return <Customer />
  }

  if (cookie.authToken && cookie.authToken.staff_roles.includes('District')) {
    if (loc.pathname === '/district') return <District />
    if (loc.pathname === '/district/add-district') return <District />
    if (loc.pathname === '/district/edit-district') return <District />
  }

  if (cookie.authToken && cookie.authToken.staff_roles.includes('City')) {
    if (loc.pathname === '/city') return <City />
    if (loc.pathname === '/city/add-city') return <City />
    if (loc.pathname === '/city/edit-city') return <City />
  }

  if (cookie.authToken && cookie.authToken.staff_roles.includes('State')) {
    if (loc.pathname === '/state') return <State />
    if (loc.pathname === '/state/add-state') return <State />
    if (loc.pathname === '/state/edit-state') return <State />
  }

  if (cookie.authToken && cookie.authToken.staff_roles.includes('Branch')) {
    if (loc.pathname === '/branch') return <Branch />
    if (loc.pathname === '/branch/add-branch') return <Branch />
    if (loc.pathname === '/branch/edit-branch') return <Branch />
  }

  if (cookie.authToken && cookie.authToken.staff_roles.includes('Area')) {
    if (loc.pathname === '/area') return <Area />
    if (loc.pathname === '/area/edit') return <Area />
    if (loc.pathname === '/area/add') return <Area />
  }

  if (cookie.authToken && cookie.authToken.staff_roles.includes('Beat')) {
    if (loc.pathname === '/beat') return <Beat />
    if (loc.pathname === '/beat/add') return <Beat />
    if (loc.pathname === '/beat/edit') return <Beat />
  }

  if (cookie.authToken && cookie.authToken.staff_roles.includes('Stock')) {
    if (loc.pathname === '/stock') return <Stock />
    if (loc.pathname === '/stock/add') return <Stock />
    if (loc.pathname === '/stock/edit') return <Stock />
  }

  if (cookie.authToken && cookie.authToken.staff_roles.includes('Order')) {
    if (loc.pathname === '/order') return <Order />
    if (loc.pathname === '/order/add') return <Order />
    if (loc.pathname === '/order/edit') return <Order />
    if (loc.pathname === '/order_approval') return <Order />
    if (loc.pathname === '/order_view') return <Order />
  }

  if (cookie.authToken && cookie.authToken.staff_roles.includes('Inventory')) {
    if (loc.pathname === '/inventory') return <Inventory />
    if (loc.pathname === '/inventory/add') return <Inventory />
    if (loc.pathname === '/inventory/edit') return <Inventory />
  }

  if (cookie.authToken && cookie.authToken.staff_roles.includes('Account')) {
    if (loc.pathname === '/accounts') return <Account />
  }

  if (cookie.authToken && cookie.authToken.staff_roles.includes('Visit')) {
    if (loc.pathname === '/visits') return <Visit />
  }

  if (loc.pathname === '/page') return <CMSPage />


  return <ErrorPage />
}

export default SubAdminPath;
