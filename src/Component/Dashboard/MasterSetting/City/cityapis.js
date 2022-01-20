import axios from "axios";
const url = process.env.REACT_APP_URL;



export const getAllCity = async () => {
  return await axios({
    method: 'get',
    url: `${url}/master/city`,
  });
}

export const getAllDistrict = async (data) => {
  return await axios({
    method: 'post',
    url: `${url}/master/get_district_by_state`,
    data
  });
}

export const addCity = async (data) => {
  return await axios({
    method: 'post',
    url: `${url}/master/city`,
    data
  });
};

export const getAllState = async () => {
  return await axios({
    method: 'get',
    url: `${url}/master/state?setactive=active`,
  });
}

export const updateCity = async (data) => {
  // console.log(data);
  return await axios({
    method: 'put',
    url: `${url}/master/city`,
    data
  });
}