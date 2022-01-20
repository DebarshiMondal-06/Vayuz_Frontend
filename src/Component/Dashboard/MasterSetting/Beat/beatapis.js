import axios from "axios";
const url = process.env.REACT_APP_URL;

export const getAllbeats = async () => {
  return await axios({
    method: 'get',
    url: `${url}/master/beat`,
  });
}

export const addbeat = async (data) => {
  return await axios({
    method: 'post',
    url: `${url}/master/beat`,
    data
  });
};

export const updatebeat = async (data) => {
  return await axios({
    method: 'put',
    url: `${url}/master/beat`,
    data
  });
}

export const findbyarea = async (data) => {
  return await axios({
    method: 'get',
    url: `${url}/master/findbyarea?area=${data}`
  });
}

export const getAllarea = async () => {
  return await axios({
    method: 'get',
    url: `${url}/master/area?setactive=active`,
  });
}
