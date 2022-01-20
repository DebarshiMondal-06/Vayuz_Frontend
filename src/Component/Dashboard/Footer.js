import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'
// import { authContext } from '../../Context/authContext';




const Footer = () => {
  const [cookie, setCookie] = useCookies();
  // const { checkAdmin } = useContext(authContext);
  const [page, setPage] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/cms/cmspagename`
    }).then((el) => {
      setPage(el.data.resultData);
    })
  }, []);

  const setId = (id) => {
    setCookie('pageId', id, { path: '/' });
  }




  return <div className="app-wrapper-footer">
    <div className="app-footer">
      <div className="app-footer__inner">
        <div className="app-footer-left">
          <ul className="nav">
            {
              page.map((items, i) => {
                const check =
                  cookie.authToken && (cookie.authToken.role === 'admin' || cookie.authToken.role === 'staff')
                    ? true : false;

                return <li key={i} className="nav-item">
                  <Link
                    onClick={() => setId(items._id)}
                    to={check ? '/page' : '/manager_page'}
                    className="nav-link">
                    {items.forPageName ? items.forPageName.pageName : ''}
                  </Link>
                </li>
              })
            }
          </ul>
        </div>
        <div className="app-footer-right">
          <ul className="nav">
            <li className="nav-item">
              Designed & Developed by<a rel='noreferrer' target='_blank' href="https://www.vayuz.com/"> VAYUZ Technology</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
}

export default Footer
