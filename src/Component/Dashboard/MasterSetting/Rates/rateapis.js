import axios from "axios";
const url = process.env.REACT_APP_URL;


export const getAllRate = async () => {
  return await axios({
    method: 'get',
    url: `${url}/master/rate`,
  });
}

export const addRate = async (data) => {
  return await axios({
    method: 'post',
    url: `${url}/master/rate`,
    data
  });
};

export const updateRate = async (data) => {
  return await axios({
    method: 'put',
    url: `${url}/master/rate`,
    data
  });
}

export const getDistrict_By_State = async (data) => {
  return await axios({
    method: 'post',
    url: `${url}/master/get_district_by_state`,
    data
  });
}