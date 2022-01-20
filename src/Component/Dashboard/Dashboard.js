import React from 'react'
import AppHeader from './AppHeader'
import AdminSideBar from './SideBars/AdminSideBar';
import ManagerSideBar from './SideBars/ManagerSidebar';
import Footer from './Footer';
import ManagerPath from './Paths/ManagerPath';
import AdminPath from './Paths/AdminPath';
import { useCookies } from 'react-cookie';
import SubAdminPath from './Paths/SubAdminPath';


const ManagerDashboard = () => {
  const [cookie] = useCookies();



  return <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
    <AppHeader />
    <div className="app-main">
      <div className="app-sidebar sidebar-shadow">
        {
          (cookie.authToken && (cookie.authToken.role === 'admin' || cookie.authToken.role === 'staff'))
            ? <AdminSideBar />
            : <ManagerSideBar />
        }
      </div>
      <div className="app-main__outer">
        {
          (cookie.authToken && (cookie.authToken.role === 'admin' || cookie.authToken.role === 'staff'))
            ? cookie.authToken.role === 'staff' ? <SubAdminPath /> : <AdminPath />
            : <ManagerPath />
        }
        <Footer />
      </div>
    </div>

  </div>
}

export default ManagerDashboard;
