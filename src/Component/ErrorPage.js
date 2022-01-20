import React from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';


const ErrorPage = () => {
  const history = useHistory();
  const [cookie] = useCookies();

  if (cookie.authToken && cookie.authToken.role === 'staff') {
    return <div className='error-img p-5' style={{ height: '100%' }}>
      <h2>You have no Permissions to view this Page</h2>
      <button onClick={() => history.goBack()} className='btn btn-warning'>Go Back</button>
    </div>
  }



  return (
    <div className='error-img p-5' style={{ height: '100%' }}>
      <h2>Page Not Found!!!</h2>
      <button onClick={() => history.goBack()} className='btn btn-warning'>Go Back</button>
    </div>
  )
}

export default ErrorPage;
