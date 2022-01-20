import axios from "axios"
const url = process.env.REACT_APP_URL;



export const getVisit = async () => {
  return await axios({
    method: 'get',
    url: `${url}/visits/getvisit`
  });
}

export const updateVisit = async (data) => {
  console.log(data);
  return await axios({
    method: 'put',
    url: `${url}/visits/updatevisit`,
    data
  });
}