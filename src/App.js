import React from 'react'
import { AuthContextProvider } from './Context/authContext';
import RoutesBind from './Routes/RoutesBind';
import { ToastContainer } from "react-toastify";


const App = () => {
  return <AuthContextProvider>
    <ToastContainer position='bottom-center' autoClose='2000' />
    <RoutesBind />
  </AuthContextProvider>
}

export default App;
