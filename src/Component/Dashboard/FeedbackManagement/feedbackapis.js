import axios from "axios"
const url = process.env.REACT_APP_URL;


export const getFeedback = async (token) => {
  return await axios({
    method: 'get',
    url: `${url}/feedback/admin`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const updateFeedback = async (data, token) => {
  return await axios({
    method: 'put',
    url: `${url}/feedback`,
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}