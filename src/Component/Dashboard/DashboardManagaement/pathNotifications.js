

exports.notifyPath = (path, checkAdmin, history) => {
  if (path === 'Manager') {
    return (checkAdmin()) ? history.push('/salesmanager') : '';
  }
  if (path === 'Executive') {
    return (checkAdmin())
      ? history.push('/salesexecutive')
      : history.push('/manager_salesexecutive');
  }
  if (path === 'Customer') {
    return (checkAdmin())
      ? history.push('/customer')
      : history.push('/manager_customer');
  }
  if (path === 'Distributor') {
    return (checkAdmin())
      ? history.push('/distributor')
      : history.push('/manager_distributor');
  }
  if (path === 'Order') {
    return (checkAdmin())
      ? history.push('/order')
      : history.push('/manager_order');
  }
  if (path === 'Manager_Approved') {
    return (checkAdmin())
      ? history.push('/order_approval')
      : history.push('/manager_order_approval');
  }
  if (path === 'Order_Approval') {
    return history.push('/manager_order_approval');
  }
  if (path === 'Visit' || path === 'Visit_Complete') {
    return history.push('/visits');
  }
  if (path === 'Feedback') {
    return history.push('/feedback');
  }
}