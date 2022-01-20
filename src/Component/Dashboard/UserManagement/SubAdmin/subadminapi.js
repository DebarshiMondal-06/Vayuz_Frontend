import axios from "axios";
const url = process.env.REACT_APP_URL;

export const getAllStaff = async () => {
  return await axios({
    method: 'get',
    url: `${url}/staff/getstaff`,
  });
}


export const updateStaff = async (data) => {
  return await axios({
    method: 'put',
    url: `${url}/staff/updatestaff`,
    data
  });
}

export const addStaffs = async (data) => {
  return await axios({
    method: 'post',
    url: `${url}/staff/create`,
    data
  });
}

export const getAllbranch = async () => {
  return await axios({
    method: 'get',
    url: `${url}/master/branch`,
  });
}