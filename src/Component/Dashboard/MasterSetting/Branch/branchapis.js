import axios from "axios"
const url = process.env.REACT_APP_URL;


export const getAllbranch = async () => {
  return await axios({
    method: 'get',
    url: `${url}/master/branch`,
  });
}

export const addbranch = async (data) => {
  // console.log(data);
  return await axios({
    method: 'post',
    url: `${url}/master/branch`,
    data
  });
};

export const updatebranch = async (data) => {
  console.log(data);
  return await axios({
    method: 'put',
    url: `${url}/master/branch`,
    data
  });
}

export const getAllcity = async () => {
  return await axios({
    method: 'get',
    url: `${url}/master/city?setactive=active`,
  });
}
export const findbycity = async (data) => {
  // console.log(data);
  return await axios({
    method: 'get',
    url: `${url}/master/findbycity?city=${data}`
  });
}






