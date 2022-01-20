import axios from "axios"
const url = process.env.REACT_APP_URL;


export const getAllCustomer = async (token) => {
  return await axios({
    method: 'get',
    url: `${url}/users/customer`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const updateCustomer = async (data, token) => {
  return await axios({
    method: 'put',
    url: `${url}/users/customer`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const addCustomer = async (data, token) => {
  return await axios({
    method: 'post',
    url: `${url}/users/customer`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const getDistributorFromExecutive = async (data, token) => {
  return await axios({
    method: 'post',
    url: `${url}/users/get_distributor_from_execuitve`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
