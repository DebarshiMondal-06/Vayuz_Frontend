import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { authContext } from '../../../Context/authContext';
import { dashboardContext } from './DashboardContext'
import { calculate } from './Dashboard_handler';



const ViewDashboard = () => {
  const { manager, executive, customer, distributor, order } = useContext(dashboardContext);
  const { checkAdmin, cookie } = useContext(authContext);

  const filters = (model) => {
    if (!checkAdmin()) {
      return model.filter((items) => {
        const { authToken } = cookie;
        var data;
        if (items.manager) {
          data = items.manager._id === authToken._id;
        } else {
          data = null;
        }
        return data;
      });
    } else {
      return model;
    }
  }


  var filterExecutive = [];
  filterExecutive = filters(executive);

  var filterDistributor = [];
  filterDistributor = filters(distributor);

  var filterCustomer = [];
  filterCustomer = filters(customer);

  var filterOrders = [];
  filterOrders = filters(order);




  const cardData = (headText, numbers, colors, link, role) => {
    return <div className="col-lg-6 col-xl-4">
      <Link to={`${link || '#'}`} style={{ textDecoration: 'none', cursor: `${link ? 'pointer' : 'default'}` }}>
        <div className="card mb-3 widget-content ">
          <div className="widget-content-outer">
            <div className="widget-content-wrapper">
              <div className="widget-content-left">
                <div className="widget-heading text-dark h6">{headText}</div>
                <div className="widget-subheading text-dark font-weight-bold">Currently</div>
              </div>
              <div className="widget-content-right">
                <div className={`widget-numbers text-${colors}`}>
                  {calculate(role, numbers, filterOrders)}
                </div>
              </div>
            </div>
            <div className="widget-progress-wrapper">
              <div className="progress-bar-xs progress">
                <div className={`progress-bar bg-${colors}`} role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{ width: `${numbers.length}%` }}></div>
              </div>
              <div className="progress-sub-label">
                <div className="sub-label-left">Growth</div>
                <div className="sub-label-right">100%</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  }


  return (
    <div className='row'>
      {(checkAdmin()) ? cardData('Total SalesManager', manager, 'success', '/salesmanager') : ''}
      {cardData('Total SalesExecutive', filterExecutive, 'warning', checkAdmin() ? '/salesexecutive' : '/manager_salesexecutive')}
      {cardData('Total Distributor', filterDistributor, 'secondary', checkAdmin() ? '/distributor' : '/manager_distributor')}
      {cardData('Total Customer', filterCustomer, 'info', checkAdmin() ? '/customer' : '/manager_customer')}
      {cardData('Total Order', filterOrders, 'primary', checkAdmin() ? '/order' : '/manager_order')}
      {cardData('Total Sales', filterOrders, 'success', '', 'sales')}
      {cardData('Total Revenue', filterOrders, 'primary', '', 'paid_reveune')}
      {cardData('Total Dues', filterOrders, 'danger', '', 'credit_reveune')}
      {cardData('Total Deliveres', filterOrders, 'warning', '', 'order_delivered')}
      {cardData(`Total Discount`, filterOrders, 'success', '', 'total_discount')}
      {cardData(`Today's Deliveres`, filterOrders, 'secondary', '', 'delivered_today')}
      {cardData(`Today's Revenue`, filterOrders, 'info', '', 'today_paid_reveune')}
    </div>
  )
}

export default ViewDashboard;
