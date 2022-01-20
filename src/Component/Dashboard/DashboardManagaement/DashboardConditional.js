import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { authContext } from '../../../Context/authContext';
import DeleteAccount from './DeleteAccount';
import Notifications from './Notifications';
import Setting from './Setting';
import ViewDashboard from './ViewDashboard';


const DashboardConditional = () => {
  const loc = useLocation();
  const { setChangeText } = useContext(authContext);

  if (loc.pathname === '/notifications') {
    setChangeText('Notifications')
    return <Notifications />
  }
  if (loc.pathname === '/manager_notifications') {
    setChangeText('Notifications')
    return <Notifications />
  }
  if (loc.pathname === '/setting') {
    setChangeText('Setting')
    return <Setting />
  }
  if (loc.pathname === '/setting/delete') {
    setChangeText('Delete Account')
    return <DeleteAccount />
  }
  if (loc.pathname === '/manager_setting') {
    setChangeText('Setting')
    return <Setting />
  }
  if (loc.pathname === '/manager_setting/delete') {
    setChangeText('Delete Account')
    return <DeleteAccount />
  }

  return <ViewDashboard>
    {setChangeText('Dashboard')}
  </ViewDashboard>
}

export default DashboardConditional;
