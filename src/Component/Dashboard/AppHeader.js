import React, { useContext } from 'react';
import { ExitToApp, Notifications } from '@material-ui/icons';
import { authContext } from '../../Context/authContext';
import swal from 'sweetalert';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
// import Pusher from 'pusher-js';



const AppHeader = () => {
  const { logout, notify, checkAdmin } = useContext(authContext);
  const [cookie] = useCookies();
  const history = useHistory();


  var dataL = [];
  if (!checkAdmin()) {
    dataL = notify.filter((items) => {
      const { authToken } = cookie;
      var data;
      if (items.manager_id) {
        data = items.manager_id === authToken._id && items.manager_read === '0';
      } else {
        data = null;
      }
      return data;
    });
  } else {
    dataL = notify.filter((items) => {
      return items.admin === '1' && items.admin_read !== '1';
    });
  }




  return <div className="app-header header-shadow bg-blue">
    <div className="app-header__logo">
      <div className="logo-src"></div>
      <div className="header__pane ml-auto">
        <div>
          <button type="button" className="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
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
    <div className="app-header__content">

      <div className="app-header-right">
        <div className="header-btn-lg pr-0">
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left">
              </div>
              <div className="widget-content-right header-user-info ml-3">
                <button onClick={() => checkAdmin()
                  ? history.push('/notifications')
                  : history.push('/manager_notifications')}
                  className='btn-shadow mr-2 p-1 btn btn-info btn-sm'>
                  <Notifications />
                  {
                    dataL.length > 0 ? <span style={{
                      backgroundColor: 'red', height: 20, width: 20, top: -4, left: 16,
                      position: 'absolute', borderRadius: 20, fontSize: 11, textAlign: 'center', paddingTop: 1
                    }}>{(dataL.length > 0) ? dataL.length : ''}</span> : null
                  }
                </button>&nbsp;&nbsp;
                <button onClick={() => {
                  swal({
                    title: 'Are you sure?',
                    icon: 'warning',
                    text: 'Logout',
                    dangerMode: true,
                    buttons: true
                  })
                    .then((value) => {
                      if (value) {
                        if (cookie.authToken && cookie.authToken.role === 'admin') {
                          logout();
                        } else {
                          logout();
                        }
                      };
                    })
                }
                } type="submit"
                  className="btn-shadow p-1 btn btn-primary btn-sm">
                  <ExitToApp />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div >
}

export default AppHeader
