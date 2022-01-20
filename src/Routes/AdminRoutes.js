import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { authContext } from '../Context/authContext';

const AdminRoutes = ({ component: Comp, ...rest }) => {
  const { checkAdmin } = useContext(authContext);


  return <Route {...rest}
    render={() => {
      return (checkAdmin()) ? <Comp /> : <Redirect to='/admin/signin' />
    }}
  />
}

export default AdminRoutes;
