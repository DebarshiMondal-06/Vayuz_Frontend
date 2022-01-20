import axios from "axios"
const url = process.env.REACT_APP_URL;



export const getAllDist = async () => {
  return await axios({
    method: 'get',
    url: `${url}/master/district`,
  });
}

export const getAllState = async () => {
  return await axios({
    method: 'get',
    url: `${url}/master/state?setactive=active`,
  });
}

export const addDistrict = async (data) => {
  return await axios({
    method: 'post',
    url: `${url}/master/district`,
    data
  });
};

export const updateDistrict = async (data) => {
  // console.log(data);
  return await axios({
    method: 'put',
    url: `${url}/master/district`,
    data
  });
}