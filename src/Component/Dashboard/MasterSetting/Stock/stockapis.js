import axios from "axios";
const url = process.env.REACT_APP_URL;


export const getAllStock = async () => {
  return await axios({
    method: 'get',
    url: `${url}/master/stock`,
  });
}

export const addStock = async (data) => {
  return await axios({
    method: 'post',
    url: `${url}/master/stock`,
    data
  });
};

export const updateStock = async (data) => {
  return await axios({
    method: 'put',
    url: `${url}/master/stock`,
    data
  });
}