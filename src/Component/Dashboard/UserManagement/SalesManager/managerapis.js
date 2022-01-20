import axios from "axios";
const url = process.env.REACT_APP_URL;


export const getAllmanager = async (token) => {
  return await axios({
    method: 'get',
    url: `${url}/users/salesmanager`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}


export const managerStatus = async (data, token) => {
  return await axios({
    method: 'put',
    url: `${url}/users/salesmanagerstatus`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
}

export const updateManager = async (data, token) => {
  return await axios({
    method: 'put',
    url: `${url}/users/salesmanager`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const addManager = async (data, token) => {
  return await axios({
    method: 'post',
    url: `${url}/users/salesmanager`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const getAllbranch = async () => {
  return await axios({
    method: 'get',
    url: `${url}/master/branch`,
  });
}