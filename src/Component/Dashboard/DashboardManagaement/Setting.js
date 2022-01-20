import React, { useContext } from 'react';
import { Delete, Notifications } from '@material-ui/icons'
import { Link } from 'react-router-dom';
import { authContext } from '../../../Context/authContext';

const Setting = () => {
  const { checkAdmin } = useContext(authContext);


  const cardData = (text, background, icon, path) => {
    return <Link to={path}
      className="col-lg-6 col-xl-4"
      style={{ textDecoration: 'none' }}>
      <div className={`card mb-3 widget-content bg-${background}`}>
        <div className="widget-content-wrapper text-white font-weight-bold">
          <div className="widget-content-left">
            <div className="widget-heading"></div>
            <div className="widget-subheading">{text}</div>
          </div>
          <div className="widget-content-right">
            <div className="widget-numbers text-white"><span>{icon}</span></div>
          </div>
        </div>
      </div>
    </Link >
  }

  return <div className='row'>
    {cardData('Notifications', 'info', <Notifications />,
      checkAdmin() ? '/notifications' : '/manager_notifications')}

    {(!checkAdmin()) ? cardData('Delete Account', 'danger', <Delete />,
      '/manager_setting/delete') : ''}
  </div>


}

export default Setting
