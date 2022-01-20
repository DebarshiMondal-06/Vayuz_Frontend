import axios from "axios"
const url = process.env.REACT_APP_URL;

export const getCustomerFromDistributor = async (data, token) => {
  return await axios({
    method: 'post',
    url: `${url}/users/get_customer_from_distributor`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const getDistributorFromBranch = async (data, token) => {
  return await axios({
    method: 'post',
    url: `${url}/users/get_distributor_from_branch`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


export const getAmountFromCylinder = async (data, token) => {
  console.log(data);
  return await axios({
    method: 'post',
    url: `${url}/master/get_amount_form_cylinder`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const getAllStock = async () => {
  return await axios({
    method: 'get',
    url: `${url}/master/stock`,
  });
}

export const getDispatch = async (token) => {
  return await axios({
    method: 'get',
    url: `${url}/order/dispatch`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}
export const addDispatch = async (data, token) => {
  return await axios({
    method: 'post',
    url: `${url}/order/dispatch`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}


export const addOrder = async (data, token) => {
  return await axios({
    method: 'post',
    url: `${url}/order/create`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const getOrders = async (token) => {
  return await axios({
    method: 'get',
    url: `${url}/order/all_orders`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const getManagerApprovedOrders = async (token) => {
  return await axios({
    method: 'get',
    url: `${url}/order/order_approved_manager`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const getManagerApproval = async (token) => {
  return await axios({
    method: 'get',
    url: `${url}/order/order_manager_approval`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const updateOrders = async (data, token) => {
  return await axios({
    method: 'put',
    url: `${url}/order/update`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


export const check_OTP = async (data, token) => {
  console.log(data);
  return await axios({
    method: 'post',
    url: `${url}/order/check_otp`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}