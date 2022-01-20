import axios from "axios"
const url = process.env.REACT_APP_URL;

export const getAllarea = async () => {
  return await axios({
    method: 'get',
    url: `${url}/master/area`,
  });
}

export const addarea = async (data) => {
  return await axios({
    method: 'post',
    url: `${url}/master/area`,
    data
  });
};

export const updatearea = async (data) => {
  return await axios({
    method: 'put',
    url: `${url}/master/area`,
    data
  });
}

export const getAllbranch = async () => {
  return await axios({
    method: 'get',
    url: `${url}/master/branch?setactive=active`,
  });
}
export const findbybranch = async (data) => {
  return await axios({
    method: 'get',
    url: `${url}/master/findbybranch?branch=${data}`
  });
}






