import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { authContext } from '../../../Context/authContext';



const ManagerSideBar = () => {
  const { data } = useContext(authContext);
  const sidebarManage = (text, path) => {
    return <NavLink activeClassName='bg-light text-dark' to={path}>
      <i className="metismenu-icon"></i>
      {text}
    </NavLink>
  }



  return <div className="app-sidebar sidebar-shadow">
    <div className="app-header__logo">
      <div className="logo-src"></div>
      <div className="header__pane ml-auto">
        <div>
          <button type="button" className="hamburger close-sidebar-btn hamburger--elastic"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
    <div className="app-header__mobile-menu">
      <div>
        <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
    <div className="app-header__menu">
      <span>
        <button type="button"
          className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
          <span className="btn-icon-wrapper">
            <i className="fa fa-ellipsis-v fa-w-6"></i>
          </span>
        </button>
      </span>
    </div>
    <div className="scrollbar-sidebar">
      <div className="app-sidebar__inner">
        <ul className="vertical-nav-menu">
          <li className="app-sidebar__heading">
            {data ? data.name : ''}
          </li>
          <li>
            <NavLink to='/manager_dashboard'>
              <i className="metismenu-icon pe-7s-graph3"></i>
                Dashboard
              <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
            </NavLink>
            <ul>
              <li>{sidebarManage('View Dashboard', '/manager_dashboard')}</li>
              <li>{sidebarManage('Setting', '/manager_setting')}</li>
            </ul>
          </li>

          <li>
            <NavLink to='/manager_salesexecutive'>
              <i className="metismenu-icon pe-7s-add-user"></i>
                User Managment
              <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
            </NavLink>
            <ul>
              <li>{sidebarManage('Sales Executive', '/manager_salesexecutive')}</li>
              <li>{sidebarManage('Distributor', '/manager_distributor')}</li>
              <li>{sidebarManage('Customer', '/manager_customer')}</li>
            </ul>
          </li>


          <li>
            <NavLink to='/manager_order' type='button'>
              <i className="metismenu-icon pe-7s-cart"></i>
                   Order Managment
                 <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
            </NavLink>
            <ul>
              <li>{sidebarManage('Orders', '/manager_order')}</li>
              <li>{sidebarManage('Orders Approval', '/manager_order_approval')}</li>
            </ul>
          </li>

          <li>
            <NavLink to='/manager_inventory' type='button'>
              <i className="metismenu-icon pe-7s-box1"></i>
                   Inventory Managment
                 <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
            </NavLink>
            <ul>
              <li>{sidebarManage('Inventory', '/manager_inventory')}</li>
            </ul>
          </li>

          <li>
            <NavLink to='/manager_visit' type='button'>
              <i className="metismenu-icon pe-7s-map-marker"></i>
                   Visit Managment
                 <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
            </NavLink>
            <ul>
              <li>{sidebarManage('Visit', '/manager_visit')}</li>
            </ul>
          </li>

          <li>
            <NavLink to='/manager_profile' type='button'>
              <i className="metismenu-icon pe-7s-user"></i>
                   Profile Managment
                 <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
            </NavLink>
            <ul>
              <li>{sidebarManage('Profile', '/manager_profile')}</li>
            </ul>
          </li>


          <li>
            <NavLink to='/manager_salesreport' type='button'>
              <i className="metismenu-icon pe-7s-user"></i>
                   Report Managment
                 <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
            </NavLink>
            <ul>
              <li>{sidebarManage('Sales Report', '/manager_salesreport')}</li>
              <li>{sidebarManage('End Customer', '/manager_endcustomer')}</li>
              <li>{sidebarManage('Dentor Ageing', '/manager_debtorageing')}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div >
}

export default ManagerSideBar;
