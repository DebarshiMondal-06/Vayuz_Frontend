import React, { useContext } from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom';
import { authContext } from '../Context/authContext';

const SignInRoutes = ({ component: Comp, ...rest }) => {
  const loc = useLocation();
  const { checkAdmin, checkManager } = useContext(authContext);


  if (loc.pathname === '/admin/signin') {
    return <Route {...rest}
      render={() => {
        return (checkAdmin()) ? <Redirect to='/salesmanager' /> : <Comp />
      }}
    />
  }

  if (loc.pathname === '/manager/signin') {
    return <Route {...rest}
      render={() => {
        return (checkManager()) ? <Redirect to='/manager_salesexecutive' /> : <Comp />
      }}
    />
  }

  return '';
}

export default SignInRoutes;
