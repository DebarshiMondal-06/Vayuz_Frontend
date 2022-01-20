import React from 'react';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom'


const SideBar = () => {
  const [cookie] = useCookies();

  const sidebarManage = (text, path) => {
    return <NavLink activeClassName='bg-light text-dark' to={path}>
      <i className="metismenu-icon"></i>
      {text}
    </NavLink>
  }
  const sideBarDropdown = (text, icon) => {
    return <a href='#!'>
      <i className={`metismenu-icon ${icon}`}></i>
      {text}
      <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
    </a >
  };




  const checkContentUser = () => {
    var content1 = ['Sales Manager', 'Distributor', "Executive"];
    var test1 = content1.some((items) => cookie.authToken.staff_roles.includes(items));
    if (test1) {
      return sideBarDropdown('User Management');
    }
  }
  const checkContentMaster = () => {
    var content2 = ['State', 'City', 'Branch', 'Stock', 'Beat', 'District', "Area"];
    var test2 = content2.some((items) => cookie.authToken.staff_roles.includes(items));
    if (test2) {
      return sideBarDropdown('Master Setting');
    }
  }
  const checkContentOrder = () => {
    var content3 = ['Order'];
    var test3 = content3.some((items) => cookie.authToken.staff_roles.includes(items));
    if (test3) {
      return sideBarDropdown('Order Management');
    }
  }
  const checkContentInventory = () => {
    var content4 = ['Inventory'];
    var test4 = content4.some((items) => cookie.authToken.staff_roles.includes(items));
    if (test4) {
      return sideBarDropdown('Inventory Management');
    }
  }
  const checkContentAccount = () => {
    var content5 = ['Account'];
    var test5 = content5.some((items) => cookie.authToken.staff_roles.includes(items));
    if (test5) {
      return sideBarDropdown('Visit Management');
    }
  }
  const checkContentVisit = () => {
    var content6 = ['Visit'];
    var test6 = content6.some((items) => cookie.authToken.staff_roles.includes(items));
    if (test6) {
      return sideBarDropdown('Visit Management');
    }
  }
  const checkContentFeedback = () => {
    var content7 = ['Feedback'];
    var test6 = content7.some((items) => cookie.authToken.staff_roles.includes(items));
    if (test6) {
      return sideBarDropdown('Feedback Management');
    }
  }

  const checkContentCMS = () => {
    var content8 = ['CMS'];
    var test6 = content8.some((items) => cookie.authToken.staff_roles.includes(items));
    if (test6) {
      return sideBarDropdown('CMS Management');
    }
  }

  const checkContentDashboard = () => {
    var content8 = ['Dashboard'];
    var test6 = content8.some((items) => cookie.authToken.staff_roles.includes(items));
    if (test6) {
      return sideBarDropdown('Dashboard Management');
    }
  }

  const checkContentReports = () => {
    var content8 = ['Reports'];
    var test6 = content8.some((items) => cookie.authToken.staff_roles.includes(items));
    if (test6) {
      return sideBarDropdown('Reports Management');
    }
  }



  return <div className="app-sidebar sidebar-shadow">
    <div className="app-header__logo">
      <div className="logo-src"></div>
      <div className="header__pane ml-auto">
        <div>
          <button type="button" className="hamburger close-sidebar-btn hamburger--elastic">
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
            {cookie.authToken && cookie.authToken.role === 'admin' ? 'Admin' : <p>SubAdmin:&nbsp;
              <span className='badge bg-dark text-white'>{cookie.authToken && cookie.authToken.admin_name}</span>
            </p>}
          </li>
          <li>
            {
              (cookie.authToken && cookie.authToken.role === 'staff')
                ? checkContentDashboard()
                : sideBarDropdown('Dashboard', 'pe-7s-display2')
            }
            <ul>
              <li>{sidebarManage('View Dashboard', '/dashboard')}</li>
              <li>{sidebarManage('Settings', '/setting')}</li>
            </ul>
          </li>
          <li>
            {
              (cookie.authToken && cookie.authToken.role === 'staff')
                ? checkContentUser()
                : sideBarDropdown('User Management', 'pe-7s-users')
            }
            {
              (cookie.authToken && cookie.authToken.role === 'staff')
                ?
                <ul>
                  {cookie.authToken.staff_roles.includes('Sales Manager')
                    ? <li>{sidebarManage('Sales Manager', '/salesmanager')}</li>
                    : ''}
                  {cookie.authToken.staff_roles.includes('Sales Executive')
                    ? <li>{sidebarManage('Sales Executive', '/salesexecutive')}</li>
                    : ''}
                  {cookie.authToken.staff_roles.includes('Customer')
                    ? <li>{sidebarManage('Customer', '/customer')}</li>
                    : ''}
                  {cookie.authToken.staff_roles.includes('Distributor')
                    ? <li>{sidebarManage('Distributor', '/distributor')}</li>
                    : ''}
                </ul>
                : <ul>
                  <li>{sidebarManage('Sub Admin', '/subadmin')}</li>
                  <li>{sidebarManage('Sales Manager', '/salesmanager')}</li>
                  <li>{sidebarManage('Sales Executive', '/salesexecutive')}</li>
                  <li>{sidebarManage('Distributor', '/distributor')}</li>
                  <li>{sidebarManage('Customer', '/customer')}</li>
                </ul>
            }
          </li>


          <li>
            {
              (cookie.authToken && cookie.authToken.role === 'staff')
                ? checkContentMaster()
                : sideBarDropdown('Master Settings', 'pe-7s-settings')
            }
            {(cookie.authToken && cookie.authToken.role === 'staff')
              ? <ul>
                {cookie.authToken.staff_roles.includes('State')
                  ? <li>{sidebarManage('State', '/state')}</li>
                  : ''}
                {cookie.authToken.staff_roles.includes('District')
                  ? <li>{sidebarManage('District', '/district')}</li>
                  : ''}
                {cookie.authToken.staff_roles.includes('City')
                  ? <li>{sidebarManage('City', '/city')}</li>
                  : ''}
                {cookie.authToken.staff_roles.includes('Branch')
                  ? <li>{sidebarManage('Branch', '/branch')}</li>
                  : ''}
                {cookie.authToken.staff_roles.includes('Area')
                  ? <li>{sidebarManage('Area', '/area')}</li>
                  : ''}
                {cookie.authToken.staff_roles.includes('Beat')
                  ? <li>{sidebarManage('Beat', '/beat')}</li>
                  : ''}
                {cookie.authToken.staff_roles.includes('Stock')
                  ? <li>{sidebarManage('Stock', '/stock')}</li>
                  : ''}
              </ul>
              : <ul>
                <li>{sidebarManage('State', '/state')}</li>
                <li>{sidebarManage('District', '/district')}</li>
                <li>{sidebarManage('City', '/city')}</li>
                <li>{sidebarManage('Branch', '/branch')}</li>
                <li>{sidebarManage('Area', '/area')}</li>
                <li>{sidebarManage('Beat', '/beat')}</li>
                <li>{sidebarManage('Stock', '/stock')}</li>
                <li>{sidebarManage('Rate', '/rate')}</li>
              </ul>}
          </li>


          <div>
            <li>
              {
                (cookie.authToken && cookie.authToken.role === 'staff')
                  ? checkContentOrder()
                  : sideBarDropdown('Order Management', 'pe-7s-cart')
              }
              {
                (cookie.authToken && cookie.authToken.role === 'staff')
                  ?
                  <ul>
                    {cookie.authToken.staff_roles.includes('Order')
                      ? <li>{sidebarManage('Order', '/order')}</li>
                      : ''}
                    {cookie.authToken.staff_roles.includes('Order')
                      ? <li>{sidebarManage('Order Approvals', '/order_approval')}</li>
                      : ''}
                  </ul>
                  : <ul>
                    <li>{sidebarManage('Orders', '/order')}</li>
                    <li>{sidebarManage('Orders Approvals', '/order_approval')}</li>
                  </ul>
              }
            </li>

            <li>
              {
                (cookie.authToken && cookie.authToken.role === 'staff')
                  ? checkContentInventory()
                  : sideBarDropdown('Inventory Management', 'pe-7s-note2')
              }
              <ul>
                <li>{sidebarManage('Inventory', '/inventory')}</li>
              </ul>
            </li>


            <li>
              {
                (cookie.authToken && cookie.authToken.role === 'staff')
                  ? checkContentAccount()
                  : sideBarDropdown('Accounts Management', 'pe-7s-calculator')
              }
              <ul>
                <li>{sidebarManage('Accounts', '/accounts')}</li>
              </ul>
            </li>


            <li>
              {
                (cookie.authToken && cookie.authToken.role === 'staff')
                  ? checkContentVisit()
                  : sideBarDropdown('Visit Management', 'pe-7s-map')
              }
              <ul>
                <li>{sidebarManage('View Visits', '/visits')}</li>
              </ul>
            </li>

            <li>
              {
                (cookie.authToken && cookie.authToken.role === 'staff')
                  ? checkContentFeedback()
                  : sideBarDropdown('Feedback Management', 'pe-7s-note')
              }
              <ul>
                <li>{sidebarManage('View Feedbacks', '/feedback')}</li>
              </ul>
            </li>

            <li>
              {
                (cookie.authToken && cookie.authToken.role === 'staff')
                  ? checkContentCMS()
                  : sideBarDropdown('CMS Management', 'pe-7s-rocket')
              }
              <ul>
                <li>{sidebarManage('View CMS', '/cms')}</li>
              </ul>
            </li>
            <li>
              {
                (cookie.authToken && cookie.authToken.role === 'staff')
                  ? checkContentReports()
                  : sideBarDropdown('Report Management', 'pe-7s-copy-file')
              }
              <ul>
                <li>{sidebarManage('Sales Reports', '/sales_reports')}</li>
                <li>{sidebarManage('End Customer Reports', '/end_customer_reports')}</li>
                <li>{sidebarManage('Debtor Ageing', '/debtor_ageing')}</li>
              </ul>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div >
}

export default SideBar;
