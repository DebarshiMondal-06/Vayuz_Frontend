import axios from 'axios';
import moment from 'moment';
import React, { useContext } from 'react'
import { useCookies } from 'react-cookie';
import { Link, useHistory } from 'react-router-dom';
import { authContext } from '../../../Context/authContext';
import { notifyPath } from './pathNotifications';





const Notifications = () => {
  const { notify, getNotification, checkAdmin, token } = useContext(authContext);
  const history = useHistory();
  const [cookie] = useCookies();



  const handleRead = (id, admin_read, manager_read) => {
    axios({
      method: 'put',
      url: `${process.env.REACT_APP_URL}/feedback/updatenotify`,
      data: { id: id, admin_read, manager_read },
      headers: {
        'Authorization': `Bearer ${token.ID}`
      }
    }).then(() => {
      getNotification();
    });
  }
  const setPath = (person) => {
    notifyPath(person, checkAdmin, history);
  }


  var filterNotifications = [];
  if (!checkAdmin()) {
    filterNotifications = notify.filter((items) => {
      const { authToken } = cookie;
      var data;
      if (items.manager_id) {
        data = items.manager_id === authToken._id;
      } else {
        data = null;
      }
      return data;
    });
  } else {
    filterNotifications = notify.filter((items) => {
      var data;
      data = items.admin === '1';
      return data;
    });
  }




  return (
    <div className="row">
      <div className="col-md-12">
        <div className="main-card mb-3">
          <div className="">
            {
              (filterNotifications.length > 0)
                ? filterNotifications.map((items, i) => {
                  const { manager_read, admin_read } = items;
                  return <div key={i} className={`alert fade show alert-${(checkAdmin() ? items.admin_read === '1' : items.manager_read === '1')
                    ? 'dark' : 'info'}`} role="alert">
                    <strong>{items.subject}</strong>
                    <br />
                    {items.description.replace('to you', '')}
                    <Link onClick={() => {
                      checkAdmin() ? handleRead(items._id, 1, manager_read) : handleRead(items._id, admin_read, 1);
                      setPath(items.path)
                    }} className="alert-link">
                      &nbsp;Check Here
                </Link>
                <span className="float-right">
                      <i className="metismenu-state-icon pe-7s-date caret-left"></i>
                      {moment(items.createdAt).format("DD-MMM-YYYY")}&nbsp;
                      <i className="metismenu-state-icon pe-7s-clock caret-left"></i>{moment(items.createdAt).format('h:mm:ss a')}
                    </span>
                  </div>
                })
                : <div className='text-center h5 text-info'>No Notifications</div>
            }
          </div>
        </div>
      </div >
    </div >
  )
}

export default Notifications
