import axios from "axios";
const url = process.env.REACT_APP_URL;


export const getAllState = async () => {
  return await axios({
    method: 'get',
    url: `${url}/master/state`,
  });
}

export const addState = async (data) => {
  return await axios({
    method: 'post',
    url: `${url}/master/state`,
    data
  });
};

export const updateState = async (data) => {
  return await axios({
    method: 'put',
    url: `${url}/master/state`,
    data
  });
}