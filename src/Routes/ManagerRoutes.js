import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { authContext } from '../Context/authContext';

const ManagerRoutes = ({ component: Comp, ...rest }) => {
  const { checkManager } = useContext(authContext);


  return <Route {...rest}
    render={() => {
      return (checkManager()) ? <Comp /> : <Redirect to='/manager/signin' />
    }}
  />
}

export default ManagerRoutes;
