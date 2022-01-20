/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import Pusher from 'pusher-js';




const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const loc = useLocation();
  const [cookie, setCookie, removeCookie] = useCookies([]);
  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
  const [token] = useState({
    role: cookie.authToken && cookie.authToken.role,
    ID: cookie.authToken && cookie.authToken.token
  });
  const [result, setResult] = useState({
    successMsg: false,
    errorMsg: false,
  });
  const [changeText, setChangeText] = useState('');
  const [notify, setNotify] = useState([]);

  
  const getSignIn = async (data) => {
    return await new Promise((res, rej) => {
      const url = (loc.pathname === '/admin/signin')
        ? `${process.env.REACT_APP_URL}/auth/sign-in`
        : `${process.env.REACT_APP_URL}/auth/login`
      axios({
        method: 'post',
        url,
        data
      }).then((el) => {
        setCookie('authToken', el.data, { maxAge: 3600, path: '/' });
        res(el);
      }).catch(err => {
        if (err.response) rej(err.response.data.message)
        else rej('Something went Wrong!!!');
      });
    });
  };


  // ****************8 checking User State **************************
  const checkAdmin = () => {
    if (cookie.authToken && (cookie.authToken.role === 'staff' || cookie.authToken.role === 'admin')) {
      return true;
    } else {
      // removeCookie('authToken')
      return false;
    }
  }
  const checkManager = () => {
    if (cookie.authToken && cookie.authToken.role === 'manager') {
      return true;
    } else {
      // removeCookie('authToken');
      return false;
    }
  }


  const getCurrentManager = () => {
    if (cookie.authToken && !checkAdmin()) {
      const ID = cookie.authToken._id;
      axios({
        method: 'get',
        url: `${process.env.REACT_APP_URL}/users/salesmanager?id=${ID}&role=${token.role}`,
        headers: {
          'Authorization': `Bearer ${token.ID}`
        }
      }).then((el) => {
        setloading(false);
        setData(el.data.result);
      });
    }
  }
  useEffect(() => {
    getCurrentManager();
    // eslint-disable-next-line
  }, []);




  //*********************  GET Notifications ******************************** */
  const getNotification = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/feedback/get_all_notify`,
      headers: {
        'Authorization': `Bearer ${token.ID}`
      }
    }).then((el) => {
      setNotify(el.data.getNotifications);
    })
  }
  useEffect(() => {
    getNotification();
  }, []);

  // ********************* Pusher for Reactvity ************************
  var pusher = new Pusher('e4cc26ec9a7880133d57', {
    cluster: 'ap2'
  });
  var channel = pusher.subscribe("notify-channel");
  channel.bind('my-event', function () {
    getNotification();
    pusher.disconnect();
  });




  // *************** Logout *********************
  const logout = () => {
    setTimeout(() => {
      window.location.href = checkAdmin() ? '/admin/signin' : '/manager/signin';
      removeCookie("authToken", {
        path: '/'
      });
    }, 2000);
  };

  const changeTitle = (val) => {
    document.title = val;
  }



  return <authContext.Provider value={{
    token,
    changeTitle,
    getSignIn,
    setResult,
    result,
    checkAdmin,
    checkManager,
    cookie,
    logout,
    loading,
    data,
    getCurrentManager,
    changeText,
    setChangeText,
    notify,
    getNotification
  }}>
    {children}
  </authContext.Provider>
};

export { authContext, AuthContextProvider };
